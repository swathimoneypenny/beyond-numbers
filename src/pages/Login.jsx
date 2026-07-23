import { useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import ParticleBackground from '../components/ParticleBackground'
import { useAuth } from '../context/AuthContext'
import { AFTER_AUTH_REDIRECT } from '../lib/authRoutes'
import { BrandPanel, Field, FormError, validateEmail } from '../components/authUI'

export default function Login() {
  const { login, isAuthenticated, booting } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  // Where to land after a successful sign-in (honours a redirect origin).
  const dest = location.state?.from?.pathname ?? AFTER_AUTH_REDIRECT
  // Optional message from a protected route that redirected here.
  const notice = location.state?.notice

  if (!booting && isAuthenticated) return <Navigate to={dest} replace />

  const validate = () => {
    const errs = {}
    const e = validateEmail(email)
    if (e) errs.email = e
    if (!password) errs.password = 'Enter your password.'
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
      await login(email.trim(), password)
      navigate(dest, { replace: true })
    } catch (err) {
      setFormError(err?.message || 'Could not sign you in. Please try again.')
      setPassword('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto grid min-h-[88vh] max-w-[1240px] items-stretch gap-0 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-16">
      {/* Brand panel — particles contained strictly inside this card via the
          card's own overflow-hidden; the form side stays clean. BrandPanel's
          content carries z-10 so it sits above the particle layer. */}
      <Reveal className="relative hidden overflow-hidden rounded-3xl bg-cta-gradient p-12 lg:flex lg:flex-col lg:justify-between">
        <ParticleBackground count={1200} />
        <BrandPanel
          eyebrow="Member access"
          title="Welcome back to Beyond Numbers."
          blurb="Sign in to access your workshop materials, checklists, and your firm’s 90-day roadmap."
        />
      </Reveal>

      {/* Form */}
      <Reveal className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md">
          <Logo variant="horizontal" className="mb-10 h-8 w-auto lg:hidden" />

          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Sign in
          </h1>
          <p className="mt-3 text-ink/60">Enter your details to access your account.</p>

          {/* Shown when a protected route (e.g. the workshop content) sent the
              user here to sign in first. */}
          {notice && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal/30 bg-teal/[0.08] px-4 py-3">
              <Lock size={18} className="mt-0.5 shrink-0 text-teal" />
              <p className="text-sm font-medium text-teal-deep">{notice}</p>
            </div>
          )}

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
              autoComplete="current-password"
              right={
                <a href="#" className="text-sm font-medium text-teal hover:underline">
                  Forgot?
                </a>
              }
            />

            <button
              type="submit"
              disabled={busy}
              className="btn-premium group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white shadow-lg shadow-navy/20 transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-navy"
            >
              {busy ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-ink/60">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-semibold text-navy hover:text-teal">
              Sign up today!
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  )
}
