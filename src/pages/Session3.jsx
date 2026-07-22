import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, Sparkles, Quote } from 'lucide-react'
import SessionHero from '../components/SessionHero'
import SectionProgress from '../components/SectionProgress'
import Reveal from '../components/Reveal'
import ExerciseEmbed from '../components/ExerciseEmbed'
import { INK, Band, Head, Callout } from '../components/sessionUI'
import { getSession } from '../data/sessions'
import { session3 as c } from '../data/session3'

const session = getSession('session-3')

const legendColor = {
  green: { dot: 'bg-[#1f9d6f]', text: 'text-[#1f8a62]', border: 'border-[#1f9d6f]/30' },
  yellow: { dot: 'bg-yellow', text: 'text-[#a07f00]', border: 'border-yellow/40' },
  red: { dot: 'bg-[#d6453b]', text: 'text-[#b23a30]', border: 'border-[#d6453b]/30' },
}

/* Labeled highlight block (process notes, warnings, market signal, etc.). */
function Note({ label, children, accent = 'teal' }) {
  const a =
    accent === 'red'
      ? { b: 'border-[#d6453b]/30', bg: 'bg-[#d6453b]/[0.07]', t: 'text-[#b23a30]' }
      : accent === 'yellow'
        ? { b: 'border-yellow/40', bg: 'bg-yellow/[0.12]', t: 'text-[#8a6a00]' }
        : { b: 'border-teal/30', bg: 'bg-teal/[0.07]', t: 'text-teal' }
  return (
    <Reveal>
      <div className={`mt-8 rounded-2xl border ${a.b} ${a.bg} p-6 sm:p-7`}>
        <p className={`text-[0.8rem] font-bold uppercase tracking-[0.16em] ${a.t}`}>{label}</p>
        <p className={`mt-2.5 text-[1.02rem] leading-relaxed ${INK}`}>{children}</p>
      </div>
    </Reveal>
  )
}

/* Exercise shell: teal header + custom body + live embed. */
function ExerciseShell({ tag, title, children, embedId }) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-3xl border border-teal/30 bg-white shadow-[0_24px_60px_-30px_rgba(61,15,82,0.35)]">
        <div className="bg-teal/[0.08] px-7 py-6 sm:px-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
            <Sparkles size={14} />
            {tag}
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
        </div>
        <div className="px-7 py-7 sm:px-9 sm:py-8">{children}</div>
        <div className="px-7 pb-9 sm:px-9">
          <ExerciseEmbed exerciseId={embedId} title={title} />
        </div>
      </div>
    </Reveal>
  )
}

