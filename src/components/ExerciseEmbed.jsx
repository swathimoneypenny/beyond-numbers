import { useEffect, useRef, useState } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'

/* Reusable interactive-exercise embed.
   Loads /exercises/<exerciseId>.json (from the public/exercises folder) and renders
   its self-contained embed.markup inside an isolated, auto-resizing iframe.
   Reuse for any session: <ExerciseEmbed exerciseId="s2-ex1-team-52-card-pickup" /> */

/* Windows-1252 high range (0x80–0x9F) → original byte. Used to reverse "mojibake"
   (UTF-8 bytes that were mis-decoded as Windows-1252 and re-saved as UTF-8 — which
   turns 🃏 into "ðŸƒ", ⏱️ into "â±ï¸", ✕ into "âœ•", etc.). */
const WIN1252 = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a,
  0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92,
  0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c,
  0x017e: 0x9e, 0x0178: 0x9f,
}

// Signature of UTF-8-misread-as-Windows-1252: a lead char (Â Ã Å â ð) followed by a
// continuation/special char. Plain smart quotes alone won't match.
const MOJIBAKE_RE =
  /[Â-Åâð][-¿ŒœŠšŸŽžƒˆ˜–—‘’‚“”„†‡•…‰‹›€™]/

function repairUtf8(str) {
  const enc = new TextEncoder()
  const bytes = []
  for (const ch of str) {
    const cp = ch.codePointAt(0)
    if (cp <= 0xff) bytes.push(cp)
    else if (cp in WIN1252) bytes.push(WIN1252[cp])
    else for (const b of enc.encode(ch)) bytes.push(b) // genuine char — keep as-is
  }
  try {
    return new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(bytes))
  } catch {
    return str
  }
}

const fixMojibake = (s) => (typeof s === 'string' && MOJIBAKE_RE.test(s) ? repairUtf8(s) : s)

/* Ensure the srcDoc document declares UTF-8 so the iframe never mis-decodes it. */
function withCharset(html) {
  if (/<meta\s+charset/i.test(html)) return html
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (m) => `${m}<meta charset="utf-8">`)
  }
  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/<html[^>]*>/i, (m) => `${m}<head><meta charset="utf-8"></head>`)
  }
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`
}

/* ---- bottom action bar ------------------------------------------------- */

/* Users save often and scrolling back to the top toolbar is painful, so we
   mirror the exercise's own state buttons at the bottom of the embed.

   The iframe is a srcDoc document, which is same-origin, so we can reach into
   it (the auto-resize below already does). Rather than reimplementing any
   behaviour, each bottom button is a clone of a real top button whose click
   handler calls `original.click()`. That means it runs the exact same code
   path, however the handler was attached, and it cannot drift out of sync.
   Cloning also carries the exercise's own CSS classes across, so the bottom
   bar is styled identically to the top one in every exercise. */

const BOTTOM_BAR_ID = 'bn-bottom-actions'

// Buttons worth repeating: save / load / clear / reset state actions.
const STATE_ACTION_RE = /\b(save|load|clear|reset)\b/i
// Timer controls look like "Reset" but only affect the countdown widget.
const TIMER_RE = /timer/i

function mountBottomActions(doc) {
  if (!doc?.body || doc.getElementById(BOTTOM_BAR_ID)) return

  const originals = Array.from(doc.querySelectorAll('button')).filter((btn) => {
    if (btn.closest(`#${BOTTOM_BAR_ID}`)) return false
    const label = (btn.textContent || '').replace(/\s+/g, ' ').trim()
    if (!label || !STATE_ACTION_RE.test(label)) return false
    const onclick = btn.getAttribute('onclick') || ''
    if (TIMER_RE.test(onclick)) return false
    return true
  })

  if (!originals.length) return

  const bar = doc.createElement('div')
  bar.id = BOTTOM_BAR_ID
  bar.setAttribute('role', 'group')
  bar.setAttribute('aria-label', 'Exercise actions')
  bar.style.cssText = [
    'display:flex',
    'flex-wrap:wrap',
    'gap:10px',
    'align-items:center',
    'justify-content:center',
    'margin:32px 16px 24px',
    'padding:20px 16px 4px',
    'border-top:1px solid rgba(0,0,0,0.12)',
  ].join(';')

  originals.forEach((original) => {
    const clone = original.cloneNode(true)
    clone.removeAttribute('id') // ids must stay unique
    clone.removeAttribute('onclick') // delegate instead of re-running inline JS
    clone.disabled = false
    clone.addEventListener('click', (e) => {
      e.preventDefault()
      original.click()
    })
    bar.appendChild(clone)
  })

  doc.body.appendChild(bar)
}

export default function ExerciseEmbed({ exerciseId, title = 'Interactive exercise', minHeight = 640 }) {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [markup, setMarkup] = useState('')
  const iframeRef = useRef(null)
  const roRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setMarkup('')

    fetch(`/exercises/${exerciseId}.json`)
      .then(async (r) => {
        if (!r.ok) throw new Error('Not found')
        // Decode the bytes explicitly as UTF-8 (don't rely on response charset).
        const buf = await r.arrayBuffer()
        const text = new TextDecoder('utf-8').decode(buf)
        return JSON.parse(text)
      })
      .then((data) => {
        if (cancelled) return
        const raw = data?.embed?.markup
        if (!raw) throw new Error('No markup in exercise JSON')
        setMarkup(withCharset(fixMojibake(raw)))
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [exerciseId])

  // Auto-resize the iframe to its content (self-contained srcDoc is same-origin).
  const handleLoad = () => {
    const ifr = iframeRef.current
    if (!ifr) return
    try {
      const doc = ifr.contentWindow.document
      mountBottomActions(doc)
      const resize = () => {
        const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight, minHeight)
        ifr.style.height = `${h}px`
      }
      resize()
      roRef.current?.disconnect()
      const ro = new ResizeObserver(() => resize())
      ro.observe(doc.body)
      roRef.current = ro
    } catch {
      ifr.style.height = `${minHeight}px`
    }
  }

  useEffect(() => () => roRef.current?.disconnect(), [])

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_44px_-26px_rgba(61,15,82,0.4)]">
      {status === 'loading' && (
        <div
          className="flex flex-col items-center justify-center gap-3 text-teal"
          style={{ minHeight: 280 }}
        >
          <Loader2 size={26} className="animate-spin" />
          <span className="text-sm font-semibold text-navy/70">Loading exercise…</span>
        </div>
      )}

      {status === 'error' && (
        <div
          className="flex flex-col items-center justify-center gap-3 px-6 text-center"
          style={{ minHeight: 280 }}
        >
          <AlertCircle size={28} className="text-[#b23a30]" />
          <p className="font-display text-lg font-bold text-navy">Exercise unavailable</p>
          <p className="max-w-sm text-sm text-[#1A1A1A]">
            We couldn’t load this interactive exercise. Make sure{' '}
            <code className="rounded bg-sand px-1.5 py-0.5 text-[0.8rem] text-navy">
              {exerciseId}.json
            </code>{' '}
            is in the <span className="font-semibold">public/exercises</span> folder.
          </p>
        </div>
      )}

      {status === 'ready' && (
        <iframe
          ref={iframeRef}
          title={title}
          srcDoc={markup}
          onLoad={handleLoad}
          className="block w-full border-0"
          style={{ minHeight }}
        />
      )}
    </div>
  )
}
