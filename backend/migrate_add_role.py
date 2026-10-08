"""Safe, idempotent migration: add users.role (default 'attendee').

What it does, in order:
  1. Resolves the SQLite file from the app's DATABASE_URL (same file the app uses).
  2. Makes a timestamped backup copy of the DB *before any change* and prints its path.
  3. Adds the `role` column only if it isn't already there
     (ALTER TABLE users ADD COLUMN role ... DEFAULT 'attendee'), so every existing
     row is backfilled to "attendee" by SQLite — no row is rewritten or wiped.
  4. Prints a short before/after summary.

Re-running is harmless: if the column already exists it reports that and stops
(after still taking a backup).

Usage (from the backend/ directory, with the app's venv):
    ./.venv/bin/python migrate_add_role.py            # path from DATABASE_URL
    ./.venv/bin/python migrate_add_role.py /path/to/beyond_numbers.db   # explicit
"""

from __future__ import annotations

import datetime as _dt
import shutil
import sqlite3
import sys
from pathlib import Path

VALID_ROLES = ("attendee", "staff", "admin")
DEFAULT_ROLE = "attendee"


def _resolve_db_path() -> Path:
    if len(sys.argv) > 1:
        return Path(sys.argv[1]).resolve()
    # Derive from the same setting the app uses, so we never migrate the wrong file.
    from sqlalchemy.engine import make_url  # noqa: WPS433 (local import by design)

    from app.config import settings

    url = make_url(settings.database_url)
    if url.get_backend_name() != "sqlite" or not url.database:
        print(f"ERROR: not a SQLite database_url: {settings.database_url!r}")
        sys.exit(1)
    return Path(url.database).resolve()


def _column_exists(conn: sqlite3.Connection, table: str, column: str) -> bool:
    rows = conn.execute(f"PRAGMA table_info({table})").fetchall()
    return any(r[1] == column for r in rows)


def main() -> None:
    db_path = _resolve_db_path()
    if not db_path.exists():
        print(f"ERROR: database file not found: {db_path}")
        sys.exit(1)

    # 1) Back up FIRST, always — even if the migration turns out to be a no-op.
    ts = _dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    backup = db_path.with_name(f"{db_path.stem}.backup-{ts}{db_path.suffix}")
    shutil.copy2(db_path, backup)
    print(f"Backup created: {backup}")

    conn = sqlite3.connect(str(db_path))
    try:
        total = conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
        print(f"users rows: {total}")

        if _column_exists(conn, "users", "role"):
            print("Column 'role' already exists — nothing to do.")
        else:
            conn.execute(
                "ALTER TABLE users "
                f"ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT '{DEFAULT_ROLE}'"
            )
            conn.commit()
            print("Added column 'role' (default 'attendee').")

        # Report the resulting distribution so the operator can eyeball it.
        dist = conn.execute(
            "SELECT role, COUNT(*) FROM users GROUP BY role ORDER BY role"
        ).fetchall()
        print("role distribution:", {role: n for role, n in dist})
    finally:
        conn.close()

    print("Migration complete.")


if __name__ == "__main__":
    main()
