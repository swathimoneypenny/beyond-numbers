/* Centralized copy for the workshop site. */

/* External registration (GoToWebinar). Every Register button opens this in a
   new tab. Update in one place if the webinar link changes. */
export const REGISTER_URL =
  'https://register.gotowebinar.com/register/5675019771835943003?source=Academy'

/* Pricing tiers (November 2026 relaunch). */
export const pricing = {
  tiers: [
    {
      name: 'Standard',
      price: 'US$199',
      unit: 'per person',
      note: 'Full series — four live sessions',
      featured: false,
    },
    {
      name: 'Early Bird',
      price: 'US$149',
      unit: 'per person',
      note: 'Register by September 30, 2026',
      featured: true,
    },
  ],
  groupLabel: 'Group discount',
  group: 'Save $100 per person when multiple people from the same firm register',
}

/* Session schedule (November–December 2026). Five weeks: three sessions, an
   application-week break over Thanksgiving, then the final session. The `break`
   entry is rendered as a non-session pause, not a numbered session. */
export const schedule = [
  { n: '1', title: 'Foundation & Service Portfolio', date: 'Thursday, November 5, 2026', time: '2:00pm – 3:30pm EST' },
  { n: '2', title: 'People: Team & Clients', date: 'Thursday, November 12, 2026', time: '2:00pm – 3:30pm EST' },
  { n: '3', title: 'Technology & AI', date: 'Thursday, November 19, 2026', time: '2:00pm – 3:30pm EST' },
  {
    kind: 'break',
    title: 'Application Week',
    date: 'Thanksgiving week · November 26',
    note: 'No live session — catch up and test',
  },
  { n: '4', title: 'Procedures & Implementation Roadmap', date: 'Thursday, December 3, 2026', time: '2:00pm – 3:30pm EST' },
]

export const cpe = 'This workshop series is eligible for 6 CPE credits.'

/* Hero bullet box (MaintBoard "Built for every kind of factory" equivalent). */
export const heroBox = {
  title: 'Built for firm owners ready to grow',
  items: [
    'Move beyond compliance into advisory-led value',
    'Audit your service mix and focus on what’s profitable',
    'Build the right team and choose the right clients',
    'Design a focused tech stack and a 90-day roadmap',
  ],
}

/* Section 2 — "Why This Transformation Matters" (6 challenge cards). */
export const challenges = [
  {
    icon: 'Scale',
    title: 'Compliance-only work is no longer enough',
    text: 'Clients want context, confidence, and proactive guidance.',
  },
  {
    icon: 'Workflow',
    title: 'Owner dependency slows growth',
    text: 'The firm relies on you being in every decision.',
  },
  {
    icon: 'SlidersHorizontal',
    title: 'Unclear service mix',
    text: 'Low-value, high-friction services drain time and margin.',
  },
  {
    icon: 'UserMinus',
    title: 'Wrong-fit clients',
    text: 'Too many low-value or mismatched clients dilute focus.',
  },
  {
    icon: 'LayoutGrid',
    title: 'Tool overload',
    text: 'Too many disconnected apps add complexity, not clarity.',
  },
  {
    icon: 'FileWarning',
    title: 'Undocumented processes',
    text: 'Work depends on memory and heroics, not systems.',
  },
]

/* Section 3 — "What You'll Work Through" (4 session cards). */
export const workThrough = [
  {
    tag: 'Session 1',
    icon: 'Compass',
    title: 'Foundation & service portfolio',
    text: 'Define your value, assess your service mix with the Four Quadrants framework, and decide what to keep, delegate, or eliminate.',
  },
  {
    tag: 'Session 2',
    icon: 'Users',
    title: 'People: team & clients',
    text: 'Build the roles a scalable advisory team needs and use a client matrix to choose the right clients.',
  },
  {
    tag: 'Session 3',
    icon: 'Layers',
    title: 'Technology stack deep dive',
    text: 'Design a focused tech stack using the 80/20 rule, app evaluation criteria, and integration planning.',
  },
  {
    tag: 'Session 4',
    icon: 'Route',
    title: 'Procedures & implementation roadmap',
    text: 'Document workflows and playbooks, then sequence a single 90-day implementation roadmap.',
  },
]

