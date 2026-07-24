"""Password hashing and JWT creation/validation."""

import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any

from jose import JWTError, jwt
from passlib.context import CryptContext

from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# A hash of a throwaway password. Verifying against this on "user not found"
# keeps failed-login timing roughly constant, so the response time can't be used
# to probe which emails are registered.
_DUMMY_HASH = pwd_context.hash("not-a-real-password-timing-guard")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return pwd_context.verify(plain, hashed)
    except ValueError:
        # Malformed/legacy hash in the row — treat as a failed login, not a 500.
        return False


def fake_verify() -> None:
    """Burn the same CPU as a real check when the email doesn't exist."""
    pwd_context.verify("not-a-real-password-timing-guard", _DUMMY_HASH)


def generate_verification_token() -> str:
    """URL-safe token for Stage 2's email verification link."""
    return secrets.token_urlsafe(32)


def generate_reset_token() -> str:
    """High-entropy URL-safe token for a password-reset link (~256 bits)."""
    return secrets.token_urlsafe(32)


def hash_token(raw_token: str) -> str:
    """SHA-256 hex digest used to store reset tokens.

    The token is already high-entropy random, so a plain unsalted SHA-256 is
    sufficient (no offline dictionary attack is possible) and lets us look the
    token up directly. We store this digest, never the raw token.
    """
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


def create_access_token(subject: str | int, expires_minutes: int | None = None) -> tuple[str, int]:
    """Return (encoded JWT, lifetime in seconds)."""
    minutes = expires_minutes or settings.access_token_expire_minutes
    now = datetime.now(timezone.utc)
    expire = now + timedelta(minutes=minutes)

    payload: dict[str, Any] = {
        "sub": str(subject),
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
        "type": "access",
    }
    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return token, minutes * 60


def decode_access_token(token: str) -> dict[str, Any] | None:
    """Return the payload, or None if the token is invalid/expired/wrong type."""
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
    except JWTError:
        return None
    if payload.get("type") != "access":
        return None
    return payload
