import { Suspense, lazy, useEffect, useRef, useState } from 'react'

/* Lazy wrapper for the three.js particle field.

   - Code-splits three.js: ParticleField is only fetched when a section that
     uses it actually scrolls near the viewport (React.lazy + dynamic import).
   - Mounts the field only while the section is on screen and unmounts it when
     it leaves, so idle sections hold no WebGL context.
   - Respects prefers-reduced-motion: renders nothing at all, leaving each
     section's own gradient background untouched.

   Drop it as the first child of a `relative overflow-hidden` section, behind a
   `relative z-10` content wrapper. */

const ParticleField = lazy(() => import('./ParticleField'))

export default function ParticleBackground({ count = 2200, className = '' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setAllowed(false)
      return
    }

    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '150px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {allowed && active && (
        <Suspense fallback={null}>
          <ParticleField count={count} />
        </Suspense>
      )}
    </div>
  )
}
