export const CONTACT_EMAIL = 'absiso@iu.edu'
export const DISCORD_INVITE = 'https://discord.gg/4bjyeXK83'

export const topics = ['Technical', 'Policy', 'Philosophy']

export const posts = [
  {
    slug: 'openai-huggingface-security-incident',
    title: 'The OpenAI / Hugging Face Security Incident',
    date: '2027-02-12',
    topics: ['Technical'],
    excerpt:
      'What a documented lab security failure reveals about evaluation setups, containment, and disclosure.',
    body: [
      'Placeholder article. Full analysis coming soon.',
    ],
  },
  {
    slug: 'sanders-ban-ai-development-bill',
    title: 'Bernie Sanders’s Bill to Ban AI Development',
    date: '2027-02-05',
    topics: ['Policy'],
    excerpt:
      'A proposal to stop advanced AI development: what it bans, how it would be enforced, and what happens if others don’t follow.',
    body: [
      'Placeholder article. Full analysis coming soon.',
    ],
  },
  {
    slug: 'open-weights-ai-policy',
    title: 'Should Frontier Models Be Open Weight?',
    date: '2027-01-28',
    topics: ['Policy'],
    excerpt:
      'Open-weight releases widen access and scrutiny, but make misuse and controls harder to manage.',
    body: [
      'Placeholder article. Full analysis coming soon.',
    ],
  },
  {
    slug: 'european-ai-policy-landscape',
    title: 'European AI Policy and the Global Governance Race',
    date: '2027-01-20',
    topics: ['Policy'],
    excerpt:
      'How Europe’s AI rules and institutions are reshaping the global governance race.',
    body: [
      'Placeholder article. Full analysis coming soon.',
    ],
  },
  {
    slug: 'rlhf-fundamentals',
    title: 'RLHF and the Shape of Modern Assistants',
    date: '2027-01-14',
    topics: ['Technical'],
    excerpt:
      'How Reinforcement Learning from Human Feedback shapes modern assistants, and where it breaks down.',
    body: [
      'Placeholder article. Full analysis coming soon.',
    ],
  },
  {
    slug: 'superalignment-as-a-problem',
    title: 'Superalignment as a Technical Problem',
    date: '2027-01-08',
    topics: ['Technical'],
    excerpt:
      'How do you align systems that may be smarter than the humans overseeing them?',
    body: [
      'Placeholder article. Full analysis coming soon.',
    ],
  },
]

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}

export function formatPostDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
