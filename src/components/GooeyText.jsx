import { useEffect, useId, useRef, useState } from 'react'

/* GooeyText — two overlapping words that blur-morph into one another on a loop.

   Adapted from the reference to plain JSX: TypeScript types removed and the
   shadcn `cn` import replaced with the `cx` join below.

   Changes from the reference:
   - `text-foreground` → an explicit brand colour (default text-yellow; override
     via textClassName).
   - The animation loop now cancels its requestAnimationFrame on unmount, so it
     doesn't leak a running loop on every navigation.
   - Sized down from text-6xl to a secondary-accent scale (override via
     textClassName).
   - The SVG threshold filter gets a unique id per instance (useId), so multiple
     GooeyText on one page don't share/clobber one filter.
   - Honors prefers-reduced-motion: renders the first word statically, no loop,
     no blur filter. */

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className = '',
  textClassName = 'text-yellow',
  align = 'center',
  heightClassName = 'h-12 sm:h-14',
}) {
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  // useId returns something like ":r3:"; strip the colons for a valid id/url ref.
  const filterId = `goo-${useId().replace(/:/g, '')}`
  const [reduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reduce) return
    const t1 = text1Ref.current
    const t2 = text2Ref.current
    if (!t1 || !t2) return

    let raf = 0
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime

    const setMorph = (fraction) => {
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
      const inv = 1 - fraction
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
    }

    const doCooldown = () => {
      morph = 0
      t2.style.filter = ''
      t2.style.opacity = '100%'
      t1.style.filter = ''
      t1.style.opacity = '0%'
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }
      setMorph(fraction)
    }

    t1.textContent = texts[textIndex % texts.length]
    t2.textContent = texts[(textIndex + 1) % texts.length]

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime
      cooldown -= dt
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          t1.textContent = texts[textIndex % texts.length]
          t2.textContent = texts[(textIndex + 1) % texts.length]
        }
        doMorph()
      } else {
        doCooldown()
      }
    }
    animate()

    return () => cancelAnimationFrame(raf) // FIX: stop the loop on unmount
  }, [texts, morphTime, cooldownTime, reduce])

  const justify = align === 'left' ? 'justify-start' : 'justify-center'
  const textAlign = align === 'left' ? 'text-left' : 'text-center'
  const spanBase = cx(
    'absolute inset-0 inline-flex select-none items-center',
    justify,
    textAlign,
    'text-3xl font-bold sm:text-4xl',
    textClassName,
  )

  // Reduced motion: one static word, no filter, no loop.
  if (reduce) {
    return (
      <div className={cx('relative', className)}>
        <div className={cx('flex items-center', justify, heightClassName)}>
          <span className={cx('select-none text-3xl font-bold sm:text-4xl', textAlign, textClassName)}>
            {texts[0]}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cx('relative', className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div
        className={cx('relative', heightClassName)}
        style={{ filter: `url(#${filterId})` }}
        aria-hidden="true"
      >
        <span ref={text1Ref} className={spanBase} />
        <span ref={text2Ref} className={spanBase} />
      </div>
    </div>
  )
}
