import { useParams } from 'react-router-dom'
import { Hammer } from 'lucide-react'
import { getSession } from '../data/sessions'
import SessionHero from '../components/SessionHero'
import NotFound from './NotFound'

/* Generic placeholder session page (used for sessions that aren't built out yet). */
export default function SessionPage() {
  const { slug } = useParams()
  const session = getSession(slug)

  if (!session) return <NotFound />

  return (
    <SessionHero session={session}>
      <p className="mt-8 max-w-2xl leading-relaxed text-white/70">{session.description}</p>

      <div className="mt-12 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur sm:p-7">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
          <Hammer size={20} />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-white">
            Slides and exercises coming next
          </h2>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/65">
            The interactive slides and hands-on exercises for this session are being built and will
            appear here.
          </p>
        </div>
      </div>
    </SessionHero>
  )
}
