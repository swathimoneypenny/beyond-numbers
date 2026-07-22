import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Reveal from './Reveal'

/* Reusable accordion. `items`: [{ key, eyebrow?, title, subtitle?, body }].
   Used for both "Inside the Series" (rich bodies) and the FAQ. */
function AccordionRow({ item, index, isOpen, onToggle, showIndex }) {
  return (
    <div className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-5 py-6 text-left sm:gap-7"
      >
        {showIndex && (
          <span
            className={`mt-1 font-display text-sm font-bold tabular-nums transition-colors ${
              isOpen ? 'text-teal' : 'text-ink/30'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        <span className="flex-1">
          {item.eyebrow && (
            <span
              className={`block text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                isOpen ? 'text-teal' : 'text-ink/40'
              }`}
            >
              {item.eyebrow}
            </span>
          )}
          <h3 className="mt-1 font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-teal-deep sm:text-xl">
            {item.title}
          </h3>
          {item.subtitle && (
            <span className="mt-1.5 block text-[0.95rem] italic text-ink/55">{item.subtitle}</span>
          )}
        </span>

        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'rotate-45 border-navy bg-navy text-white'
              : 'border-line text-navy group-hover:border-teal/50'
          }`}
        >
          <Plus size={18} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={`pb-7 ${showIndex ? 'sm:pl-[3rem]' : ''}`}>{item.body}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({
  items,
  allowMultiple = true,
  defaultOpenKeys = [],
  showIndex = false,
  className = '',
}) {
  const [open, setOpen] = useState(() => new Set(defaultOpenKeys))

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      if (prev.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <div className={className}>
      {items.map((item, i) => (
        <Reveal key={item.key} delay={Math.min(i * 0.04, 0.16)}>
          <AccordionRow
            item={item}
            index={i}
            isOpen={open.has(item.key)}
            onToggle={() => toggle(item.key)}
            showIndex={showIndex}
          />
        </Reveal>
      ))}
    </div>
  )
}
