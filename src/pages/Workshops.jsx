import { Clock, PencilRuler } from 'lucide-react'
import Reveal from '../components/Reveal'
import CTABand from '../components/CTABand'
import SessionSchedule from '../components/SessionSchedule'
import { sessions } from '../data/sessions'
import { REGISTER_URL } from '../data/content'

const metaIcons = [Clock, PencilRuler]

function SessionCard({ session, index }) {
  const isComingSoon = session.comingSoon
  return (
    <Reveal delay={Math.min(index * 0.08, 0.3)}>
      <article
        className={`group relative flex h-full flex-col rounded-2xl border bg-white p-7 transition-all duration-300 ${
          isComingSoon
            ? 'border-line opacity-75'
            : 'border-line shadow-[0_14px_34px_-18px_rgba(61,15,82,0.3)] hover:-translate-y-2 hover:border-teal/40 hover:shadow-[0_36px_60px_-28px_rgba(61,15,82,0.45)]'
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl font-display text-lg font-bold ${
              isComingSoon ? 'bg-sand text-ink/40' : 'bg-navy text-white'
            }`}
          >
            {session.number}
          </span>
          {isComingSoon && (
            <span className="rounded-full border border-yellow/50 bg-yellow/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-navy">
              Coming soon
            </span>
          )}
        </div>

        <h3 className="font-display text-xl font-bold leading-snug text-navy">{session.title}</h3>
        <p className="mt-1.5 text-[0.95rem] italic text-ink/55">{session.subtitle}</p>
        <p className="mt-3.5 text-[0.92rem] leading-relaxed text-ink/65">{session.description}</p>

        {/* meta row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-4">
          {session.meta.map((m, i) => {
            const Icon = metaIcons[i] || Clock
            return (
              <span key={m} className="flex items-center gap-1.5 text-xs font-medium text-ink/55">
                <Icon size={14} className="text-teal" />
                {m}
              </span>
            )
          })}
        </div>
      </article>
    </Reveal>
  )
}

export default function Workshops() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-hero-dark text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-purple/25 blur-3xl" />
          <div className="absolute -left-40 top-40 h-[28rem] w-[28rem] rounded-full bg-teal/12 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-yellow backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              Workshop Series
            </span>
            <h1 className="mt-6 font-display text-[2.7rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl">
              From Scorekeeper to Strategist
            </h1>
            <div className="mt-5 flex items-center gap-1.5">
              <span className="h-1.5 w-16 rounded-full bg-yellow" />
              <span className="h-1.5 w-9 rounded-full bg-teal" />
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
              A practical 4-part workshop series helping accounting firm owners move beyond
              compliance work and build a more intentional, scalable, advisory-focused practice. Four
              90-minute working sessions, each with hands-on exercises.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Session cards ===== */}
      <section id="sessions" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sessions.map((s, i) => (
              <SessionCard key={s.slug} session={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Schedule + CPE ===== */}
      <SessionSchedule />

      {/* ===== CTA ===== */}
      <CTABand
        title="Ready to transform your practice?"
        subtitle="Register for the series and leave with a sequenced 90-day plan you can put to work."
        primary={{ label: 'Register Now', href: REGISTER_URL, newTab: true }}
        note="Sessions begin August 5, 2025"
      />
    </>
  )
}
