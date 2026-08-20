import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import ParticleBackground from '../components/ParticleBackground'
import { articles } from '../data/blog'

export default function Blog() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-hero-dark text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-purple/25 blur-3xl" />
          <div className="absolute -left-40 top-44 h-[30rem] w-[30rem] rounded-full bg-teal/12 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <ParticleBackground count={2200} />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pb-16 pt-36 text-center sm:px-8 sm:pt-44">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-yellow backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              Blog
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              The Beyond Numbers blog
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Practical perspectives on building a modern accounting firm beyond compliance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Article list ===== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={Math.min(i * 0.08, 0.3)}>
                <Link
                  to={`/blog/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_14px_34px_-18px_rgba(61,15,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-teal/40 hover:shadow-[0_36px_60px_-28px_rgba(61,15,82,0.45)] sm:p-8"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">Article</span>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug text-navy sm:text-2xl">
                    {a.title}
                  </h2>
                  <p className="mt-3.5 text-[0.95rem] leading-relaxed text-ink/65">{a.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-teal">
                    Read article
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
