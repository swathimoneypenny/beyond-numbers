import { Calendar, Clock, Award } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { schedule, cpe } from '../data/content'

/* Four dated session cards + a prominent CPE-credits badge. */
export default function SessionSchedule() {
  return (
    <Section
      id="schedule"
      bg="white"
      accent="teal"
      eyebrow="Dates & Times"
      title="Session Schedule"
    >
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {schedule.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-teal">
                  Session {s.n}
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
        ))}
      </div>

      {/* CPE credits badge */}
      <Reveal delay={0.15}>
        <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3.5 rounded-2xl border border-yellow/50 bg-yellow/[0.14] px-6 py-5 text-center">
          <Award size={26} className="shrink-0 text-[#8a6a00]" />
          <p className="text-[1.05rem] font-semibold text-[#1A1A1A]">{cpe}</p>
        </div>
      </Reveal>
    </Section>
  )
}
