import { Quote, Lightbulb, Sparkles, ExternalLink, ArrowDown } from 'lucide-react'
import Reveal from './Reveal'
import ExerciseEmbed from './ExerciseEmbed'

/* Shared building blocks for the long-form session pages (Session 1, 2, 3…). */

export const INK = 'text-[#1A1A1A]' // strong near-black body text on light cards

/* Anchor ids for the exercise sections, shared by the jump bar and the Bands. */
export const EXERCISE_ANCHORS = ['exercise-1', 'exercise-2']

/* Slim "jump to exercise" strip that sits directly under the session header, so
   the hands-on parts are reachable without scrolling the whole session.
   Smooth scrolling comes from `html { scroll-behavior: smooth }` in index.css,
   and `[id] { scroll-margin-top: 100px }` clears the fixed navbar.

   Deliberately has no <h2>, so SectionProgress does not pick it up as a section. */
export function ExerciseJumpBar({ count = 2 }) {
  const single = count === 1
  const items = single
    ? [{ id: EXERCISE_ANCHORS[0], label: 'Jump to Exercise' }]
    : Array.from({ length: count }, (_, i) => ({
        id: EXERCISE_ANCHORS[i],
        label: `Exercise ${i + 1}`,
      }))

  return (
    <section aria-label="Jump to exercises" className="border-b border-line bg-cream">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4 sm:px-8">
        <span className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-navy/55">
          Hands-on
        </span>
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-white px-4 py-1.5 text-sm font-semibold text-teal transition-all hover:-translate-y-0.5 hover:border-teal/60 hover:bg-teal/[0.06]"
          >
            {it.label}
            <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </a>
        ))}
      </div>
    </section>
  )
}

export function Band({ bg = 'white', children, id, glow = false }) {
  const map = {
    white: 'bg-white',
    sand: 'bg-sand',
    dark: 'bg-hero-dark text-white',
    deep: 'bg-navy-deep text-white',
  }
  return (
    <section id={id} className={`relative overflow-hidden py-16 sm:py-24 ${map[bg]}`}>
      {glow && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-purple/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-teal/15 blur-3xl" />
        </div>
      )}
      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function Head({ title, subtitle, tone = 'light' }) {
  return (
    <Reveal>
      <h2
        className={`font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight sm:text-[2.4rem] ${
          tone === 'dark' ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      <div className="mt-4 flex items-center gap-1.5">
        <span className="h-1.5 w-12 rounded-full bg-yellow" />
        <span className="h-1.5 w-7 rounded-full bg-teal" />
      </div>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-lg font-medium leading-relaxed ${
            tone === 'dark' ? 'text-white/75' : INK
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

export function Callout({ children, icon: Icon = Lightbulb }) {
  return (
    <Reveal>
      <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-yellow/40 bg-yellow/[0.14] p-5 sm:p-6">
        <Icon size={20} className="mt-0.5 shrink-0 text-[#8a6a00]" />
        <p className={`text-[1.02rem] font-semibold leading-relaxed ${INK}`}>{children}</p>
      </div>
    </Reveal>
  )
}

export function PullQuote({ children, cite }) {
  return (
    <Reveal>
      <figure className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-hero-dark p-8 text-center shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] sm:p-12">
        <Quote className="mx-auto mb-4 text-yellow" size={32} />
        <blockquote className="font-display text-xl font-semibold italic leading-snug text-white sm:text-2xl">
          {children}
        </blockquote>
        {cite && <figcaption className="mt-4 text-sm font-semibold text-white/60">{cite}</figcaption>}
        <div className="mx-auto mt-6 flex w-fit items-center gap-1.5">
          <span className="h-1 w-10 rounded-full bg-yellow" />
          <span className="h-1 w-5 rounded-full bg-teal" />
        </div>
      </figure>
    </Reveal>
  )
}

/* Exercise callout (teal-accented). Pass `embedId` to mount the live interactive
   exercise, or `comingSoon` to show a placeholder. */
export function ExerciseCard({ data, embedId, comingSoon = false }) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-3xl border border-teal/30 bg-white shadow-[0_24px_60px_-30px_rgba(61,15,82,0.35)]">
        <div className="bg-teal/[0.08] px-7 py-6 sm:px-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            <Sparkles size={14} />
            {data.tag}
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-navy sm:text-3xl">{data.title}</h2>
          <p className={`mt-2 font-medium ${INK}`}>{data.lead}</p>
          {data.link && (
            <a
              href={`https://${data.link}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
            >
              <ExternalLink size={14} />
              {data.link}
            </a>
          )}
        </div>

        <div className="grid gap-4 p-7 sm:grid-cols-3 sm:p-9">
          {data.steps.map((s, i) => (
            <div key={s.k} className="rounded-2xl border border-line bg-cream p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-navy">0{i + 1}</span>
                <span className="rounded-full bg-navy px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white">
                  {s.time}
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-navy">{s.k}</h3>
              <p className={`mt-1.5 text-[0.9rem] leading-relaxed ${INK}`}>{s.v}</p>
            </div>
          ))}
        </div>

        {data.note && (
          <div className="mx-7 mb-7 rounded-xl border border-yellow/40 bg-yellow/[0.14] px-5 py-4 sm:mx-9 sm:mb-9">
            <p className={`text-[0.92rem] font-semibold leading-relaxed ${INK}`}>{data.note}</p>
          </div>
        )}

        {embedId && (
          <div className="px-7 pb-9 sm:px-9">
            <ExerciseEmbed exerciseId={embedId} title={data.title} />
          </div>
        )}

        {comingSoon && (
          <div className="mx-7 mb-9 flex items-center justify-center rounded-2xl border-2 border-dashed border-teal/40 bg-teal/[0.05] px-6 py-12 text-center sm:mx-9">
            <span className="text-sm font-semibold text-teal">Interactive exercise coming soon</span>
          </div>
        )}
      </div>
    </Reveal>
  )
}
