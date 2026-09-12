import { useState } from 'react'
import { Link } from 'react-router-dom'
import JoinCTA from '../components/JoinCTA'
import { formatPostDate, posts, topics } from '../data/posts'

const filters = ['All', ...topics]

export default function Editorial() {
  const [active, setActive] = useState('All')

  const visible =
    active === 'All' ? posts : posts.filter((post) => post.topics.includes(active))

  return (
    <div className="flex flex-1 flex-col bg-paper">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 text-left sm:px-8 sm:pt-20">
        <h1 className="animate-rise text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Editorial
        </h1>

        <div
          className="animate-rise-delay mt-8 flex flex-wrap justify-start gap-x-5 gap-y-2 pl-0.5"
          role="tablist"
          aria-label="Filter by topic"
        >
          {filters.map((filter) => {
            const isActive = active === filter
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(filter)}
                className={[
                  'text-sm transition-colors',
                  isActive ? 'font-medium text-crimson' : 'text-muted hover:text-ink',
                ].join(' ')}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </section>

      <section className="animate-rise-delay-2 mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {visible.length === 0 ? (
          <p className="text-muted">No pieces in this topic yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {visible.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/editorial/${post.slug}`}
                  className="flex h-full flex-col border border-line p-6 no-underline transition-opacity hover:opacity-70 sm:p-7"
                >
                  <time dateTime={post.date} className="text-sm text-muted">
                    {formatPostDate(post.date)}
                  </time>
                  <h2 className="mt-3 text-xl font-medium tracking-tight text-ink">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <JoinCTA
        title="Stay in the loop."
        description="Subscribe for new Editorial pieces and announcements."
      />
    </div>
  )
}
