"""Set a user's access role.

Usage (from the backend/ dir on the server, with the app's venv):
    ./.venv/bin/python set_role.py <email> <role>

  <role> is one of: attendee | staff | admin

Examples:
    ./.venv/bin/python set_role.py swathi_suresh@moneypennyllc.com admin
    ./.venv/bin/python set_role.py someone@example.com attendee

Email matching is case-insensitive (addresses are stored lowercased). Only the
role is changed; nothing else about the account is touched.
"""

from __future__ import annotations

import sys

from sqlalchemy import select

from app.database import SessionLocal
from app.models import User

VALID_ROLES = ("attendee", "staff", "admin")


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: python set_role.py <email> <role>   (role: attendee|staff|admin)")
        sys.exit(2)

    email = sys.argv[1].strip().lower()
    role = sys.argv[2].strip().lower()

    if role not in VALID_ROLES:
        print(f"ERROR: role must be one of {list(VALID_ROLES)} (got {role!r})")
        sys.exit(2)

    with SessionLocal() as db:
        user = db.scalar(select(User).where(User.email == email))
        if user is None:
            print(f"ERROR: no user found with email {email!r}")
            sys.exit(1)

        before = user.role
        if before == role:
            print(f"OK: {email} is already {role!r} — no change.")
            return

        user.role = role
        db.commit()
        print(f"OK: {email}: role {before!r} -> {role!r}")


if __name__ == "__main__":
    main()
