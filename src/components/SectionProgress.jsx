import { useEffect, useRef, useState } from 'react'

/* Minimal vertical section-progress rail for long session pages (desktop xl+ only).
   Auto-discovers the page's content sections (each <section> with an <h2>),
   highlights the one in view, and smooth-scrolls on click. */
export default function SectionProgress() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(0)
  const elsRef = useRef([])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section')).filter((s) =>
      s.querySelector('h2'),
    )
    if (sections.length < 2) return

    elsRef.current = sections
    setItems(
      sections.map((el, i) => ({
        label: (el.querySelector('h2')?.textContent || `Section ${i + 1}`).trim(),
      })),
    )

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  if (items.length < 2) return null

  const go = (i) => {
    const el = elsRef.current[i]
    if (!el) return
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Section progress"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-2 rounded-full border border-line bg-white/80 px-2.5 py-3 shadow-[0_16px_40px_-22px_rgba(31,12,46,0.45)] backdrop-blur">
        {items.map((it, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={it.label}
              aria-current={i === active ? 'true' : undefined}
              className="group relative flex items-center py-0.5"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === active
                    ? 'h-2.5 w-2.5 bg-teal ring-2 ring-teal/25'
                    : 'h-2 w-2 bg-navy/20 group-hover:bg-navy/45'
                }`}
              />
              <span className="pointer-events-none absolute left-7 max-w-[14rem] truncate rounded-md bg-navy px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {it.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
