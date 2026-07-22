import Reveal from './Reveal'

/* Consistent section scaffold used across every page:
   warm-pill eyebrow + H2 title + optional intro, then children.
   `bg` picks a warm surface; `align` controls header alignment. */
const bgMap = {
  white: 'bg-white',
  cream: 'bg-cream',
  sand: 'bg-sand',
}

const accentMap = {
  teal: { text: 'text-teal', dot: 'bg-teal' },
  purple: { text: 'text-purple', dot: 'bg-purple' },
  yellow: { text: 'text-[#a07f00]', dot: 'bg-yellow' },
}

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  bg = 'white',
  align = 'center',
  accent = 'teal',
  className = '',
  headerClassName = '',
}) {
  const centered = align === 'center'
  const a = accentMap[accent] || accentMap.teal
  return (
    <section id={id} className={`${bgMap[bg]} py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {(eyebrow || title || intro) && (
          <Reveal
            className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${headerClassName}`}
          >
            {eyebrow && (
              <span
                className={`inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm ${a.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.12] tracking-tight text-navy sm:text-[2.6rem]">
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-5 text-lg font-medium leading-relaxed text-ink/70 ${centered ? '' : 'max-w-xl'}`}
              >
                {intro}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
