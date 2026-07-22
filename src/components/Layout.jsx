import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactPopup from './ContactPopup'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import FloatingRegister from './FloatingRegister'

/* Resets scroll to top on every route change (default browser behavior with
   SPA routing keeps the old scroll position). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingRegister />
      <BackToTop />
      <ContactPopup />
    </div>
  )
}
