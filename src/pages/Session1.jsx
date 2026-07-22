import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
  Quote,
  Sparkles,
  Lightbulb,
  Cpu,
  Brain,
  ExternalLink,
  Target,
  Users,
  Handshake,
} from 'lucide-react'
import SessionHero from '../components/SessionHero'
import SectionProgress from '../components/SectionProgress'
import Reveal from '../components/Reveal'
import ExerciseEmbed from '../components/ExerciseEmbed'
import { getSession } from '../data/sessions'
import { session1 as c } from '../data/session1'

const session = getSession('session-1')
const INK = 'text-[#1A1A1A]' // strong near-black body text on light cards

/* ── shared bits ─────────────────────────────────────────── */
function Band({ bg = 'white', children, id, glow = false }) {
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

function Head({ title, subtitle, tone = 'light' }) {
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

function Callout({ children, icon: Icon = Lightbulb }) {
  return (
    <Reveal>
      <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-yellow/40 bg-yellow/[0.14] p-5 sm:p-6">
        <Icon size={20} className="mt-0.5 shrink-0 text-[#8a6a00]" />
        <p className={`text-[1.02rem] font-semibold leading-relaxed ${INK}`}>{children}</p>
      </div>
    </Reveal>
  )
}

function PullQuote({ children }) {
  return (
    <Reveal>
      <figure className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-hero-dark p-8 text-center shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] sm:p-12">
        <Quote className="mx-auto mb-4 text-yellow" size={32} />
        <blockquote className="font-display text-xl font-semibold italic leading-snug text-white sm:text-2xl">
          {children}
        </blockquote>
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
function ExerciseCard({ data, embedId, comingSoon = false }) {
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

/* Operator/Steward/Catalyst/Strategist detail card (sections 5 & 6). */
function QuadrantDetail({ item, tone }) {
  return (
    <Reveal>
      <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
        <h3 className="font-display text-xl font-bold tracking-wide text-navy">{item.name}</h3>
        <p className={`mt-2 font-medium ${INK}`}>{item.text}</p>
        <p className="mt-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy/60">
          Examples
        </p>
        <ul className="mt-3 space-y-2.5">
          {item.examples.map((ex) => (
            <li key={ex} className={`flex items-start gap-2.5 text-[0.95rem] ${INK}`}>
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
              {ex}
            </li>
          ))}
        </ul>
        {item.warn && (
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#d6453b]/12 px-3.5 py-1.5 text-xs font-bold text-[#b23a30]">
            <AlertTriangle size={13} />
            {item.warn}
          </span>
        )}
        {item.good && (
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-teal/14 px-3.5 py-1.5 text-xs font-bold text-teal">
            <Check size={14} strokeWidth={3} />
            {item.good}
          </span>
        )}
      </article>
    </Reveal>
  )
}

export default function Session1() {
  return (
    <>
      <SectionProgress />

      {/* Header */}
      <SessionHero session={session}>
        <p className="mt-7 inline-flex rounded-full border border-yellow/30 bg-yellow/10 px-4 py-2 font-display text-base font-semibold italic text-yellow">
          {c.tagline}
        </p>
      </SessionHero>

      {/* 1 — The day everything changed */}
      <Band bg="sand">
        <Head title={c.changed.eyebrow} subtitle={c.changed.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.changed.cards.map((card, i) => (
            <Reveal key={card.year} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_14px_34px_-20px_rgba(61,15,82,0.3)]">
                <span className="font-display text-4xl font-bold text-navy">{card.year}</span>
                <p className="mt-3 font-display text-xl font-bold italic leading-snug text-navy">
                  “{card.fear}”
                </p>
                <div className="mt-5 rounded-xl bg-teal/[0.08] p-5">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-teal">
                    {card.label}
                  </p>
                  <p className={`mt-2 text-[0.97rem] leading-relaxed ${INK}`}>{card.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <PullQuote>{c.changed.quote}</PullQuote>
      </Band>

      {/* 2 — The ATM lesson */}
      <Band bg="white">
        <Head title={c.atm.eyebrow} subtitle={c.atm.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-cream p-7">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                The prediction
              </p>
              <ul className="mt-5 space-y-3">
                {c.atm.prediction.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d6453b]/12 text-[#b23a30]">
                      <X size={12} strokeWidth={3} />
                    </span>
                    <span className={`text-[0.97rem] ${INK}`}>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-teal">
                The reality
              </p>
              <ul className="mt-5 space-y-3">
                {c.atm.reality.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.97rem] font-medium ${INK}`}>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <PullQuote>{c.atm.quote}</PullQuote>
      </Band>

      {/* 3 — Binary vs advisory (dark) */}
      <Band bg="deep" glow>
        <Head title={c.binary.eyebrow} subtitle={c.binary.subtitle} tone="dark" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-purple/30 bg-purple/[0.14] p-7 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/30 text-white">
                  <Cpu size={22} />
                </span>
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/60">
                    {c.binary.machines.sub}
                  </p>
                  <h3 className="font-display text-lg font-bold text-white">
                    {c.binary.machines.label}
                  </h3>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {c.binary.machines.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[0.97rem] text-white/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-teal/40 bg-teal/[0.14] p-7 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/30 text-white">
                  <Brain size={22} />
                </span>
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-teal">
                    {c.binary.humans.sub}
                  </p>
                  <h3 className="font-display text-lg font-bold text-white">
                    {c.binary.humans.label}
                  </h3>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {c.binary.humans.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[0.97rem] text-white/90">
                    <Check size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-teal" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-8 text-center font-display text-lg font-semibold italic text-yellow">
            {c.binary.caption}
          </p>
        </Reveal>
        <Reveal>
          <figure className="mx-auto mt-6 max-w-2xl text-center">
            <blockquote className="text-lg italic text-white/85">“{c.binary.quote}”</blockquote>
            <figcaption className="mt-2 text-sm font-semibold text-white/60">
              {c.binary.attribution}
            </figcaption>
          </figure>
        </Reveal>
      </Band>

      {/* 4 — Four service quadrants */}
      <Band bg="white">
        <Head title={c.quadrants.eyebrow} subtitle={c.quadrants.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.quadrants.items.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.07}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-7">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${['bg-navy', 'bg-purple', 'bg-yellow', 'bg-teal'][i]}`}
                  />
                  <h3 className="font-display text-xl font-bold tracking-wide text-navy">
                    {q.name}
                  </h3>
                  <span className="rounded-full bg-navy/[0.07] px-3 py-1 text-xs font-bold text-navy">
                    “{q.role}”
                  </span>
                </div>
                <p className={`mt-4 leading-relaxed ${INK}`}>{q.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 5 — Where most firms live today */}
      <Band bg="sand">
        <Head title={c.today.eyebrow} subtitle={c.today.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.today.items.map((item) => (
            <QuadrantDetail key={item.name} item={item} />
          ))}
        </div>
        <Callout icon={AlertTriangle}>{c.today.caption}</Callout>
      </Band>

      {/* 6 — Where the future lives */}
      <Band bg="white">
        <Head title={c.future.eyebrow} subtitle={c.future.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.future.items.map((item) => (
            <QuadrantDetail key={item.name} item={item} />
          ))}
        </div>
        <Callout>{c.future.caption}</Callout>
      </Band>

      {/* 7 — Exercise 1 (live interactive embed) */}
      <Band bg="sand">
        <ExerciseCard data={c.exercise1} embedId="s1-ex1-four-quadrants" />
      </Band>

      {/* 8 — The $100K question */}
      <Band bg="white">
        <Head title={c.hundredK.eyebrow} subtitle={c.hundredK.subtitle} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-purple/20 bg-purple/[0.05] p-7 sm:p-9">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-purple">
              {c.hundredK.scenarioLabel}
            </p>
            <p className={`mt-4 font-display text-xl font-semibold italic leading-relaxed ${INK} sm:text-2xl`}>
              {c.hundredK.scenario}
            </p>
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.hundredK.whyLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {c.hundredK.why.map((w, i) => (
            <Reveal key={w.k} delay={i * 0.08}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
                <span className="font-display text-2xl font-bold text-navy/25">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{w.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{w.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 9 — The five boxes */}
      <Band bg="sand">
        <Head title={c.fiveBoxes.eyebrow} subtitle={c.fiveBoxes.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.fiveBoxes.boxes.map((b) => (
            <Reveal key={b.n} delay={Number(b.n) * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-display text-base font-bold text-white">
                  {b.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-wide text-navy">
                  {b.k}
                </h3>
                <p className={`mt-2 font-medium italic ${INK}`}>{b.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-6 rounded-2xl border border-yellow/40 bg-gradient-to-br from-yellow/[0.16] to-teal/[0.08] p-7 sm:p-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-navy-darker">
              <Target size={14} />
              {c.fiveBoxes.box5.k}
            </span>
            <p className={`mt-4 font-display text-xl font-bold ${INK}`}>{c.fiveBoxes.box5.prompt}</p>
            <p className="mt-3 font-display text-lg font-semibold italic text-navy">
              {c.fiveBoxes.box5.fill}
            </p>
          </div>
        </Reveal>
        <Callout>{c.fiveBoxes.caption}</Callout>
      </Band>

      {/* 10 — Exercise 2 (placeholder until JSON is provided) */}
      <Band bg="white">
        <ExerciseCard data={c.exercise2} comingSoon />
      </Band>

      {/* 11 — Overlap (Venn, dark) */}
      <Band bg="dark">
        <div className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.4rem]">
              {c.overlap.eyebrow}
            </h2>
            <div className="mx-auto mt-4 flex w-fit items-center gap-1.5">
              <span className="h-1.5 w-12 rounded-full bg-yellow" />
              <span className="h-1.5 w-7 rounded-full bg-teal" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white/75">
              {c.overlap.subtitle}
            </p>
          </Reveal>

          {/* Venn — desktop */}
          <Reveal>
            <div className="relative mx-auto mt-14 hidden h-[370px] w-[370px] sm:block">
              <div className="absolute left-[85px] top-[4px] flex h-[215px] w-[215px] flex-col items-center justify-start rounded-full border-2 border-yellow/60 bg-yellow/20 pt-7 mix-blend-screen">
                <span className="text-sm font-bold uppercase tracking-wide text-yellow">
                  {c.overlap.circles[0].k}
                </span>
              </div>
              <div className="absolute left-[6px] top-[150px] flex h-[215px] w-[215px] flex-col items-center justify-end rounded-full border-2 border-teal/60 bg-teal/20 pb-7 mix-blend-screen">
                <span className="text-sm font-bold uppercase tracking-wide text-teal">
                  {c.overlap.circles[1].k}
                </span>
              </div>
              <div className="absolute left-[164px] top-[150px] flex h-[215px] w-[215px] flex-col items-center justify-end rounded-full border-2 border-purple/70 bg-purple/25 pb-7 mix-blend-screen">
                <span className="text-sm font-bold uppercase tracking-wide text-purple">
                  {c.overlap.circles[2].k}
                </span>
              </div>
            </div>
          </Reveal>

          {/* circle descriptors / mobile fallback */}
          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:mt-10 sm:grid-cols-3">
            {c.overlap.circles.map((circle, i) => (
              <Reveal key={circle.k} delay={i * 0.06}>
                <div className="rounded-xl border border-white/12 bg-white/[0.05] p-4 text-center">
                  <p
                    className={`text-sm font-bold uppercase tracking-wide ${['text-yellow', 'text-teal', 'text-purple'][i]}`}
                  >
                    {circle.k}
                  </p>
                  <p className="mt-1 text-[0.9rem] text-white/75">{circle.v}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-8 max-w-2xl text-[0.97rem] font-medium leading-relaxed text-white/75">
              {c.overlap.caption}
            </p>
          </Reveal>
        </div>
      </Band>

      {/* 12 — WIIFM */}
      <Band bg="white">
        <Head title={c.wiifm.eyebrow} subtitle={c.wiifm.subtitle} />
        <div className="mt-12 space-y-3.5">
          {c.wiifm.letters.map((l, i) => (
            <Reveal key={`${l.L}-${i}`} delay={Math.min(i * 0.05, 0.2)}>
              <div className="flex items-center gap-5 rounded-2xl border border-line bg-cream p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy font-display text-2xl font-bold text-white">
                  {l.L}
                </span>
                <p className={`text-[1.02rem] ${INK}`}>
                  <span className="font-bold text-navy">{l.key} </span>
                  {l.rest}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Callout>
          <span className="font-bold">{c.wiifm.testLabel} </span>
          {c.wiifm.test}
        </Callout>
      </Band>

      {/* 13 — Translating insights into action */}
      <Band bg="sand">
        <Head title={c.translating.eyebrow} subtitle={c.translating.subtitle} />
        <div className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          {c.translating.flow.map((step, i) => {
            const last = i === c.translating.flow.length - 1
            return (
              <Reveal key={step} delay={i * 0.08} className="flex flex-1 items-center gap-3">
                <div
                  className={`flex-1 rounded-2xl border p-5 text-center ${
                    last
                      ? 'border-teal/40 bg-teal/[0.1] shadow-[0_18px_40px_-22px_rgba(37,168,140,0.5)]'
                      : 'border-line bg-white'
                  }`}
                >
                  <p className={`text-[0.95rem] font-bold ${last ? 'text-teal' : 'text-navy'}`}>
                    {step}
                  </p>
                </div>
                {!last && (
                  <ArrowRight size={20} className="hidden shrink-0 text-navy/40 lg:block" />
                )}
              </Reveal>
            )
          })}
        </div>
        <Callout>
          <span className="font-bold">{c.translating.mathLabel} </span>
          {c.translating.math}
        </Callout>
      </Band>

      {/* 14 — Four decisions */}
      <Band bg="white">
        <Head title={c.decisions.eyebrow} subtitle={c.decisions.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.decisions.items.map((d, i) => (
            <Reveal key={d.n} delay={i * 0.07}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-lg font-bold text-teal">{d.n}</span>
                  <h3 className="font-display text-lg font-bold tracking-wide text-navy">{d.k}</h3>
                </div>
                <p className="mt-3 font-display text-base font-semibold italic text-navy">
                  {d.quote}
                </p>
                <p className={`mt-2 text-[0.92rem] leading-relaxed ${INK}`}>{d.v}</p>
                <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-wide text-teal">
                  {d.pick}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout icon={Target}>{c.decisions.caption}</Callout>
      </Band>

      {/* 15 — From frustrated to focused */}
      <Band bg="sand">
        <Head title={c.beforeAfter.eyebrow} subtitle={c.beforeAfter.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-[#d6453b]/25 bg-white p-7">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#b23a30]">
                Before
              </p>
              <ul className="mt-5 space-y-3">
                {c.beforeAfter.before.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <X size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#b23a30]" />
                    <span className={`text-[0.97rem] ${INK}`}>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-teal">After</p>
              <ul className="mt-5 space-y-3">
                {c.beforeAfter.after.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.97rem] font-medium ${INK}`}>{a}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <Callout>{c.beforeAfter.caption}</Callout>
      </Band>

      {/* 16 — Your 30-day commitment */}
      <Band bg="white">
        <Head title={c.commitment.eyebrow} subtitle={c.commitment.subtitle} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-navy/15 bg-cream p-7 sm:p-9">
            <p className="font-display text-lg font-bold uppercase tracking-wide text-navy">
              {c.commitment.heading}
            </p>
            <div className="mt-6 space-y-4">
              {c.commitment.items.map((it) => (
                <div key={it.n} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                    {it.n}
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-navy">{it.k}</p>
                    <p className={`mt-1 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-line pt-5 font-display text-base font-semibold text-navy">
              {c.commitment.sign}
            </p>
          </div>
        </Reveal>
        <Callout>{c.commitment.caption}</Callout>
      </Band>

      {/* 17 — Pair up */}
      <Band bg="sand">
        <Head title={c.pairUp.eyebrow} subtitle={c.pairUp.subtitle} />
        <Reveal>
          <div className="mt-10 flex items-start gap-3.5 rounded-2xl border border-teal/30 bg-teal/[0.08] p-6">
            <Handshake size={22} className="mt-0.5 shrink-0 text-teal" />
            <p className={`text-[1.02rem] leading-relaxed ${INK}`}>
              <span className="font-bold">{c.pairUp.scienceLabel} </span>
              {c.pairUp.science}
            </p>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {c.pairUp.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{s.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{s.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 18 — Key takeaways */}
      <Band bg="white">
        <Head title={c.takeaways.eyebrow} subtitle={c.takeaways.subtitle} />
        <div className="mt-12 space-y-4">
          {c.takeaways.items.map((t, i) => (
            <Reveal key={t.k} delay={Math.min(i * 0.05, 0.2)}>
              <div className="flex gap-5 rounded-2xl border border-line bg-cream p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-white">
                  {i + 1}
                </span>
                <p className={`text-[1.02rem] leading-relaxed ${INK}`}>
                  <span className="font-bold text-navy">{t.k} </span>
                  {t.v}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 19 — Up next (dark) */}
      <Band bg="deep" glow>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-yellow">
            {c.upNext.eyebrow}
          </span>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {c.upNext.items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.1}>
              <article className="h-full rounded-2xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal">
                  {i === 0 ? <Users size={15} /> : <Target size={15} />}
                  {it.label}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{it.title}</h3>
                <p className="mt-2.5 leading-relaxed text-white/75">{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Session nav footer */}
      <section className="border-t border-line bg-white py-10">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <Link
            to="/workshops"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            All sessions
          </Link>
          <Link
            to="/workshops/session-2"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:-translate-y-0.5 hover:bg-navy-deep"
          >
            Next: Session 2
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  )
}
