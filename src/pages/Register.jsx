import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal'

function Field({ id, label, type = 'text', placeholder, required }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} {required && <span className="text-teal">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-purple/50 focus:ring-4 focus:ring-purple/10"
      />
    </div>
  )
}

export default function Register() {
  const [sent, setSent] = useState(false)

  return (
    <section className="relative overflow-hidden bg-hero-dark text-white">
      {/* depth glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-purple/25 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-teal/12 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[88vh] max-w-[1240px] items-center gap-14 px-5 py-32 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Intro */}
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Reserve your seat
          </span>
          <h1 className="mt-6 font-display text-[2.8rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl">
            Register for the Series
          </h1>
          <div className="mt-5 flex items-center gap-1.5">
            <span className="h-1.5 w-16 rounded-full bg-yellow" />
            <span className="h-1.5 w-9 rounded-full bg-teal" />
          </div>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-white/70">
            Join firm owners and advisory leaders redesigning the way their practice works. Add your
            details and we’ll be in touch with dates and next steps.
          </p>
        </Reveal>

        {/* Form card */}
        <Reveal className="rounded-3xl border border-white/10 bg-white p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-10">
          {sent ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <CheckCircle2 size={52} className="text-teal" strokeWidth={1.5} />
              <h2 className="mt-6 font-display text-2xl font-bold text-navy">
                You’re on the list.
              </h2>
              <p className="mt-3 max-w-sm text-ink/60">
                This is a demo, so nothing was actually submitted. We’d normally confirm your spot by
                email.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 rounded-full border border-purple/30 px-6 py-2.5 text-sm font-semibold text-purple transition-colors hover:border-purple/50"
              >
                Register another
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
              <Field id="name" label="Name" placeholder="Jane Doe" required />
              <Field id="email" label="Email" type="email" placeholder="you@firm.com" required />
              <Field id="firm" label="Firm name" placeholder="Doe & Associates CPA" />
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-4 font-semibold text-white shadow-lg shadow-teal/30 transition-all hover:bg-teal-deep"
              >
                Submit registration
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-center text-xs text-ink/45">
                We’ll only use your details to contact you about this workshop series.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
