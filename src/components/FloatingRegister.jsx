import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { REGISTER_URL } from '../data/content'

/* Floating Register CTA — appears mid-scroll, hides near the top and near the
   footer. Sits above the Back-to-top button (bottom-right stack) so neither
   overlaps the other. Opens the external registration in a new tab. */
export default function FloatingRegister() {
  const [show, setShow] = useState(false)
  const [modalCount, setModalCount] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const distFromBottom = document.documentElement.scrollHeight - (y + window.innerHeight)
      setShow(y > 500 && distFromBottom > 320)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Hide while any modal/popup is open so it doesn't peek behind the overlay.
  useEffect(() => {
    const inc = () => setModalCount((c) => c + 1)
    const dec = () => setModalCount((c) => Math.max(0, c - 1))
    window.addEventListener('bn:modal-open', inc)
    window.addEventListener('bn:modal-close', dec)
    return () => {
      window.removeEventListener('bn:modal-open', inc)
      window.removeEventListener('bn:modal-close', dec)
    }
  }, [])

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.9 },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <AnimatePresence>
      {show && modalCount === 0 && (
        <motion.div {...motionProps} className="fixed bottom-[5.25rem] right-6 z-50">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-navy-deep"
          >
            Register
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
