import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, Sparkles, Lock, ArrowRight, ListChecks, Loader2 } from 'lucide-react'
import SessionHero from '../components/SessionHero'
import Reveal from '../components/Reveal'
import { INK, Band, Head, Callout } from '../components/sessionUI'
import { useAuth } from '../context/AuthContext'
import { getSession } from '../data/sessions'
import { getSessionOverview } from '../data/sessionOverviews'
import NotFound from './NotFound'

/* Public, marketing-style overview for a single session. Built entirely from
   existing session data (see sessionOverviews.js). Sits between the Workshops
   tiles and the protected full session content. */
export default function SessionOverview() {
  const { slug } = useParams()
  const session = getSession(slug)
  const overview = getSessionOverview(slug)
  const { isAuthenticated, booting } = useAuth()

  // Unknown slug → 404 (keeps /workshops/<anything-else> honest).
  if (!session || !overview) return <NotFound />

  const contentPath = `/workshops/${slug}/content`

  // Wait for the session to finish restoring before deciding, so a returning
  // signed-in user never flashes the overview on reload.
  if (booting) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-teal">
        <Loader2 size={26} className="animate-spin" />
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  // Signed-in users skip the overview and go straight to the full content.
  if (isAuthenticated) return <Navigate to={contentPath} replace />

  // From here down the visitor is signed out — the public marketing overview.
  return (
    <>
      {/* Header — number, title, guiding question, meta (from sessions.js) */}
      <SessionHero session={session}>
        {overview.tagline && (
          <p className="mt-7 max-w-xl rounded-2xl border border-yellow/30 bg-yellow/10 px-5 py-3 font-display text-base font-semibold italic text-yellow">
            “{overview.tagline}”
          </p>
        )}
      </SessionHero>

      {/* Objectives — only sessions that actually define them */}
      {overview.objectives?.length > 0 && (
        <Band bg="sand">
          <Head title="What you’ll achieve" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {overview.objectives.map((o) => (
              <Reveal key={o.k}>
                <article className="flex h-full gap-4 rounded-2xl border border-line bg-white p-6">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal/12 text-teal">
                    <Check size={17} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">{o.k}</h3>
                    <p className={`mt-1.5 text-[0.95rem] leading-relaxed ${INK}`}>{o.v}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Band>
      )}

      {/* What's covered — section headings as topic chips */}
      <Band bg={overview.objectives?.length > 0 ? 'white' : 'sand'}>
        <Head
          title="What’s covered"
          subtitle="The ground this working session moves through."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {overview.topics.map((t, i) => (
            <Reveal key={t} delay={Math.min(i * 0.05, 0.3)}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-cream p-4">
                <ListChecks size={17} className="mt-0.5 shrink-0 text-teal" />
                <span className={`text-[0.95rem] leading-snug ${INK}`}>{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Exercises — what you'll actually do */}
      <Band bg={overview.objectives?.length > 0 ? 'sand' : 'white'}>
        <Head
          title="Hands-on exercises"
          subtitle="Two interactive exercises you complete during the session."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {overview.exercises.map((ex) => (
            <Reveal key={ex.title}>
              <article className="flex h-full flex-col rounded-3xl border border-teal/30 bg-white p-7 shadow-[0_18px_44px_-30px_rgba(61,15,82,0.35)] sm:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  <Sparkles size={14} />
                  {ex.tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{ex.title}</h3>
                {ex.desc && (
                  <p className={`mt-2.5 text-[0.97rem] leading-relaxed ${INK}`}>{ex.desc}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* CTA — auth aware. While the session is being restored, show a neutral
          state so returning signed-in users don't see a "sign in" flash. */}
      <Band bg="deep" glow>
        {/* Signed-out CTA only — signed-in users are redirected above and never
            render this page. */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-yellow">
            <Lock size={13} />
            Registered attendees
          </span>
          <h2 className="mt-6 font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.4rem]">
            Sign in to view this session.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            The full slides and interactive exercises are available to registered
            attendees. Sign in to pick up where this overview leaves off.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              state={{
                from: { pathname: contentPath },
                notice: 'Please sign in to access the session content.',
              }}
              className="btn-premium group inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal/30 transition-colors hover:bg-teal-deep"
            >
              Sign in to view this session
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-semibold text-yellow hover:underline">
              Sign up
            </Link>
          </p>
        </Reveal>
      </Band>

      {/* Back to all sessions */}
      <section className="border-t border-line bg-white py-10">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <Link
            to="/workshops"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            <ArrowRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
            All sessions
          </Link>
        </div>
      </section>
    </>
  )
}
