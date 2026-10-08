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

/* ---- premium dark-purple theme (injected into the iframe) -------------- */

/* Each exercise is a self-contained HTML doc with its own CSS. Rather than
   rewrite every file, we inject a shared stylesheet into the iframe that
   re-skins appearance (colours, surfaces, cards, buttons, inputs, typography)
   to match the site's dark-purple look. Palette mirrors src/index.css
   (navy/purple #4a146b…#2c0a3d, teal #25a88c, gold #f5c400).

   SAFETY: appearance only. It never touches rules that drive behaviour/layout
   — `.tab-content`/`.results-section` display toggling, the `.active`/`.sel`/
   `.selected` state, or drag state — and it keeps semantic colours (traffic
   lights, red/yellow/green ratings, success greens). Remove an id from
   THEMED_EXERCISES to revert it instantly; no exercise file is modified.

   TWO LAYERS:
   - THEME_BASE is universally safe and goes on every themed exercise
     (purple background, form controls, scrollbars, mirrored bottom bar).
   - THEME_LIGHT converts the *light* exercises (white cards / dark text) to
     dark. It is NOT applied to exercises that are already dark — those (see
     BASE_ONLY) keep their own design and only get the base harmonisation, so
     e.g. s4-ex2's intentional white "printable preview" and coloured section
     headings are preserved. */
const THEMED_EXERCISES = new Set([
  's1-ex1-four-quadrants',
  's2-ex1-team-52-card-pickup',
  's2-ex2-client-portfolio-matrix',
  's3-ex1-tech-stack-calculator',
  's3-ex2-ai-vendor-scorecard',
  's4-ex1-procedure-tech-stack',
  's4-ex2-month-end-procedure',
])

// Already-dark exercises: base harmonisation only, keep their own dark design.
const BASE_ONLY = new Set(['s4-ex2-month-end-procedure'])

const THEME_BASE = `
  :root { color-scheme: dark; }
  body {
    background: linear-gradient(155deg,#4a146b 0%,#3d0f52 46%,#2c0a3d 100%) !important;
    color: #ffffff !important;
  }
  /* Form controls → dark translucent. Option list stays light so it's readable
     in the OS dropdown. */
  input, select, textarea, input[type="number"], input[type="text"] {
    background: rgba(255,255,255,0.08) !important;
    color: #fff !important;
    border: 1px solid rgba(255,255,255,0.22) !important;
  }
  select option { color: #1a1a1a; }
  ::placeholder { color: rgba(255,255,255,0.5) !important; }
  /* Fully hide scrollbars in the exercise's scrollable areas while keeping
     scrolling (wheel / drag / keyboard) fully functional. Firefox uses
     scrollbar-width:none; WebKit/Blink hide the bar via ::-webkit-scrollbar. */
  * { scrollbar-width: none; -ms-overflow-style: none; }
  ::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none; }
  /* Mirrored bottom Save/Load bar (clones lose their in-page classes) */
  #${BOTTOM_BAR_ID} { border-top-color: rgba(255,255,255,0.14) !important; }
  #${BOTTOM_BAR_ID} button {
    background: rgba(255,255,255,0.12) !important;
    color: #fff !important;
    border: 1px solid rgba(255,255,255,0.25) !important;
    border-radius: 8px !important;
    padding: 8px 16px; font-weight: 600; cursor: pointer;
  }
  #${BOTTOM_BAR_ID} button:hover { background: rgba(255,255,255,0.20) !important; }
`

