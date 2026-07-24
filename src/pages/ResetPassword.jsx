import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import ParticleBackground from '../components/ParticleBackground'
import { resetPassword } from '../lib/auth'
import { BrandPanel, Field, FormError, MIN_PASSWORD, validatePassword } from '../components/authUI'

export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)
  // A token that the backend rejected as invalid/expired (distinct from a
  // generic error, so we can point the user at requesting a new link).
  const [tokenDead, setTokenDead] = useState(false)

  const validate = () => {
    const errs = {}
    const p = validatePassword(password)
    if (p) errs.password = p
    if (!confirm) errs.confirm = 'Re-enter your new password.'
    else if (password !== confirm) errs.confirm = 'Passwords do not match.'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (busy) return
    if (!validate()) return

    setBusy(true)
    try {
      await resetPassword(token, password)
      navigate('/login', {
        replace: true,
        state: { notice: 'Your password has been reset. Please sign in.' },
      })
    } catch (err) {
      // 400 = invalid/expired token; show the dedicated recovery screen.
      if (err?.status === 400) {
        setTokenDead(true)
      } else {
        setFormError(err?.message || 'Could not reset your password. Please try again.')
      }
      setPassword('')
      setConfirm('')
    } finally {
      setBusy(false)
    }
  }

  // No token in the URL, or the backend rejected it → recovery screen.
  const showDeadToken = !token || tokenDead

  return (
    <section className="mx-auto grid min-h-[88vh] max-w-[1240px] items-stretch gap-0 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-16">
      {/* Brand panel */}
      <Reveal className="relative hidden overflow-hidden rounded-3xl bg-cta-gradient p-12 lg:flex lg:flex-col lg:justify-between">
        <ParticleBackground count={1200} />
        <BrandPanel
          eyebrow="Account access"
          title="Set a new password."
          blurb="Choose a strong password you don’t use anywhere else. Your reset link is valid for one hour."
        />
      </Reveal>

      {/* Form */}
      <Reveal className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md">
          <Logo variant="horizontal" className="mb-10 h-8 w-auto lg:hidden" />

          {showDeadToken ? (
            <div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d6453b]/10 text-[#b23a30]">
                <AlertCircle size={26} strokeWidth={1.9} />
              </span>
              <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                This link isn’t valid
              </h1>
              <p className="mt-4 text-ink/60">
                This password reset link is invalid or has expired. Reset links can only be
                used once and last for 1 hour.
              </p>
              <Link
                to="/forgot-password"
                className="btn-premium group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white shadow-lg shadow-navy/20 transition-colors hover:bg-navy-deep"
              >
                Request a new link
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-8 text-sm text-ink/60">
                <Link to="/login" className="font-semibold text-navy hover:text-teal">
                  Back to sign in
                </Link>
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Choose a new password
              </h1>
              <p className="mt-3 text-ink/60">Enter and confirm your new password below.</p>

              <FormError>{formError}</FormError>

              <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
                <Field
                  id="password"
                  label="New password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={fieldErrors.password}
                  disabled={busy}
                  autoComplete="new-password"
                />
                {!fieldErrors.password && (
                  <p className="-mt-3 text-sm text-ink/50">At least {MIN_PASSWORD} characters.</p>
                )}

                <Field
                  id="confirm"
                  label="Confirm new password"
                  type="password"
                  placeholder="••••••••"
                  icon={ShieldCheck}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  error={fieldErrors.confirm}
                  disabled={busy}
                  autoComplete="new-password"
                />

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-premium group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white shadow-lg shadow-navy/20 transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-navy"
                >
                  {busy ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Resetting…
                    </>
                  ) : (
                    <>
                      Reset password
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-sm text-ink/60">
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
