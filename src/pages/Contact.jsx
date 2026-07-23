import { useState } from 'react'
import { Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal'

const details = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'contact@beyond-numbers.com',
    href: 'mailto:contact@beyond-numbers.com',
  },
  { icon: Clock, label: 'Response time', value: 'Within 1–2 business days' },
  { icon: MapPin, label: 'Workshops', value: 'Delivered virtually' },
]

/* Floating-label field: the label rests inside the field, then floats up and
   turns teal on focus or once the field has a value. Focus adds a teal glow
   ring. The example placeholder is transparent until focus, so it never
   collides with the resting label. */
function Field({ id, label, type = 'text', placeholder, required, textarea }) {
  const base =
    'peer w-full rounded-xl border border-line bg-white px-4 text-ink outline-none transition-all placeholder:text-transparent focus:placeholder:text-ink/35 focus:border-teal focus:ring-4 focus:ring-teal/20 focus:shadow-[0_0_0_4px_rgba(37,168,140,0.10)]'
  // Floated by default (covers the filled state); peer-placeholder-shown drops it
  // back to resting when empty; peer-focus re-floats it and tints it teal.
  const labelCls =
    'pointer-events-none absolute left-4 top-2 z-10 text-xs font-semibold text-teal transition-all ' +
    'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-ink/45 ' +
    'peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-teal'
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={placeholder || ' '}
          className={`${base} resize-none pb-3 pt-7`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder || ' '}
          className={`${base} pb-2.5 pt-7`}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label} {required && <span className="text-teal">*</span>}
      </label>
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section className="relative overflow-hidden">
      {/* Soft aurora glow (brand purple / teal / yellow) behind the form,
          echoing the hero. Sits behind everything and ignores pointer events. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-32 h-[32rem] w-[32rem] rounded-full bg-purple/15 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-[26rem] w-[26rem] rounded-full bg-teal/12 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-yellow/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 py-32 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left: intro + details */}
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-navy/30" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
                Contact Us
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.8rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Let’s talk about your practice.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/60">
              Have a question about the workshop series, dates, or bringing it to your firm? Send us
              a note and we’ll get back to you.
            </p>

            <div className="mt-12 space-y-6">
              {details.map((d) => {
                const Inner = (
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                      <d.icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                        {d.label}
                      </p>
                      <p className="mt-1 font-medium text-ink">{d.value}</p>
                    </div>
                  </div>
                )
                return d.href ? (
                  <a key={d.label} href={d.href} className="block transition-opacity hover:opacity-70">
                    {Inner}
                  </a>
                ) : (
                  <div key={d.label}>{Inner}</div>
                )
              })}
            </div>
          </Reveal>

          {/* Right: form card */}
          <Reveal className="rounded-3xl border border-line bg-white p-7 shadow-[0_30px_70px_-40px_rgba(29,51,61,0.4)] sm:p-10">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 size={52} className="text-teal" strokeWidth={1.5} />
                <h2 className="mt-6 font-display text-2xl font-semibold text-ink">
                  Thanks — we’ve got your message.
                </h2>
                <p className="mt-3 max-w-sm text-ink/60">
                  This is a demo, so nothing was actually sent. We’d normally reply within 1–2
                  business days.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 rounded-full border border-navy/20 px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal/50"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" placeholder="Jane Doe" required />
                  <Field id="email" label="Email" type="email" placeholder="you@firm.com" required />
                </div>
                <Field id="firm" label="Firm name" placeholder="Doe & Associates CPA" />
                <Field
                  id="message"
                  label="Message"
                  placeholder="Tell us a little about your firm and what you're looking for…"
                  textarea
                  required
                />

                <button
                  type="submit"
                  className="btn-premium group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-4 font-semibold text-white shadow-lg shadow-navy/20 transition-colors hover:bg-navy-deep"
                >
                  Send message
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center text-xs text-ink/45">
                  We’ll only use your details to respond to your enquiry.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
