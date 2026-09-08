import { Link } from 'react-router-dom'
import JoinCTA from '../components/JoinCTA'

const activities = [
  {
    title: 'Discussions',
    copy: 'We meet to talk through new research, model releases, and what they mean for AI safety and policy.',
  },
  {
    title: 'Editorial',
    copy: 'Our student-run publication where staff writers author pieces on AI policy, technical research, and philosophy.',
  },
  {
    title: 'Deep Dives',
    copy: 'Each member researches an AI safety topic or event in depth, then teaches their findings to the club.',
  },
  {
    title: 'Project Labs',
    copy: 'Small teams work on hands-on projects spanning technical research and policy questions.',
  },
]

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-crimson text-white">
        <div className="mx-auto grid max-w-6xl items-center justify-items-center gap-12 px-5 py-24 text-center sm:px-8 sm:py-28 lg:grid-cols-[1fr_auto] lg:justify-items-stretch lg:gap-20 lg:py-32 lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="animate-rise text-[2.4rem] font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.15rem]">
              AI Safety & Alignment
              <br />
              Initiative
            </h1>
            <p className="animate-rise-delay mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              A community at Indiana University ensuring AI is developed to the benefit of our future.
            </p>
            <div className="animate-rise-delay-2 mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#join" className="btn-primary">
                Get Involved
              </a>
              <Link to="/editorial" className="btn-ghost text-white">
                Read Our Editorial
              </Link>
            </div>
          </div>

          <img
            src="/aisai-logo.png"
            alt="AISAI logo"
            width={320}
            height={320}
            draggable={false}
            className="animate-rise-delay pointer-events-none h-56 w-56 select-none object-contain sm:h-72 sm:w-72 lg:h-80 lg:w-80"
          />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-2xl space-y-5 px-5 py-20 text-lg leading-[1.75] text-ink-soft sm:px-8 sm:py-24 sm:text-xl sm:leading-[1.8]">
          <p>
            As AI systems grow more capable, ensuring they remain safe, controllable, and aligned
            with human interests is one of the most consequential open problems of this decade.
          </p>
          <p>
              The AI Safety & Alignment Initiative (AISAI) is a student-run interdisciplinary hub
              for IUB students across computer science, philosophy, policy, and beyond to think
              seriously about the technical and governance challenges of advanced AI.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">What We Do</h2>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {activities.map((item, index) => (
              <li key={item.title} className="border border-line p-6 sm:p-8">
                <span className="text-sm font-medium text-crimson">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-medium tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinCTA
        id="join"
        title="New members always welcome."
        description="No CS or AI background required. Email us to join the mailing list or ask about meetings."
      />
    </div>
  )
}
