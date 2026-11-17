import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, Sparkles, Quote, Download } from 'lucide-react'
import SessionHero from '../components/SessionHero'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import ExerciseEmbed from '../components/ExerciseEmbed'
import {
  INK,
  Band,
  Head,
  Callout,
  EXERCISE_ANCHORS,
  SessionFraming,
} from '../components/sessionUI'
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

/* Exercise shell: teal header + custom body + live embed. (Used in Chunk 3.) */
function ExerciseShell({ tag, title, children, embedId }) {
  // No Reveal/motion wrapper around the exercise shell: framer-motion keeps a
  // transform (and will-change) on the animated element, and a tall same-origin
  // iframe under a transformed ancestor triggers Chrome's scroll-repaint bug
  // (regions blank until a reflow). Rendering the shell statically removes that
  // compositing trigger (same fix as Session 1's local card and the shared card).
  return (
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
  )
}

export default function Session3() {
  return (
    <>
      {/* Header — business question leads (session.subtitle); theme shown as a pill */}
      <SessionHero session={session}>
        <p className="mt-7 max-w-xl rounded-2xl border border-yellow/30 bg-yellow/10 px-5 py-3 font-display text-base font-semibold italic text-yellow">
          “{c.theme}”
        </p>
        <p className="mt-4 text-sm font-semibold text-white/70">{c.presenters}</p>
      </SessionHero>

      <SessionFraming framing={session.framing} />

      {/* ── Exercise (live embed) + downloadable worksheet, first ── */}
      <Band bg="sand" id={EXERCISE_ANCHORS[0]}>
        <ExerciseShell
          tag={c.exercise1.tag}
          title={c.exercise1.title}
          embedId="s3-hw1-wisp-ai-role-checklist"
        >
          <p className={`text-[1.02rem] font-medium leading-relaxed ${INK}`}>{c.exercise1.lead}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {c.exercise1.steps.map((s, i) => (
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
          {c.exercise1.note && (
            <div className="mt-6 rounded-xl border border-yellow/40 bg-yellow/[0.14] px-5 py-4">
              <p className={`text-[0.92rem] font-semibold leading-relaxed ${INK}`}>
                {c.exercise1.note}
              </p>
            </div>
          )}
          <Button
            href="/downloads/Session_3_Homework_WISP_Role_Checklist_Worksheet.pdf"
            download
            variant="teal"
            className="mt-6"
          >
            <Download size={18} />
            Download the printable worksheet (PDF)
          </Button>
        </ExerciseShell>
      </Band>

      {/* ── Written content ─────────────────────────────────────── */}

      {/* 1 — Cybersecurity is now your job */}
      <Band bg="sand">
        <Head title={c.nowYourJob.eyebrow} subtitle={c.nowYourJob.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-[#d6453b]/25 bg-white p-7">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                {c.nowYourJob.oldLabel}
              </p>
              <ul className="mt-5 space-y-3">
                {c.nowYourJob.old.map((t) => (
                  <li key={t} className={`flex items-start gap-3 text-[0.97rem] ${INK}`}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/40" />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-teal">
                {c.nowYourJob.newLabel}
              </p>
              <ul className="mt-5 space-y-3">
                {c.nowYourJob.new.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.97rem] font-medium ${INK}`}>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {c.nowYourJob.stats.map((s) => (
            <Reveal key={s.k}>
              <div className="rounded-2xl border border-line bg-white p-6 text-center">
                <p className="font-display text-4xl font-bold text-navy">{s.v}</p>
                <p className={`mt-2 text-sm font-semibold ${INK}`}>{s.k}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 2 — The FTC Safeguards Rule */}
      <Band bg="white">
        <Head title={c.ftcRule.eyebrow} subtitle={c.ftcRule.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.ftcRule.facts.map((f) => (
            <Reveal key={f.k}>
              <div className="rounded-2xl border border-line bg-cream p-6 text-center">
                <p className="font-display text-3xl font-bold text-navy sm:text-4xl">{f.v}</p>
                <p className={`mt-2 text-sm font-semibold ${INK}`}>{f.k}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.ftcRule.elementsLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.ftcRule.elements.map((e, i) => (
            <Reveal key={e} delay={Math.min(i * 0.04, 0.24)}>
              <div className={`flex items-start gap-3 rounded-xl border border-line bg-cream p-4 text-[0.95rem] ${INK}`}>
                <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                {e}
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 3 — IRS and the state patchwork */}
      <Band bg="sand">
        <Head title={c.irsStates.eyebrow} subtitle={c.irsStates.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.irsStates.points.map((p) => (
            <Reveal key={p.k}>
              <article className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-bold text-navy">{p.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{p.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 4 — AI governance has arrived */}
      <Band bg="white">
        <Head title={c.aiGovernance.eyebrow} subtitle={c.aiGovernance.subtitle} />
        <Reveal>
          <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.aiGovernance.kitLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.aiGovernance.kit.map((k) => (
            <Reveal key={k}>
              <div className={`flex items-start gap-3 rounded-xl border border-line bg-cream p-4 text-[0.95rem] ${INK}`}>
                <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                {k}
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 5 — What never gets pasted (GREEN / YELLOW / RED) */}
      <Band bg="sand">
        <Head title={c.neverPaste.eyebrow} subtitle={c.neverPaste.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.neverPaste.bands.map((b) => {
            const lc = legendColor[b.key]
            return (
              <Reveal key={b.key}>
                <article className={`flex h-full flex-col rounded-2xl border bg-white p-6 ${lc.border}`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`h-3.5 w-3.5 rounded-full ${lc.dot}`} />
                    <h3 className={`font-display text-lg font-bold tracking-wide ${lc.text}`}>
                      {b.label}
                    </h3>
                  </div>
                  <p className={`mt-2 text-[0.9rem] font-semibold ${INK}`}>{b.rule}</p>
                  <ul className="mt-4 space-y-2.5">
                    {b.items.map((it) => (
                      <li key={it} className={`flex items-start gap-2.5 text-[0.93rem] ${INK}`}>
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${lc.dot}`} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Band>

      {/* 6 — What your insurer expects */}
      <Band bg="white">
        <Head title={c.insurer.eyebrow} subtitle={c.insurer.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-[#d6453b]/25 bg-white p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-[#b23a30]">
                {c.insurer.deniedLabel}
              </p>
              <ul className="mt-5 space-y-3.5">
                {c.insurer.denied.map((d) => (
                  <li key={d} className={`flex items-start gap-3 text-[0.97rem] ${INK}`}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6453b]" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
                {c.insurer.askLabel}
              </p>
              <ul className="mt-5 space-y-3.5">
                {c.insurer.ask.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.97rem] font-medium ${INK}`}>{a}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Band>

      {/* 7 — The risks leaders miss */}
      <Band bg="sand">
        <Head title={c.risks.eyebrow} subtitle={c.risks.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-teal/30 bg-teal/[0.07] p-8 text-center">
              <p className="font-display text-5xl font-bold text-navy">{c.risks.stat.v}</p>
              <p className={`mt-2 text-sm font-semibold ${INK}`}>{c.risks.stat.k}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-line bg-white p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                {c.risks.moversLabel}
              </p>
              <ul className="mt-5 space-y-3.5">
                {c.risks.movers.map((m) => (
                  <li key={m} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.97rem] ${INK}`}>{m}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Band>

      {/* 8 — The five non-negotiables */}
      <Band bg="white">
        <Head title={c.fiveControls.eyebrow} subtitle={c.fiveControls.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {c.fiveControls.items.map((it, i) => (
            <Reveal key={it} delay={Math.min(i * 0.06, 0.3)}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <span className="font-display text-2xl font-bold text-navy/25">0{i + 1}</span>
                <h3 className="mt-2 font-display text-base font-bold text-navy">{it}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Up next (dark) — Dec 10 open hours */}
      <Band bg="deep" glow>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-yellow">
            {c.next.eyebrow}
          </span>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{c.next.text}</p>
          <div className="mt-6 flex items-center gap-1.5">
            <span className="h-1 w-10 rounded-full bg-yellow" />
            <span className="h-1 w-5 rounded-full bg-teal" />
          </div>
        </Reveal>
      </Band>

      {/* Session nav footer — Session 3 is the last workshop (no Next) */}
      <section className="border-t border-line bg-white py-10">
        <div className="mx-auto flex max-w-[1100px] items-center px-5 sm:px-8">
          <Link
            to="/workshops/session-2"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Previous: Session 2
          </Link>
        </div>
      </section>
    </>
  )
}
