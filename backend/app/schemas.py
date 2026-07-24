"""Request and response bodies."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class SignupRequest(BaseModel):
    email: EmailStr
    # bcrypt silently truncates past 72 bytes, so reject rather than mislead.
    password: str = Field(min_length=8, max_length=72)

    @field_validator("password")
    @classmethod
    def _fits_bcrypt(cls, v: str) -> str:
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password must be 72 bytes or fewer.")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str = Field(min_length=1)
    # Same rules as signup: bcrypt truncates past 72 bytes, so reject early.
    password: str = Field(min_length=8, max_length=72)

    @field_validator("password")
    @classmethod
    def _fits_bcrypt(cls, v: str) -> str:
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password must be 72 bytes or fewer.")
        return v


class UserResponse(BaseModel):
    """Public view of a user — never includes the hash or the token."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    is_verified: bool
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds
    user: UserResponse


class MessageResponse(BaseModel):
    detail: str
