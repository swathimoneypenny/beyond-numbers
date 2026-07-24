"""Authentication endpoints: signup, login, current-user, and password reset."""

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError

from ..config import settings
from ..deps import CurrentUser, DbSession
from ..email import send_password_reset_email
from ..models import PasswordResetToken, User
from ..ratelimit import RateLimiter
from ..schemas import (
    ForgotPasswordRequest,
    LoginRequest,
    MessageResponse,
    ResetPasswordRequest,
    SignupRequest,
    TokenResponse,
    UserResponse,
)
from ..security import (
    create_access_token,
    fake_verify,
    generate_reset_token,
    generate_verification_token,
    hash_password,
    hash_token,
    verify_password,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Deliberately identical for "no such email" and "wrong password" — a distinct
# message for either one turns this endpoint into an account-enumeration oracle.
_BAD_CREDENTIALS = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect email or password.",
    headers={"WWW-Authenticate": "Bearer"},
)

# Same wording whether or not the email exists — never reveal which addresses
# are registered.
_FORGOT_PASSWORD_MESSAGE = (
    "If an account exists for that email, we've sent a password reset link."
)

# Abuse guards (in-memory; single-process deployment). Keyed by client IP.
_forgot_limiter = RateLimiter(
    settings.forgot_password_max_per_window, settings.forgot_password_window_seconds
)
_reset_limiter = RateLimiter(20, settings.forgot_password_window_seconds)


def _normalize(email: str) -> str:
    return email.strip().lower()


def _client_ip(request: Request) -> str:
    """Real client IP, honouring the nginx proxy's X-Forwarded-For."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@router.post(
    "/signup",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create an account",
)
def signup(payload: SignupRequest, db: DbSession) -> TokenResponse:
    email = _normalize(payload.email)

    existing = db.scalar(select(User).where(User.email == email))
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with that email already exists.",
        )

    user = User(
        email=email,
        password_hash=hash_password(payload.password),
        # Stage 1: accounts work immediately. Stage 2 flips this to False and
        # gates login on the emailed token being confirmed.
        is_verified=True,
        verification_token=generate_verification_token(),
    )

    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        # Lost a race against a concurrent signup with the same email.
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with that email already exists.",
        ) from None

    db.refresh(user)

    token, expires_in = create_access_token(user.id)
    return TokenResponse(
        access_token=token,
        expires_in=expires_in,
        user=UserResponse.model_validate(user),
    )


@router.post("/login", response_model=TokenResponse, summary="Exchange credentials for a JWT")
def login(payload: LoginRequest, db: DbSession) -> TokenResponse:
    email = _normalize(payload.email)
    user = db.scalar(select(User).where(User.email == email))

    if user is None:
        fake_verify()  # keep the timing indistinguishable from a wrong password
        raise _BAD_CREDENTIALS

    if not verify_password(payload.password, user.password_hash):
        raise _BAD_CREDENTIALS

    token, expires_in = create_access_token(user.id)
    return TokenResponse(
        access_token=token,
        expires_in=expires_in,
        user=UserResponse.model_validate(user),
    )


@router.get("/me", response_model=UserResponse, summary="Who am I?")
def read_me(current_user: CurrentUser) -> UserResponse:
    return UserResponse.model_validate(current_user)


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
    summary="Request a password-reset link",
)
def forgot_password(
    payload: ForgotPasswordRequest, request: Request, db: DbSession
) -> MessageResponse:
    if not _forgot_limiter.allow(_client_ip(request)):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please wait a few minutes and try again.",
        )

    email = _normalize(payload.email)
    user = db.scalar(select(User).where(User.email == email))

    # Only do real work when the account exists — but always return the same
    # response so the caller can't tell whether it did.
    if user is not None:
        raw_token = generate_reset_token()
        expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=settings.password_reset_token_expire_minutes
        )
        db.add(
            PasswordResetToken(
                user_id=user.id,
                token=hash_token(raw_token),
                expires_at=expires_at,
            )
        )
        db.commit()

        reset_link = f"{settings.frontend_base_url.rstrip('/')}/reset-password?token={raw_token}"
        send_password_reset_email(user.email, reset_link)

    return MessageResponse(detail=_FORGOT_PASSWORD_MESSAGE)


@router.post(
    "/reset-password",
    response_model=MessageResponse,
    summary="Set a new password using a reset token",
)
def reset_password(
    payload: ResetPasswordRequest, request: Request, db: DbSession
) -> MessageResponse:
    if not _reset_limiter.allow(_client_ip(request)):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please wait a few minutes and try again.",
        )

    record = db.scalar(
        select(PasswordResetToken).where(
            PasswordResetToken.token == hash_token(payload.token)
        )
    )
    if record is None or not record.is_usable():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This password reset link is invalid or has expired.",
        )

    user = db.get(User, record.user_id)
    if user is None:  # account deleted after the token was issued
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This password reset link is invalid or has expired.",
        )

    now = datetime.now(timezone.utc)
    user.password_hash = hash_password(payload.password)
    record.used_at = now

    # Invalidate every other outstanding token for this user, so a second link
    # from an earlier request can't be used after a successful reset.
    db.execute(
        update(PasswordResetToken)
        .where(
            PasswordResetToken.user_id == user.id,
            PasswordResetToken.id != record.id,
            PasswordResetToken.used_at.is_(None),
        )
        .values(used_at=now)
    )

    db.commit()
    return MessageResponse(detail="Your password has been reset. You can now sign in.")
