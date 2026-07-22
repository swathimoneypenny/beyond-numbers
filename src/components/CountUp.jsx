import { useEffect, useRef, useState } from 'react'

/* Counts every number inside a string up from 0 when it scrolls into view (once).
   Preserves all non-numeric characters (%, x, –, →, etc.) so formats like
   "40%", "3x", "50–75", "35% → 65% → 95%" animate cleanly and never mangle.
   Falls back to the plain text if there's no number or reduced-motion is set. */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
const NUM = /(\d[\d,]*\.?\d*)/

export default function CountUp({ children, className = '', duration = 1200 }) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const ref = useRef(null)
  const started = useRef(false)
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!/\d/.test(text) || reduce || typeof IntersectionObserver === 'undefined') {
      setDisplay(text)
      return
    }

    const targets = []
    const segments = text.split(NUM).map((part) => {
      if (NUM.test(part) && /^\d[\d,]*\.?\d*$/.test(part)) {
        const clean = part.replace(/,/g, '')
        const decimals = clean.includes('.') ? clean.split('.')[1].length : 0
        targets.push({ value: parseFloat(clean), decimals })
        return { num: true, i: targets.length - 1 }
      }
      return { num: false, raw: part }
    })

    const build = (p) =>
      segments
        .map((s) => (s.num ? (targets[s.i].value * p).toFixed(targets[s.i].decimals) : s.raw))
        .join('')

    setDisplay(build(0))

    const el = ref.current
    if (!el) {
      setDisplay(text)
      return
    }

    let raf
    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration)
        setDisplay(build(easeOutCubic(p)))
        if (p < 1) raf = requestAnimationFrame(tick)
        else setDisplay(text) // restore exact original (commas, spacing)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            run()
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [text, duration])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  )
}
