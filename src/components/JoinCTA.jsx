import { useState } from 'react'
import { CONTACT_EMAIL } from '../data/posts'

const socialActions = [
  { label: 'Follow on LinkedIn', href: 'https://www.linkedin.com/', primary: true },
  { label: 'Follow on X', href: 'https://x.com/', primary: false },
]

export default function JoinCTA({
  id,
  title = 'New members always welcome.',
  description = 'No CS or AI background required. Email us to join the mailing list or ask about meetings.',
  mode = 'email',
}) {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id={id} className="mt-auto bg-crimson text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 md:max-w-none">
          <h2 className="text-3xl font-medium tracking-tight sm:whitespace-nowrap">{title}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {mode === 'social' ? (
            socialActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={action.primary ? 'btn-primary' : 'btn-ghost text-white'}
              >
                {action.label}
              </a>
            ))
          ) : (
            <>
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
                Email us
              </a>
              <button type="button" onClick={copyEmail} className="btn-ghost text-white">
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
