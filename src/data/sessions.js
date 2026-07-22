/* Workshop session data — shared by the Workshops list page and each session page.
   Add real slides/exercises later; the structure is ready for it. */

export const sessions = [
  {
    number: '01',
    slug: 'session-1',
    title: 'Foundation & Service Portfolio',
    subtitle: 'Why am I changing — and what am I keeping?',
    description:
      'Understand the shift from compliance to advisory, assess your service mix with the Four Quadrants framework, and decide what to keep, delegate, or eliminate.',
    meta: ['90 min', '2 exercises'],
  },
  {
    number: '02',
    slug: 'session-2',
    title: 'People: Team & Clients',
    subtitle: 'Who do I work with — on my team, and as clients?',
    description:
      'Design a scalable advisory team around four key roles, then sort your client base Gold, Silver, Bronze, or Fire to grow the right relationships.',
    meta: ['90 min', '2 exercises'],
  },
  {
    number: '03',
    slug: 'session-3',
    title: 'Technology & AI',
    subtitle: 'How will I deliver the work efficiently and safely?',
    description:
      "Build a focused 'Little Black Dress' tech stack, apply the 80/20 rule, and learn where AI fits across the workflow with practical AI governance.",
    meta: ['90 min', '2 exercises'],
  },
  {
    number: '04',
    slug: 'session-4',
    title: 'Procedures & Implementation Roadmap',
    subtitle: 'How will the work actually get done and scale?',
    description:
      'Document workflows and playbooks, then sequence everything into a single 90-day implementation roadmap.',
    meta: ['90 min', '2 exercises'],
    comingSoon: true,
  },
]

export const getSession = (slug) => sessions.find((s) => s.slug === slug)
