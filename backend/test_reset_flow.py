"""Manual end-to-end check of the password-reset flow (no SES needed).

Run:  .venv/Scripts/python.exe test_reset_flow.py
Uses a throwaway SQLite file and a FastAPI TestClient, capturing the reset link
by monkeypatching the SES sender. Not a pytest suite — just a runnable check.
"""

import os
import urllib.parse

os.environ["ENVIRONMENT"] = "development"
os.environ["DATABASE_URL"] = "sqlite:///./_test_reset.db"
os.environ["FRONTEND_BASE_URL"] = "http://localhost:5173"
os.environ["JWT_SECRET"] = "test-secret-for-local-check"

# Fresh DB each run.
if os.path.exists("_test_reset.db"):
    os.remove("_test_reset.db")

from fastapi.testclient import TestClient  # noqa: E402

from app import email as email_mod  # noqa: E402
from app.database import SessionLocal, init_db  # noqa: E402
from app.main import app  # noqa: E402
from app.models import PasswordResetToken  # noqa: E402

# Create tables (the app does this in its lifespan, which TestClient skips here).
init_db()

captured = {}


def fake_send(to_email, reset_link):
    captured["to"] = to_email
    captured["link"] = reset_link
    return True


email_mod.send_password_reset_email = fake_send
# The route imported the symbol directly, so patch it there too.
import app.routes.auth as auth_routes  # noqa: E402

auth_routes.send_password_reset_email = fake_send

client = TestClient(app)
ok = True


def check(label, cond):
    global ok
    ok = ok and cond
    print(f"  [{'PASS' if cond else 'FAIL'}] {label}")


EMAIL = "reset-test@example.com"
OLD = "OldPassw0rd!"
NEW = "BrandNewPass9!"

print("1. signup + login with the original password")
r = client.post("/api/auth/signup", json={"email": EMAIL, "password": OLD})
check("signup 201", r.status_code == 201)
r = client.post("/api/auth/login", json={"email": EMAIL, "password": OLD})
check("login with old password works", r.status_code == 200)

print("2. forgot-password for a REAL address")
captured.clear()
r = client.post("/api/auth/forgot-password", json={"email": EMAIL})
check("returns 200", r.status_code == 200)
generic = r.json().get("detail")
check("generic message", "If an account exists" in generic)
check("email was sent", captured.get("to") == EMAIL)
link = captured.get("link", "")
token = urllib.parse.parse_qs(urllib.parse.urlparse(link).query).get("token", [""])[0]
check("reset link carries a token", bool(token))

print("3. forgot-password for an UNKNOWN address returns the SAME response")
captured.clear()
r2 = client.post("/api/auth/forgot-password", json={"email": "nobody@example.com"})
check("same status", r2.status_code == 200)
check("same message (no enumeration)", r2.json().get("detail") == generic)
check("no email sent for unknown address", "to" not in captured)

print("4. reset-password with the token")
r = client.post("/api/auth/reset-password", json={"token": token, "password": NEW})
check("reset 200", r.status_code == 200)
check("success message", "reset" in r.json().get("detail", "").lower())

print("5. new password works, old one doesn't")
r = client.post("/api/auth/login", json={"email": EMAIL, "password": NEW})
check("login with NEW password works", r.status_code == 200)
r = client.post("/api/auth/login", json={"email": EMAIL, "password": OLD})
check("login with OLD password rejected", r.status_code == 401)

print("6. the token is single-use")
r = client.post("/api/auth/reset-password", json={"token": token, "password": "Another1Pass!"})
check("reused token rejected 400", r.status_code == 400)
check("clear invalid/expired message", "invalid or has expired" in r.json().get("detail", ""))

print("7. a garbage token is rejected")
r = client.post("/api/auth/reset-password", json={"token": "not-a-real-token", "password": "Another1Pass!"})
check("garbage token 400", r.status_code == 400)

print("8. token stored HASHED, not raw")
db = SessionLocal()
rec = db.query(PasswordResetToken).first()
check("stored token != raw token (hashed)", rec is not None and rec.token != token)
check("stored token looks like sha256 hex", rec is not None and len(rec.token) == 64)
check("used token is marked used", rec is not None and rec.used_at is not None)
db.close()

print()
print("RESULT:", "ALL PASSED" if ok else "SOME FAILED")

# Best-effort cleanup (SQLite may still hold the file open on Windows).
from app.database import engine  # noqa: E402

engine.dispose()
try:
    os.remove("_test_reset.db")
except OSError:
    pass
raise SystemExit(0 if ok else 1)