/* Section 4 — "How the Series Helps You" (4 cards). */
export const helps = [
  {
    icon: 'Sparkles',
    title: 'Clarity on your firm’s value',
    text: 'A clearer definition of your unique value and a prioritized service portfolio.',
  },
  {
    icon: 'UsersRound',
    title: 'The right team & clients',
    text: 'A team structure map and a client portfolio using the Gold, Silver, Bronze, and Fire framework.',
  },
  {
    icon: 'Layers',
    title: 'A focused tech stack',
    text: 'A practical technology plan and an app evaluation framework.',
  },
  {
    icon: 'CalendarCheck',
    title: 'A 90-day roadmap',
    text: 'A sequenced plan with clear 30-day and 48-hour action commitments.',
  },
]

/* Section 5 — "The Program at a Glance" (metrics band). */
export const metrics = [
  { value: '4', label: 'Working sessions' },
  { value: '90', suffix: 'min', label: 'Per session' },
  { value: '90', suffix: 'days', label: 'Implementation roadmap' },
  { value: '48', suffix: 'hrs', label: 'To your first action' },
]

/* ===== November 2026 relaunch — landing sections (batch 2a) =====
   Exact approved copy; rendered by src/pages/Home.jsx between the hero and
   the "Inside the Series" accordion. */

/* Section 1 — the unresolved decisions. */
export const decisionsSection = {
  title: 'You do not need another explanation of why advisory matters',
  subhead: 'The problem is not another shortage of ideas.',
  body: 'Most firm leaders already know the practice cannot keep operating exactly as it does today. What remains unresolved are the decisions:',
  points: [
    'Which services deserve more capacity—and which should stop consuming it?',
    'Is senior talent doing work that belongs in another role?',
    'Which client relationships should the firm grow, change or reconsider?',
    'Which applications belong in the core stack—and which are simply adding complexity?',
    'What evidence should an AI vendor provide before its tool touches client work?',
    "Which critical processes still live in somebody's head?",
  ],
  closing:
    'Those decisions rarely get made between deadlines, client work and day-to-day questions. This program creates the time, structure and experienced guidance to make them.',
}

/* Section 2 — what you will actually work on. */
export const workOnSection = {
  title: 'What you will actually work on',
  subhead: 'Bring the firm you have. Work ON the firm you want.',
  items: [
    'Bring your service list. Apply the Traffic Light Revolution and the $100K Question. Leave with a Stop / Outsource / Automate / Focus decision set and one dated 30-day move.',
    'Bring a clear picture of who does what. Use the 52-Card Team Pickup to move recurring work into the role that should own it. Leave with a sharper view of the role that could unlock capacity next.',
    'Bring your client list. Score real relationships by value and effort. Leave with a client portfolio map, three Gold relationships to approach and one wrong-fit relationship to review for transition.',
    'Bring your current technology questions. Define the shape of your Little Black Dress—a limited core stack your team can know deeply—and apply practical selection criteria. Cost a sample advisory stack so tool choices connect to delivery economics.',
    'Bring one AI tool you are considering. Apply a vendor due-diligence scorecard across client-data exposure, training risk, review controls, audit trail, contract terms and security evidence. Leave with a Go / Conditional / No-Go decision and a safer next step.',
    'Bring one process that depends too heavily on memory. Learn what belongs in a policy and a procedure, then draft and peer-test a real month-end reconciliation procedure.',
  ],
}

/* Section 3 — the method. */
export const methodSection = {
  title: 'The Beyond Numbers Practice Decisions Method',
  subhead: 'Four connected sessions. One clearer operating direction.',
  steps: [
    { label: 'Choose the work', text: 'What should the firm stop, shift, automate and focus on?' },
    {
      label: 'Align the capacity',
      text: "Who should own the work—and which clients should receive the firm's best capacity?",
    },
    {
      label: 'Enable the delivery',
      text: 'Which technology earns a place in the core stack, and under what rules may AI be used?',
    },
    {
      label: 'Make it repeatable',
      text: 'What must be documented, owned and tested so the work does not depend on memory?',
    },
  ],
  closing:
    'Across the series, you convert those decisions into 48-hour and 30-day commitments. In the capstone, you select and sequence your priorities in a focused 90-day Practice Decisions Roadmap.',
}

