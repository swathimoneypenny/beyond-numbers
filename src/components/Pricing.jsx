import { Check } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import Button from './Button'
import CountUp from './CountUp'
import { pricing, REGISTER_HREF, REGISTER_IS_EXTERNAL } from '../data/content'

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
          <Reveal key={tier.name} delay={i * 0.12}>
            <article
              className={`bn-card relative flex h-full flex-col rounded-2xl border p-8 ${
                tier.featured
                  ? 'animate-pulse-glow border-transparent bg-navy text-white'
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
                <CountUp
                  className={`font-display text-5xl font-bold tracking-tight ${
                    tier.featured ? 'text-white' : 'text-navy'
                  }`}
                >
                  {tier.price}
                </CountUp>
                <span className={tier.featured ? 'text-white/65' : 'text-[#1A1A1A]'}>
                  {tier.unit}
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-[0.97rem] leading-relaxed ${
                      tier.featured ? 'text-white/85' : 'text-[#1A1A1A]'
                    }`}
                  >
                    <Check
                      size={18}
                      strokeWidth={3}
                      className={`mt-0.5 shrink-0 ${tier.featured ? 'text-yellow' : 'text-teal'}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-4">
        <Button
          {...(REGISTER_IS_EXTERNAL
            ? { href: REGISTER_HREF, target: '_blank' }
            : { to: REGISTER_HREF })}
          variant="primary"
          arrow
        >
          Register Now
        </Button>
      </Reveal>
    </Section>
  )
}
