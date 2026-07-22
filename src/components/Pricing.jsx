import { Check, Users } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import Button from './Button'
import { pricing, REGISTER_URL } from '../data/content'

/* Premium pricing panel: standard + featured Early Bird cards, then the group
   discount banner and a Register CTA. */
export default function Pricing() {
  return (
    <Section
      id="pricing"
      bg="cream"
      accent="yellow"
      eyebrow="Investment"
      title="Pricing"
    >
      <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
        {pricing.tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.1}>
            <article
              className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                tier.featured
                  ? 'border-transparent bg-navy text-white shadow-[0_30px_70px_-30px_rgba(31,12,46,0.7)] ring-2 ring-yellow/60'
                  : 'border-line bg-white'
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 right-6 rounded-full bg-yellow px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-navy-darker shadow-md">
                  {tier.badge}
                </span>
              )}
              <span
                className={`text-sm font-bold uppercase tracking-[0.14em] ${
                  tier.featured ? 'text-yellow' : 'text-teal'
                }`}
              >
                {tier.name}
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`font-display text-5xl font-bold tracking-tight ${
                    tier.featured ? 'text-white' : 'text-navy'
                  }`}
                >
                  {tier.price}
                </span>
                <span className={tier.featured ? 'text-white/65' : 'text-[#1A1A1A]'}>
                  {tier.unit}
                </span>
              </div>
              <p
                className={`mt-4 flex items-start gap-2.5 text-[0.97rem] leading-relaxed ${
                  tier.featured ? 'text-white/85' : 'text-[#1A1A1A]'
                }`}
              >
                <Check
                  size={18}
                  strokeWidth={3}
                  className={`mt-0.5 shrink-0 ${tier.featured ? 'text-yellow' : 'text-teal'}`}
                />
                {tier.note}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Group discount banner */}
      <Reveal delay={0.15}>
        <div className="mx-auto mt-6 flex max-w-3xl items-start gap-4 rounded-2xl border border-teal/30 bg-teal/[0.08] p-6 sm:items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
            <Users size={20} />
          </span>
          <p className="text-[1.02rem] leading-relaxed text-[#1A1A1A]">
            <span className="font-bold text-navy">{pricing.groupLabel}: </span>
            {pricing.group}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <Button href={REGISTER_URL} target="_blank" variant="primary" arrow>
          Register Now
        </Button>
      </Reveal>
    </Section>
  )
}
