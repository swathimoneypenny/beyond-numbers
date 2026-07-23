import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Youtube, X, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import ParticleBackground from '../components/ParticleBackground'

/* Real Beyond Numbers channel + featured video. */
const FEATURED_ID = 'TqTmJd_Tsiw'
const FEATURED_TITLE = "It's Not Just the Numbers | Policies, Procedures & Workflow in CAS"
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@go-beyond-numbers'

const CATEGORIES = [
  'Advisory',
  'Workflow',
  'Technology',
  'Cybersecurity',
  'CAS',
  'Procedures',
  'Client Management',
  'Team Building',
  'Marketing',
]

// Beyond Numbers — real YouTube videos (add more entries here)
const videos = [
  { id: 'TqTmJd_Tsiw', title: "It's Not Just the Numbers | Policies, Procedures & Workflow in CAS", category: 'Procedures' },
  { id: 'nVLRkGIWXXU', title: 'The Human Side of Advisory with Steven Ladd', category: 'Advisory' },
  { id: '8A_pk3BcBdM', title: 'Smart Ways to Streamline Your Accounting Firm', category: 'Workflow' },
  { id: 'RRvFJl-w6u4', title: 'Outsourcing Your Accounting: Tips and Strategies', category: 'Workflow' },
  { id: '72EhtcebsCQ', title: 'Podcast Marketing: Why Do It?', category: 'Marketing' },
  { id: '4DNeMQn3UnY', title: 'Data-Driven Advisory Success with James Childress', category: 'Advisory' },
  { id: 'M71sIM_XMZY', title: 'Navigating Cyber Threats with Christophe Reglat', category: 'Cybersecurity' },
  { id: 'Bs4sU49uB8o', title: 'Transforming Accounting: Embracing Change for Sustained Success', category: 'Advisory' },
  { id: 'o6ovHGqzYF8', title: 'Transforming Your Accounting Practice for Joy and Profit with Amanda Gascoigne', category: 'Advisory' },
  { id: '5lOwBHY4gHA', title: 'Strategic Journey to Dext with Rachel Fisch', category: 'Technology' },
  { id: 'JlHVlFEJAfA', title: 'Symptoms Versus Causes', category: 'Advisory' },
  { id: 'TiXG8zWaxAc', title: 'Maximizing Efficiency: The Power of Daily Standups', category: 'Workflow' },
  { id: 'XuwEcRntQtw', title: 'Strategizing in the Digital Age: Insights from Damien and Penny', category: 'Advisory' },
  { id: 'K-0I5mVAxVI', title: 'Global Perspectives in Accounting and Advisory', category: 'Advisory' },
  { id: '8QemRIGYe3o', title: 'How to Build a Business with Intention ft. Dawn W. Brolin, CPA, CFE!', category: 'Advisory' },
  { id: '7UX2KV4xfEc', title: 'CAS, What Does It Take? With Jan Haugo', category: 'CAS' },
  { id: '74aXpD4YEe8', title: 'Reinventing the Traditional Accounting Firm', category: 'Advisory' },
  { id: 'qOR_-VJzN-o', title: 'How to Implement an Effective Training Program', category: 'Team Building' },
  { id: 'BFCPkZBFA90', title: 'Carving Out Time To Achieve Anticipated Results', category: 'Workflow' },
  { id: 'P1Eken3SfzI', title: 'Scaling New Heights With AI Technology', category: 'Technology' },
  { id: '4BAIEa-D8T0', title: 'Streamline Your Workflow And Organize Chaos', category: 'Workflow' },
  { id: 'shHNdGQXVjw', title: 'Enhancing Efficiency With AI Automation', category: 'Technology' },
  { id: 'AoboNgjjMzI', title: 'Exploring The Frontier Of Artificial Intelligence', category: 'Technology' },
  { id: 'JCO6LSW1K4Q', title: 'Setting Clear Expectations With Clients', category: 'Client Management' },
  { id: 'Ge-nvw2pVHc', title: 'Regularly Reviewing Your Tech Stack for Business Growth and Success', category: 'Technology' },
  { id: 'eQgBJwzzl78', title: 'Unlocking Valuable Relationships And Opportunities In The Accounting Industry', category: 'Advisory' },
  { id: 'UDTG0DIjIY8', title: 'Expert Cybersecurity Tips for Accountants', category: 'Cybersecurity' },
  { id: 'gtIYjr-jGKI', title: 'Growth And Transformation Through Technology and Coaching', category: 'Technology' },
]

const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

export default function Videos() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null) // currently-playing video in the modal

  const visible = filter === 'All' ? videos : videos.filter((v) => v.category === filter)

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
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              Watch and Learn
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Expert Insights for Accounting Firm Owners
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Discover practical tips and strategies to build a more scalable, advisory-focused
              accounting practice.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button to="/contact" variant="light">
                Contact Us
              </Button>
              <Button href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer" variant="yellow">
                <Youtube size={18} />
                Subscribe on YouTube
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Featured video ===== */}
      <section className="relative overflow-hidden bg-navy-deep pb-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-purple/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1000px] px-5 sm:px-8">
          <Reveal>
            <span className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              Featured
            </span>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${FEATURED_ID}`}
                title={FEATURED_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="mx-auto mt-6 max-w-2xl text-center font-display text-xl font-bold leading-snug text-white sm:text-2xl">
              {FEATURED_TITLE}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ===== All videos ===== */}
      <section id="all-videos" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-[2rem] font-bold leading-[1.12] tracking-tight text-navy sm:text-[2.6rem]">
              All Videos
            </h2>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal">
              Search by Category
            </p>
          </Reveal>

          {/* Filter chips */}
          <Reveal delay={0.05}>
            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {['All', ...CATEGORIES].map((cat) => {
                const isActive = filter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'border-yellow bg-yellow text-navy-darker shadow-md shadow-yellow/30'
                        : 'border-line bg-white text-ink/70 hover:border-purple/40 hover:text-navy'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Video grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((v, i) => (
              <Reveal key={`${v.title}-${i}`} delay={Math.min(i * 0.05, 0.3)}>
                <button
                  onClick={() => setActive(v)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[0_14px_34px_-18px_rgba(61,15,82,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-teal/40 hover:shadow-[0_36px_60px_-28px_rgba(61,15,82,0.45)]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={thumb(v.id)}
                      alt={v.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-darker/55 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-navy">
                      {v.category}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-110">
                        <Play size={22} className="ml-0.5" fill="currentColor" />
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold leading-snug text-navy">
                      {v.title}
                    </h3>
                    {v.description && (
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-ink/65">
                        {v.description}
                      </p>
                    )}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-12 text-center text-ink/55">No videos in this category yet.</p>
          )}
        </div>
      </section>

      {/* ===== Modal player ===== */}
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
              className="w-full max-w-3xl"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="font-display text-lg font-bold text-white">{active.title}</h3>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close video"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-white/15">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${active.id}`}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-yellow hover:text-white"
              >
                Watch on YouTube
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
