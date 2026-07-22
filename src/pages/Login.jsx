import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'

export default function Login() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="mx-auto grid min-h-[88vh] max-w-[1240px] items-stretch gap-0 px-5 py-28 sm:px-8 lg:grid-cols-2 lg:gap-16">
      {/* Brand panel */}
      <Reveal className="relative hidden overflow-hidden rounded-3xl bg-cta-gradient p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-16 h-72 w-72 rounded-full bg-yellow/25 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-teal/30 blur-3xl" />
        </div>
        <div className="relative">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Member access
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white">
            Welcome back to Beyond Numbers.
          </h2>
          <p className="mt-5 max-w-sm text-white/65">
            Sign in to access your workshop materials, checklists, and your firm’s 90-day roadmap.
          </p>
        </div>
        <p className="relative font-display text-lg italic text-white/70">
          “It’s not just the numbers.”
        </p>
      </Reveal>

      {/* Form */}
      <Reveal className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-md">
          <Logo variant="horizontal" className="mb-10 h-8 w-auto lg:hidden" />

          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Sign in
          </h1>
          <p className="mt-3 text-ink/60">
            Enter your details to access your account.
          </p>

          {submitted && (
            <div className="mt-6 rounded-xl border border-teal/30 bg-sand px-4 py-3 text-sm font-medium text-teal-deep">
              This is a demo — authentication isn’t wired up yet.
            </div>
          )}

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="you@firm.com"
                  className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-navy/40 focus:ring-4 focus:ring-navy/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-ink">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-teal hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
                />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-navy/40 focus:ring-4 focus:ring-navy/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:bg-navy-deep"
            >
              Sign in
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-8 text-sm text-ink/60">
            Don’t have an account?{' '}
            <Link to="/contact" className="font-semibold text-navy hover:text-teal">
              Get in touch
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  )
}
