import { Link } from 'react-router-dom'
import { Mail, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import { REGISTER_URL } from '../data/content'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Games', to: '/games' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Videos', to: '/videos' },
  { label: 'Login', to: '/login' },
  { label: 'Checklists', to: '/checklists' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.1fr]">
          {/* Brand + tagline */}
          <div>
            <Logo variant="stacked" className="h-20 w-auto" />
            <p className="mt-7 max-w-sm font-display text-xl font-semibold leading-snug text-navy">
              “When it comes to running a successful accounting firm, it’s not just the numbers.”
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
              Explore
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[0.95rem] text-ink/70 transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
              Get in touch
            </h2>
            <a
              href="mailto:contact@beyond-numbers.com"
              className="mt-5 inline-flex items-center gap-3 text-[0.95rem] font-medium text-navy transition-colors hover:text-teal"
            >
              <Mail size={18} className="text-teal" />
              contact@beyond-numbers.com
            </a>
            <div className="mt-6">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:-translate-y-0.5 hover:bg-navy-deep"
              >
                Register for the series
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-7 text-sm text-ink/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Beyond Numbers. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Built by
            <span className="font-semibold text-teal">MoneyPenny</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
