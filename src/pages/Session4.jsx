import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, Sparkles, Quote, Mail, HelpCircle } from 'lucide-react'
import SessionHero from '../components/SessionHero'
import SectionProgress from '../components/SectionProgress'
import Reveal from '../components/Reveal'
import ExerciseEmbed from '../components/ExerciseEmbed'
import { INK, Band, Head, Callout, ExerciseJumpBar, EXERCISE_ANCHORS } from '../components/sessionUI'
import { getSession } from '../data/sessions'
import { session4 as c } from '../data/session4'

const session = getSession('session-4')

/* Labeled highlight block (case notes, warnings, why-it-matters, etc.). */
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

/* Live poll prompt — a short, deliberate pause in the deck. */
function Poll({ eyebrow, q }) {
  return (
    <Band bg="deep" glow>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-yellow">
          <HelpCircle size={14} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal>
        <h2 className="mt-6 max-w-3xl font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.4rem]">
          {q}
        </h2>
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-1.5 w-12 rounded-full bg-yellow" />
          <span className="h-1.5 w-7 rounded-full bg-teal" />
        </div>
      </Reveal>
    </Band>
  )
}

/* Simple bordered data table that scrolls on small screens. */
function DataTable({ head, rows, label }) {
  return (
    <Reveal>
      {label && (
        <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
          {label}
        </p>
      )}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead>
            <tr className="bg-navy">
              {head.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.join('|')} className={i % 2 ? 'bg-cream' : 'bg-white'}>
                {r.map((cell, j) => (
                  <td
                    key={j}
                    className={`border-t border-line px-5 py-3.5 text-[0.95rem] leading-relaxed ${INK} ${
                      j === 0 ? 'font-bold text-navy' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

export default function Session4() {
  return (
    <>
      <SectionProgress />

      {/* Header — title/question/meta come from sessions.js via SessionHero */}
      <SessionHero session={session}>
        <p className="mt-7 font-display text-lg font-semibold italic text-yellow">
          “{c.tagline}”
        </p>
        <p className="mt-4 text-sm font-semibold text-white/70">{c.presenters}</p>
      </SessionHero>

      <ExerciseJumpBar count={2} />

      {/* 1 — The Capstone */}
      <Band bg="sand">
        <Head title={c.capstone.eyebrow} subtitle={c.capstone.subtitle} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-navy/15 bg-navy p-7 text-center sm:p-9">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              {c.capstone.lead}
            </p>
          </div>
        </Reveal>
      </Band>

      {/* 2 — Your Facilitators */}
      <Band bg="white">
        <Head title={c.facilitators.eyebrow} subtitle={c.facilitators.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.facilitators.people.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.1}>
              <article className="h-full rounded-2xl border border-line bg-cream p-7">
                <h3 className="font-display text-xl font-bold text-navy">{p.k}</h3>
                <a
                  href={`mailto:${p.v}`}
                  className="mt-3 inline-flex items-center gap-2 text-[0.97rem] font-semibold text-teal hover:underline"
                >
                  <Mail size={16} />
                  {p.v}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 3 — Session Objectives */}
      <Band bg="sand">
        <Head title={c.objectives.eyebrow} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
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
        <Callout>{c.objectives.quote}</Callout>
      </Band>

      {/* 4 — Your 90 Minutes: The Roadmap */}
      <Band bg="white">
        <Head title={c.roadmap.eyebrow} subtitle={c.roadmap.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.roadmap.items.map((it, i) => {
            const isExercise = it.tag.startsWith('Exercise')
            return (
              <Reveal key={it.tag} delay={i * 0.08}>
                <article
                  className={`flex h-full flex-col rounded-2xl border p-6 ${
                    isExercise ? 'border-teal/30 bg-teal/[0.07]' : 'border-line bg-cream'
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.14em] ${
                      isExercise ? 'text-teal' : 'text-navy/60'
                    }`}
                  >
                    {it.tag}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-navy">{it.k}</h3>
                  <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{it.v}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
        <Callout>{c.roadmap.caption}</Callout>
      </Band>

      {/* 5 — Terminology: Workflow vs. Tasking */}
      <Band bg="sand">
        <Head title={c.workflowTasking.eyebrow} subtitle={c.workflowTasking.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.workflowTasking.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.1}>
              <article className="h-full rounded-2xl border border-line bg-white p-7">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-bold text-navy">{it.k}</h3>
                  <span className="text-[0.85rem] font-semibold italic text-teal">{it.kind}</span>
                </div>
                <p className={`mt-2.5 text-[0.97rem] leading-relaxed ${INK}`}>{it.v}</p>
                <p className="mt-4 rounded-lg bg-teal/[0.08] px-3.5 py-2.5 text-[0.9rem] font-semibold text-teal">
                  {it.ex}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.workflowTasking.realLabel}>{c.workflowTasking.real}</Note>
      </Band>

      {/* 6 — Terminology: Policy vs. Procedure */}
      <Band bg="white">
        <Head title={c.policyProcedure.eyebrow} subtitle={c.policyProcedure.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.policyProcedure.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.1}>
              <article
                className={`h-full rounded-2xl border p-7 ${
                  i === 0 ? 'border-yellow/40 bg-yellow/[0.1]' : 'border-teal/30 bg-teal/[0.07]'
                }`}
              >
                <h3 className="font-display text-xl font-bold text-navy">{it.k}</h3>
                <p
                  className={`mt-1 text-[0.85rem] font-bold uppercase tracking-[0.14em] ${
                    i === 0 ? 'text-[#8a6a00]' : 'text-teal'
                  }`}
                >
                  {it.kind}
                </p>
                <p className={`mt-3 text-[0.97rem] leading-relaxed ${INK}`}>{it.v}</p>
                <p className={`mt-4 rounded-lg bg-white/70 px-3.5 py-2.5 text-[0.92rem] italic ${INK}`}>
                  {it.ex}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Note label={c.policyProcedure.whyLabel}>{c.policyProcedure.why}</Note>
      </Band>

      {/* 7 — What Goes Inside Each Document */}
      <Band bg="sand">
        <Head title={c.documents.eyebrow} subtitle={c.documents.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[c.documents.policy, c.documents.procedure].map((doc, i) => (
            <Reveal key={doc.k} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                <h3 className="font-display text-lg font-bold text-navy">{doc.k}</h3>
                <ul className="mt-5 space-y-2.5">
                  {doc.items.map((x) => (
                    <li key={x} className="flex items-start gap-3">
                      <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                      <span className={`text-[0.97rem] ${INK}`}>{x}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 8 — Why Procedures Are Essential for BOS */}
      <Band bg="white">
        <Head title={c.essential.eyebrow} subtitle={c.essential.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.essential.items.map((it) => (
            <Reveal key={it.n}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-display text-sm font-bold text-white">
                  {it.n}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>{c.essential.caption}</Callout>
      </Band>

      {/* 9 — Poll */}
      <Poll eyebrow={c.poll1.eyebrow} q={c.poll1.q} />

      {/* 10 — Benefits of Documenting Procedures */}
      <Band bg="sand">
        <Head title={c.benefits.eyebrow} subtitle={c.benefits.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.benefits.items.map((it) => (
            <Reveal key={it.k}>
              <article className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold text-teal">{it.k}</h3>
                <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <figure className="mt-10 rounded-2xl border border-navy/15 bg-navy p-7 sm:p-9">
            <Quote className="mb-3 text-yellow" size={28} />
            <blockquote className="font-display text-xl font-semibold italic leading-snug text-white">
              {c.benefits.quote}
            </blockquote>
          </figure>
        </Reveal>
      </Band>

      {/* 11 — The Three Kinds of Procedures */}
      <Band bg="white">
        <Head title={c.threeKinds.eyebrow} subtitle={c.threeKinds.subtitle} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {c.threeKinds.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-lg font-bold text-teal">{it.k}</h3>
                <p className={`mt-3 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>{c.threeKinds.caption}</Callout>
      </Band>

      {/* 12 — The 7 Rules */}
      <Band bg="sand">
        <Head title={c.sevenRules.eyebrow} subtitle={c.sevenRules.subtitle} />
        <div className="mt-12 space-y-4">
          {c.sevenRules.items.map((it, i) => (
            <Reveal key={it.n} delay={Math.min(i * 0.05, 0.25)}>
              <div className="flex gap-5 rounded-2xl border border-line bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-white">
                  {it.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">{it.k}</h3>
                  <p className={`mt-1.5 text-[0.97rem] leading-relaxed ${INK}`}>{it.v}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Note label="Note">{c.sevenRules.note}</Note>
      </Band>

      {/* 13 — Case Study: When Workflows Fail */}
      <Band bg="white">
        <Head title={c.caseFail.eyebrow} subtitle={c.caseFail.subtitle} />
        <Note label={c.caseFail.caveatLabel} accent="red">
          {c.caseFail.caveat}
        </Note>
        <Reveal>
          <figure className="mt-8 rounded-2xl border border-navy/15 bg-navy p-7 sm:p-9">
            <Quote className="mb-3 text-yellow" size={28} />
            <blockquote className="font-display text-xl font-semibold italic leading-snug text-white">
              {c.caseFail.lesson}
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-white/60">
              {c.caseFail.lessonLabel}
            </figcaption>
          </figure>
        </Reveal>
        <Note label={c.caseFail.ruleLabel} accent="yellow">
          {c.caseFail.rule}
        </Note>
      </Band>

      {/* 14 — Case Study: Know What You're Getting Into */}
      <Band bg="sand">
        <Head title={c.caseScope.eyebrow} subtitle={c.caseScope.subtitle} />
        <Note label={c.caseScope.callLabel}>{c.caseScope.call}</Note>
        <Reveal>
          <p className="mt-8 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.caseScope.phaseLabel}
          </p>
        </Reveal>
        <ul className="mt-5 space-y-3">
          {c.caseScope.phase.map((x) => (
            <Reveal key={x}>
              <li className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span className={`text-[0.97rem] leading-relaxed ${INK}`}>{x}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Band>

      {/* 15 — Workflow & Tasking Applications */}
      <Band bg="white">
        <Head title={c.apps.eyebrow} subtitle={c.apps.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.apps.items.map((it) => (
            <Reveal key={it.k}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-base font-bold text-teal">{it.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.apps.criteriaLabel}
          </p>
        </Reveal>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {c.apps.criteria.map((x) => (
            <Reveal key={x}>
              <li className="flex items-start gap-3 rounded-xl border border-line bg-cream p-4">
                <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                <span className={`text-[0.97rem] ${INK}`}>{x}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Band>

      {/* 16 — How an Account Manager Sees the Playbooks */}
      <Band bg="sand">
        <Head title={c.amView.eyebrow} subtitle={c.amView.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.amView.items.map((it) => (
            <Reveal key={it.k}>
              <article className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>{c.amView.caption}</Callout>
      </Band>

      {/* 17 — The Playbook Structure */}
      <Band bg="white">
        <Head title={c.playbook.eyebrow} subtitle={c.playbook.subtitle} />
        <div className="mt-12 space-y-4">
          {c.playbook.cards.map((card, i) => (
            <Reveal key={card.n} delay={Math.min(i * 0.06, 0.25)}>
              <div className="flex flex-col gap-4 rounded-2xl border border-line bg-cream p-6 sm:flex-row sm:items-start sm:gap-6">
                <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-navy px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  {card.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy">{card.k}</h3>
                  <p className={`mt-1.5 text-[0.97rem] leading-relaxed ${INK}`}>{card.v}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Note label="Pro tip">{c.playbook.proTip}</Note>
      </Band>

      {/* 18 — Poll */}
      <Poll eyebrow={c.poll2.eyebrow} q={c.poll2.q} />

      {/* 19 — Exercise 1 (live embed) */}
      <Band bg="sand" id={EXERCISE_ANCHORS[0]}>
        <ExerciseShell
          tag={c.exercise1.tag}
          title={c.exercise1.title}
          embedId={c.exercise1.embedId}
        >
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
            {c.exercise1.profileLabel}
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {c.exercise1.profile.map((x) => (
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
          <p className="mt-6 rounded-xl border border-teal/30 bg-teal/[0.07] px-5 py-4">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-teal">
              {c.exercise1.pointLabel}:{' '}
            </span>
            <span className={`font-semibold ${INK}`}>{c.exercise1.point}</span>
          </p>
          <p className="mt-4 rounded-xl border border-yellow/40 bg-yellow/[0.12] px-5 py-4">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#8a6a00]">
              {c.exercise1.goalLabel}:{' '}
            </span>
            <span className={`font-semibold ${INK}`}>{c.exercise1.goal}</span>
          </p>
        </ExerciseShell>
      </Band>

      {/* 20 — AI Now Writes and Maintains Your Procedures */}
      <Band bg="white">
        <Head title={c.aiWrites.eyebrow} subtitle={c.aiWrites.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.aiWrites.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <span className="font-display text-2xl font-bold text-teal/40">0{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{s.k}</h3>
                <p className={`mt-2 text-[0.93rem] leading-relaxed ${INK}`}>{s.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 rounded-2xl border border-teal/30 bg-teal/[0.07] p-6 sm:p-7">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
              {c.aiWrites.sessionLabel}
            </p>
            <p className={`mt-2.5 text-[1.02rem] leading-relaxed ${INK}`}>
              {c.aiWrites.sessionLead}
            </p>
            <ul className="mt-5 space-y-3">
              {c.aiWrites.quotes.map((q) => (
                <li
                  key={q}
                  className={`rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] italic leading-relaxed ${INK}`}
                >
                  “{q}”
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Callout>{c.aiWrites.closing}</Callout>
      </Band>

      {/* 21 — What a Finished Procedure Looks Like */}
      <Band bg="sand">
        <Head title={c.finished.eyebrow} subtitle={c.finished.subtitle} />
        <Reveal>
          <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.finished.hallmarksLabel}
          </p>
        </Reveal>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {c.finished.hallmarks.map((x) => (
            <Reveal key={x}>
              <li className="flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4">
                <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                <span className={`text-[0.95rem] leading-relaxed ${INK}`}>{x}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <DataTable
          label={c.finished.tableLabel}
          head={c.finished.tableHead}
          rows={c.finished.tableRows}
        />
      </Band>

      {/* 22 — Exercise 2 (live embed) */}
      <Band bg="white" id={EXERCISE_ANCHORS[1]}>
        <ExerciseShell
          tag={c.exercise2.tag}
          title={c.exercise2.title}
          embedId={c.exercise2.embedId}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {c.exercise2.steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-line bg-cream p-5">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">
                  {s.n}
                </span>
                <h3 className="mt-2.5 font-display text-base font-bold text-navy">{s.k}</h3>
                <p className={`mt-1.5 text-[0.9rem] leading-relaxed ${INK}`}>{s.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-yellow/40 bg-yellow/[0.12] px-5 py-4">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#8a6a00]">
              {c.exercise2.takeawayLabel}:{' '}
            </span>
            <span className={`font-semibold ${INK}`}>{c.exercise2.takeaway}</span>
          </p>
        </ExerciseShell>
      </Band>

      {/* 23 — Resource: Naming Conventions */}
      <Band bg="sand">
        <Head title={c.naming.eyebrow} subtitle={c.naming.subtitle} />
        <DataTable head={c.naming.tableHead} rows={c.naming.tableRows} />
        <Note label={c.naming.whyLabel} accent="yellow">
          {c.naming.why}
        </Note>
      </Band>

      {/* 24 — Controlling & Obtaining Source Documents */}
      <Band bg="white">
        <Head title={c.sourceDocs.eyebrow} subtitle={c.sourceDocs.subtitle} />
        <div className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          {c.sourceDocs.flow.map((stage, i) => {
            const last = i === c.sourceDocs.flow.length - 1
            return (
              <Reveal key={stage.k} delay={i * 0.08} className="flex flex-1 items-center gap-3">
                <div
                  className={`flex-1 rounded-2xl border p-5 text-center ${
                    i === 0 ? 'border-teal/40 bg-teal/[0.1]' : 'border-line bg-cream'
                  }`}
                >
                  <p
                    className={`font-display text-base font-bold ${i === 0 ? 'text-teal' : 'text-navy'}`}
                  >
                    {stage.k}
                  </p>
                  <p className={`mt-1 text-xs font-semibold ${INK}`}>{stage.v}</p>
                </div>
                {!last && <ArrowRight size={20} className="hidden shrink-0 text-navy/40 lg:block" />}
              </Reveal>
            )
          })}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
                {c.sourceDocs.bestLabel}
              </p>
              <ul className="mt-4 space-y-3">
                {c.sourceDocs.best.map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.95rem] ${INK}`}>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-[#d6453b]/30 bg-[#d6453b]/[0.07] p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-[#b23a30]">
                {c.sourceDocs.avoidLabel}
              </p>
              <ul className="mt-4 space-y-3">
                {c.sourceDocs.avoid.map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b23a30]" />
                    <span className={`text-[0.95rem] ${INK}`}>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Band>

      {/* 25 — The Power of Mighty Search */}
      <Band bg="sand">
        <Head title={c.search.eyebrow} subtitle={c.search.subtitle} />
        <Note label={c.search.fedLabel}>{c.search.fed}</Note>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-white p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
                {c.search.benefitsLabel}
              </p>
              <ul className="mt-4 space-y-3">
                {c.search.benefits.map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.95rem] ${INK}`}>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-line bg-white p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                {c.search.examplesLabel}
              </p>
              <ul className="mt-4 space-y-3">
                {c.search.examples.map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                    <span className={`text-[0.95rem] ${INK}`}>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Band>

      {/* 26 — Your Procedure Action Plan */}
      <Band bg="white">
        <Head title={c.actionPlan.eyebrow} subtitle={c.actionPlan.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.actionPlan.timeline.map((it) => (
            <Reveal key={it.k}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">
                  {it.k}
                </span>
                <p className={`mt-3 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
              {c.actionPlan.commitLabel}
            </p>
            <ul className="mt-4 space-y-3">
              {c.actionPlan.commit.map((x) => (
                <li key={x} className="flex items-start gap-2.5">
                  <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                  <span className={`text-[0.95rem] ${INK}`}>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Band>

      {/* 27 — Key Takeaways */}
      <Band bg="sand">
        <Head title={c.takeaways.eyebrow} />
        <div className="mt-12 space-y-4">
          {c.takeaways.items.map((t, i) => (
            <Reveal key={t} delay={Math.min(i * 0.05, 0.25)}>
              <div className="flex gap-5 rounded-2xl border border-line bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-white">
                  0{i + 1}
                </span>
                <p className={`self-center text-[1.02rem] leading-relaxed ${INK}`}>{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Callout>{c.takeaways.caption}</Callout>
      </Band>

      {/* 28 — Series complete (dark) */}
      <Band bg="deep" glow>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-yellow">
            {c.close.eyebrow}
          </span>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 max-w-3xl font-display text-[1.9rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.4rem]">
            {c.close.quote}
          </h2>
          <div className="mt-5 flex items-center gap-1.5">
            <span className="h-1.5 w-12 rounded-full bg-yellow" />
            <span className="h-1.5 w-7 rounded-full bg-teal" />
          </div>
          <p className="mt-6 font-display text-lg font-semibold italic text-yellow">
            {c.close.kicker}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {c.close.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.1}>
              <article className="h-full rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur">
                <h3 className="font-display text-lg font-bold text-white">{it.k}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/80">{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Session nav footer */}
      <section className="border-t border-line bg-white py-10">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <Link
            to="/workshops/session-3"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Previous: Session 3
          </Link>
          <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-teal/30 bg-teal/[0.08] px-6 py-3 text-sm font-semibold text-teal">
            The series is complete
          </span>
        </div>
      </section>
    </>
  )
}
