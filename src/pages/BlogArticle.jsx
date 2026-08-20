import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Headphones, Youtube } from 'lucide-react'
import Reveal from '../components/Reveal'
import { getArticle } from '../data/blog'
import NotFound from './NotFound'

/* Italicise the two titles wherever they appear in body text. */
function withItalics(text) {
  return text.split(/(It’s Not Just the Numbers|Forbes)/g).map((part, i) =>
    part === 'It’s Not Just the Numbers' || part === 'Forbes' ? (
      <em key={i} className="italic">
        {part}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

const extLink =
  'font-semibold text-teal underline-offset-2 hover:underline'

export default function BlogArticle() {
  const { slug } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />

  const { source } = article

  return (
    <article className="bg-white">
      {/* Header */}
      <header className="border-b border-line bg-cream">
        <div className="mx-auto max-w-[760px] px-5 pb-12 pt-32 sm:px-8 sm:pt-40">
          <Reveal>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
            >
              <ArrowRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-teal">Article</p>
            <h1 className="mt-4 font-display text-[2.3rem] font-bold leading-[1.08] tracking-tight text-navy sm:text-[3rem]">
              {article.title}
            </h1>
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 sm:py-20">
        {article.blocks.map((b, i) => {
          if (b.t === 'h2') {
            return (
              <Reveal key={i}>
                <h2 className="mt-12 font-display text-[1.6rem] font-bold leading-snug tracking-tight text-navy sm:text-[1.8rem]">
                  {b.s}
                </h2>
              </Reveal>
            )
          }
          if (b.t === 'takeaways') {
            return (
              <ol key={i} className="mt-8 space-y-4">
                {b.items.map((it, j) => (
                  <Reveal key={j} delay={Math.min(j * 0.05, 0.25)}>
                    <li className="flex gap-4 rounded-2xl border border-line bg-cream p-5 sm:p-6">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white">
                        {j + 1}
                      </span>
                      <p className="self-center text-[1rem] leading-relaxed text-ink/80">
                        <strong className="font-semibold text-navy">{it.lead}</strong> {it.rest}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            )
          }
          return (
            <Reveal key={i}>
              <p className="mt-6 text-[1.08rem] leading-relaxed text-ink/80">{withItalics(b.s)}</p>
            </Reveal>
          )
        })}

        {/* Source note */}
        {source && (
          <Reveal>
            <div className="mt-14 rounded-2xl border border-line bg-cream p-6 sm:p-7">
              <p className="text-[0.95rem] italic leading-relaxed text-ink/70">
                {withItalics(source.note)}
              </p>
              <div className="mt-4 flex flex-col gap-2 text-[0.95rem] italic text-ink/70">
                <p className="flex items-center gap-2">
                  <Headphones size={16} className="shrink-0 not-italic text-teal" />
                  <span>
                    Listen on{' '}
                    <a href={source.spotify} target="_blank" rel="noopener noreferrer" className={extLink}>
                      Spotify
                    </a>{' '}
                    or{' '}
                    <a href={source.apple} target="_blank" rel="noopener noreferrer" className={extLink}>
                      Apple Podcasts
                    </a>
                    .
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Youtube size={16} className="shrink-0 not-italic text-teal" />
                  <span>
                    Watch on{' '}
                    <a href={source.youtube} target="_blank" rel="noopener noreferrer" className={extLink}>
                      YouTube
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Footer nav */}
        <div className="mt-12 border-t border-line pt-8">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-teal"
          >
            <ArrowRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </Link>
        </div>
      </div>
    </article>
  )
}
