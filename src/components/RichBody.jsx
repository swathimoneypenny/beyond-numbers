import { Check } from 'lucide-react'

/* Renders the full workshop module body: paragraphs, ordered list,
   checklist, and a highlighted key takeaway. Keeps all source copy. */
export default function RichBody({ body }) {
  return (
    <>
      {body.paragraphs?.map((p, i) => (
        <p key={i} className="mb-4 max-w-3xl text-[1.02rem] leading-relaxed text-ink/70">
          {p}
        </p>
      ))}

      {body.orderedList && (
        <ol className="my-6 max-w-3xl space-y-3.5">
          {body.orderedList.map((li, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-display text-base font-bold text-teal/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[1.02rem] font-medium leading-relaxed text-ink/80">{li}</span>
            </li>
          ))}
        </ol>
      )}

      {body.list && (
        <div className="mt-6">
          {body.listLabel && (
            <p className="mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink/45">
              {body.listLabel}
            </p>
          )}
          <ul className="grid max-w-4xl gap-x-10 gap-y-3.5 sm:grid-cols-2">
            {body.list.map((li, i) => (
              <li key={i} className="flex gap-3 border-b border-line/70 pb-3.5">
                <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0 text-teal" />
                <span className="text-[0.95rem] leading-relaxed text-ink/70">{li}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {body.takeaway && (
        <div className="mt-7 max-w-3xl rounded-xl border-l-[3px] border-yellow bg-sand py-4 pl-5 pr-4">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-navy/70">
            Key takeaway
          </p>
          <p className="mt-1.5 text-[1.02rem] leading-relaxed text-ink/85">{body.takeaway}</p>
        </div>
      )}
    </>
  )
}
