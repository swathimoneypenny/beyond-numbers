import { AlertCircle } from 'lucide-react'

/* Shared bits for the Sign in / Sign up pages so the two stay identical.
   Styling is lifted verbatim from the original login page. */

export const FIELD_CLS =
  'w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-navy/40 focus:ring-4 focus:ring-navy/10 disabled:cursor-not-allowed disabled:opacity-60'

export const FIELD_ERR_CLS =
  'w-full rounded-xl border border-[#d6453b]/70 bg-white py-3 pl-11 pr-4 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-[#d6453b] focus:ring-4 focus:ring-[#d6453b]/10 disabled:cursor-not-allowed disabled:opacity-60'

/* Labelled input with a leading icon and per-field validation message. */
export function Field({ id, label, type, placeholder, icon: Icon, value, onChange, error, disabled, autoComplete, right }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-semibold text-ink">
          {label}
        </label>
        {right}
      </div>
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
        />
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={error ? FIELD_ERR_CLS : FIELD_CLS}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-[#b23a30]">
          {error}
        </p>
      )}
    </div>
  )
}

/* Server-side / form-level error banner. */
export function FormError({ children }) {
  if (!children) return null
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mt-6 flex items-start gap-3 rounded-xl border border-[#d6453b]/40 bg-[#d6453b]/[0.07] px-4 py-3"
    >
      <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#b23a30]" />
      <p className="text-sm font-medium text-[#b23a30]">{children}</p>
    </div>
  )
}

/* Left-hand brand panel — same gradient/blur treatment on both auth pages. */
export function BrandPanel({ eyebrow, title, blurb }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-16 h-72 w-72 rounded-full bg-yellow/25 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-teal/30 blur-3xl" />
      </div>
      <div className="relative z-10">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
          {eyebrow}
        </span>
        <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white">
          {title}
        </h2>
        <p className="mt-5 max-w-sm text-white/65">{blurb}</p>
      </div>
      <p className="relative z-10 font-display text-lg italic text-white/70">
        “It’s not just the numbers.”
      </p>
    </>
  )
}

/* Shared client-side validation. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const MIN_PASSWORD = 8

export function validateEmail(email) {
  const v = email.trim()
  if (!v) return 'Enter your email address.'
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address.'
  return null
}

export function validatePassword(password, { min = MIN_PASSWORD } = {}) {
  if (!password) return 'Enter your password.'
  if (password.length < min) return `Password must be at least ${min} characters.`
  return null
}
