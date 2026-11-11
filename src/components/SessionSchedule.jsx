import { Calendar, Clock, MessageCircle } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { schedule } from '../data/content'

/* Three dated workshop cards plus a distinct, teal-accented Open-Hours Q&A card
   (included with every registration). */
export default function SessionSchedule() {
  return (
    <Section
      id="schedule"
      bg="white"
      accent="teal"
      eyebrow="Dates & Times"
      title="Workshop Schedule"
    >
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {schedule.map((s, i) =>
          s.kind === 'qa' ? (
            // Bonus Open-Hours Q&A — teal-accented so it reads as an included
            // extra, not a fourth workshop.
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-teal/40 bg-teal/[0.08] p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">
                    Bonus
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-white">
                    <MessageCircle size={16} />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy">
                  {s.title}
                </h3>
                <div className="mt-auto pt-5">
                  <p className="flex items-center gap-2 font-semibold text-[#1A1A1A]">
                    <Calendar size={16} className="text-teal" />
                    {s.date}
                  </p>
                  <p className="mt-2 text-sm italic text-ink/60">{s.note}</p>
                </div>
              </article>
            </Reveal>
          ) : (
            <Reveal key={s.n} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">
                    Workshop {s.n}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-white">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy">
                  {s.title}
                </h3>
                <div className="mt-auto pt-5">
                  <p className="flex items-center gap-2 font-semibold text-[#1A1A1A]">
                    <Calendar size={16} className="text-teal" />
                    {s.date}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#1A1A1A]">
                    <Clock size={16} className="text-teal" />
                    {s.time}
                  </p>
                </div>
              </article>
            </Reveal>
          ),
        )}
      </div>
    </Section>
  )
}
