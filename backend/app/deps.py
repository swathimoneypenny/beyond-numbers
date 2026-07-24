"""Shared FastAPI dependencies."""

from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .security import decode_access_token

# auto_error=False so a missing header produces our own 401 shape, not FastAPI's 403.
bearer_scheme = HTTPBearer(auto_error=False)

_UNAUTHORIZED = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Not authenticated. Provide a valid access token.",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
    db: Annotated[Session, Depends(get_db)],
) -> User:
    if credentials is None or not credentials.credentials:
        raise _UNAUTHORIZED

    payload = decode_access_token(credentials.credentials)
    if payload is None:
        raise _UNAUTHORIZED

    subject = payload.get("sub")
    if not subject:
        raise _UNAUTHORIZED

    try:
        user_id = int(subject)
    except (TypeError, ValueError):
        raise _UNAUTHORIZED from None

    user = db.get(User, user_id)
    if user is None:
        # Valid signature, but the account is gone.
        raise _UNAUTHORIZED

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
DbSession = Annotated[Session, Depends(get_db)]
