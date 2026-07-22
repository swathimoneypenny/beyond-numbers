import Section from './Section'
import Reveal from './Reveal'
import moneypennyLogo from '../assets/sponsors/MoneyPenny.png'
import twineappsLogo from '../assets/sponsors/twineapps_logo_fullcolor.png'
import xcelLabsLogo from '../assets/sponsors/XcelLabs.png'

/* Sponsors & partners logo wall.
   TO ADD A SPONSOR: import its logo from src/assets/sponsors above, then add an
   entry below. The row wraps and stays centered, so extra logos drop in cleanly.

   `scale` optically balances logos with very different aspect ratios: every logo
   renders at the same base height (LOGO_H), and scale nudges an individual one
   up or down. A wide wordmark reads as "bigger" than a square mark at identical
   height, so the square marks get a small boost. Set to 1 for no adjustment. */
// 60px keeps the widest logo (twineapps, 5.4:1 -> ~323px) inside the card's
// 332px content box, so nothing gets shrunk and the baseline stays uniform.
const LOGO_H = 60 // px — base logo height, uniform across the row

const sponsors = [
  {
    name: 'MoneyPenny',
    logo: moneypennyLogo,
    href: 'https://moneypennyllc.com',
    scale: 1.06, // 1:1 square mark
  },
  {
    name: 'twineapps',
    logo: twineappsLogo,
    href: 'https://twineapps.co',
    scale: 1, // 5.4:1 wide wordmark — the reference
  },
  {
    name: 'XcelLabs',
    logo: xcelLabsLogo,
    href: 'https://www.xcellabsacademy.com/',
    scale: 1.06, // 1.25:1 near-square mark
  },
]

function Tile({ sponsor }) {
  const img = (
    <img
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      loading="lazy"
      // Uniform height + auto width so mismatched source ratios sit on one baseline.
      style={{ height: `${Math.round(LOGO_H * (sponsor.scale ?? 1))}px` }}
      className="w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.06]"
    />
  )

  // Solid white card so transparent PNGs never show a checkerboard.
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
      {/* Centered wrapping row: 3 across on desktop, and a 4th+ sponsor wraps
          to a centered second row rather than stranding left. */}
      <div className="mt-14 flex flex-wrap justify-center gap-6">
        {sponsors.map((s, i) => (
          <Reveal key={s.name} delay={Math.min(i * 0.08, 0.32)} className="w-[370px] max-w-full">
            <Tile sponsor={s} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
