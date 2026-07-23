import Section from './Section'
import Reveal from './Reveal'
import moneypennyLogo from '../assets/sponsors/MoneyPenny-trimmed.png'
import twineappsLogo from '../assets/sponsors/twineapps-trimmed.png'
import xcelLabsLogo from '../assets/sponsors/XcelLabs-trimmed.png'
import cpaTrendlinesLogo from '../assets/sponsors/cpa-trendlines-trimmed.png'

/* Sponsors & partners logo wall.

   Every source logo is pre-trimmed to its actual artwork bounds (see
   *-trimmed.png; the raw files had large transparent / white margins that made
   matching heights shrink them to nothing). After trimming they fall into two
   shapes:
     - wide wordmarks  (MoneyPenny 5.66:1, twineapps 5.34:1, CPA Trendlines 4.66:1)
     - a near-square badge (XcelLabs 1.35:1)

   They are sized for OPTICAL balance, not equal height: the wordmarks render at
   a readable ~50px, and the compact badge ~1.75x taller so their cap heights /
   visual weight match rather than their bounding boxes.

   Four logos lay out as a centered 2x2 grid on desktop (a single row can't hold
   four wordmarks at this height inside the container without shrinking them),
   collapsing to one column on small screens.

   TO ADD A SPONSOR: trim it to its artwork bounds, import it, add an entry with
   an `h` chosen for its shape (wordmark ~50, square mark ~88). */
const sponsors = [
  { name: 'MoneyPenny', logo: moneypennyLogo, href: 'https://moneypennyllc.com', h: 50 },
  { name: 'twineapps', logo: twineappsLogo, href: 'https://twineapps.co', h: 50 },
  { name: 'XcelLabs', logo: xcelLabsLogo, href: 'https://www.xcellabsacademy.com/', h: 88 },
  {
    name: 'CPA Trendlines Academy',
    logo: cpaTrendlinesLogo,
    href: 'https://cpatrendlines-academy.com/',
    h: 50,
  },
]

function Tile({ sponsor }) {
  const img = (
    <img
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      loading="lazy"
      style={{ height: `${sponsor.h}px` }}
      className="w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.06]"
    />
  )

  // Solid white card so any transparent/white-bg logo sits on a clean surface.
  const cls =
    'group flex h-[136px] w-full items-center justify-center rounded-2xl border border-line bg-white px-5 shadow-[0_14px_34px_-22px_rgba(61,15,82,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_28px_50px_-28px_rgba(61,15,82,0.4)]'

  return sponsor.href ? (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      aria-label={`${sponsor.name} — opens in a new tab`}
    >
      {img}
    </a>
  ) : (
    <div className={cls} aria-label={sponsor.name}>
      {img}
    </div>
  )
}

export default function Sponsors() {
  return (
    <Section
      id="sponsors"
      bg="white"
      accent="purple"
      eyebrow="Sponsors & Partners"
      title="Thanks to our sponsors & partners"
    >
      {/* Centered 2x2 on desktop, one column on small screens. The max-width
          keeps the two-up cards from stretching so wide the logos float in a
          sea of white. */}
      <div className="mx-auto mt-14 grid max-w-[900px] grid-cols-1 gap-6 md:grid-cols-2">
        {sponsors.map((s, i) => (
          <Reveal key={s.name} delay={Math.min(i * 0.08, 0.32)}>
            <Tile sponsor={s} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
