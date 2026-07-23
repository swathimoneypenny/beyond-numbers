import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, UserRound, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import { REGISTER_URL } from '../data/content'
import { useAuth } from '../context/AuthContext'

// Trimmed for launch — Games, Workshops, Checklists routes still exist; just hidden
// from the top nav for now. Re-add here to bring them back.
// "Resources" is a nested menu; its children each have their own route.
// About Us is staged but hidden: flip `enabled: true` (and add its route/page).
const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Resources',
    children: [
      { label: 'Videos', to: '/videos' },
      { label: 'Blog', to: '/blog' },
      { label: 'Podcast', to: '/podcast' },
    ],
  },
  { label: 'Login', to: '/login' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'About Us', to: '/about', enabled: false },
]
const visibleLinks = navLinks.filter((link) => link.enabled !== false)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // desktop dropdown label
  const [mobileSub, setMobileSub] = useState(null) // expanded mobile sub-menu label
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const navRef = useRef(null)

  // Signed-in users don't need the "Login" item; they get their email + Log out.
  const links = visibleLinks.filter((l) => !(isAuthenticated && l.to === '/login'))

  // A dropdown trigger reads as active when one of its children is the route.
  const childActive = (link) => link.children?.some((c) => c.to === pathname)

  const onLogout = () => {
    logout()
    setOpen(false)
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the desktop dropdown on outside click (covers click/touch open) and Escape.
  useEffect(() => {
    if (!openMenu) return
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-white/10' : 'border-white/5'
      }`}
    >
      {/* Frosted-glass background lives on this NON-fixed child, not the fixed
          <header>. backdrop-filter on a position:fixed element breaks the fixed
          positioning on iOS Safari, so the header stays plain and this absolute
          layer carries the blur + shadow. */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-deep/80 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150'
            : 'bg-navy-deep/80 backdrop-blur-md'
        }`}
      />

      <nav ref={navRef} className="mx-auto flex h-[80px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
        {/* Logo on a clean white pill so the full navy wordmark stays visible on the dark nav */}
        <Link
          to="/"
          className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5"
          aria-label="Beyond Numbers — home"
        >
          <Logo variant="horizontal" className="h-8 w-auto sm:h-9" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(link.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === link.label}
                  onClick={() =>
                    setOpenMenu((v) => (v === link.label ? null : link.label))
                  }
                  className={`group relative inline-flex items-center gap-1 text-[0.92rem] font-medium tracking-tight transition-colors ${
                    childActive(link) || openMenu === link.label
                      ? 'text-white'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      openMenu === link.label ? 'rotate-180' : ''
                    }`}
                  />
                  <span
                    className="nav-underline"
                    data-active={childActive(link) || openMenu === link.label ? 'true' : 'false'}
                  />
                </button>

                <AnimatePresence>
                  {openMenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      // pt-3 is a transparent hover bridge so the pointer can cross
                      // from trigger to panel without the menu closing.
                      className="absolute left-0 top-full pt-3"
                    >
                      <ul className="min-w-[196px] overflow-hidden rounded-2xl border border-white/10 bg-navy-deep/95 p-1.5 shadow-[0_20px_46px_-18px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <NavLink
                              to={child.to}
                              onClick={() => setOpenMenu(null)}
                              className={({ isActive }) =>
                                `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                                  isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `group relative text-[0.92rem] font-medium tracking-tight transition-colors ${
                      isActive ? 'text-white' : 'text-white/65 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {/* Brand-gradient underline: grows from the left on hover,
                          and stays shown for the active link (see .nav-underline). */}
                      <span className="nav-underline" data-active={isActive ? 'true' : 'false'} />
                    </>
                  )}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          {/* Signed-in identity + logout. Distinct from "Register", which is
              workshop (GoToWebinar) registration, not an account action. */}
          {isAuthenticated && (
            <div className="mr-1 hidden items-center gap-2 lg:flex">
              <span
                title={user?.email ?? ''}
                className="inline-flex max-w-[16rem] items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-sm font-medium text-white/85 backdrop-blur"
              >
                <UserRound size={15} className="shrink-0 text-teal" />
                <span className="truncate">{user?.email}</span>
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}

          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium hidden rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal/30 transition-colors hover:bg-teal-deep sm:inline-flex"
          >
            Register
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-white/10 bg-navy-deep/97 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) =>
                link.children ? (
                  <li key={link.label}>
                    <button
                      type="button"
                      aria-expanded={mobileSub === link.label}
                      onClick={() =>
                        setMobileSub((v) => (v === link.label ? null : link.label))
                      }
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-medium transition-colors ${
                        childActive(link) ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          mobileSub === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileSub === link.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          className="ml-3 overflow-hidden border-l border-white/10 pl-3"
                        >
                          {link.children.map((child) => (
                            <li key={child.label}>
                              <NavLink
                                to={child.to}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                  `block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium transition-colors ${
                                    isActive
                                      ? 'bg-white/10 text-white'
                                      : 'text-white/65 hover:bg-white/10 hover:text-white'
                                  }`
                                }
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.label}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2.5 font-medium transition-colors ${
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ),
              )}
              {isAuthenticated && (
                <li className="mt-2 border-t border-white/10 pt-3">
                  <p className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/70">
                    <UserRound size={15} className="shrink-0 text-teal" />
                    <span className="truncate">{user?.email}</span>
                  </p>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </li>
              )}
              <li className="mt-2">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-teal px-5 py-3 text-center font-semibold text-white"
                >
                  Register
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
