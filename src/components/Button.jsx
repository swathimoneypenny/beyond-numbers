import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* Reusable action button. Renders a router <Link> when `to` is set,
   otherwise an <a> (for hash anchors / external). Shared across all pages.

   The lift + soft shadow + gradient glow on hover is centralized in the
   `.btn-premium` class (index.css) so every button — here and the standalone
   ones across the site — shares ONE consistent premium hover. Variants below
   only set each button's colour role (bg/border/text + colour transition). */
const variants = {
  primary: 'bg-navy text-white hover:bg-navy-deep',
  teal: 'bg-teal text-white hover:bg-teal-deep',
  yellow: 'bg-yellow text-navy-darker hover:brightness-105',
  outline: 'border border-navy/25 bg-white text-navy hover:border-teal/60 hover:text-teal',
  ghostLight: 'border border-white/30 bg-white/10 text-white backdrop-blur hover:border-white/60 hover:bg-white/20',
  outlineYellow: 'border border-yellow/70 bg-transparent text-yellow hover:border-yellow hover:bg-yellow/10',
  light: 'bg-white text-navy hover:bg-cream',
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
  const cls = `btn-premium group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-colors duration-200 ${variants[variant]} ${className}`
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
