import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Reveal from './Reveal'

/* Reusable, on-brand "coming soon" scaffold for sections still in production. */
export default function PagePlaceholder({ eyebrow, title, description, icon: Icon }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-32 h-[32rem] w-[32rem] rounded-full bg-yellow/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-[78vh] max-w-[1240px] flex-col justify-center px-5 py-32 sm:px-8">
        <Reveal className="max-w-2xl">
          {Icon && (
            <span className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal">
              <Icon size={26} strokeWidth={1.9} />
            </span>
          )}

          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-teal shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            {eyebrow}
          </span>

          <h1 className="mt-6 font-display text-[2.8rem] font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
            {title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink/65">{description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow/50 bg-sand px-4 py-2 text-sm font-semibold text-navy">
              <span className="h-2 w-2 rounded-full bg-yellow" />
              Coming soon
            </span>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
