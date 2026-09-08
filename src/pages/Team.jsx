import JoinCTA from '../components/JoinCTA'
import { facultyAdvisor, teamMembers } from '../data/team'

export default function Team() {
  return (
    <div className="flex flex-1 flex-col bg-paper">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 text-left sm:px-8 sm:pt-20">
        <h1 className="animate-rise text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Team
        </h1>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 text-left sm:px-8 sm:py-16">
        <div className="animate-rise-delay border border-line p-6 sm:p-8 md:grid md:grid-cols-[14rem_1fr] md:gap-10 md:p-10">
          <img
            src={facultyAdvisor.photo}
            alt={facultyAdvisor.name}
            width={224}
            height={280}
            className="aspect-[4/5] w-full object-cover object-[54%_top] md:aspect-auto md:h-[17.5rem] md:w-56"
          />
          <div className="mt-6 flex flex-col justify-center md:mt-0">
            <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {facultyAdvisor.name}
            </h2>
            <p className="mt-2 text-sm text-muted">Faculty Advisor</p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {facultyAdvisor.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href={facultyAdvisor.website}
                target="_blank"
                rel="noreferrer"
                className="text-crimson no-underline hover:opacity-70"
              >
                Website
              </a>
              <a
                href={`mailto:${facultyAdvisor.email}`}
                className="text-crimson no-underline hover:opacity-70"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="animate-rise-delay-2">
          <h2 className="mt-16 text-2xl font-medium tracking-tight text-ink">
            Officers & staff writers
          </h2>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <li
                key={`${member.role}-${index}`}
                className="flex flex-col items-start border border-line p-5 text-left sm:p-6"
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={448}
                    height={560}
                    className="aspect-[4/5] w-full object-cover object-center"
                  />
                ) : (
                  <div
                    className="flex aspect-[4/5] w-full items-center justify-center bg-cream text-sm text-muted"
                    aria-hidden="true"
                  >
                    Photo
                  </div>
                )}
                <h3 className="mt-4 text-lg font-medium tracking-tight text-ink">{member.name}</h3>
                <p className="mt-1 text-sm text-crimson">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JoinCTA
        title="Want to join the team?"
        description="Officer and staff writer roles fill as we launch. Reach out if you want to help build AISAI."
      />
    </div>
  )
}
