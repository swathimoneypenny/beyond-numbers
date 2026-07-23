import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { AFTER_AUTH_REDIRECT } from '../lib/authRoutes'
import {
  BrandPanel,
  Field,
  FormError,
  MIN_PASSWORD,
  validateEmail,
  validatePassword,
} from '../components/authUI'

export default function Signup() {
  const { signup, isAuthenticated, booting } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!booting && isAuthenticated) return <Navigate to={AFTER_AUTH_REDIRECT} replace />

  const validate = () => {
    const errs = {}
    const e = validateEmail(email)
    if (e) errs.email = e
    const p = validatePassword(password)
    if (p) errs.password = p
    if (!confirm) errs.confirm = 'Re-enter your password.'
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
      await signup(email.trim(), password)
      navigate(AFTER_AUTH_REDIRECT, { replace: true })
    } catch (err) {
      // 409 means the email is taken - surface it on the field it belongs to.
      if (err?.status === 409) {
        setFieldErrors((prev) => ({
          ...prev,
          email: 'An account with that email already exists.',
        }))
        setFormError('That email is already registered. Try signing in instead.')
      } else {
        setFormError(err?.message || 'Could not create your account. Please try again.')
      }
      setPassword('')
      setConfirm('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto grid min-h-[88vh] max-w-[1240px] items-stretch gap-0 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-16">
      {/* Brand panel */}
      <Reveal className="relative hidden overflow-hidden rounded-3xl bg-cta-gradient p-12 lg:flex lg:flex-col lg:justify-between">
        <BrandPanel
          eyebrow="Create your account"
          title="Join Beyond Numbers."
          blurb="Create an account to access your workshop materials, checklists, and your firm’s 90-day roadmap."
        />
      </Reveal>

      {/* Form */}
      <Reveal className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md">
          <Logo variant="horizontal" className="mb-10 h-8 w-auto lg:hidden" />

          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Sign up
          </h1>
          <p className="mt-3 text-ink/60">Create your Beyond Numbers account.</p>

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
              error={fieldErrors.email}
              disabled={busy}
              autoComplete="email"
            />

            <Field
              id="password"
              label="Password"
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
              <p className="-mt-3 text-sm text-ink/50">
                At least {MIN_PASSWORD} characters.
              </p>
            )}

            <Field
              id="confirm"
              label="Confirm password"
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
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-ink/60">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-navy hover:text-teal">
              Sign in
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  )
}
