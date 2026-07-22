import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* Reusable action button. Renders a router <Link> when `to` is set,
   otherwise an <a> (for hash anchors / external). Shared across all pages. */
const variants = {
  primary:
    'bg-navy text-white shadow-lg shadow-navy/25 hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-xl hover:shadow-navy/30',
  teal:
    'bg-teal text-white shadow-lg shadow-teal/30 hover:-translate-y-0.5 hover:bg-teal-deep hover:shadow-xl hover:shadow-teal/35',
  yellow:
    'bg-yellow text-navy-darker shadow-lg shadow-yellow/30 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl hover:shadow-yellow/35',
  outline:
    'border border-navy/25 bg-white text-navy hover:-translate-y-0.5 hover:border-teal/60 hover:text-teal',
  ghostLight:
    'border border-white/30 bg-white/10 text-white backdrop-blur hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20',
  outlineYellow:
    'border border-yellow/70 bg-transparent text-yellow hover:-translate-y-0.5 hover:border-yellow hover:bg-yellow/10',
  light:
    'bg-white text-navy shadow-lg shadow-black/15 hover:-translate-y-0.5 hover:bg-cream',
}

export default function Button({
  children,
  to,
  href = '#',
  variant = 'primary',
  arrow = false,
  className = '',
  ...rest
}) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-200 active:translate-y-0 active:brightness-95 ${variants[variant]} ${className}`
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      )}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  // Auto-add rel for security when opening in a new tab.
  const relAttr = rest.target === '_blank' ? rest.rel ?? 'noopener noreferrer' : rest.rel
  return (
    <a href={href} className={cls} {...rest} rel={relAttr}>
      {inner}
    </a>
  )
}
