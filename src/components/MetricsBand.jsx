import Reveal from './Reveal'
import CountUp from './CountUp'
import ParticleBackground from './ParticleBackground'

/* Reusable stats band on deep navy. Each item: { value, suffix?, label }. */
export default function MetricsBand({ id, eyebrow, title, items }) {
  return (
    <section id={id} className="relative overflow-hidden bg-navy">
      {/* warm brand glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/20 blur-3xl" />
      </div>

      <ParticleBackground count={2200} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        {(eyebrow || title) && (
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-yellow">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.6rem]">
                {title}
              </h2>
            )}
          </Reveal>
        )}

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.1}
              className="px-2 text-center lg:border-l lg:border-white/10 lg:first:border-l-0"
            >
              <p className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
                <CountUp>{m.value}</CountUp>
                {m.suffix && (
                  <span className="ml-1 text-2xl font-bold text-yellow sm:text-3xl">{m.suffix}</span>
                )}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.1em] text-white/60">
                {m.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
