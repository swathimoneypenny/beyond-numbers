import { useEffect, useState } from 'react'

/* Thin on-brand reading-progress bar at the very top of the page.
   Only shows when the page is long enough to be worth tracking. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setShow(max > 400)
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (!show) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-yellow via-teal to-purple transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
