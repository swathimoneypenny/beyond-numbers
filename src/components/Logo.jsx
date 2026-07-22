/**
 * Beyond Numbers logo — uses the real brand artwork (transparent PNGs).
 * Source files live in src/assets/ and are bundled by Vite.
 *  - horizontal  -> mark + "BEYOND NUMBERS" on one line (nav)
 *  - stacked     -> mark + "BEYOND / NUMBERS" two lines (footer)
 */
import horizontal from '../assets/beyond-numbers-horizontal.png'
import stacked from '../assets/beyond-numbers-stacked.png'

export default function Logo({ variant = 'horizontal', className = '' }) {
  const isStacked = variant === 'stacked'
  return (
    <img
      src={isStacked ? stacked : horizontal}
      alt="Beyond Numbers"
      className={className}
      loading="eager"
      draggable="false"
    />
  )
}
