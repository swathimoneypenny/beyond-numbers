import { motion } from 'framer-motion'
import { Check, TrendingUp, SlidersHorizontal, Users, Route } from 'lucide-react'
import Button from './Button'
import TextShimmer from './TextShimmer'
import GooeyText from './GooeyText'

/* Meaningful icons for the "Built for firm owners" bullets, matched to the copy
   by order. Falls back to Check if the list grows. Text is unchanged. */
const boxIcons = [TrendingUp, SlidersHorizontal, Users, Route]

const ease = [0.22, 1, 0.36, 1]
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

/* Professional advisory image, framed and blended into the brand.
   Scales + fades in on load, then floats very gently and continuously
   (~6px loop via the .animate-float class; disabled for reduced motion). */
function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      className="animate-float relative mx-auto w-full max-w-md lg:max-w-none"
    >
      {/* soft brand glow + accent shapes behind the image */}
      <div className="absolute -inset-5 -z-10 rounded-[2.75rem] bg-gradient-to-tr from-teal/35 via-transparent to-yellow/25 blur-2xl" />
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-teal/50 blur-md" />
      <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-yellow/40 blur-lg" />

      <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.65)]">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1100&q=80"
          alt="Advisory team planning a strategy together in a modern office"
          className="aspect-[4/5] h-full w-full object-cover"
          loading="eager"
        />
        {/* navy gradient overlay to blend with the dark hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-darker/70 via-navy-deep/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent mix-blend-overlay" />
      </div>
    </motion.div>
  )
}

export default function Hero({ eyebrow, title, description, box, primary, secondary, morphTexts }) {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-dark text-white">
      {/* depth: lighter-purple + teal + yellow glows for dimension */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-purple/25 blur-3xl" />
        <div className="absolute left-1/3 top-8 h-[26rem] w-[26rem] rounded-full bg-teal/12 blur-3xl" />
        <div className="absolute -left-40 top-44 h-[30rem] w-[30rem] rounded-full bg-yellow/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 pb-24 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          {eyebrow && (
            <motion.span
              {...fade(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              <TextShimmer as="span" duration={3.5} base="rgba(255,255,255,0.85)" shine="var(--color-yellow)">
                {eyebrow}
              </TextShimmer>
            </motion.span>
          )}

          <div className="relative">
            {/* Soft brand radial glow behind the title so it stands out. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10"
              style={{
                background:
                  'radial-gradient(60% 70% at 30% 40%, rgba(245,196,0,0.22), rgba(37,168,140,0.14) 45%, transparent 72%)',
              }}
            />
            <motion.h1
              {...fade(0.15)}
              className="mt-7 font-display text-[2.9rem] font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[4.3rem]"
            >
              {title}
            </motion.h1>
          </div>

          {/* thin yellow + teal accent underline */}
          <motion.div {...fade(0.24)} className="mt-5 flex items-center gap-1.5">
            <span className="h-1.5 w-16 rounded-full bg-yellow" />
            <span className="h-1.5 w-9 rounded-full bg-teal" />
          </motion.div>

          {/* Secondary morphing accent below the H1 (the H1 itself stays static). */}
          {morphTexts?.length > 0 && (
            <motion.div {...fade(0.32)} className="mt-6">
              <GooeyText
                texts={morphTexts}
                align="left"
                textClassName="text-yellow"
                heightClassName="h-11 sm:h-12"
              />
            </motion.div>
          )}

          {description && (
            <motion.p
              {...fade(0.3)}
              className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
            >
              {description}
            </motion.p>
          )}

          {box && (
            <motion.div
              {...fade(0.45)}
              className="mt-8 max-w-xl rounded-2xl border border-white/10 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
            >
              <p className="font-display text-base font-semibold tracking-tight text-navy">
                {box.title}
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {box.items.map((it, i) => {
                  const BulletIcon = boxIcons[i] || Check
                  return (
                    <li key={it} className="flex gap-2.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-teal/12 text-teal">
                        <BulletIcon size={14} strokeWidth={2.25} />
                      </span>
                      <span className="self-center text-[0.92rem] leading-snug text-ink/80">{it}</span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}

          <motion.div {...fade(0.6)} className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            {primary && (
              <Button
                href={primary.href}
                to={primary.to}
                target={primary.newTab ? '_blank' : undefined}
                variant="teal"
                arrow={primary.arrow}
              >
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button
                href={secondary.href}
                to={secondary.to}
                target={secondary.newTab ? '_blank' : undefined}
                variant="outlineYellow"
                arrow={secondary.arrow}
              >
                {secondary.label}
              </Button>
            )}
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroImage />
        </div>
      </div>
    </section>
  )
}
