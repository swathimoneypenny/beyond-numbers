/* Session 2 — "Clients & Pricing".
   EXACT workshop content from Penny's slides (do not paraphrase). */

export const session2 = {
  tagline: 'Apps are not the answer. The relationship and talking to the client is.',
  taglineBy: '— Mike Chawner, CPA',

  // ── Exercises (HW1–HW3) — wired in Session2.jsx; do not change ──
  exercise1: {
    tag: 'Homework 1 · Penny demos',
    title: 'Client Portfolio Matrix',
    lead: 'Sort your real book of business. Score each client on value and effort, and each lands in IDEAL, DEVELOP, EXIT or AUTOMATE-AI.',
    steps: [
      {
        time: '~5 min',
        k: 'List',
        v: 'Add your top 20 clients by fees — name, industry, annual fees.',
      },
      {
        time: '~10 min',
        k: 'Score',
        v: 'Rate value and effort 1–5; each client lands in a quadrant.',
      },
      {
        time: '~5 min',
        k: 'Decide',
        v: "Tick 'Price it' on three IDEAL clients — they flow into Homework 2 and 3.",
      },
    ],
    note: "Your three IDEAL clients appear in the True Cost tool's 'Pricing for' list. Bring them to Session 3.",
  },

  exercise2: {
    tag: 'Homework 2 · Penny demos',
    title: 'The True Cost of an In-House Bookkeeper or CFO',
    lead: "Your prospect says the bookkeeper costs '$25 an hour.' That's never the real cost. Use their own numbers to find what it truly costs each month.",
    steps: [
      {
        time: '~2 min',
        k: 'Pick a client',
        v: 'Choose one of your three IDEAL clients.',
      },
      {
        time: '~10 min',
        k: 'Enter their numbers',
        v: 'Wage, benefits, overhead, space, owner time, hiring and error-fix costs.',
      },
      {
        time: '~5 min',
        k: 'Read the true cost',
        v: 'See the real monthly cost and a suggested fee that still saves them money.',
      },
    ],
    note: "Bring the client's true monthly cost — Homework 3 picks it up.",
  },

  exercise3: {
    tag: 'Homework 3 · Penny demos',
    title: 'What It Costs Your Firm to Deliver',
    lead: 'Cost out the back-office work for the same client: every task, how often, how long, and who does it — then see the pricing window.',
    steps: [
      {
        time: '~10 min',
        k: 'Cost the work',
        v: "List the monthly tasks, times and roles; mark anything 'Tech kills it'.",
      },
      {
        time: '~2 min',
        k: 'Pull in the in-house cost',
        v: "Bring in Homework 2's figure for this client.",
      },
      {
        time: '~5 min',
        k: 'Set your fee',
        v: "Read the margin, the client's saving and your annual profit.",
      },
    ],
    note: 'Bring your firm cost, your proposed fee and your margin to Session 3.',
  },

  // ─────────────────────────────────────────────────────────────
  // Written content — "Clients & Pricing" (Penny's 10 sections, in order)
  // ─────────────────────────────────────────────────────────────

  // 1 — Right clients (traditional vs advisory view)
  rightClients: {
    eyebrow: "You don't need more clients, you need the right ones",
    subtitle: 'Look first at the book you already have.',
    traditionalLabel: 'Traditional view',
    traditional: ['Clients as once-a-year tax returns', 'Reactive — you wait for the call', 'Price-focused'],
    advisoryLabel: 'Advisory view',
    advisory: ['Clients as business partners', 'Monthly strategic meetings', 'Proactive', 'Value-focused'],
    caption: 'How many of your clients even know you want to be their advisor?',
  },

  // 2 — Sort every client: IDEAL / DEVELOP / EXIT / AUTOMATE-AI
  tiers: {
    eyebrow: 'Sort every client: IDEAL, DEVELOP, EXIT, AUTOMATE-AI',
    subtitle: 'A decision about where your best work goes.',
    items: [
      { key: 'gold', name: 'IDEAL', action: 'Keep & grow', v: 'Trusts you · pays premium · implements · refers.' },
      { key: 'silver', name: 'DEVELOP', action: 'Invest', v: 'Growth potential · willing to learn · needs guidance.' },
      { key: 'fire', name: 'EXIT', action: 'Exit gracefully', v: "Always urgent · argues fees · won't adopt tech." },
      { key: 'bronze', name: 'AUTOMATE-AI', action: 'Systematize', v: 'Simple needs · compliance-only · price-sensitive · low touch.' },
    ],
    caption: 'Every wrong-fit client you keep blocks a right-fit one.',
  },

  // 3 — Where the tiers come from: value vs. effort
  valueEffort: {
    eyebrow: 'Where the tiers come from: value vs. effort',
    subtitle: 'Score each client 1–5.',
    value: {
      k: 'Value',
      items: ['Revenue and growth', 'Referral quality', 'Strategic importance', 'Appetite for advisory'],
    },
    effort: {
      k: 'Effort',
      items: ['Time demands', 'Tech resistance', 'Communication and deadline stress', 'Scope creep'],
    },
  },

  // 4 — Firing wrong-fit clients, without guilt
  firing: {
    eyebrow: 'Firing wrong-fit clients, without guilt',
    subtitle: "You can't afford to keep the wrong ones — they block the right ones.",
    exitLabel: 'The graceful exit',
    exit: ['Communicate a clear end date', 'Refer them to a better-fit firm', 'Transition cleanly'],
    hearLabel: 'When you hear yourself say…',
    hear: [
      { q: `"I can't afford to lose any clients."`, a: "You can't afford to keep the wrong ones." },
      { q: `"My clients won't pay for advisory."`, a: "They're already paying someone else." },
    ],
  },

  // 5 — Build once, serve many: own a vertical
  vertical: {
    eyebrow: 'Build once, serve many: own a vertical',
    subtitle: 'Build processes and apps for one client, then roll them out to many.',
    testsLabel: 'Four tests',
    tests: ['Genuine interest', 'Market size', 'Your expertise', 'A common tech stack'],
  },

  // 6 — Having "the conversation"
  conversation: {
    eyebrow: `Having "the conversation"`,
    subtitle: "Frame it around the client's goals, never their failings.",
    doLabel: 'Do say',
    doSay: [
      `"We're expanding to help businesses like yours thrive."`,
      `"You'd benefit from monthly financial insight."`,
      `"Let us take this burden off your plate."`,
    ],
    dontLabel: "Don't say",
    dontSay: [
      `"Your bookkeeping is a mess."`,
      `"You need to upgrade."`,
      `"This will cost more but it's worth it."`,
    ],
    caption: 'Lead with discovery and vision.',
  },

  // 7 — Hourly billing punishes you for getting better
  hourlyVsFixed: {
    eyebrow: 'Hourly billing punishes you for getting better',
    subtitle: 'Every app that saves time cuts revenue — unless the fee is fixed.',
    firm1: {
      name: 'Hourly billing',
      tag: 'Getting faster costs you',
      items: ['Faster work = smaller invoice', 'Clients watch the clock', 'Technology is a cost you eat'],
    },
    firm2: {
      name: 'Fixed monthly fee',
      tag: 'Getting faster pays you',
      items: ['Faster work = bigger margin', 'Clients buy a defined service', 'Technology is an investment that pays back'],
    },
  },

  // 8 — How fixed monthly pricing works
  fixedPricing: {
    eyebrow: 'How fixed monthly pricing works',
    subtitle: 'Four rules that make fixed fees work.',
    items: [
      'Price for the busiest month — light months make up for the heavy ones.',
      'Write the scope into an SLA.',
      'Track time internally as process data — never bill against it.',
      'Compare estimate vs. actual each month, and adjust.',
    ],
  },

  // 9 — The pricing window
  pricingWindow: {
    eyebrow: 'The pricing window',
    subtitle: 'Price between what the function costs the client in-house and what it costs your firm to deliver.',
    caseLabel: 'Worked example',
    caseText:
      'A non-profit college pays $7,555 a month for the function in-house. Your cost to deliver is $830. A $5,000 fee gives you an 83% margin — and still saves them 34%.',
    stats: [
      { k: 'Client in-house cost', v: '$7,555' },
      { k: 'Your cost to deliver', v: '$830' },
      { k: 'Your monthly fee', v: '$5,000' },
    ],
    caption: "Don't price at their cost — price in the window.",
  },

  // 10 — Fixed fee + value-added = advisory
  advisoryStack: {
    eyebrow: 'Fixed fee + value-added = advisory',
    subtitle: 'Three parts to the engagement.',
    items: [
      {
        k: 'Monthly fee (the SLA)',
        v: 'Recurring back-office work, plus a one-hour monthly owner meeting — included.',
      },
      { k: 'Setup fee', v: 'Covers one-time clean-up, conversion and training.' },
      {
        k: 'Premium projects',
        v: 'Forecasts, cost reviews and special analysis — quoted separately.',
      },
    ],
  },

  // Up next (dark) — do not change
  upNext: {
    eyebrow: 'Up next: Session 3 — Protect Your Firm: Cybersecurity and AI Governance',
    text: 'What leaders must own as you add AI and handle more client data — your WISP, cyber-insurance, vendors, incident response and practical AI governance.',
    quote: 'Security and AI governance are leadership decisions, not IT tasks.',
  },
}
