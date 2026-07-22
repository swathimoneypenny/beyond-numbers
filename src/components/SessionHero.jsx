import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, PencilRuler, Presentation } from 'lucide-react'
import Reveal from './Reveal'

const metaIcons = [Clock, PencilRuler, Presentation]

/* Shared dark-purple session header: back link, eyebrow, title, subtitle, meta row.
   Each block uses the shared Reveal so the header pops in (and replays) exactly
   like the rest of the site. */
export default function SessionHero({ session, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-purple/25 blur-3xl" />
        <div className="absolute -left-40 top-44 h-[28rem] w-[28rem] rounded-full bg-teal/12 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[900px] px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <Reveal>
          <Link
            to="/workshops"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to all sessions
          </Link>
        </Reveal>

        <Reveal className="mt-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-yellow backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Session {session.number}
          </span>
        </Reveal>

        <Reveal
          as="h1"
          className="mt-6 font-display text-[2.4rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl"
        >
          {session.title}
        </Reveal>
        <Reveal as="p" className="mt-4 max-w-2xl text-lg italic text-white/65">
          {subtitle || session.subtitle}
        </Reveal>

        <Reveal className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
          {session.meta.map((m, i) => {
            const Icon = metaIcons[i] || Clock
            return (
              <span key={m} className="flex items-center gap-2 text-sm font-medium text-white/70">
                <Icon size={16} className="text-teal" />
                {m}
              </span>
            )
          })}
        </Reveal>

        {children && <Reveal>{children}</Reveal>}
      </div>
    </section>
  )
}
