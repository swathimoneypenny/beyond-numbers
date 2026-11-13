/* Workshop session data — shared by the Workshops list page and each session page.
   Add real slides/exercises later; the structure is ready for it. */

import { REGISTER_WORKSHOP_URLS } from './content'

export const sessions = [
  {
    number: '01',
    slug: 'session-1',
    title: 'Your Vision, Your Team',
    subtitle: 'What do I want, and how do I bring my team with me?',
    description:
      "Audit your own work, design the practice you'd build from scratch, then discover a purpose your team already shares and the roles that support it.",
    meta: ['90 min', '4 exercises'],
    framing: {
      use: 'The Traffic Light, the $100K Question, the 52-Card Team Pickup and the Team Purpose Map.',
      leaveWith:
        "An honest audit of your own work, the practice you'd build from scratch, the role that is your next hire, and a draft Team Purpose Map — the shared purpose and the roles that support it.",
      commitment:
        'Bring your RED %, your Box 5 sentence, your next-hire role and your draft Team Purpose Map to Session 2.',
    },
  },
  {
    number: '02',
    slug: 'session-2',
    title: 'Clients & Pricing',
    subtitle: 'Who you serve, and what they should pay.',
    description:
      "Sort your book and release the wrong-fit clients, then move from hourly to fixed fees by pricing between your cost to deliver and the client's true in-house cost.",
    meta: ['90 min', '3 exercises'],
    framing: {
      use: 'The Client Portfolio Matrix, the True Cost Calculator and the Firm Cost Builder.',
      leaveWith:
        "A sorted book with your wrong-fit clients flagged to release, and fixed fees priced between your cost to deliver and the client's true in-house cost.",
      commitment: 'Bring your three IDEAL clients and their pricing to Session 3.',
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

/* Public Workshops LIST cards — the December 2026 relaunch (three workshops).
   Kept separate from `sessions` above on purpose: `sessions`/getSession still
   back the gated session pages and their exercises (the OLD program, to be
   rebuilt in a later step). These cards reuse the slugs session-1/2/3 so their
   links keep resolving to the existing routes for now. */
export const workshops = [
  {
    number: '01',
    slug: 'session-1',
    title: 'Build Your Advisory Business — Your Vision, Your Team',
    subtitle: 'What do I want, and how do I bring my team with me?',
    description:
      'Audit your services with the Traffic Light and $100K Question, clarify your unique value, then map four delivery roles and build a Team Purpose Map to bring your people with you.',
    meta: ['90 min', '4 exercises'],
    register: REGISTER_WORKSHOP_URLS['1'],
  },
  {
    number: '02',
    slug: 'session-2',
    title: 'Choose the Right Clients. Price Your Services for Profit.',
    subtitle: 'Who should you serve, and what should you charge?',
    description:
      'Score your clients by value and effort with the Client Portfolio Matrix, then use the True Cost Calculator and Firm Cost Builder to price recurring work for profit.',
    meta: ['90 min', '3 exercises'],
    register: REGISTER_WORKSHOP_URLS['2'],
  },
  {
    number: '03',
    slug: 'session-3',
    title: 'Protect Your Firm — Cybersecurity and AI Governance',
    subtitle: 'What must leaders own as you add AI and handle more client data?',
    description:
      'Review your WISP, cyber-insurance, vendors and incident response, set practical AI governance, and build a role-based gap list with the WISP & AI Governance Role Checklist.',
    meta: ['90 min', '1 exercise'],
    register: REGISTER_WORKSHOP_URLS['3'],
  },
]
