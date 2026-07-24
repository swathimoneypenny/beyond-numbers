"""FastAPI application entrypoint."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from . import __version__
from .config import settings
from .database import init_db
from .routes import auth


def _configure_logging() -> None:
    """Give the app's "bn" logger a handler so its INFO logs reach the console.

    uvicorn only configures its own loggers, so without this the email module's
    logs (send success/failure, and the dev-only reset link) would be swallowed.
    """
    logger = logging.getLogger("bn")
    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(logging.Formatter("%(levelname)s:     %(name)s: %(message)s"))
        logger.addHandler(handler)
        logger.propagate = False
    logger.setLevel(logging.INFO)


_configure_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Beyond Numbers Auth API",
    version=__version__,
    lifespan=lifespan,
    # Keep the interactive docs off the public production surface.
    docs_url=None if settings.is_production else "/docs",
    redoc_url=None if settings.is_production else "/redoc",
    openapi_url=None if settings.is_production else "/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """Return a readable 400 instead of FastAPI's default 422 payload."""
    first = exc.errors()[0] if exc.errors() else {}
    field = ".".join(str(p) for p in first.get("loc", ()) if p != "body") or "request"
    message = first.get("msg", "Invalid request.")
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"detail": f"{field}: {message}"},
    )


app.include_router(auth.router)


@app.get("/api/health", tags=["health"], summary="Liveness probe")
def health() -> dict[str, str]:
    return {"status": "ok", "version": __version__, "environment": settings.environment}
