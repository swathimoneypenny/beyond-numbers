"""SQLAlchemy engine, session factory, and the declarative base."""

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from .config import settings

# check_same_thread is a SQLite-only quirk: FastAPI serves requests from a
# threadpool, and the default would reject a connection reused off-thread.
connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}

engine = create_engine(settings.database_url, connect_args=connect_args, future=True)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency: one session per request, always closed."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """Create tables that don't exist yet. Swap for Alembic when schemas evolve."""
    from . import models  # noqa: F401  — registers the models on Base.metadata

    Base.metadata.create_all(bind=engine)
