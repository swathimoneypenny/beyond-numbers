import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, Loader2, MailCheck } from 'lucide-react'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import ParticleBackground from '../components/ParticleBackground'
import { forgotPassword } from '../lib/auth'
import { BrandPanel, Field, FormError, validateEmail } from '../components/authUI'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (busy) return
    const err = validateEmail(email)
    if (err) {
      setFieldError(err)
      return
    }
    setFieldError('')
    setBusy(true)
    try {
      await forgotPassword(email.trim())
      setDone(true)
    } catch (err) {
      setFormError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto grid min-h-[88vh] max-w-[1240px] items-stretch gap-0 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-16">
      {/* Brand panel */}
      <Reveal className="relative hidden overflow-hidden rounded-3xl bg-cta-gradient p-12 lg:flex lg:flex-col lg:justify-between">
        <ParticleBackground count={1200} />
        <BrandPanel
          eyebrow="Account access"
          title="Forgot your password?"
          blurb="Enter your email and we’ll send you a secure link to set a new one."
        />
      </Reveal>

      {/* Form */}
      <Reveal className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md">
          <Logo variant="horizontal" className="mb-10 h-8 w-auto lg:hidden" />

          {done ? (
            <div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                <MailCheck size={26} strokeWidth={1.9} />
              </span>
              <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Check your email
              </h1>
              {/* Deliberately does not confirm whether the address is registered. */}
              <p className="mt-4 text-ink/60">
                If an account exists for <span className="font-semibold text-ink">{email.trim()}</span>,
                we’ve sent a link to reset your password. It expires in 1 hour.
              </p>
              <p className="mt-3 text-sm text-ink/55">
                Didn’t get it? Check your spam folder, or{' '}
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="font-semibold text-teal hover:underline"
                >
                  try again
                </button>
                .
              </p>
              <Link
                to="/login"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-teal"
              >
                <ArrowRight size={16} className="rotate-180" />
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Reset your password
              </h1>
              <p className="mt-3 text-ink/60">
                Enter the email for your account and we’ll send a reset link.
              </p>

              <FormError>{formError}</FormError>

              <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@firm.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={fieldError}
                  disabled={busy}
                  autoComplete="email"
                />

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-premium group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white shadow-lg shadow-navy/20 transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-navy"
                >
                  {busy ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-sm text-ink/60">
                Remembered it?{' '}
                <Link to="/login" className="font-semibold text-navy hover:text-teal">
                  Back to sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </Reveal>
    </section>
  )
}
