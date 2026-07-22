import Hero from '../components/Hero'
import Section from '../components/Section'
import CardGrid from '../components/CardGrid'
import MetricsBand from '../components/MetricsBand'
import Accordion from '../components/Accordion'
import RichBody from '../components/RichBody'
import CTABand from '../components/CTABand'
import SessionSchedule from '../components/SessionSchedule'
import Pricing from '../components/Pricing'
import Sponsors from '../components/Sponsors'
import {
  heroBox,
  challenges,
  workThrough,
  helps,
  metrics,
  accordions,
  faqs,
  REGISTER_URL,
} from '../data/content'

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
        title="CAS Playbook: From Scorekeeper to Strategist"
        description={
          <>
            Build a more{' '}
            <strong className="font-semibold text-white">
              valuable, scalable, and advisory-focused
            </strong>{' '}
            accounting practice. Transformation doesn’t happen by adding more apps or working
            harder — <strong className="font-semibold text-white">it starts with clarity.</strong>
          </>
        }
        box={heroBox}
        primary={{ label: 'Register Now', href: REGISTER_URL, newTab: true }}
        secondary={{ label: 'View Sessions', href: '#sessions', arrow: true }}
      />

      {/* 2 — Why this transformation matters */}
      <Section
        id="why"
        bg="white"
        accent="teal"
        eyebrow="The Challenge"
        title="Why This Transformation Matters"
        intro="The profession is shifting. These are the pressures pushing firms to rethink how they work — and why clarity comes before tools."
      >
        <CardGrid items={challenges} columns={3} />
      </Section>

      {/* 3 — What you'll work through */}
      <Section
        id="work-through"
        bg="sand"
        accent="yellow"
        eyebrow="The Curriculum"
        title="What You'll Work Through"
        intro="Four connected working sessions that move you from strategy to a concrete, sequenced plan."
      >
        <CardGrid items={workThrough} columns={4} />
      </Section>

      {/* 4 — How the series helps */}
      <Section
        id="how-it-helps"
        bg="white"
        accent="teal"
        eyebrow="The Outcomes"
        title="How the Series Helps You"
        intro="Tangible outputs you'll walk away with — practical tools, not theory."
      >
        <CardGrid items={helps} columns={4} />
      </Section>

      {/* 5 — Metrics band */}
      <MetricsBand
        id="at-a-glance"
        eyebrow="By the numbers"
        title="The Program at a Glance"
        items={metrics}
      />

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

      {/* 6c — Pricing */}
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
        primary={{ label: 'Register Now', href: REGISTER_URL, newTab: true }}
        secondary={{ label: 'View All Workshops', to: '/workshops', arrow: true }}
        note="Sessions begin August 5, 2026"
      />
    </>
  )
}
