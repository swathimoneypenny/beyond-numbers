import Reveal from './Reveal'
import { icons } from '../lib/icons'

/* Reusable card grid. Each item: { icon?, tag?, title, text }.
   Renders H3 card titles for clean heading hierarchy. */
const colsMap = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

/* Alternate the two accents (teal + yellow) across card icon chips. */
const accents = [
  { chip: 'bg-teal/12 text-teal', hover: 'group-hover:bg-teal group-hover:text-white', tag: 'text-teal' },
  { chip: 'bg-yellow/20 text-[#a07f00]', hover: 'group-hover:bg-yellow group-hover:text-navy', tag: 'text-[#a07f00]' },
]

export default function CardGrid({ items, columns = 3, className = '' }) {
  return (
    <div className={`mt-14 grid gap-6 ${colsMap[columns]} ${className}`}>
      {items.map((item, i) => {
        const Icon = item.icon ? icons[item.icon] : null
        const accent = accents[i % accents.length]
        return (
          <Reveal key={item.title} delay={Math.min(i * 0.07, 0.28)}>
            <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_14px_34px_-18px_rgba(61,15,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-teal/40 hover:shadow-[0_36px_60px_-28px_rgba(61,15,82,0.45)]">
              {Icon && (
                <span
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${accent.chip} ${accent.hover}`}
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
              )}
              {item.tag && (
                <span className={`mb-2 text-xs font-semibold uppercase tracking-[0.14em] ${accent.tag}`}>
                  {item.tag}
                </span>
              )}
              <h3 className="font-display text-lg font-bold leading-snug text-navy">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/70">{item.text}</p>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
