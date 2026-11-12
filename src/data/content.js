/* Centralized copy for the workshop site. */

/* Facilitator headshots — Vite resolves these to hashed asset URLs at build. */
import pennyPhoto from '../assets/penny.jpg.png'
import damienPhoto from '../assets/damien.jpg.jpg'

/* GoToWebinar registration links (from Damien, Nov 2026): full series + one per
   workshop. Single source of truth — the series CTAs, the "Inside the Series"
   accordion panels, the schedule tiles and sessions.js all read from here, so a
   link only ever lives in one place. All open in a new tab. */
export const REGISTER_SERIES_URL =
  'https://register.gotowebinar.com/register/6681311508260207190'
export const REGISTER_WORKSHOP_URLS = {
  '1': 'https://register.gotowebinar.com/register/7812016281023890270',
  '2': 'https://register.gotowebinar.com/register/3416145703431413847',
  '3': 'https://register.gotowebinar.com/register/69816149155681372',
}

/* Series Register CTAs (hero primary, header, floating, footer, pricing) point
   here and open externally in a new tab. */
export const REGISTER_URL = REGISTER_SERIES_URL

/* Kept for the REGISTER_HREF derivation below. The note is intentionally empty
   now that Register routes to on-page pricing (no "opening soon" message). */
export const REGISTRATION_OPEN = true
export const REGISTRATION_NOTE = ''

/* Single source of truth for where a Register CTA points and whether it's an
   external link (new tab) or an internal / on-page target. All CTAs read these. */
export const REGISTER_HREF = REGISTRATION_OPEN ? REGISTER_URL : '/contact'
export const REGISTER_IS_EXTERNAL = true

/* Pricing (December 2026 relaunch): two options — a single workshop or the
   full three-workshop series. No early-bird, no group discount. */
export const pricing = {
  tiers: [
    {
      name: 'Individual Workshop',
      price: '$79',
      unit: 'per person',
      features: [
        'One 90-minute live workshop',
        'Relevant workbook and tools',
        'December 10 open-hours Q&A',
      ],
      featured: false,
    },
    {
      name: 'Complete Series',
      price: '$149',
      unit: 'per person',
      badge: 'Save $88',
      features: [
        'Three 90-minute live workshops',
        'Complete workbook and toolkit',
        'December 10 open-hours Q&A',
      ],
      featured: true,
    },
  ],
}

/* Workshop schedule (December 2026): three live workshops plus a bonus
   open-hours Q&A, included with every registration. */
export const schedule = [
  { n: '1', title: 'Your Vision & Your Team', date: 'December 1, 2026', time: '1:00–2:30 p.m. EST', register: REGISTER_WORKSHOP_URLS['1'] },
  { n: '2', title: 'Right Clients & Profitable Pricing', date: 'December 3, 2026', time: '1:00–2:30 p.m. EST', register: REGISTER_WORKSHOP_URLS['2'] },
  { n: '3', title: 'Cybersecurity & AI Governance', date: 'December 8, 2026', time: '1:00–2:30 p.m. EST', register: REGISTER_WORKSHOP_URLS['3'] },
  {
    kind: 'qa',
    title: 'Open Hours Q&A',
    date: 'December 10, 2026',
    note: 'Included with every registration',
  },
]

/* Hero bullet box — a short "what you get" summary of the new program. */
export const heroBox = {
  title: 'What you get',
  items: [
    'Three live, online workshops',
    'Practical tools and structured exercises to apply afterwards',
    'A December 10 open-hours Q&A, included',
  ],
}

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
    {
      title: 'YOUR SERVICES',
      text: 'Bring your service list. Apply the Traffic Light Revolution and the $100K Question. Leave with a Stop / Outsource / Automate / Focus decision set and one dated 30-day move.',
    },
    {
      title: 'YOUR TEAM',
      text: 'Bring a clear picture of who does what. Use the 52-Card Team Pickup to move recurring work into the role that should own it. Leave with a sharper view of the role that could unlock capacity next.',
    },
    {
      title: 'YOUR CLIENTS',
      text: 'Bring your client list. Score real relationships by value and effort. Leave with a client portfolio map, three Gold relationships to approach and one wrong-fit relationship to review for transition.',
    },
    {
      title: 'YOUR TECH STACK',
      text: 'Bring your current technology questions. Define the shape of your Little Black Dress—a limited core stack your team can know deeply—and apply practical selection criteria. Cost a sample advisory stack so tool choices connect to delivery economics.',
    },
    {
      title: 'YOUR APPROACH TO AI',
      text: 'Bring one AI tool you are considering. Apply a vendor due-diligence scorecard across client-data exposure, training risk, review controls, audit trail, contract terms and security evidence. Leave with a Go / Conditional / No-Go decision and a safer next step.',
    },
    {
      title: 'YOUR SOPs',
      text: 'Bring one process that depends too heavily on memory. Learn what belongs in a policy and a procedure, then draft and peer-test a real month-end reconciliation procedure.',
    },
  ],
}