export default function Session3() {
  return (
    <>
      <SectionProgress />

      {/* Header */}
      <SessionHero session={session} subtitle={`“${c.theme}”`}>
        <p className="mt-6 text-sm font-semibold text-white/70">{c.presenters}</p>
      </SessionHero>

      {/* 1 — Objectives */}
      <Band bg="sand">
        <Head title={c.objectives.eyebrow} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.objectives.items.map((it) => (
            <Reveal key={it.n}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy font-display text-base font-bold text-white">
                  {it.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>{c.objectives.caption}</Callout>
      </Band>

      {/* 2 — Technology Evolution */}
      <Band bg="white">
        <Head title={c.evolution.eyebrow} />
        <div className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          {c.evolution.timeline.map((stage, i) => {
            const last = i === c.evolution.timeline.length - 1
            return (
              <Reveal key={stage.k} delay={i * 0.08} className="flex flex-1 items-center gap-3">
                <div
                  className={`flex-1 rounded-2xl border p-5 text-center ${
                    last ? 'border-teal/40 bg-teal/[0.1]' : 'border-line bg-cream'
                  }`}
                >
                  <p className={`font-display text-base font-bold ${last ? 'text-teal' : 'text-navy'}`}>
                    {stage.k}
                  </p>
                  <p className={`mt-1 text-xs font-semibold ${INK}`}>{stage.t}</p>
                </div>
                {!last && <ArrowRight size={20} className="hidden shrink-0 text-navy/40 lg:block" />}
              </Reveal>
            )
          })}
        </div>
        <Reveal>
          <p className={`mt-10 max-w-3xl text-[1.02rem] leading-relaxed ${INK}`}>{c.evolution.p1}</p>
        </Reveal>
        <Note label={c.evolution.shiftLabel}>{c.evolution.shift}</Note>
      </Band>

      {/* 3 — Little Black Dress */}
      <Band bg="sand">
        <Head title={c.lbd.eyebrow} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-navy/15 bg-navy p-7 text-center sm:p-9">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-yellow">
              Core stack
            </p>
            <p className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">{c.lbd.core}</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-8 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.lbd.conceptLabel}
          </p>
        </Reveal>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {c.lbd.concept.map((x) => (
            <Reveal key={x}>
              <li className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                <span className={`text-[0.97rem] ${INK}`}>{x}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Callout>{c.lbd.caption}</Callout>
      </Band>

      {/* 4 — 80/20 Rule */}
      <Band bg="white">
        <Head title={c.eightyTwenty.eyebrow} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.eightyTwenty.items.map((it, i) => (
            <Reveal key={it.pct} delay={i * 0.1}>
              <article
                className={`h-full rounded-2xl border p-7 ${
                  i === 0 ? 'border-teal/30 bg-teal/[0.07]' : 'border-yellow/40 bg-yellow/[0.1]'
                }`}
              >
                <p className="font-display text-5xl font-bold text-navy">{it.pct}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.97rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.eightyTwenty.caseLabel} accent="yellow">
          {c.eightyTwenty.case}
        </Note>
      </Band>

      {/* 5 — 6 Criteria */}
      <Band bg="sand">
        <Head title={c.criteria.eyebrow} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.criteria.items.map((it) => (
            <Reveal key={it.n}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-display text-sm font-bold text-white">
                    {it.n}
                  </span>
                  <h3 className="font-display text-base font-bold text-navy">{it.k}</h3>
                </div>
                <p className={`mt-3 text-[0.93rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>{c.criteria.caption}</Callout>
      </Band>

      {/* 6 — Core App Categories */}
      <Band bg="white">
        <Head title={c.categories.eyebrow} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.categories.items.map((it) => (
            <Reveal key={it.k}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-base font-bold text-teal">{it.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label="Pro tip">{c.categories.proTip}</Note>
      </Band>

      {/* 7 — Power of Integration */}
      <Band bg="sand">
        <Head title={c.integration.eyebrow} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[c.integration.native, c.integration.third].map((it, i) => (
            <Reveal key={it.k} delay={i * 0.1}>
              <article className="h-full rounded-2xl border border-line bg-white p-7">
                <h3 className="font-display text-lg font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.97rem] leading-relaxed ${INK}`}>{it.v}</p>
                <p className="mt-4 rounded-lg bg-teal/[0.08] px-3.5 py-2.5 text-[0.9rem] font-semibold text-teal">
                  {it.ex}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.integration.stackLabel}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {c.integration.stack.map((s, i) => (
              <span key={s} className="flex items-center gap-2.5">
                {i > 0 && <ArrowRight size={16} className="text-teal" />}
                <span className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-bold text-navy">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </Reveal>
        <Note label="Result">{c.integration.result}</Note>
      </Band>

      {/* 8 — Solving Document Retrieval */}
      <Band bg="white">
        <Head title={c.documents.eyebrow} />
        <Reveal>
          <figure className="mt-10 rounded-2xl border border-navy/15 bg-navy p-7 sm:p-9">
            <Quote className="mb-3 text-yellow" size={28} />
            <blockquote className="font-display text-xl font-semibold italic leading-snug text-white">
              {c.documents.quote}
            </blockquote>
          </figure>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.documents.tools.map((t) => (
            <Reveal key={t.k}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-base font-bold text-navy">{t.k}</h3>
                <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{t.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.documents.processLabel}>{c.documents.process}</Note>
        <Note label={c.documents.warnLabel} accent="yellow">
          {c.documents.warn}
        </Note>
      </Band>

      {/* 9 — Exercise 1 (live embed) */}
      <Band bg="sand">
        <ExerciseShell
          tag={c.exercise1.tag}
          title={c.exercise1.title}
          embedId="s3-ex1-tech-stack-calculator"
        >
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
            {c.exercise1.clientLabel}
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {c.exercise1.client.map((x) => (
              <li key={x} className={`flex items-start gap-2.5 text-[0.95rem] ${INK}`}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-7 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.exercise1.taskLabel}
          </p>
          <p className={`mt-2.5 text-[0.97rem] leading-relaxed ${INK}`}>{c.exercise1.task}</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {c.exercise1.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-navy/15 bg-cream px-3.5 py-1.5 text-sm font-semibold text-navy"
              >
                {cat}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-yellow/40 bg-yellow/[0.12] px-5 py-4">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#8a6a00]">
              {c.exercise1.goalLabel}:{' '}
            </span>
            <span className={`font-semibold ${INK}`}>{c.exercise1.goal}</span>
          </p>
        </ExerciseShell>
      </Band>

      {/* 10 — AI: Where It Fits */}
      <Band bg="white">
        <Head title={c.aiFits.eyebrow} subtitle={c.aiFits.intro} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[c.aiFits.gen, c.aiFits.agentic].map((col, i) => (
            <Reveal key={col.k} delay={i * 0.1}>
              <article
                className={`h-full rounded-2xl border p-7 ${
                  i === 0 ? 'border-teal/30 bg-teal/[0.06]' : 'border-purple/30 bg-purple/[0.06]'
                }`}
              >
                <h3 className="font-display text-xl font-bold text-navy">{col.k}</h3>
                <p className={`mt-2 text-[0.97rem] leading-relaxed ${INK}`}>{col.v}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.items.map((x) => (
                    <li key={x} className={`flex items-start gap-2.5 text-[0.95rem] ${INK}`}>
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? 'bg-teal' : 'bg-purple'}`}
                      />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 11 — AI Across Bookkeeping, Tax & Advisory */}
      <Band bg="sand">
        <Head title={c.aiAcross.eyebrow} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {c.aiAcross.groups.map((g) => (
            <Reveal key={g.k}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-bold text-teal">{g.k}</h3>
                <ul className="mt-4 space-y-3">
                  {g.items.map((x) => (
                    <li key={x} className={`flex items-start gap-2.5 text-[0.94rem] ${INK}`}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.aiAcross.signalLabel}>{c.aiAcross.signal}</Note>
      </Band>

      {/* 12 — AI Governance */}
      <Band bg="white">
        <Head title={c.governance.eyebrow} subtitle={c.governance.intro} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.governance.items.map((it) => (
            <Reveal key={it.k}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-lg font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.governance.patchLabel} accent="yellow">
          {c.governance.patch}
        </Note>
      </Band>

      {/* 13 — NIST Framework */}
      <Band bg="sand">
        <Head title={c.nist.eyebrow} subtitle={c.nist.intro} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.nist.steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.07}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="font-display text-2xl font-bold text-teal/40">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold tracking-wide text-navy">{s.k}</h3>
                <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{s.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.nist.startLabel}>{c.nist.start}</Note>
        <Note label={c.nist.tellLabel} accent="yellow">
          {c.nist.tell}
        </Note>
      </Band>

      {/* 14 — Exercise 2 (live embed) */}
      <Band bg="white">
        <ExerciseShell
          tag={c.exercise2.tag}
          title={c.exercise2.title}
          embedId="s3-ex2-ai-vendor-scorecard"
        >
          <p className={`text-[1.02rem] font-medium leading-relaxed ${INK}`}>{c.exercise2.lead}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.exercise2.areas.map((a, i) => (
              <div key={a} className={`flex items-start gap-3 rounded-xl border border-line bg-cream p-4 text-[0.93rem] ${INK}`}>
                <span className="font-display text-sm font-bold text-navy/40">{i + 1}</span>
                {a}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {c.exercise2.legend.map((l) => {
              const lc = legendColor[l.key]
              return (
                <span
                  key={l.k}
                  className={`inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-bold ${lc.border} ${lc.text}`}
                >
                  <span className={`h-3 w-3 rounded-full ${lc.dot}`} />
                  {l.k} — <span className={`font-semibold ${INK}`}>{l.v}</span>
                </span>
              )
            })}
          </div>
        </ExerciseShell>
      </Band>

      {/* 15 — Hardware & Getting Started */}
      <Band bg="sand">
        <Head title={c.hardware.eyebrow} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {c.hardware.items.map((it) => (
            <Reveal key={it.k}>
              <article className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.hardware.needLabel}>{c.hardware.need}</Note>
        <Note label={c.hardware.secLabel} accent="red">
          {c.hardware.sec}
        </Note>
      </Band>

      {/* 16 — Success Stories */}
      <Band bg="white">
        <Head title={c.stories.eyebrow} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.stories.items.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-7">
                <h3 className="font-display text-lg font-bold text-navy">{s.k}</h3>
                <p className={`mt-3 leading-relaxed ${INK}`}>{s.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 17 — Action Plan */}
      <Band bg="sand">
        <Head title={c.actionPlan.eyebrow} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.actionPlan.items.map((it) => (
            <Reveal key={it.k}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">{it.k}</span>
                <p className={`mt-3 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-white p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                {c.actionPlan.confLabel}
              </p>
              <ul className="mt-4 space-y-3">
                {c.actionPlan.conferences.map((cf) => (
                  <li key={cf.k} className={`text-[0.95rem] ${INK}`}>
                    <span className="font-bold text-navy">{cf.k}</span> — {cf.v}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
                {c.actionPlan.teamLabel}
              </p>
              <ul className="mt-4 space-y-3">
                {c.actionPlan.team.map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.95rem] ${INK}`}>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Band>

      {/* 18 — Key Takeaways */}
      <Band bg="white">
        <Head title={c.takeaways.eyebrow} />
        <div className="mt-12 space-y-4">
          {c.takeaways.items.map((t, i) => (
            <Reveal key={t} delay={Math.min(i * 0.05, 0.25)}>
              <div className="flex gap-5 rounded-2xl border border-line bg-cream p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-white">
                  {i + 1}
                </span>
                <p className={`self-center text-[1.02rem] leading-relaxed ${INK}`}>{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <figure className="mt-10 rounded-2xl border border-white/10 bg-hero-dark p-8 text-center sm:p-10">
            <Quote className="mx-auto mb-4 text-yellow" size={30} />
            <blockquote className="mx-auto max-w-3xl font-display text-xl font-semibold italic leading-snug text-white">
              {c.takeaways.quote}
            </blockquote>
          </figure>
        </Reveal>
      </Band>

      {/* 19 — Next session (dark) */}
      <Band bg="deep" glow>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-yellow">
            {c.next.eyebrow}
          </span>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{c.next.text}</p>
        </Reveal>
        <Reveal>
          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur sm:p-7">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-yellow">
              {c.next.beforeLabel}
            </p>
            <ul className="mt-4 space-y-3">
              {c.next.before.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-white/85">
                  <Check size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-teal" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 font-display text-lg font-semibold italic text-yellow">
            {c.next.caption}
          </p>
        </Reveal>
      </Band>

      {/* Session nav footer */}
      <section className="border-t border-line bg-white py-10">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <Link
            to="/workshops/session-2"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Previous: Session 2
          </Link>
          <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-sand px-6 py-3 text-sm font-semibold text-ink/45">
            Session 4 — Coming soon
          </span>
        </div>
      </section>
    </>
  )
}
