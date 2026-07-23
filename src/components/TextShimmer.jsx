import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* TextShimmer — a light sweep that travels across text on a loop.

   Adapted from the motion-primitives text-shimmer component to plain JSX:
   TypeScript types removed, and the shadcn `cn` import from '@/lib/utils'
   replaced with the small `cx` join below. framer-motion animates a
   background-position across a gradient that is clipped to the text.

   On-brand by default: the resting text is `base` and a `shine` band sweeps
   through it. Pass brand colours per placement (e.g. white base + yellow shine
   on dark sections). Honors prefers-reduced-motion by rendering static text. */

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function TextShimmer({
  children,
  as = 'span',
  className = '',
  duration = 2.5,
  spread = 2,
  base = 'var(--color-navy)',
  shine = 'var(--color-teal)',
}) {
  const reduce = useReducedMotion()
  const MotionComponent = useMemo(() => motion[as] || motion.span, [as])

  // Wider text → wider sweep band, so the highlight scales with the string.
  const dynamicSpread = useMemo(
    () => (typeof children === 'string' ? children.length : 12) * spread,
    [children, spread],
  )

  // Reduced motion: no sweep — just the resting brand colour.
  if (reduce) {
    const Tag = as
    return (
      <Tag className={cx('inline-block', className)} style={{ color: base }}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionComponent
      className={cx('relative inline-block bg-clip-text text-transparent', className)}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{ repeat: Infinity, duration, ease: 'linear' }}
      style={{
        '--spread': `${dynamicSpread}px`,
        backgroundImage:
          `linear-gradient(90deg, transparent calc(50% - var(--spread)), ${shine}, transparent calc(50% + var(--spread))),` +
          ` linear-gradient(${base}, ${base})`,
        backgroundSize: '250% 100%, auto',
        backgroundRepeat: 'no-repeat, padding-box',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
    >
      {children}
    </MotionComponent>
  )
}