/* Section 3 — the method (three connected workshops). */
export const methodSection = {
  title: 'The Beyond Numbers Practice Decisions Method',
  subhead: 'Three connected workshops. One clearer operating direction.',
  steps: [
    {
      label: 'Direction & Team',
      text: 'Decide what the firm should stop, delegate, automate or focus on — and connect your people to a shared purpose.',
    },
    {
      label: 'Clients & Pricing',
      text: 'Choose the right client relationships and price recurring work so the economics actually work.',
    },
    {
      label: 'Protection & AI',
      text: 'Put practical safeguards around client information and AI, with clear owners and accountability.',
    },
  ],
  closing:
    'Each workshop comes with tools you apply afterwards, and an included open-hours Q&A to work through your questions.',
}

/* Section 4 — how the live format works. */
export const formatSection = {
  title: 'How the live format works',
  subhead: 'Practical teaching you can act on.',
  intro: 'Each 90-minute workshop follows a simple rhythm:',
  steps: [
    {
      label: 'Learn live',
      text: 'Damien and Penny teach the framework and the decisions behind it in a focused, 90-minute session.',
    },
    {
      label: 'See the tools',
      text: 'The workbook and interactive tools are demonstrated live so you know exactly how to use them.',
    },
    {
      label: 'Apply afterwards',
      text: 'You complete the detailed exercises on your own firm, then bring your questions to the included Q&A.',
    },
  ],
}

/* Section — the toolkit, grouped by workshop. */
export const toolsSection = {
  title: 'The tools behind the work',
  subhead: 'Frameworks you will actually use.',
  intro: 'Each workshop comes with practical Beyond Numbers tools and worksheets:',
  groups: [
    {
      label: 'Direction & Team',
      tools: ['Traffic Light Assessment', '$100K Question', 'Team Purpose Map'],
    },
    {
      label: 'Clients & Pricing',
      tools: [
        'Client Portfolio Matrix',
        'True Cost of an In-House Bookkeeper or CFO',
        'What It Costs Your Firm to Deliver',
      ],
    },
    {
      label: 'Cybersecurity & AI',
      tools: ['WISP & AI Governance Role Checklist'],
    },
  ],
  closing: 'You apply the tools afterwards, then bring your questions to the December 10 Q&A.',
}

/* Section — who this is for / not for. */
export const audienceSection = {
  title: 'Who should attend—and who should not',
  forLabel: 'This program is designed for:',
  forItems: [
    'Firm owners and partners ready to make real decisions about services, people, clients, technology and process',
    'Leaders who want to work ON the firm, not just hear about advisory in theory',
    'Practitioners who value completed work and clear next actions over more content',
  ],
  notLabel: 'This program is probably not for you if:',
  notItems: [
    'You are looking for a passive webinar to watch in the background',
    'You are not in a position to make or influence decisions about how the firm operates',
    'You want theory and inspiration rather than decisions and commitments',
  ],
}

/* Section — the offer (placed directly above the pricing cards). */
export const offerSection = {
  title: 'The offer',
  body: 'Three live, 90-minute workshops and a practical method for making the decisions your firm has been putting off — with interactive tools and worksheets you apply afterwards, plus an included open-hours Q&A.',
}

/* Section — meet your facilitators. Bios are exact; the book/podcast title
   "It's Not Just the Numbers" is italicised at render (see Home.jsx). */
export const facilitators = {
  title: 'Meet your facilitators',
  people: [
    {
      name: 'Penny Breslin',
      role: 'Founder, MoneyPenny',
      photo: pennyPhoto,
      bio: "Penny Breslin is an accounting industry leader, entrepreneur and co-author of It's Not Just the Numbers. As the founder of MoneyPenny, she has helped accounting firms build capacity, strengthen their operations and create better client experiences through outsourced accounting, tax and back-office support. Penny also co-hosts the It's Not Just the Numbers podcast, where she explores the people, technology and ideas shaping the future of the accounting profession.",
    },
    {
      name: 'Damien Greathead',
      role: 'Accounting technology & growth leader',
      photo: damienPhoto,
      bio: "Damien Greathead is an accounting technology and growth leader with more than 17 years of experience helping accounting firms and software businesses grow. He has held senior roles with Intuit, Dext and Ignition and is the co-author of It's Not Just the Numbers. Damien also co-hosts the podcast of the same name, where he explores the people, technology and ideas shaping the future of the accounting profession.",
    },
  ],
}

