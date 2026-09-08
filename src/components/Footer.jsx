import { Link, useLocation } from 'react-router-dom'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/143631076',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.9 1.15h3.29l-7.18 8.21L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.86l7.68-8.78L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.16 19.5h1.82L6.35 3.02H4.4l13.34 17.63z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Link
          to="/"
          className="flex select-none items-center gap-3 no-underline"
          onClick={(event) => {
            if (pathname === '/') {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <img
            src="/aisai-logo-crimson.png"
            alt=""
            width={36}
            height={36}
            draggable={false}
            className="pointer-events-none h-9 w-9 shrink-0 object-contain"
          />
          <span className="text-sm font-medium text-ink">
            AI Safety & Alignment Initiative (AISAI)
          </span>
        </Link>
        <nav className="flex gap-6 text-sm text-muted" aria-label="Footer">
          <Link to="/editorial" className="no-underline hover:text-ink">
            Editorial
          </Link>
          <Link to="/events" className="no-underline hover:text-ink">
            Events
          </Link>
          <Link to="/resources" className="no-underline hover:text-ink">
            Resources
          </Link>
          <Link to="/team" className="no-underline hover:text-ink">
            Team
          </Link>
          <a href="mailto:aisai@indiana.edu" className="no-underline hover:text-ink">
            Contact
          </a>
        </nav>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-line/70 px-5 py-4 sm:px-8">
        <p className="text-xs leading-relaxed text-muted">
          This is a student-run organization and is not
          <br className="sm:hidden" /> an official website of Indiana University.
        </p>
        <nav className="flex shrink-0 items-center gap-3" aria-label="Social">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="text-muted transition-colors hover:text-ink"
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