const THEME_LIGHT = `
  /* ---- shared light→dark (containers, headers, tabs) ---- */
  /* NOTE: no backdrop-filter / filter / transform / will-change anywhere in
     this theme. Those promote GPU layers, and a persistent one inside a tall,
     full-height srcdoc iframe makes the browser skip repainting regions while
     the parent page scrolls (content blanks until a reflow). The glass look is
     carried by the translucent background alone. */
  .container {
    background: rgba(255,255,255,0.06) !important;
    border: 1px solid rgba(255,255,255,0.12) !important;
    box-shadow: 0 30px 80px -30px rgba(0,0,0,0.75) !important;
  }
  .header { color: #fff !important; }
  .header h1, .header p { color: #fff !important; }
  .header-buttons button {
    background: rgba(255,255,255,0.10) !important; color: #fff !important;
    border: 1px solid rgba(255,255,255,0.25) !important;
  }
  .header-buttons button:hover { background: rgba(255,255,255,0.20) !important; }
  .tabs { background: rgba(0,0,0,0.22) !important; border-bottom: 1px solid rgba(255,255,255,0.10) !important; }
  .tab { background: transparent !important; color: rgba(255,255,255,0.60) !important; }
  .tab:hover { background: rgba(255,255,255,0.06) !important; color: #fff !important; }
  .tab.active {
    background: rgba(255,255,255,0.08) !important; color: #f5c400 !important;
    border-bottom: 3px solid #f5c400 !important;
  }

  /* ---- Four Quadrants (s1-ex1) ---- */
  .tab-content p, .service-name, .stat-label { color: rgba(255,255,255,0.74) !important; }
  .assessment-row > div { color: rgba(255,255,255,0.82) !important; }
  .quadrant-box, .analytics-card, .stat-box, .service-item, .assessment-row, .insight-item {
    background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.12) !important;
  }
  .analytics-card h3 { color: #fff !important; border-bottom-color: rgba(37,168,140,0.6) !important; }
  .service-item:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.45) !important; }
  .service-checkbox { accent-color: #25a88c; }
  .traffic-btn { border-color: rgba(255,255,255,0.28) !important; }
  .traffic-btn.selected { border-color: #fff !important; box-shadow: 0 0 0 2px rgba(245,196,0,0.7); }
  .assessment-header {
    background: linear-gradient(135deg,#8a1fb0,#4a146b) !important; color: #fff !important;
    border-color: rgba(255,255,255,0.15) !important;
  }
  [style*="ffebee"] { background: rgba(252,129,129,0.14) !important; color: #fff !important; }

  /* ---- headings / titles that were dark-on-light ---- */
  .quadrant-box h3, .instructions h3, .action-card h4,
  .panel h2, .cat-title, .pitem .tx strong, .opt .nm, .area .atitle,
  .firmbar .fb-lead, .meta label, .ref strong, .opt .line { color: #fff !important; }
  .instructions h3, .action-card h4 { color: #f5c400 !important; }
  .axis-label, .bucket-subtitle, .action-list li { color: rgba(255,255,255,0.8) !important; }

  /* ---- light surfaces across s2 / s3 / s4-ex1 → dark glass ---- */
  .cards-container, .task-card, .bucket, .stat-card, .instructions,
  .results-section, .matrix-container, .analysis-section, .action-section, .action-card,
  .panel, .pitem, .opt, .meta, .area, .ref, .firmbar, .tipbox {
    background: rgba(255,255,255,0.05) !important;
  }
  /* Gold value accents (no !important so inline semantic colours still win) */
  .stat-value { color: #f5c400; }
  /* Primary CTA + destructive buttons */
  .export-btn {
    background: linear-gradient(135deg,#25a88c 0%,#8a1fb0 100%) !important; color: #fff !important;
    box-shadow: 0 10px 24px -10px rgba(37,168,140,0.6) !important;
  }
  .export-btn:hover { box-shadow: 0 14px 30px -10px rgba(37,168,140,0.75) !important; }
  .remove-btn { background: #c0392b !important; }
  .remove-btn:hover { background: #a93226 !important; }
  .insight-item { background: rgba(245,196,0,0.09) !important; border-left: 4px solid #f5c400 !important; }

  /* ---- interactive STATES: restyle appearance, logic untouched ---- */
  .bucket.drag-over { background: rgba(37,168,140,0.18) !important; border-color: #25a88c !important; }
  .opt.sel { border-color: #25a88c !important; background: rgba(37,168,140,0.16) !important; }
  .opt .line { background: rgba(255,255,255,0.14) !important; }
  /* Rating buttons: style UNSELECTED only (no !important → the higher-specificity
     .g.on/.y.on/.r.on keep their red/amber/green when chosen). */
  .ryg button { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.78); border-color: rgba(255,255,255,0.25); }

  /* ---- matrix axis lines + light hovers / borders ---- */
  .matrix-grid { border-color: rgba(255,255,255,0.35) !important; }
  .client-table tr:hover { background: rgba(255,255,255,0.06) !important; }
  .client-table td { border-bottom-color: rgba(255,255,255,0.12) !important; }
  .crit-tag { background: rgba(255,107,107,0.2) !important; }

  /* ---- Calibri family CSS variables (re-skins var-based elements at once) ---- */
  :root {
    --grad1: #4a146b !important; --grad2: #2c0a3d !important;
    --card: rgba(255,255,255,0.05) !important; --line: rgba(255,255,255,0.2) !important;
    --slate: #ffffff !important;
  }
`

function themeFor(exerciseId) {
  if (!THEMED_EXERCISES.has(exerciseId)) return null
  return BASE_ONLY.has(exerciseId) ? THEME_BASE : THEME_BASE + THEME_LIGHT
}

function injectTheme(html, css) {
  const styleTag = `<style id="bn-exercise-theme">${css}</style>`
  // Place LAST in <head> so it wins ties against the exercise's own stylesheet.
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${styleTag}</head>`)
  if (/<\/body>/i.test(html)) return html.replace(/<\/body>/i, `${styleTag}</body>`)
  return html + styleTag
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
        let html = withCharset(fixMojibake(raw))
        const themeCss = themeFor(exerciseId)
        if (themeCss) html = injectTheme(html, themeCss)
        setMarkup(html)
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
