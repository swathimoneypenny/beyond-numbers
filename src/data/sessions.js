/* Workshop session data — shared by the Workshops list page and each session page.
   Add real slides/exercises later; the structure is ready for it. */

export const sessions = [
  {
    number: '01',
    slug: 'session-1',
    title: 'Foundation & Service Portfolio',
    subtitle:
      'Which services should your firm stop, outsource, automate or focus on—and what is the first move?',
    description:
      'Understand the shift from compliance to advisory, assess your service mix with the Four Quadrants framework, and decide what to keep, delegate, or eliminate.',
    meta: ['90 min', '2 exercises'],
    framing: {
      use: 'The Traffic Light Revolution and the $100K Question.',
      leaveWith:
        'A Stop / Outsource / Automate / Focus decision set for your services, and one dated 30-day move.',
      commitment: 'One 30-day service decision, with a date.',
    },
  },
  {
    number: '02',
    slug: 'session-2',
    title: 'People, Capacity & Clients',
    subtitle:
      "Who should own the work—and which client relationships deserve your firm's best capacity?",
    description:
      'Design a scalable advisory team around four key roles, then sort your client base Gold, Silver, Bronze, or Fire to grow the right relationships.',
    meta: ['90 min', '2 exercises'],
    framing: {
      use: 'The 52-Card Team Pickup and the Client Portfolio Map.',
      leaveWith:
        'A sharper view of the role that could unlock capacity next, a client portfolio map, three Gold relationships to approach, and one wrong-fit relationship to review for transition.',
      commitment: 'One capacity move and one client decision.',
    },
  },
  {
    number: '03',
    slug: 'session-3',
    title: 'Technology & AI',
    subtitle:
      'Which technology earns a place in your core stack—and under what rules may AI be used on client work?',
    description:
      "Build a focused 'Little Black Dress' tech stack, apply the 80/20 rule, and learn where AI fits across the workflow with practical AI governance.",
    meta: ['90 min', '2 exercises'],
    framing: {
      use: 'The Little Black Dress technology approach, a sample stack costing, and an AI vendor due-diligence scorecard.',
      leaveWith:
        'The shape of your core stack, a costed sample advisory stack, and a Go / Conditional / No-Go decision on one AI tool with a safer next step.',
      commitment: 'One technology decision and one AI guardrail.',
    },
  },
  {
    number: '04',
    slug: 'session-4',
    title: 'Procedures & Implementation',
    subtitle:
      'What must be documented, owned and tested so the work no longer depends on memory?',
    description:
      'Two working blocks, two hands-on exercises, one firm that runs without you.',
    meta: ['90 min', '2 exercises'],
    framing: {
      use: 'A policy-versus-procedure framework and a month-end reconciliation procedure template.',
      leaveWith:
        'A drafted, peer-tested month-end reconciliation procedure, and a one-page Practice Decisions Roadmap that sequences your priorities into a focused 90-day plan.',
      commitment: 'One documented procedure, and a sequenced 90-day roadmap.',
    },
  },
]

export const getSession = (slug) => sessions.find((s) => s.slug === slug)