/* Section 4 — how the live format works. */
export const formatSection = {
  title: 'How the live format works',
  subhead: 'A working room, not a webinar audience.',
  intro: 'Each 90-minute session follows a practical rhythm:',
  steps: [
    {
      label: 'Frame the decision',
      text: 'Penny and Damien introduce the minimum context and a usable framework.',
    },
    { label: 'Apply it', text: 'You work with a worksheet or interactive tool—not a blank page.' },
    { label: 'Decide', text: 'You turn observations into a constrained choice about your own firm.' },
    { label: 'Commit', text: 'You name a next action, date or owner before the session closes.' },
  ],
}

/* Section 7 — "Frequently Asked Questions". */
export const faqs = [
  {
    q: 'Who is this workshop for?',
    a: 'Accounting firm owners, partners, managers, CAS leaders, and advisory practice leaders who want to move beyond compliance work and build a more scalable, advisory-focused practice.',
  },
  {
    q: 'When are the sessions and how long are they?',
    a: 'Four 90-minute live sessions on November 5, 12, 19, and December 3, 2026, from 2:00–3:30pm EST. Thanksgiving week (November 26) is an application week with no live session — time to catch up and apply what you’ve learned. Each session builds on the last.',
  },
  {
    q: 'What does it cost?',
    a: 'US$199 per person for the full series, or US$149 with the Early Bird rate if you register by September 30, 2026. Groups save $100 per person when multiple people from the same firm register.',
  },
  {
    q: 'Do I earn CPE credits?',
    a: 'Yes — the workshop series is eligible for 6 CPE credits.',
  },
  {
    q: "What if I can't attend a session live?",
    a: 'Every session is recorded, so you can catch up on anything you miss and revisit the material anytime.',
  },
  {
    q: 'Is this theory or practical?',
    a: 'Fully practical. Each session includes hands-on exercises, real-world examples, and worksheets you can apply to your own firm immediately.',
  },
  {
    q: 'What will I walk away with?',
    a: 'A prioritized service portfolio, a clearer team and client structure, a focused technology stack, and a sequenced 90-day implementation roadmap with concrete action commitments.',
  },
  {
    q: 'Do I need to prepare anything?',
    a: 'Just come ready to look honestly at your current services, team, clients, and tools. Everything else is provided during the sessions.',
  },
]

