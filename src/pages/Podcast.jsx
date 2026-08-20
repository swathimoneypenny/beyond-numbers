import { Headphones, Mic } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import ParticleBackground from '../components/ParticleBackground'

/* "It's Not Just the Numbers" — the Beyond Numbers podcast. */

const SPOTIFY_SHOW = 'https://open.spotify.com/show/6wavsvqx7Sx7viV7H5qOS8'
const APPLE_SHOW =
  'https://podcasts.apple.com/au/podcast/its-not-just-the-numbers/id1570577993'

// Book/podcast title, italicised wherever it appears in the description.
const TITLE = "It's Not Just the Numbers"
function withTitle(text) {
  const out = []
  text.split(TITLE).forEach((part, i) => {
    if (i > 0) out.push(<em key={`t${i}`} className="italic">{TITLE}</em>)
    out.push(<span key={`p${i}`}>{part}</span>)
  })
  return out
}

// Exact approved description.
const PARAS = [
  "It's Not Just the Numbers is a podcast for accounting firm owners, leaders, and professionals building modern firms beyond compliance.",
  "Hosted by Damien Greathead and Penny Breslin, the show explores what it really takes to create a sustainable, advisory-driven accounting practice in a profession undergoing rapid change. From technology, systems, workflow, and pricing strategy to leadership, client experience, staffing, and the future role of the accountant — this podcast goes beyond the spreadsheets and into the real conversations shaping the profession.",
  "Each episode features practical insights, honest discussions, and lessons from firm owners, industry experts, technology leaders, and operators working at the forefront of modern accounting.",
  "Whether you're building a Client Advisory Services (CAS) practice, refining your operations, navigating AI and automation, or simply trying to build a better firm, It's Not Just the Numbers delivers thoughtful conversations grounded in real-world experience.",
  "Because the future of accounting isn't just about compliance.",
]
const EMPHASIS = [
  "It's about strategy.",
  "It's about relationships.",
  "It's about systems.",
  "It's about leadership.",
]
const CLOSING_ECHO = "And ultimately, it's not just the numbers."
const SIGNATURE = "It's Not Just the Numbers is a Beyond Numbers podcast."

function ListenLinks() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button href={SPOTIFY_SHOW} target="_blank" variant="teal">
        <Headphones size={18} />
        Listen on Spotify
      </Button>
      <Button href={APPLE_SHOW} target="_blank" variant="ghostLight">
        <Headphones size={18} />
        Listen on Apple Podcasts
      </Button>
    </div>
  )
}

export default function Podcast() {
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
              Podcast
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              It's Not Just the Numbers
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Hosted by Damien Greathead and Penny Breslin.
            </p>
            <div className="mt-9 flex justify-center">
              <ListenLinks />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Player ===== */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <Reveal>
            <span className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Latest episodes
            </span>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/show/6wavsvqx7Sx7viV7H5qOS8?utm_source=generator&si=b92d5e1cc4314dd4"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="It's Not Just the Numbers on Spotify"
            />
          </Reveal>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[300px_1fr] md:gap-14">
            {/* Left: podcast artwork + listen links.
                Artwork is coming separately — drop the image in src/assets and
                replace this placeholder with an <img>. */}
            <div>
              <Reveal>
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-navy via-navy-deep to-navy-darker text-white/80 shadow-[0_24px_60px_-34px_rgba(31,12,46,0.6)]">
                  <div className="text-center">
                    <Mic size={40} className="mx-auto text-yellow" strokeWidth={1.6} />
                    <p className="mt-3 px-6 font-display text-sm font-semibold leading-snug">
                      It's Not Just the Numbers
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6">
                  <ListenLinks />
                </div>
              </Reveal>
            </div>

            {/* Right: description */}
            <Reveal delay={0.1}>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
                About the show
              </span>
              <div className="mt-5 space-y-5 text-[1.02rem] leading-relaxed text-ink/75">
                {PARAS.map((p, i) => (
                  <p key={i}>{withTitle(p)}</p>
                ))}

                <div className="border-l-2 border-yellow/60 pl-5">
                  {EMPHASIS.map((e) => (
                    <p key={e} className="font-display text-lg font-semibold text-navy">
                      {e}
                    </p>
                  ))}
                  <p className="mt-2 font-display text-lg font-semibold italic text-navy">
                    {CLOSING_ECHO}
                  </p>
                </div>

                <p className="font-semibold text-ink/80">{withTitle(SIGNATURE)}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
