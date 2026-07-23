import { useEffect, useRef } from 'react'
import { motion, useAnimation, useReducedMotion } from 'framer-motion'

/* Shared scroll reveal used site-wide.

   Elements start at opacity 0 / translateY(60px) and spring up into place when
   they scroll into view. The spring is intentionally under-damped (stiffness
   220, damping 11) so it visibly overshoots and settles.

   Driven by a real IntersectionObserver + framer-motion `useAnimation` rather
   than `whileInView`, which has been unreliable in production builds here.
   Re-triggers every time the element enters the viewport — scrolling DOWN and
   back UP — by animating back out when it leaves.

   Stagger: pass an explicit `delay`, otherwise it derives ~0.1s per sibling
   index so grid items pop one after another.

   Honors prefers-reduced-motion: renders static, no transform, no observer. */

const SPRING = { type: 'spring', stiffness: 220, damping: 11 }
const HIDDEN = { opacity: 0, y: 60 }
const SHOWN = { opacity: 1, y: 0 }

export default function Reveal({ children, delay, className = '', once = false, as = 'div', ...rest }) {
  const ref = useRef(null)
  const controls = useAnimation()
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Stagger: explicit delay wins, else derive from sibling index (~0.1s apart,
    // capped so long lists don't drift too far).
    let d = delay
    if (d == null && el.parentElement) {
      const idx = Math.max(0, Array.from(el.parentElement.children).indexOf(el))
      d = Math.min(idx, 5) * 0.1
    }
    d = d || 0

    // Reduced motion or no observer: show immediately, no animation.
    if (reduce || typeof IntersectionObserver === 'undefined') {
      controls.set(SHOWN)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ ...SHOWN, transition: { ...SPRING, delay: d } })
          if (once) io.unobserve(el)
        } else if (!once) {
          // Ease back out so it replays on the next entry (down or up).
          controls.start({ ...HIDDEN, transition: { duration: 0.2, ease: 'easeOut' } })
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [controls, delay, once, reduce])

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduce ? false : HIDDEN}
      animate={controls}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