export const accordions = [
  {
    id: 'why-now',
    eyebrow: 'Context',
    title: 'Why this program matters now',
    body: {
      paragraphs: [
        'For years, many accounting firms have been built around compliance, deadlines, and reactive client service. That work still matters, but it is no longer enough to define the future of the firm. Clients want more context, confidence, and proactive guidance. Team members want better systems and clearer roles. Firm owners want more margin, less chaos, and a practice that does not depend on them being involved in every decision.',
        'This workshop series helps firms step back and redesign the operating model behind their advisory ambitions. Participants work through four connected questions:',
      ],
      orderedList: [
        'Why are we changing, and what should we keep?',
        'Who should we work with, both inside the firm and as clients?',
        'How will we deliver the work efficiently?',
        'How will the work actually get done and scale?',
      ],
    },
  },
  {
    id: 'session-1',
    eyebrow: 'Session 1',
    title: 'Foundation & service portfolio',
    subtitle: 'Why are you changing, and what are you keeping?',
    body: {
      paragraphs: [
        'The first session sets the foundation for the entire program. Participants explore the shift from compliance-driven work to advisory-led value, then apply that thinking to their own service portfolio.',
      ],
      listLabel: 'Participants will learn how to:',
      list: [
        'Understand the shift from scorekeeper to strategist',
        'Assess their current service mix using the Four Quadrants framework',
        'Identify low-value, high-friction services to eliminate or delegate',
        'Define services at the intersection of skill, fulfillment, and profitability',
        'Create a 30-day action plan to refine their service portfolio',
      ],
      takeaway:
        'Every service you keep has a cost. Make intentional decisions about which services deserve your firm’s time, talent, and attention.',
    },
  },
  {
    id: 'session-2',
    eyebrow: 'Session 2',
    title: 'People — team & clients',
    subtitle: 'Who should you work with?',
    body: {
      paragraphs: [
        'The second session focuses on the people side of transformation: the team you build and the clients you serve. Participants explore the roles in a scalable advisory practice — Business Operations Strategist, Admin, Business Analyst, and Technical roles — then shift to client selection.',
      ],
      listLabel: 'Participants will learn how to:',
      list: [
        'Identify the core roles needed in a scalable advisory team',
        'Understand why the Business Operations Strategist is central to client relationships',
        'Recognize the under-leveraged role of admin and operational support',
        'Use a client matrix to assess client fit, value, and effort',
        'Identify clients to grow, transition, or exit',
        'Explore one vertical specialization opportunity',
      ],
      takeaway:
        'You do not need more clients. You need the right clients, supported by the right team structure.',
    },
  },
  {
    id: 'session-3',
    eyebrow: 'Session 3',
    title: 'Technology stack deep dive',
    subtitle: 'How will you deliver the work efficiently?',
    body: {
      paragraphs: [
        'Technology is essential to advisory work, but it is not the strategy. This session helps participants design a focused, practical technology stack that supports the firm’s service model, team structure, and client needs. It covers app evaluation, integration planning, API considerations, and tech stack costing.',
      ],
      listLabel: 'Participants will learn how to:',
      list: [
        'Define a focused core technology stack',
        'Apply the 80/20 rule to technology decisions',
        'Evaluate apps using criteria like integration, support, scalability, pricing, security, and vertical fit',
        'Understand native integrations vs third-party connectors',
        'Map how tools connect across the client and firm workflow',
        'Cost out a technology stack for a sample advisory engagement',
        'Build a 90-day technology improvement plan',
      ],
      takeaway:
        'Technology should enable better client conversations, workflows, and delivery — not become another source of complexity.',
    },
  },
  {
    id: 'session-4',
    eyebrow: 'Session 4',
    title: 'Procedures & implementation roadmap',
    subtitle: 'How will the work actually get done and scale?',
    body: {
      paragraphs: [
        'The final session turns strategy into execution. Participants learn to document the workflows, procedures, and playbooks needed for consistent delivery, then sequence all commitments from the first three sessions into a single 90-day implementation roadmap.',
      ],
      listLabel: 'Participants will learn how to:',
      list: [
        'Distinguish workflow from tasking',
        'Distinguish policy from procedure',
        'Apply practical rules for creating usable procedures',
        'Structure a client or firm playbook',
        'Identify the first procedure they should document',
        'Build a 90-day roadmap across people, clients, technology, and procedures',
        'Commit to the first actions they will take within 48 hours',
      ],
      takeaway:
        'A scalable practice is not built on memory, heroics, or good intentions. It is built on clear systems, documented procedures, and consistent execution.',
    },
  },
  {
    id: 'leave-with',
    eyebrow: 'Outcomes',
    title: 'What participants will leave with',
    body: {
      listLabel: 'By the end of the program, participants will have:',
      list: [
        'A clearer definition of their firm’s unique value',
        'A prioritized service portfolio',
        'A list of services to eliminate, delegate, or amplify',
        'A practical view of their current team structure and future role needs',
        'A client portfolio map using the Gold, Silver, Bronze, and Fire framework',
        'A focused technology stack plan',
        'An integration and app evaluation framework',
        'A procedure and playbook structure',
        'A 90-day implementation roadmap',
        'Clear 30-day and 48-hour action commitments',
      ],
    },
  },
  {
    id: 'who-should-attend',
    eyebrow: 'Audience',
    title: 'Who should attend?',
    body: {
      paragraphs: [
        'This program is designed for accounting firm owners, partners, managers, CAS leaders, and advisory practice leaders who want to build a more intentional, scalable, and valuable firm.',
      ],
      listLabel: 'It is especially relevant for firms that are:',
      list: [
        'Moving from compliance-heavy work toward advisory services',
        'Struggling to define or package their advisory offering',
        'Carrying too many low-value or wrong-fit clients',
        'Trying to improve team leverage and role clarity',
        'Overwhelmed by too many apps or disconnected systems',
        'Looking to document procedures and reduce owner dependency',
        'Ready to make practical changes, not just talk about strategy',
      ],
    },
  },
  {
    id: 'program-promise',
    eyebrow: 'Our commitment',
    title: 'Program promise',
    body: {
      paragraphs: [
        'This workshop series will help participants move from scattered ideas to a practical implementation plan. You will not leave with a vague vision for advisory. You will leave with clearer decisions, practical tools, and a sequenced 90-day roadmap for building a more strategic, scalable, and valuable accounting practice.',
      ],
    },
  },
]
