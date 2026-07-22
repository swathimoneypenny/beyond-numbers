import { useEffect, useRef } from 'react'

/* Shared scroll reveal used site-wide: pure-CSS bounce toggled by a plain
   IntersectionObserver (no framer-motion) so it runs reliably in the production
   build.
   - The element carries the `.reveal` class (hidden: opacity 0, translateY 70px).
     When it scrolls into view the observer adds `.is-visible`, which animates it
     up with a cubic-bezier overshoot bounce (see index.css).
   - Resets to hidden when it leaves the viewport, so it replays on scroll DOWN
     and UP (threshold 0.15 + a bottom rootMargin for edge hysteresis).
   - Optional `delay` (or an auto sibling-index stagger ~0.1s) is applied as
     transition-delay so grid items pop one after another.
   - Honors prefers-reduced-motion (static, no transform). */
export default function Reveal({
  children,
  delay,
  className = '',
  once = false,
  as: Tag = 'div',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Stagger: explicit delay, else derive from sibling index (~0.1s apart).
    let d = delay
    if (d == null && el.parentElement) {
      const idx = Math.max(0, Array.from(el.parentElement.children).indexOf(el))
      d = Math.min(idx, 5) * 0.1
    }
    if (d) el.style.transitionDelay = `${d}s`

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reduced motion or no observer support: just show it, no animation.
    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          if (once) io.unobserve(el)
        } else if (!once) {
          el.classList.remove('is-visible')
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay, once])

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
