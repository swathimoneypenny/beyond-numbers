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
  { icon: MapPin, label: 'Workshops', value: 'Delivered virtually & in person' },
]

function Field({ id, label, type = 'text', placeholder, required, textarea }) {
  const base =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-navy/40 focus:ring-4 focus:ring-navy/10'
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-teal">*</span>}
      </label>
      {textarea ? (
        <textarea id={id} rows={5} placeholder={placeholder} className={`${base} resize-none`} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} className={base} />
      )}
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-yellow/10 to-transparent blur-3xl" />
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
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 py-4 font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:bg-navy-deep"
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
