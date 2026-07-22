import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, X, Users, Target, Handshake } from 'lucide-react'
import SessionHero from '../components/SessionHero'
import SectionProgress from '../components/SectionProgress'
import Reveal from '../components/Reveal'
import {
  INK,
  Band,
  Head,
  Callout,
  ExerciseCard,
  ExerciseJumpBar,
  EXERCISE_ANCHORS,
} from '../components/sessionUI'
import CountUp from '../components/CountUp'
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
  const m = c.matrix
  return (
    <>
      <SectionProgress />

      {/* Header */}
      <SessionHero session={session}>
        <p className="mt-7 max-w-xl rounded-2xl border border-yellow/30 bg-yellow/10 px-5 py-3 font-display text-base font-semibold italic text-yellow">
          “{c.tagline}” <span className="not-italic text-white/70">{c.taglineBy}</span>
        </p>
      </SessionHero>

      <ExerciseJumpBar count={2} />

      {/* 1 — Welcome back */}
      <Band bg="sand">
        <Head title={c.welcome.eyebrow} subtitle={c.welcome.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.welcome.items.map((it) => (
            <Reveal key={it.label}>
              <article className="h-full rounded-2xl border border-line bg-white p-7 shadow-[0_14px_34px_-20px_rgba(61,15,82,0.3)]">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal">
                  {it.label === 'The team' ? <Users size={15} /> : <Target size={15} />}
                  {it.label}
                </span>
                <p className={`mt-3 text-[1.02rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 2 — A tale of two firms */}
      <Band bg="white">
        <Head title={c.twoFirms.eyebrow} subtitle={c.twoFirms.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { f: c.twoFirms.firm1, ok: false },
            { f: c.twoFirms.firm2, ok: true },
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
        <Callout>{c.twoFirms.caption}</Callout>
      </Band>

      {/* 3 — Building a diverse advisory team */}
      <Band bg="sand">
        <Head title={c.team.eyebrow} subtitle={c.team.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.team.roles.map((r) => (
            <Reveal key={r.name}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold text-navy">{r.name}</h3>
                  <span className="rounded-full bg-teal/12 px-3 py-1 text-xs font-bold text-teal">
                    {r.role}
                  </span>
                </div>
                <p className={`mt-4 leading-relaxed ${INK}`}>{r.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>
          <span className="font-bold">{c.team.insightLabel} </span>
          {c.team.insight}
        </Callout>
      </Band>

      {/* 4 — The BOS */}
      <Band bg="white">
        <Head title={c.bos.eyebrow} subtitle={c.bos.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.bos.traits.map((t) => (
            <Reveal key={t.k}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-lg font-bold text-navy">{t.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{t.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 rounded-2xl border border-navy/15 bg-navy p-7 sm:p-9">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-yellow">
              {c.bos.doesLabel}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.bos.does.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-[0.95rem] text-white/90">
                  <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Band>

      {/* 5 — Admin excellence */}
      <Band bg="sand">
        <Head title={c.admin.eyebrow} subtitle={c.admin.subtitle} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-line bg-white p-7 sm:p-9">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
              {c.admin.caseLabel}
            </p>
            <p className={`mt-4 text-[1.02rem] leading-relaxed ${INK}`}>{c.admin.caseText}</p>
            <p className="mt-4 font-display text-lg font-semibold italic text-navy">
              {c.admin.caseQuote}
            </p>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {c.admin.stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-white p-6 text-center">
                <p className="font-display text-4xl font-bold text-navy">
                  <CountUp>{s.v}</CountUp>
                </p>
                <p className={`mt-2 text-sm font-semibold ${INK}`}>{s.k}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Callout>{c.admin.caption}</Callout>
      </Band>

      {/* 6 — Exercise 1 (live embed) */}
      <Band bg="white" id={EXERCISE_ANCHORS[0]}>
        <ExerciseCard data={c.exercise1} embedId="s2-ex1-team-52-card-pickup" />
      </Band>

      {/* 7 — Who will be your next hire */}
      <Band bg="sand">
        <Head title={c.nextHire.eyebrow} subtitle={c.nextHire.subtitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {c.nextHire.items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="font-display text-2xl font-bold text-navy/25">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{it.k}</h3>
                <p className={`mt-2 text-[0.95rem] leading-relaxed ${INK}`}>{it.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>{c.nextHire.caption}</Callout>
      </Band>

      {/* 8 — Right clients */}
      <Band bg="white">
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

      {/* 9 — Tiers */}
      <Band bg="sand">
        <Head title={c.tiers.eyebrow} subtitle={c.tiers.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.tiers.items.map((t) => {
            const s = tier[t.key]
            return (
              <Reveal key={t.key}>
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

      {/* 10 — Value vs effort matrix */}
      <Band bg="white">
        <Head title={m.eyebrow} subtitle={m.subtitle} />
        <Reveal>
          <div className="mt-12 flex gap-3">
            <div className="flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-wide text-navy/60 [writing-mode:vertical-rl] rotate-180">
                {m.axisY}
              </span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3">
                {['fire', 'silver', 'bronze', 'gold'].map((key) => {
                  const q = m.quadrants[key]
                  const s = tier[key]
                  return (
                    <div key={key} className={`rounded-2xl border p-6 ${s.border} ${s.soft}`}>
                      <div className="flex items-center gap-2.5">
                        <span className={`h-3 w-3 rounded-full ${s.dot}`} />
                        <h3 className={`font-display text-lg font-bold tracking-wide ${s.text}`}>
                          {q.name}
                        </h3>
                      </div>
                      <p className={`mt-2 text-[0.95rem] font-medium ${INK}`}>{q.v}</p>
                    </div>
                  )
                })}
              </div>
              <p className="mt-3 text-center text-xs font-bold uppercase tracking-wide text-navy/60">
                {m.axisX}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {m.scoreLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {[m.value, m.effort].map((col) => (
            <Reveal key={col.k}>
              <article className="h-full rounded-2xl border border-line bg-cream p-6">
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

      {/* 11 — Exercise 2 (live embed) */}
      <Band bg="sand" id={EXERCISE_ANCHORS[1]}>
        <ExerciseCard data={c.exercise2} embedId="s2-ex2-client-portfolio-matrix" />
      </Band>

      {/* 12 — Firing wrong-fit clients */}
      <Band bg="white">
        <Head title={c.firing.eyebrow} subtitle={c.firing.subtitle} />
        <Reveal>
          <div className="mt-10 rounded-2xl border border-teal/30 bg-teal/[0.07] p-7">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-teal">
              {c.firing.exitLabel}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
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

      {/* 13 — Own a vertical */}
      <Band bg="sand">
        <Head title={c.vertical.eyebrow} subtitle={c.vertical.subtitle} />
        <Reveal>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {c.vertical.examples.map((ex) => (
              <span
                key={ex}
                className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy"
              >
                {ex}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-8 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.vertical.testsLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.vertical.tests.map((t) => (
            <Reveal key={t.k}>
              <article className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold text-navy">{t.k}</h3>
                <p className={`mt-2 text-[0.92rem] leading-relaxed ${INK}`}>{t.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Callout>{c.vertical.caption}</Callout>
      </Band>

      {/* 14 — Restaurant success story */}
      <Band bg="white">
        <Head title={c.restaurant.eyebrow} subtitle={c.restaurant.subtitle} />
        <div className="mt-12 grid gap-3.5">
          {c.restaurant.steps.map((s, i) => (
            <Reveal key={s} delay={Math.min(i * 0.05, 0.25)}>
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-cream p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className={`text-[1.02rem] ${INK}`}>{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {c.restaurant.results.map((r, i) => (
            <Reveal key={r.k} delay={i * 0.08}>
              <div className="rounded-2xl border border-teal/30 bg-teal/[0.07] p-6 text-center">
                <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
                  <CountUp>{r.v}</CountUp>
                </p>
                <p className={`mt-2 text-sm font-semibold ${INK}`}>{r.k}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 15 — Having the conversation */}
      <Band bg="sand">
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
        <Reveal>
          <p className="mt-10 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-navy/60">
            {c.conversation.actsLabel}
          </p>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {c.conversation.acts.map((a) => (
            <Reveal key={a.k}>
              <article className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold text-navy">{a.k}</h3>
                <p className={`mt-2 text-[0.97rem] italic leading-relaxed ${INK}`}>{a.v}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 16 — 30-day commitments */}
      <Band bg="white">
        <Head title={c.commitments.eyebrow} subtitle={c.commitments.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[c.commitments.team, c.commitments.clients].map((col, idx) => (
            <Reveal key={col.label} delay={idx * 0.1}>
              <article className="h-full rounded-2xl border border-line bg-cream p-7">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-teal">
                  {idx === 0 ? <Users size={15} /> : <Target size={15} />}
                  {col.label}
                </span>
                <ul className="mt-5 space-y-3.5">
                  {col.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                      <span className={`text-[0.97rem] ${INK}`}>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 17 — Pair up */}
      <Band bg="sand">
        <Head title={c.pairUp.eyebrow} subtitle={c.pairUp.subtitle} />
        <Reveal>
          <div className="mt-8 flex items-center gap-3.5">
            <Handshake size={22} className="shrink-0 text-teal" />
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-navy/60">
              Find one person · Exchange commitments · Schedule the check-in
            </span>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {c.pairUp.steps.map((s) => (
            <Reveal key={s.n}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{s.k}</h3>
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

      {/* 19 — Up next (dark) */}
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