/* Section 7 — "Frequently Asked Questions". */
export const faqs = [
  {
    q: 'Who is the series for?',
    a: 'Firm owners and partners building a CAS or advisory offering, or seeking better results from an existing one.',
  },
  {
    q: 'Can I attend just one workshop?',
    a: 'Yes. Each workshop can be taken independently. Earlier attendance or completed homework is not required.',
  },
  {
    q: 'When are the sessions?',
    a: 'Workshops: December 1, 3 and 8, 2026. Included Q&A: December 10. All sessions run 1:00–2:30 p.m. EST, live online.',
  },
  {
    q: 'What does registration cost?',
    a: '$79 per person for one workshop or $149 for all three. Both options include the December 10 Q&A.',
  },
  {
    q: 'How do the exercises work?',
    a: 'Tools are demonstrated live. Complete the detailed exercises afterwards using the toolkit, then bring your questions to the Q&A.',
  },
  {
    q: 'What does the pricing workshop cover?',
    a: 'Client selection and recurring bookkeeping and accounting fees, with a distinction between monthly services, setup work and additional advisory projects.',
  },
  {
    q: 'Is the third workshop only about AI?',
    a: 'No. It covers cybersecurity leadership, WISP, insurance questions, vendors, staff responsibilities and response, alongside AI governance.',
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
        'These three workshops help firms step back and redesign the operating model behind their advisory ambitions. Participants work through three connected questions:',
      ],
      orderedList: [
        'Why are we changing, and what should we keep?',
        'Who should we work with, both inside the firm and as clients?',
        'How do we price the work, and protect the firm as we add AI?',
      ],
    },
  },
  {
    id: 'workshop-1',
    eyebrow: 'Workshop 1 · December 1',
    title: 'Build Your Advisory Business — Your Vision, Your Team',
    subtitle: 'Create room for advisory and bring your people with you.',
    register: REGISTER_WORKSHOP_URLS['1'],
    body: {
      paragraphs: [
        'You may have a clear ambition for advisory, yet spend most of your week doing work that leaves little room to pursue it. Using the Four Quadrants framework, Traffic Light assessment and $100K Question, we will examine which services deserve more attention and which could be delegated, outsourced, automated, or stopped. We will then explore four delivery roles, identify gaps, and connect individual contributions to a shared purpose. The Team Purpose Map gives you a structure for listening to your people, identifying those others trust, and assigning meaningful responsibilities.',
      ],
      listLabel: 'Resources',
      list: ['Traffic Light Assessment', '$100K Question', 'Team Purpose Map'],
      after: 'Allow about 90 minutes for the suggested follow-up exercises.',
    },
  },
  {
    id: 'workshop-2',
    eyebrow: 'Workshop 2 · December 3',
    title: 'Choose the Right Clients. Price Your Services for Profit.',
    subtitle: 'Find the right relationships and test the economics of serving them.',
    register: REGISTER_WORKSHOP_URLS['2'],
    body: {
      paragraphs: [
        "Some clients are ready for a deeper advisory relationship. Others need a different service model, a revised fee, or a planned transition. This workshop connects client selection with a practical method for pricing recurring bookkeeping and accounting services. Use the Client Portfolio Matrix to assess clients by value and effort, then examine the client's true in-house finance costs and your firm's delivery costs using two linked calculators. Compare a proposed fee, delivery margin and potential savings, while distinguishing recurring monthly work from setup fees and additional advisory projects.",
      ],
      listLabel: 'Resources',
      list: ['Client Portfolio Matrix', 'True Cost Calculator', 'Firm Cost Builder'],
      after: 'Allow about 70 minutes for the suggested follow-up exercises.',
    },
  },
  {
    id: 'workshop-3',
    eyebrow: 'Workshop 3 · December 8',
    title: 'Protect Your Firm — Cybersecurity and AI Governance for Firm Leaders',
    subtitle: 'Understand the leadership decisions behind protecting client information.',
    register: REGISTER_WORKSHOP_URLS['3'],
    body: {
      paragraphs: [
        'As your firm handles more client information and introduces AI, leadership needs a clear view of the risks, controls and people involved. Examine your Written Information Security Plan (WISP), cyber-insurance questions, vendor relationships and incident-response arrangements. Explore AI policies covering approved uses, client-information handling, human review and accountability, alongside questions about vendor data practices. A breach tabletop discussion helps you examine your response. Afterwards, use the role-based checklist to identify gaps and assign owners and deadlines.',
      ],
      listLabel: 'Resources',
      list: ['WISP & AI Governance Role Checklist', 'Printable worksheet'],
      after:
        "Apply the checklist afterwards with the people responsible for your firm's systems and processes.",
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
        'A prioritized service portfolio, with services to eliminate, delegate, or amplify',
        'A practical view of their current team structure and future role needs',
        'A Team Purpose Map that connects people to shared goals',
        'A client portfolio map using the Gold, Silver, Bronze, and Fire framework',
        'A pricing approach for recurring services, with delivery margin and potential savings',
        'A WISP and AI-governance checklist with owners and deadlines',
        'Practical follow-up exercises to apply after each workshop',
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
        'Rethinking how they price recurring work for profit',
        'Introducing AI and want practical safeguards around client data',
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
        'These three workshops will help participants move from scattered ideas to practical decisions. You will not leave with a vague vision for advisory. You will leave with clearer decisions, practical tools, and concrete next steps for building a more strategic, scalable, and valuable accounting practice.',
      ],
    },
  },
]
