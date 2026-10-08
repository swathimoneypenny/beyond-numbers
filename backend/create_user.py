"""Create (or update) a verified account with a role — for provisioning accounts
directly, without the signup flow.

Usage (from the backend/ dir on the server, with the app's venv):
    ./.venv/bin/python create_user.py <email> <password> [role]

  [role] defaults to "attendee"; one of: attendee | staff | admin

Behaviour:
  - If the email doesn't exist, a new account is created, marked verified
    (is_verified = True) so it can log in immediately, with the given role.
  - If the email already exists, its password, role and verified flag are
    updated (safe to re-run). Email is stored lowercased.
  - Password hashing uses the app's own bcrypt context, so the account behaves
    exactly like a normally-registered one.

Examples:
    ./.venv/bin/python create_user.py penny@beyond-numbers.com 'E6G6smf+xSxdCpy' admin
    ./.venv/bin/python create_user.py pbreslin1423@gmail.com 'havYtKu@gUxJQ6B' attendee
"""

from __future__ import annotations

import sys

from sqlalchemy import select

from app.database import SessionLocal
from app.models import User
from app.security import generate_verification_token, hash_password

VALID_ROLES = ("attendee", "staff", "admin")


def main() -> None:
    if len(sys.argv) not in (3, 4):
        print("Usage: python create_user.py <email> <password> [role]")
        sys.exit(2)

    email = sys.argv[1].strip().lower()
    password = sys.argv[2]
    role = sys.argv[3].strip().lower() if len(sys.argv) == 4 else "attendee"

    if role not in VALID_ROLES:
        print(f"ERROR: role must be one of {list(VALID_ROLES)} (got {role!r})")
        sys.exit(2)

    # Match the API's bcrypt rules: 8..72 bytes.
    nbytes = len(password.encode("utf-8"))
    if len(password) < 8 or nbytes > 72:
        print("ERROR: password must be at least 8 characters and at most 72 bytes.")
        sys.exit(2)

    with SessionLocal() as db:
        user = db.scalar(select(User).where(User.email == email))
        if user is None:
            user = User(
                email=email,
                password_hash=hash_password(password),
                is_verified=True,
                verification_token=generate_verification_token(),
                role=role,
            )
            db.add(user)
            action = "created"
        else:
            user.password_hash = hash_password(password)
            user.is_verified = True
            user.role = role
            action = "updated"

        db.commit()
        db.refresh(user)
        print(
            f"OK: {action} {email} "
            f"(id={user.id}, role={user.role!r}, verified={user.is_verified})"
        )


if __name__ == "__main__":
    main()
