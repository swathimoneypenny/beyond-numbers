import Section from './Section'
import Reveal from './Reveal'
import moneypennyLogo from '../assets/sponsors/moneypenny-logo.png'
import cpaTrendlinesLogo from '../assets/sponsors/cpa-academy-logo.png'

/* Sponsors & partners logo wall.
   TO ADD A SPONSOR: import its logo from src/assets above, then add an entry to
   the `sponsors` array (optionally with an `href` to link it in a new tab).
   The grid wraps responsively, so 4-5 more logos drop in cleanly. */
const sponsors = [
  { name: 'MoneyPenny', logo: moneypennyLogo, href: 'https://www.moneypennyllc.com' },
  { name: 'CPA Trendlines Academy', logo: cpaTrendlinesLogo },
]

function Tile({ sponsor }) {
  const img = (
    <img
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      loading="lazy"
      // Big, consistent height + auto width so mismatched source sizes look balanced.
      className="max-h-20 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
    />
  )

  // Solid white card (bg-white) so any transparent logo sits on a clean surface
  // — no checkerboard shows through. Generous padding, logo centered.
  const cls =
    'group flex h-40 w-full items-center justify-center rounded-2xl border border-line bg-white p-8 shadow-[0_14px_34px_-22px_rgba(61,15,82,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_28px_50px_-28px_rgba(61,15,82,0.4)]'

  return sponsor.href ? (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      aria-label={sponsor.name}
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
      {/* Centered, wrapping row of fixed-width cards → 4-5 more logos drop in cleanly. */}
      <div className="mt-14 flex flex-wrap justify-center gap-6">
        {sponsors.map((s, i) => (
          <Reveal key={s.name} delay={Math.min(i * 0.08, 0.32)} className="w-[340px] max-w-full">
            <Tile sponsor={s} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
