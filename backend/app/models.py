"""Database models."""

from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Stored lowercased so lookups are case-insensitive without a functional index.
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)

    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    # Stage 1 sets this true on signup; Stage 2 will flip it to false until the
    # emailed token is confirmed.
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Generated now so Stage 2's verification email has a token to send.
    verification_token: Mapped[str | None] = mapped_column(String(64), index=True, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, nullable=False
    )

    def __repr__(self) -> str:  # pragma: no cover — debugging aid
        return f"<User id={self.id} email={self.email!r} verified={self.is_verified}>"


class PasswordResetToken(Base):
    """A single-use, time-limited token backing a password-reset link.

    The `token` column stores a SHA-256 hash of the value that goes in the email
    link, never the raw token — so a database leak can't be turned into working
    reset links. Lookups hash the incoming token and match on that.
    """

    __tablename__ = "password_reset_tokens"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )

    # SHA-256 hex digest of the raw token (64 chars).
    token: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)

    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    # Set when the token is consumed; a non-null value means "already used".
    used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, nullable=False
    )

    user: Mapped["User"] = relationship("User")

    def is_usable(self, now: datetime | None = None) -> bool:
        now = now or _utcnow()
        expires = self.expires_at
        # SQLite may return a naive datetime; assume UTC so the compare is valid.
        if expires.tzinfo is None:
            expires = expires.replace(tzinfo=timezone.utc)
        return self.used_at is None and expires > now

    def __repr__(self) -> str:  # pragma: no cover — debugging aid
        return f"<PasswordResetToken user_id={self.user_id} used={self.used_at is not None}>"
