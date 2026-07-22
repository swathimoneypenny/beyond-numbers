import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, UserRound } from 'lucide-react'
import Logo from './Logo'
import { REGISTER_URL } from '../data/content'
import { useAuth } from '../context/AuthContext'

// Trimmed for launch — Games, Workshops, Checklists routes still exist; just hidden
// from the top nav for now. Re-add here to bring them back.
// Blog and About Us are staged but hidden: flip `enabled: true` (and add their
// routes/pages) to show them in the nav.
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Videos', to: '/videos' },
  { label: 'Login', to: '/login' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Blog', to: '/blog', enabled: false },
  { label: 'About Us', to: '/about', enabled: false },
]
const visibleLinks = navLinks.filter((link) => link.enabled !== false)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  // Signed-in users don't need the "Login" item; they get their email + Log out.
  const links = visibleLinks.filter((l) => !(isAuthenticated && l.to === '/login'))

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-navy-deep/95 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'border-white/5 bg-navy-deep/80 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-[80px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
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
          {links.map((link) => (
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
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-teal transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
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
            className="hidden rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal/30 transition-all hover:-translate-y-0.5 hover:bg-teal-deep sm:inline-flex"
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
              {links.map((link) => (
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
              ))}
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
