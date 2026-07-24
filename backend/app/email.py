"""Transactional email via AWS SES (boto3).

Sends the password-reset email. boto3 resolves AWS credentials automatically —
on EC2 that's the attached instance role; locally it's the usual env vars /
shared config. The region and sender come from settings.

Design notes:
- boto3 is imported lazily so the app still imports if the package or AWS
  credentials aren't present (e.g. a fresh local checkout). A send simply
  fails gracefully in that case.
- Outside production we also log the reset link, so the flow is testable
  locally without a working mailbox or SES sandbox access. The link is never
  logged in production.
"""

import logging

from .config import settings

logger = logging.getLogger("bn.email")

SUBJECT = "Reset your Beyond Numbers password"


def _plain_body(reset_link: str) -> str:
    return (
        "Hi,\n\n"
        "We received a request to reset the password for your Beyond Numbers "
        "account.\n\n"
        "Reset your password using the link below (it expires in 1 hour):\n"
        f"{reset_link}\n\n"
        "If you didn't request this, you can safely ignore this email — your "
        "password won't change.\n\n"
        "— The Beyond Numbers team\n"
    )


def _html_body(reset_link: str) -> str:
    return f"""\
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f2f0f6;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#251d2b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f0f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(31,12,46,0.08);">
            <tr>
              <td style="height:6px;background:linear-gradient(90deg,#f5c400,#25a88c,#8a1fb0);"></td>
            </tr>
            <tr>
              <td style="padding:36px 36px 8px;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8a1fb0;">Beyond Numbers</p>
                <h1 style="margin:12px 0 0;font-size:24px;line-height:1.25;color:#4a146b;">Reset your password</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 36px 0;font-size:15px;line-height:1.65;color:#3a3340;">
                <p style="margin:0 0 16px;">We received a request to reset the password for your Beyond Numbers account.</p>
                <p style="margin:0 0 24px;">Click the button below to choose a new password. This link expires in <strong>1 hour</strong>.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:4px 36px 8px;">
                <a href="{reset_link}" style="display:inline-block;background:#25a88c;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">Reset my password</a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 36px 0;font-size:13px;line-height:1.6;color:#6b6472;">
                <p style="margin:0 0 8px;">Or paste this link into your browser:</p>
                <p style="margin:0 0 20px;word-break:break-all;"><a href="{reset_link}" style="color:#25a88c;">{reset_link}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 32px;border-top:1px solid #e7e3ee;">
                <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#6b6472;">
                  If you didn't request a password reset, you can safely ignore this email — your password won't change.
                </p>
                <p style="margin:16px 0 0;font-size:13px;color:#9a93a3;">— The Beyond Numbers team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
"""


def send_password_reset_email(to_email: str, reset_link: str) -> bool:
    """Send the reset email. Returns True if SES accepted it, False otherwise.

    Never raises — the caller returns the same response either way so failures
    don't leak which addresses are registered.
    """
    if not settings.is_production:
        # Dev affordance: surface the link so the flow is testable without SES.
        logger.info("Password reset link for %s: %s", to_email, reset_link)

    try:
        import boto3  # lazy — keeps the app importable without boto3/creds
        from botocore.exceptions import BotoCoreError, ClientError
    except ImportError:
        logger.warning("boto3 not installed; skipping SES send to %s", to_email)
        return False

    try:
        client = boto3.client("ses", region_name=settings.aws_region)
        client.send_email(
            Source=settings.ses_sender,
            Destination={"ToAddresses": [to_email]},
            Message={
                "Subject": {"Data": SUBJECT, "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": _plain_body(reset_link), "Charset": "UTF-8"},
                    "Html": {"Data": _html_body(reset_link), "Charset": "UTF-8"},
                },
            },
        )
        logger.info("Sent password reset email to %s", to_email)
        return True
    except (BotoCoreError, ClientError) as exc:
        # Sandbox rejection, throttling, bad creds, etc. Log for ops; the caller
        # still returns a generic success so nothing leaks to the client.
        logger.error("SES send to %s failed: %s", to_email, exc)
        return False
