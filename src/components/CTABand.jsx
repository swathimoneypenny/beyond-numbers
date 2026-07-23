import Reveal from './Reveal'
import Button from './Button'
import ParticleBackground from './ParticleBackground'
import TextShimmer from './TextShimmer'
import GooeyText from './GooeyText'

/* Reusable closing CTA band on the warm navy→teal gradient. */
export default function CTABand({ id = 'register', title, subtitle, primary, secondary, note, morphTexts }) {
  return (
    <section id={id} className="relative overflow-hidden bg-cta-gradient">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-0 h-80 w-80 rounded-full bg-yellow/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <ParticleBackground count={2400} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-24 text-center sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-[2.2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[3rem]">
            <TextShimmer as="span" duration={3.5} base="#ffffff" shine="var(--color-yellow)">
              {title}
            </TextShimmer>
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">{subtitle}</p>
          )}

          {morphTexts?.length > 0 && (
            <div className="mt-8">
              <GooeyText
                texts={morphTexts}
                align="center"
                textClassName="text-yellow"
                heightClassName="h-11 sm:h-12"
              />
            </div>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primary && (
              <Button
                href={primary.href}
                to={primary.to}
                target={primary.newTab ? '_blank' : undefined}
                variant="teal"
                arrow={primary.arrow}
              >
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button
                href={secondary.href}
                to={secondary.to}
                target={secondary.newTab ? '_blank' : undefined}
                variant="ghostLight"
                arrow={secondary.arrow}
              >
                {secondary.label}
              </Button>
            )}
          </div>

          {note && <p className="mt-6 text-sm font-medium text-white/70">{note}</p>}
        </Reveal>
      </div>
    </section>
  )
}
