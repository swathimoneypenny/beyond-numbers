import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import FloatingRegister from './FloatingRegister'

/* Resets scroll to top on every route change (default browser behavior with
   SPA routing keeps the old scroll position). Skips when the new URL carries a
   hash — ScrollToHash owns the scroll in that case, so we don't jump to top
   first and then back down. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])
  return null
}

/* Smooth-scrolls to an on-page anchor (e.g. /#pricing) when the URL has a hash.
   The Register CTAs are React Router <Link to="/#pricing"> and don't scroll on
   their own; this also handles the cross-page case — clicking Register from
   another route navigates home, and the deferred rAF runs after the home page
   has mounted so the target exists. Depends on pathname too so a same-hash jump
   from a different page still fires. */
function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    let raf1
    let raf2
    const scroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // Two frames: let the (possibly just-mounted) route paint and lay out first.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(scroll)
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <ScrollToHash />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingRegister />
      <BackToTop />
    </div>
  )
}
