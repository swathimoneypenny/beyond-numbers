# Beyond Numbers — Auth Backend

FastAPI + SQLite + JWT. **Stage 1 of 4: backend foundation only.** No email sending
(Stage 2), no frontend wiring (Stage 3).

## Layout

```
backend/
  app/
    main.py        FastAPI app, CORS, validation-error handler, /api/health
    config.py      Settings from environment / .env
    database.py    SQLAlchemy engine, session, Base, init_db()
    models.py      User + PasswordResetToken tables
    schemas.py     Request/response bodies
    security.py    bcrypt hashing, JWT, reset-token generation + hashing
    email.py       AWS SES sender (password-reset email, plain + HTML)
    ratelimit.py   In-memory sliding-window limiter
    deps.py        get_current_user (Bearer token) and DB session deps
    routes/
      auth.py      /api/auth/signup, /login, /me, /forgot-password, /reset-password
  requirements.txt
  .env.example
  test_reset_flow.py   Runnable end-to-end check of the reset flow (no SES needed)
```

## Run locally (PowerShell)

```powershell
cd c:\SAI\beyond_numbers\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python -c "import secrets; print(secrets.token_urlsafe(48))"   # paste into JWT_SECRET
uvicorn app.main:app --reload --port 8000
```

Interactive docs: http://127.0.0.1:8000/docs (disabled when `ENVIRONMENT=production`).

The SQLite file `beyond_numbers.db` is created automatically on first start.

## Endpoints

| Method | Path                        | Auth   | Success | Errors        |
|--------|-----------------------------|--------|---------|---------------|
| POST   | `/api/auth/signup`          | —      | 201     | 400, 409      |
| POST   | `/api/auth/login`           | —      | 200     | 400, 401      |
| GET    | `/api/auth/me`              | Bearer | 200     | 401           |
| POST   | `/api/auth/forgot-password` | —      | 200     | 400, 429      |
| POST   | `/api/auth/reset-password`  | —      | 200     | 400, 429      |
| GET    | `/api/health`               | —      | 200     | —             |

Login failures return an identical `"Incorrect email or password."` for both an
unknown email and a wrong password, and spend the same CPU either way, so the
endpoint can't be used to discover which addresses are registered.

### Password reset

- `forgot-password` returns the **same** response whether or not the email is
  registered — it never reveals which addresses exist. It's rate-limited per IP
  (`FORGOT_PASSWORD_MAX_PER_WINDOW` per `FORGOT_PASSWORD_WINDOW_SECONDS`).
- Reset tokens are single-use, expire after
  `PASSWORD_RESET_TOKEN_EXPIRE_MINUTES` (default 60), and are stored **hashed**
  (SHA-256) — the raw token only ever exists in the emailed link.
- A successful reset marks the token used and invalidates every other
  outstanding token for that user.
- Outside production, the reset link is also written to the log so the flow is
  testable locally without SES. Run `python test_reset_flow.py` for an
  end-to-end check.

### Email / AWS SES

The reset email is sent via SES (`app/email.py`, boto3). Set `AWS_REGION` and
`SES_SENDER`; boto3 resolves credentials from the EC2 instance role. The email
has both plain-text and HTML parts and states the link expires in 1 hour.

## Production notes (EC2, Stage 4)

- Set a real `JWT_SECRET`. Blank means a random key per restart, invalidating all tokens.
- Set `ENVIRONMENT=production` to disable `/docs`, `/redoc`, and `/openapi.json`.
- Run behind nginx on a path like `/api/` and terminate TLS there; serve with
  `uvicorn app.main:app --host 127.0.0.1 --port 8000` (no `--reload`).
- `CORS_ORIGINS` must list the real site origin — `https://beyond-numbers.com`.

## Deploying the password-reset change (server: /home/ubuntu/bn-auth)

The backend deploys separately from the frontend. From the repo `backend/`:

```powershell
# 1. Copy the changed app + requirements up (excludes .env, .venv, *.db)
$KEY = "C:\Users\AI.SN\Desktop\sAI\moneypenny-key.pem"
scp -i $KEY -r app requirements.txt .env.example README.md ubuntu@3.107.206.82:/home/ubuntu/bn-auth/

# 2. Install boto3 + add env vars + restart (on the server)
ssh -i $KEY ubuntu@3.107.206.82
  cd /home/ubuntu/bn-auth
  ./.venv/bin/pip install -r requirements.txt          # installs boto3
  # append the new vars to .env (see below), then:
  pm2 restart bn-auth
  pm2 logs bn-auth --lines 40                           # watch startup + SES sends
```

The new `password_reset_tokens` table is created automatically on startup by
`init_db()` — no migration step.

### Environment variables to add to the server's `.env`

```
FRONTEND_BASE_URL=https://beyond-numbers.com
AWS_REGION=ap-southeast-2
SES_SENDER=noreply@beyond-numbers.com
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=60
FORGOT_PASSWORD_MAX_PER_WINDOW=5
FORGOT_PASSWORD_WINDOW_SECONDS=900
```

No AWS keys go in `.env` — see IAM below.

### IAM (EC2 → SES)

Preferred: attach an **IAM role** to the EC2 instance; boto3 picks it up with no
keys in `.env`.

1. IAM → Roles → Create role → trusted entity **AWS service → EC2**.
2. Attach a policy with SES send permission:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": ["ses:SendEmail", "ses:SendRawEmail"],
       "Resource": "*"
     }]
   }
   ```
3. EC2 → the instance → Actions → Security → **Modify IAM role** → attach it.
4. `pm2 restart bn-auth`. No restart of the instance needed.

Fallback (only if you can't use a role): create an IAM user with the same policy
and set `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` in the environment.

While SES is in **sandbox**, it only delivers to verified addresses — verify a
test recipient in the SES console, or request production access.

## Stage 2 hook

`signup` already generates and stores a `verification_token` and sets
`is_verified = True` so accounts work today. Stage 2 flips the default to `False`,
emails the token, and adds the confirm endpoint — no schema change needed.
