import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, LayoutDashboard } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import ParticleBackground from '../components/ParticleBackground'

/* The internal MoneyPenny dashboard has its own login (work email + code, or a
   shared password), so Beyond Numbers handles no permissions here — this page
   just previews it and links out. Note the link is http:// by design. */
const DASHBOARD_URL = 'http://3.107.206.82/'

/* Preview images: drop any images into src/assets/dashboard/ and they render
   here automatically, ordered by filename (dash1, dash2, …). No need to edit
   this file when the set changes. */
const previewModules = import.meta.glob(
  '../assets/dashboard/*.{png,jpg,jpeg,webp,gif,avif,svg}',
  { eager: true, import: 'default' },
)
const previews = Object.entries(previewModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, name: path.split('/').pop() }))

export default function Dashboard() {
  const [active, setActive] = useState(null) // enlarged preview in the lightbox

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-hero-dark text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-purple/25 blur-3xl" />
          <div className="absolute -left-40 top-44 h-[30rem] w-[30rem] rounded-full bg-teal/12 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <ParticleBackground count={2200} />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 pb-16 pt-36 text-center sm:px-8 sm:pt-44">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-yellow backdrop-blur">
              <LayoutDashboard size={14} />
              Internal
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              MoneyPenny Dashboard
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Live view of team, clients and operations.
            </p>
            <div className="mt-9 flex justify-center">
              <Button href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" variant="yellow">
                Open Dashboard
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Preview grid ===== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">Preview</p>
            <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-tight tracking-tight text-navy sm:text-[2.4rem]">
              A look inside
            </h2>
          </Reveal>

          {previews.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {previews.map((img, i) => (
                <Reveal key={img.name} delay={Math.min(i * 0.06, 0.3)}>
                  <button
                    type="button"
                    onClick={() => setActive(img)}
                    className="group block w-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_14px_34px_-18px_rgba(61,15,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-teal/40 hover:shadow-[0_36px_60px_-28px_rgba(61,15,82,0.45)]"
                  >
                    <div className="relative aspect-[2/1] overflow-hidden bg-cream">
                      <img
                        src={img.src}
                        alt={`MoneyPenny dashboard preview ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            /* Placeholder layout shown until preview images are added to
               src/assets/dashboard/. */
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex aspect-[2/1] items-center justify-center rounded-2xl border border-dashed border-line bg-cream text-sm font-medium text-ink/40"
                >
                  Preview image {i + 1}
                </div>
              ))}
            </div>
          )}

          {/* Explore more */}
          <Reveal>
            <div className="mt-14 text-center">
              <Button href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" variant="primary" arrow>
                Explore more
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-darker/85 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl"
            >
              <div className="mb-3 flex justify-end">
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close preview"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>
              <img
                src={active.src}
                alt="MoneyPenny dashboard preview"
                className="max-h-[80vh] w-full rounded-2xl object-contain ring-1 ring-white/15"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
