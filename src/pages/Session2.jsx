import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react'
import SessionHero from '../components/SessionHero'
import Reveal from '../components/Reveal'
import {
  INK,
  Band,
  Head,
  Callout,
  ExerciseCard,
  EXERCISE_ANCHORS,
  SessionFraming,
} from '../components/sessionUI'
import { getSession } from '../data/sessions'
import { session2 as c } from '../data/session2'

const session = getSession('session-2')

const tier = {
  gold: { text: 'text-[#a07f00]', dot: 'bg-yellow', border: 'border-yellow/40', soft: 'bg-yellow/[0.1]' },
  silver: { text: 'text-navy', dot: 'bg-navy/50', border: 'border-navy/20', soft: 'bg-navy/[0.05]' },
  bronze: { text: 'text-[#b3741a]', dot: 'bg-[#b3741a]', border: 'border-[#b3741a]/30', soft: 'bg-[#b3741a]/[0.08]' },
  fire: { text: 'text-[#b23a30]', dot: 'bg-[#d6453b]', border: 'border-[#d6453b]/30', soft: 'bg-[#d6453b]/[0.08]' },
}

export default function Session2() {
  return (
    <>
      {/* Header */}
      <SessionHero session={session}>
        <p className="mt-7 max-w-xl rounded-2xl border border-yellow/30 bg-yellow/10 px-5 py-3 font-display text-base font-semibold italic text-yellow">
          “{c.tagline}” <span className="not-italic text-white/70">{c.taglineBy}</span>
        </p>
      </SessionHero>

      <SessionFraming framing={session.framing} />

      {/* ── Exercises / games first (moved to the top per stakeholder request).
          Exercise Jump Bar removed (redundant now). Three live interactive
          embeds, in homework order (HW1→HW3), alternating sand/white. ── */}
      {/* Homework 1 — Client Portfolio Matrix */}
      <Band bg="sand" id={EXERCISE_ANCHORS[0]}>
        <ExerciseCard data={c.exercise1} embedId="s2-hw1-client-portfolio-matrix" />
      </Band>

      {/* Homework 2 — The True Cost of an In-House Bookkeeper or CFO */}
      <Band bg="white" id={EXERCISE_ANCHORS[1]}>
        <ExerciseCard data={c.exercise2} embedId="s2-hw2-true-cost-calculator" />
      </Band>

      {/* Homework 3 — What It Costs Your Firm to Deliver */}
      <Band bg="sand" id={EXERCISE_ANCHORS[2]}>
        <ExerciseCard data={c.exercise3} embedId="s2-hw3-firm-cost-builder" />
      </Band>

      {/* ── Written content — Clients & Pricing ─────────────────── */}

      {/* 1 — Right clients (traditional vs advisory) */}
      <Band bg="sand">
        <Head title={c.rightClients.eyebrow} subtitle={c.rightClients.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-cream p-7">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-navy/60">
                {c.rightClients.traditionalLabel}
              </p>
              <ul className="mt-5 space-y-3">
                {c.rightClients.traditional.map((t) => (
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
                {c.rightClients.advisoryLabel}
              </p>
              <ul className="mt-5 space-y-3">
                {c.rightClients.advisory.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.97rem] font-medium ${INK}`}>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <Callout>{c.rightClients.caption}</Callout>
      </Band>

      {/* 2 — Sort every client (tiers) */}
      <Band bg="white">
        <Head title={c.tiers.eyebrow} subtitle={c.tiers.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.tiers.items.map((t) => {
            const s = tier[t.key]
            return (
              <Reveal key={t.name}>
                <article className={`flex h-full flex-col rounded-2xl border bg-white p-6 ${s.border}`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`h-3.5 w-3.5 rounded-full ${s.dot}`} />
                    <h3 className={`font-display text-lg font-bold tracking-wide ${s.text}`}>
                      {t.name}
                    </h3>
                  </div>
                  <p className="mt-3 font-display text-base font-bold text-navy">{t.action}</p>
                  <p className={`mt-2 text-[0.92rem] leading-relaxed ${INK}`}>{t.v}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
        <Callout>{c.tiers.caption}</Callout>
      </Band>

      {/* 3 — Where the tiers come from: value vs. effort */}
      <Band bg="sand">
        <Head title={c.valueEffort.eyebrow} subtitle={c.valueEffort.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {[c.valueEffort.value, c.valueEffort.effort].map((col) => (
            <Reveal key={col.k}>
              <article className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-bold text-navy">{col.k}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it} className={`flex items-start gap-2.5 text-[0.95rem] ${INK}`}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 4 — Firing wrong-fit clients */}
      <Band bg="white">
        <Head title={c.firing.eyebrow} subtitle={c.firing.subtitle} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
              {c.firing.exitLabel}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {c.firing.exit.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                  <span className={`text-[0.97rem] ${INK}`}>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-8 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.firing.hearLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {c.firing.hear.map((h) => (
            <Reveal key={h.q}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
                <p className="font-display text-base font-semibold italic text-navy">{h.q}</p>
                <div className="mt-3 flex items-start gap-2.5">
                  <ArrowRight size={18} className="mt-0.5 shrink-0 text-teal" />
                  <p className={`text-[0.97rem] font-semibold ${INK}`}>{h.a}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 5 — Own a vertical */}
      <Band bg="sand">
        <Head title={c.vertical.eyebrow} subtitle={c.vertical.subtitle} />
        <Reveal>
          <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.vertical.testsLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.vertical.tests.map((t) => (
            <Reveal key={t}>
              <article className="flex h-full items-center rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold text-navy">{t}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 6 — Having the conversation */}
      <Band bg="white">
        <Head title={c.conversation.eyebrow} subtitle={c.conversation.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
                {c.conversation.doLabel}
              </p>
              <ul className="mt-5 space-y-3.5">
                {c.conversation.doSay.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className={`text-[0.97rem] font-medium ${INK}`}>{d}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-[#d6453b]/25 bg-white p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-[#b23a30]">
                {c.conversation.dontLabel}
              </p>
              <ul className="mt-5 space-y-3.5">
                {c.conversation.dontSay.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <X size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#b23a30]" />
                    <span className={`text-[0.97rem] ${INK}`}>{d}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <Callout>{c.conversation.caption}</Callout>
      </Band>

      {/* 7 — Hourly billing punishes you (hourly vs fixed) */}
      <Band bg="sand">
        <Head title={c.hourlyVsFixed.eyebrow} subtitle={c.hourlyVsFixed.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { f: c.hourlyVsFixed.firm1, ok: false },
            { f: c.hourlyVsFixed.firm2, ok: true },
          ].map(({ f, ok }) => (
            <Reveal key={f.name} delay={ok ? 0.1 : 0}>
              <article
                className={`h-full rounded-2xl border p-7 ${
                  ok ? 'border-teal/30 bg-teal/[0.07]' : 'border-[#d6453b]/25 bg-white'
                }`}
              >
                <h3 className="font-display text-xl font-bold text-navy">{f.name}</h3>
                <p className="mt-1 font-display text-base font-semibold italic text-navy">{f.tag}</p>
                <ul className="mt-5 space-y-3">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      {ok ? (
                        <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                      ) : (
                        <X size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#b23a30]" />
                      )}
                      <span className={`text-[0.97rem] ${ok ? 'font-medium' : ''} ${INK}`}>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 8 — How fixed monthly pricing works */}
      <Band bg="white">
        <Head title={c.fixedPricing.eyebrow} subtitle={c.fixedPricing.subtitle} />
        <div className="mt-12 space-y-4">
          {c.fixedPricing.items.map((t, i) => (
            <Reveal key={t} delay={Math.min(i * 0.05, 0.2)}>
              <div className="flex gap-5 rounded-2xl border border-line bg-cream p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-white">
                  {i + 1}
                </span>
                <p className={`self-center text-[1.02rem] leading-relaxed ${INK}`}>{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 9 — The pricing window */}
      <Band bg="sand">
        <Head title={c.pricingWindow.eyebrow} subtitle={c.pricingWindow.subtitle} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-line bg-white p-7 sm:p-9">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
              {c.pricingWindow.caseLabel}
            </p>
            <p className={`mt-4 text-[1.02rem] leading-relaxed ${INK}`}>{c.pricingWindow.caseText}</p>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {c.pricingWindow.stats.map((s) => (
            <Reveal key={s.k}>
              <div className="rounded-2xl border border-line bg-white p-6 text-center">
                <p className="font-display text-4xl font-bold text-navy">{s.v}</p>
                <p className={`mt-2 text-sm font-semibold ${INK}`}>{s.k}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Callout>{c.pricingWindow.caption}</Callout>
      </Band>

      {/* 10 — Fixed fee + value-added = advisory */}
      <Band bg="white">
        <Head title={c.advisoryStack.eyebrow} subtitle={c.advisoryStack.subtitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {c.advisoryStack.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="font-display text-2xl font-bold text-navy/25">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Up next (dark) */}
      <Band bg="deep" glow>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-yellow">
            {c.upNext.eyebrow}
          </span>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{c.upNext.text}</p>
          <figure className="mt-8">
            <blockquote className="font-display text-xl font-semibold italic text-white sm:text-2xl">
              “{c.upNext.quote}”
            </blockquote>
            <div className="mt-5 flex items-center gap-1.5">
              <span className="h-1 w-10 rounded-full bg-yellow" />
              <span className="h-1 w-5 rounded-full bg-teal" />
            </div>
          </figure>
        </Reveal>
      </Band>

      {/* Session nav footer */}
      <section className="border-t border-line bg-white py-10">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <Link
            to="/workshops/session-1"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Previous: Session 1
          </Link>
          <Link
            to="/workshops/session-3"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:-translate-y-0.5 hover:bg-navy-deep"
          >
            Next: Session 3
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  )
}
