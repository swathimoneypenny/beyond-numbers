import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, ArrowRight } from 'lucide-react'
import { CONTACT_EMAIL, buildContactMailto } from '../lib/contact'

const SHOWN_KEY = 'bn:promoShown' // once-per-session flag (only popup on the site)
const DELAY_MS = 7000

export default function ContactPopup() {
  const [open, setOpen] = useState(false)
  const [opened, setOpened] = useState(false) // mail draft opened (not "sent")
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const dialogRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    // Open the visitor's email app with a pre-filled draft — nothing auto-sends.
    window.location.href = buildContactMailto(form)
    setOpened(true)
  }

  // Auto-open after the delay — only once per browser session.
  useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(SHOWN_KEY) === '1'
    } catch {
      alreadyShown = false
    }
    if (alreadyShown) return

    const timer = setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem(SHOWN_KEY, '1')
      } catch {
        /* ignore (private mode, etc.) */
      }
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  // ESC to close + lock background scroll while open + move focus into the dialog
  // + signal the floating Register button to hide.
  useEffect(() => {
    if (!open) return
    window.dispatchEvent(new Event('bn:modal-open'))
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = setTimeout(() => dialogRef.current?.focus(), 0)

    return () => {
      window.dispatchEvent(new Event('bn:modal-close'))
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      clearTimeout(focusTimer)
    }
  }, [open])

  const inputCls =
    'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple/50 focus:ring-4 focus:ring-purple/10'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-darker/80 p-5 backdrop-blur-sm"
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)] outline-none"
          >
            {/* accent top bar */}
            <div className="flex h-1.5 w-full">
              <span className="flex-1 bg-purple" />
              <span className="flex-1 bg-teal" />
              <span className="flex-1 bg-yellow" />
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close contact popup"
              className="absolute right-4 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-sand hover:text-navy"
            >
              <X size={18} />
            </button>

            <div className="p-7 sm:p-8">
              {opened ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <Mail size={48} className="text-teal" strokeWidth={1.5} />
                  <h2
                    id="contact-popup-title"
                    className="mt-5 font-display text-2xl font-bold text-navy"
                  >
                    Your email is ready to send.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    We’ve opened a pre-filled message to{' '}
                    <span className="font-semibold text-ink">{CONTACT_EMAIL}</span> in your email
                    app — just review it and hit send.
                  </p>
                </div>
              ) : (
                <>
                  <h2
                    id="contact-popup-title"
                    className="font-display text-2xl font-bold tracking-tight text-navy"
                  >
                    Let’s talk
                  </h2>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <span className="h-1 w-10 rounded-full bg-yellow" />
                    <span className="h-1 w-5 rounded-full bg-teal" />
                  </div>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/65">
                    Have a question about the workshop or want to get in touch? We’d love to hear
                    from you.
                  </p>

                  <form className="mt-6 space-y-3.5" onSubmit={onSubmit}>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      aria-label="Name"
                      value={form.name}
                      onChange={set('name')}
                      className={inputCls}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      aria-label="Email"
                      value={form.email}
                      onChange={set('email')}
                      className={inputCls}
                    />
                    <textarea
                      rows={3}
                      required
                      placeholder="Message"
                      aria-label="Message"
                      value={form.message}
                      onChange={set('message')}
                      className={`${inputCls} resize-none`}
                    />
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 font-semibold text-white shadow-lg shadow-navy/25 transition-all hover:bg-navy-deep"
                    >
                      Send
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>

                  <p className="mt-5 text-center text-sm text-ink/55">
                    Or email us at{' '}
                    <a
                      href="mailto:contact@beyond-numbers.com"
                      className="inline-flex items-center gap-1 font-semibold text-purple hover:text-teal"
                    >
                      <Mail size={14} />
                      contact@beyond-numbers.com
                    </a>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
