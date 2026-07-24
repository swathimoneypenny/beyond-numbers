"""Application settings, loaded from the environment (and a local .env file)."""

import secrets
from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- Security ---
    # Blank in dev means "generate a throwaway key at startup". Tokens then stop
    # working across restarts, which is a loud enough signal to set a real one.
    jwt_secret: str = ""
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24

    # --- Database ---
    database_url: str = "sqlite:///./beyond_numbers.db"

    # --- CORS ---
    cors_origins: str = (
        "http://localhost:5173,"
        "http://localhost:4173,"
        "https://beyond-numbers.com,"
        "https://www.beyond-numbers.com"
    )

    # --- App ---
    environment: str = "development"

    # Base URL of the frontend, used to build the password-reset link.
    frontend_base_url: str = "https://beyond-numbers.com"

    # --- Email / AWS SES ---
    aws_region: str = "ap-southeast-2"
    ses_sender: str = "noreply@beyond-numbers.com"

    # --- Password reset ---
    # Reset tokens expire after this many minutes and are single-use.
    password_reset_token_expire_minutes: int = 60
    # Abuse guard on /forgot-password: max requests per IP per window (seconds).
    forgot_password_max_per_window: int = 5
    forgot_password_window_seconds: int = 900

    @field_validator("jwt_secret")
    @classmethod
    def _default_secret(cls, v: str) -> str:
        return v or secrets.token_urlsafe(48)

    @property
    def is_production(self) -> bool:
        return self.environment.lower() in {"production", "prod"}

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
