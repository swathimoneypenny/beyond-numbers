import { Check, X } from 'lucide-react'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Accordion from '../components/Accordion'
import RichBody from '../components/RichBody'
import CTABand from '../components/CTABand'
import SessionSchedule from '../components/SessionSchedule'
import Pricing from '../components/Pricing'
import Sponsors from '../components/Sponsors'
import {
  heroBox,
  decisionsSection,
  workOnSection,
  methodSection,
  formatSection,
  toolsSection,
  whyNovemberSection,
  audienceSection,
  offerSection,
  accordions,
  faqs,
  REGISTER_URL,
} from '../data/content'

// Words the GooeyText accent morphs through, in the hero and the final CTA.
const MORPH_WORDS = ['Scalable', 'Advisory-focused', 'Profitable', 'Strategic']

export default function Home() {
  const seriesItems = accordions.map((a) => ({
    key: a.id,
    eyebrow: a.eyebrow,
    title: a.title,
    subtitle: a.subtitle,
    body: <RichBody body={a.body} />,
  }))

  const faqItems = faqs.map((f, i) => ({
    key: `faq-${i}`,
    title: f.q,
    body: <p className="max-w-3xl text-[1.02rem] leading-relaxed text-ink/70">{f.a}</p>,
  }))

  return (
    <>
      {/* 1 — Hero (single H1) */}
      <Hero
        eyebrow="Workshops · From Scorekeeper to Strategist"
        title="From Scorekeeper to Strategist"
        tagline="Make the decisions your 2027 firm needs."
        description={
          <>
            You already know advisory matters. The harder question is what it should mean for
            your firm—and what needs to change first. Join Penny Breslin and Damien Greathead for
            four live, 90-minute working sessions. Bring the reality of your own practice. Use
            practical Beyond Numbers tools to make decisions about services, people, clients,
            technology, AI and procedures. Leave with work completed and clear next actions—not
            another set of webinar notes.
          </>
        }
        meta="November 5–December 3, 2026 · Four live sessions · 6 CPE credits · US$199"
        box={heroBox}
        morphTexts={MORPH_WORDS}
        primary={{ label: 'Reserve my place — US$199', href: REGISTER_URL, newTab: true }}
        secondary={{ label: 'View Sessions', href: '#sessions', arrow: true }}
      />

      {/* 2 — The unresolved decisions */}
      <Section id="decisions" bg="white" accent="teal" title={decisionsSection.title} intro={decisionsSection.subhead}>
        <Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[1.05rem] leading-relaxed text-ink/70">
            {decisionsSection.body}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {decisionsSection.points.map((p, i) => (
            <Reveal key={p} delay={Math.min(i * 0.06, 0.3)}>
              <article className="flex h-full items-start gap-3.5 rounded-2xl border border-line bg-white p-6 shadow-[0_14px_34px_-22px_rgba(61,15,82,0.25)]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />
                <p className="text-[0.98rem] leading-relaxed text-ink/80">{p}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-yellow/40 bg-yellow/[0.1] p-6 text-center sm:p-7">
            <p className="text-[1.05rem] font-semibold leading-relaxed text-ink/85">
              {decisionsSection.closing}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 3 — What you will actually work on */}
      <Section id="work-on" bg="sand" accent="yellow" title={workOnSection.title} intro={workOnSection.subhead}>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workOnSection.items.map((item, i) => (
            <Reveal key={item} delay={Math.min(i * 0.06, 0.3)}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_14px_34px_-18px_rgba(61,15,82,0.3)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy font-display text-base font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-ink/75">{item}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — The Practice Decisions Method */}
      <Section id="method" bg="white" accent="teal" title={methodSection.title} intro={methodSection.subhead}>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methodSection.steps.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <span className="font-display text-3xl font-bold text-teal/40">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{s.label}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-navy/15 bg-navy p-7 text-center sm:p-8">
            <p className="text-[1.05rem] font-semibold leading-relaxed text-white">
              {methodSection.closing}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 5 — How the live format works */}
      <Section id="format" bg="sand" accent="yellow" title={formatSection.title} intro={formatSection.subhead}>
        <Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[1.05rem] font-medium text-ink/70">
            {formatSection.intro}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {formatSection.steps.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{s.label}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-ink/70">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6 — Inside the series (accordion) */}
      <Section
        id="sessions"
        bg="cream"
        accent="yellow"
        eyebrow="Full Program"
        title="Inside the Series"
        intro="Expand any module to see the full detail — the substance behind every session."
      >
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={seriesItems} showIndex defaultOpenKeys={[seriesItems[0].key]} />
        </div>
      </Section>

      {/* 6b — Session schedule + CPE */}
      <SessionSchedule />

      {/* 6c — The tools behind the work */}
      <Section id="tools" bg="sand" accent="teal" title={toolsSection.title} intro={toolsSection.subhead}>
        <Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[1.05rem] leading-relaxed text-ink/70">
            {toolsSection.intro}
          </p>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {toolsSection.items.map((item, i) => (
            <Reveal key={item} delay={Math.min(i * 0.05, 0.3)}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-white p-4">
                <Check size={18} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                <span className="text-[0.97rem] leading-relaxed text-ink/80">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-lg font-semibold italic text-navy">
            {toolsSection.closing}
          </p>
        </Reveal>
      </Section>

      {/* 6d — Why November */}
      <Section id="why-november" bg="white" accent="teal" title={whyNovemberSection.title}>
        <Reveal>
          <p className="mx-auto mt-8 max-w-3xl text-center text-[1.1rem] leading-relaxed text-ink/75">
            {whyNovemberSection.body}
          </p>
        </Reveal>
      </Section>

      {/* 6e — Who should attend, and who should not */}
      <Section id="audience" bg="sand" accent="teal" title={audienceSection.title}>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-2xl border border-teal/30 bg-teal/[0.06] p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-navy">{audienceSection.forLabel}</h3>
              <ul className="mt-5 space-y-3.5">
                {audienceSection.forItems.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <Check size={18} strokeWidth={3} className="mt-0.5 shrink-0 text-teal" />
                    <span className="text-[0.97rem] leading-relaxed text-ink/80">{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="h-full rounded-2xl border border-line bg-white p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-navy">{audienceSection.notLabel}</h3>
              <ul className="mt-5 space-y-3.5">
                {audienceSection.notItems.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <X size={18} strokeWidth={3} className="mt-0.5 shrink-0 text-ink/40" />
                    <span className="text-[0.97rem] leading-relaxed text-ink/70">{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* 6f — The offer (directly above pricing) */}
      <Section id="offer" bg="white" accent="yellow" title={offerSection.title}>
        <Reveal>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-navy/12 bg-navy p-8 text-center sm:p-10">
            <p className="text-[1.12rem] font-medium leading-relaxed text-white sm:text-[1.2rem]">
              {offerSection.body}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 6g — Pricing */}
      <Pricing />

      {/* 6d — Sponsors & partners */}
      <Sponsors />

      {/* 7 — FAQ */}
      <Section
        id="faq"
        bg="white"
        accent="teal"
        eyebrow="Questions"
        title="Frequently Asked Questions"
        intro="Everything you need to know before you register."
      >
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={faqItems} defaultOpenKeys={[faqItems[0].key]} />
        </div>
      </Section>

      {/* 8 — Final CTA */}
      <CTABand
        title="Ready to move from scorekeeper to strategist?"
        subtitle="Build a more strategic, scalable, and valuable accounting practice — and leave with a sequenced 90-day plan."
        morphTexts={MORPH_WORDS}
        primary={{ label: 'Register Now', href: REGISTER_URL, newTab: true }}
        secondary={{ label: 'View All Workshops', to: '/workshops', arrow: true }}
        note="Sessions begin November 5, 2026"
      />
    </>
  )
}
