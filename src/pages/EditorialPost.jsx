import { Link, useParams } from 'react-router-dom'
import { formatPostDate, getPostBySlug } from '../data/posts'

export default function EditorialPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <h1 className="text-3xl font-medium text-ink">Post not found</h1>
        <Link
          to="/editorial"
          className="mt-6 inline-block text-sm text-muted no-underline hover:text-ink"
        >
          Back to Editorial
        </Link>
      </div>
    )
  }

  return (
    <article className="bg-paper">
      <header className="mx-auto max-w-3xl px-5 pt-16 sm:px-8 sm:pt-20">
        <time dateTime={post.date} className="animate-rise block text-sm text-crimson">
          {formatPostDate(post.date)}
        </time>
        <h1 className="animate-rise-delay mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
      </header>

      <div className="animate-rise-delay-2 mx-auto max-w-3xl space-y-5 px-5 py-10 sm:px-8 sm:py-12">
        {post.body.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-[1.75] text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
