import { Link } from 'react-router-dom'
import { Mail, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import { REGISTER_HREF, REGISTER_IS_EXTERNAL } from '../data/content'

const footerPrimary = [
  { label: 'Home', to: '/' },
  { label: 'Login', to: '/login' },
  { label: 'Contact Us', to: '/contact' },
]

const footerResources = [
  { label: 'Videos', to: '/videos' },
  { label: 'Blog', to: '/blog' },
  { label: 'Podcast', to: '/podcast' },
]

const footerLinkClass =
  'text-[0.95rem] text-ink/70 transition-colors hover:text-teal'

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
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6">
              <ul className="space-y-3.5">
                {footerPrimary.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                  Resources
                </p>
                <ul className="space-y-3.5">
                  {footerResources.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className={footerLinkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
              {REGISTER_IS_EXTERNAL ? (
                <a
                  href={REGISTER_HREF}
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
              ) : (
                <Link
                  to={REGISTER_HREF}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:-translate-y-0.5 hover:bg-navy-deep"
                >
                  Register for the series
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              )}
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
