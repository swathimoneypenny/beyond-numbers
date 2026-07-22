/* Session 1 — "Foundation & Service Portfolio".
   EXACT workshop content from Penny's slides (do not paraphrase). */

export const session1 = {
  tagline: 'This is your QuickBooks moment. Lead the change.',

  // 1
  changed: {
    eyebrow: 'The day everything changed',
    subtitle: 'Same fear. Different decade. Different outcome?',
    cards: [
      {
        year: '1994',
        fear: 'QuickBooks is destroying my business!',
        label: 'What happened instead',
        text: 'Accountants who adapted built training practices, became QuickBooks ProAdvisors, and grew revenue 5-10× over the following decade.',
      },
      {
        year: '2026',
        fear: 'AI is taking our jobs!',
        label: 'What will happen instead',
        text: 'Accountants who adapt will sell advisory services, command premium fees, and own the strategic conversation. The same playbook applies.',
      },
    ],
    quote:
      'The pattern repeats. Disruption never eliminates the profession — it elevates the people who adapt.',
  },

  // 2
  atm: {
    eyebrow: 'The ATM lesson',
    subtitle: `Banks predicted ATMs would eliminate tellers. Here's what actually happened.`,
    prediction: [
      'ATMs will eliminate tellers',
      'Massive job losses expected',
      'End of human banking',
      'Branches will close',
      'Customers want machines, not people',
      'Lower costs win',
    ],
    reality: [
      'Banks hired MORE people',
      'Branch count actually grew',
      'Tellers became advisors',
      'Higher-skill, higher-pay roles',
      'New services emerged',
      'Wealth management, planning, lending',
    ],
    quote: `Automation didn't replace the bankers. It freed them to do work only humans can do.`,
  },

  // 3
  binary: {
    eyebrow: 'Binary vs. advisory work',
    subtitle: 'Where you compete with machines — and where you don’t',
    machines: {
      label: 'Machines CAN do',
      sub: 'Binary work',
      items: [
        'Data entry & transaction matching',
        'Bank reconciliations',
        'Report generation',
        'Pattern recognition',
        'Most calculations',
        'Tax form population',
      ],
    },
    humans: {
      label: 'Humans MUST do',
      sub: 'Advisory work',
      items: [
        '“My revenue dropped 40% — what should I do?”',
        '“Should I buy or lease this equipment?”',
        '“How do I prepare my business to sell?”',
        '“I’m losing sleep over cash flow”',
        '“My partner wants to exit”',
        '“Is my pricing strategy wrong?”',
      ],
    },
    caption: 'This is where the money is. This is where you live now.',
    quote: 'Apps are not the answer. The relationship and talking to the client is.',
    attribution: '— Mike Chawner, CPA',
  },

  // 4
  quadrants: {
    eyebrow: 'The four service quadrants',
    subtitle: 'Every service you offer falls into one of these four roles',
    items: [
      {
        name: 'OPERATOR',
        role: 'Do the work',
        text: 'Transaction processing, data entry, reconciliations, basic bookkeeping. Pure execution work.',
      },
      {
        name: 'STEWARD',
        role: 'Protect assets',
        text: 'Compliance, tax filing, financial statements, audit support. Keep the client safe and compliant.',
      },
      {
        name: 'CATALYST',
        role: 'Transform',
        text: 'Process redesign, tech implementation, workflow optimization. Change how the business operates.',
      },
      {
        name: 'STRATEGIST',
        role: 'Plan & advise',
        text: 'Forecasting, scenario planning, M&A advisory, exit planning. Shape the future of the business.',
      },
    ],
  },

  // 5
  today: {
    eyebrow: 'Where most firms live today',
    subtitle: 'The Operator and Steward quadrants — high volume, low margin',
    items: [
      {
        name: 'OPERATOR',
        text: 'Doing the actual transactional work.',
        examples: ['Manual data entry', 'Bank reconciliations', 'AR/AP processing', 'Payroll runs'],
        warn: 'Most replaceable by automation',
      },
      {
        name: 'STEWARD',
        text: 'Protecting client assets and compliance.',
        examples: [
          'Tax return preparation',
          'Financial statement compilation',
          'Audit & review work',
          'Regulatory filings',
        ],
        warn: 'Necessary, but commoditizing fast',
      },
    ],
    caption: `If 80% of your time lives here, you're competing on price. The transformation is moving up.`,
  },

  // 6
  future: {
    eyebrow: 'Where the future lives',
    subtitle: 'The Catalyst and Strategist quadrants — high value, premium pricing',
    items: [
      {
        name: 'CATALYST',
        text: 'Transforming how the business operates.',
        examples: [
          'Tech stack design & implementation',
          'Workflow optimization',
          'Process redesign',
          'Training & change management',
        ],
        good: 'Project-based, premium pricing',
      },
      {
        name: 'STRATEGIST',
        text: 'Shaping the future of the business.',
        examples: [
          'Forecasting & scenario modeling',
          'Exit & succession planning',
          'M&A advisory',
          'Strategic CFO services',
        ],
        good: 'Retainer-based, irreplaceable value',
      },
    ],
    caption:
      'Catalyst work funds Strategist work. Strategist work funds the practice you actually want.',
  },

  // 7
  exercise1: {
    tag: 'Exercise 1 • 10 min',
    title: 'The Traffic Light Revolution',
    lead: 'Open the digital tool. Brain dump everything you do. Mark each one.',
    link: 'beyond-numbers.com/exercises/exercise-1/',
    steps: [
      {
        time: '3 min',
        k: 'Brain dump',
        v: `Click every service, task, or activity you do. Don't filter. Just click.`,
      },
      {
        time: '2 min',
        k: 'Time %',
        v: 'For each one, estimate what % of your time it takes. First instinct only.',
      },
      {
        time: '90 sec',
        k: 'Traffic lights',
        v: 'Mark each: 🟢 love it, 🟡 it’s okay, 🔴 drains me. Trust your gut.',
      },
    ],
    note: 'Today: Tabs 1–2 in the tool. Homework before Session 2: complete Tabs 3–5 (analytics, insights, 90-day plan).',
  },

  // 8
  hundredK: {
    eyebrow: 'The $100K question',
    subtitle: 'A thought experiment that reveals your real practice',
    scenarioLabel: 'The scenario',
    scenario:
      'A client walks in tomorrow and says: “Here’s $100,000. I want to hire you for a year. But here’s the catch — you can ONLY do work you love. Outsource everything else. Design the perfect service package. What would you create?”',
    whyLabel: 'Why this question works:',
    why: [
      {
        k: 'Removes financial fear',
        v: 'You stop defending services you secretly hate just because they pay the bills',
      },
      {
        k: 'Forces specificity',
        v: `Vague answers don't survive — you have to name actual work`,
      },
      {
        k: 'Reveals what you’d build from scratch',
        v: 'What you choose now is the practice you should be building toward',
      },
    ],
  },

  // 9
  fiveBoxes: {
    eyebrow: 'The five boxes',
    subtitle: 'Sort your current services into four buckets, then define your unique value',
    boxes: [
      { n: '1', k: 'STOP', v: '“I would no longer do…”' },
      { n: '2', k: 'OUTSOURCE', v: '“Someone else could do…”' },
      { n: '3', k: 'AUTOMATE', v: '“Technology should handle…”' },
      { n: '4', k: 'FOCUS ON', v: '“My zone of genius…”' },
    ],
    box5: {
      k: 'Box 5: My unique value',
      prompt: 'In one powerful sentence, what makes you irreplaceable?',
      fill: '“I’m the only one who can ____”',
    },
    caption: `Boxes 1–4 free up your time. Box 5 defines why people will pay you a premium for what's left.`,
  },

  // 10
  exercise2: {
    tag: 'Exercise 2 • 10 min',
    title: 'Work time',
    lead: 'Open the digital tool. Fill the five boxes. Commit to one thing.',
    steps: [
      {
        time: '2 min',
        k: 'Set the scene',
        v: 'Re-read the scenario. Picture the client. Suspend your usual constraints.',
      },
      {
        time: '6 min',
        k: 'Fill the boxes',
        v: `Don't overthink. First instincts about what to stop are usually right.`,
      },
      {
        time: '2 min',
        k: 'Define your value',
        v: 'Box 5: one sentence. Make it specific enough that a stranger would understand it.',
      },
    ],
  },

  // 11
  overlap: {
    eyebrow: 'Your unique value lives in the overlap',
    subtitle: 'Premium pricing happens where all three circles meet',
    circles: [
      { k: 'SKILLED', v: 'You’re great at it' },
      { k: 'FULFILLED', v: 'You love doing it' },
      { k: 'COMPENSATED', v: 'Clients pay well for it' },
    ],
    caption: `If you're skilled + compensated but not fulfilled, you'll burn out. If you're fulfilled + skilled but not compensated, you'll go broke.`,
  },

  // 12
  wiifm: {
    eyebrow: 'WIIFM — what’s in it for me?',
    subtitle: 'Apply this filter to every service before you keep it',
    letters: [
      { L: 'W', key: 'Why', rest: 'do I do this work? What outcome does it create for the client?' },
      { L: 'I', key: 'Impact', rest: `does this have on the client's business — and on my practice?` },
      { L: 'I', key: 'Income', rest: 'does this generate per hour, per client, per engagement?' },
      { L: 'F', key: 'Fulfillment', rest: 'do I feel? Does this energize me or drain me?' },
      { L: 'M', key: 'Money', rest: 'value would a client pay for this if they truly understood it?' },
    ],
    testLabel: 'The test:',
    test: `If a service can't answer at least 3 of these 5 questions strongly, it doesn't belong in your future practice.`,
  },

  // 13
  translating: {
    eyebrow: 'Translating insights into action',
    subtitle: 'From self-assessment to a concrete portfolio plan',
    flow: [
      'Everything I do today',
      'After eliminating RED services',
      'After outsourcing YELLOW services',
      'After automating routine work',
      'MY PREMIUM PRACTICE',
    ],
    mathLabel: 'The math:',
    math: 'Most participants free up 15–25 hours per week. Same revenue. Better work. Premium pricing.',
  },

  // 14
  decisions: {
    eyebrow: 'Four decisions, one per service',
    subtitle: 'For every service still on your list — decide which action it takes',
    items: [
      {
        n: '#1',
        k: 'STOP',
        quote: '“I will no longer offer…”',
        v: `Communicate end date. Refer out. Don't apologize.`,
        pick: '(Pick your top 1–2)',
      },
      {
        n: '#2',
        k: 'OUTSOURCE',
        quote: '“I will hire someone for…”',
        v: 'Internal hire, contractor, or external firm. Define cost and quality.',
        pick: '(Pick your top 1–2)',
      },
      {
        n: '#3',
        k: 'AUTOMATE',
        quote: '“I will use tech for…”',
        v: 'Identify the tool. Budget for it. Train the team or yourself.',
        pick: '(Pick your top 1–2)',
      },
      {
        n: '#4',
        k: 'FOCUS',
        quote: '“I will spend more time on…”',
        v: 'Raise prices. Take more of this work. This is your premium offering.',
        pick: '(Pick your top 1–2)',
      },
    ],
    caption:
      'This is your portfolio plan. Not a wish list — specific services, specific actions, specific outcomes.',
  },

  // 15
  beforeAfter: {
    eyebrow: 'From frustrated to focused',
    subtitle: 'What this transformation typically looks like',
    before: [
      '60+ hour weeks during busy season',
      'Always-on, never caught up',
      'Hourly billing, fee pressure',
      'Clients who undervalue you',
      'Work that drains energy',
      'Compliance treadmill',
    ],
    after: [
      '40-hour weeks, predictable rhythm',
      'Strategic time blocked for advisory work',
      'Fixed-fee or retainer pricing',
      'Clients who treat you as a partner',
      'Work that energizes',
      'Forward-looking conversations',
    ],
    caption: `The work isn't easier. It's different — and it pays more.`,
  },

  // 16
  commitment: {
    eyebrow: 'Your 30-day commitment',
    subtitle: 'One specific change. One specific date. One specific accountability partner.',
    heading: 'My 30-day commitment:',
    items: [
      {
        n: '1',
        k: 'BY ___ (date within 30 days)',
        v: `Make the date specific. "This month" isn't a date — "April 28" is.`,
      },
      {
        n: '2',
        k: 'I WILL STOP ___',
        v: `Pick the RED item that's costing you most time or energy right now.`,
      },
      {
        n: '3',
        k: 'MY METHOD WILL BE ___',
        v: 'Eliminate, outsource, automate, or transition. Pick one.',
      },
    ],
    sign: 'Signed: ___ Date: ___',
    caption: 'Without a date and a method, this is just a wish.',
  },

  // 17
  pairUp: {
    eyebrow: 'Pair up — accountability partners',
    subtitle: 'Find one person. Exchange commitments. Schedule the check-in.',
    scienceLabel: 'The science:',
    science:
      'Sharing a commitment with another person raises follow-through from 35% to 65%. Adding a scheduled check-in raises it to 95%.',
    steps: [
      {
        n: 'Step 1',
        k: 'Find your partner',
        v: `Pair up with someone in the room. Doesn't have to be someone you know.`,
      },
      {
        n: 'Step 2',
        k: 'Exchange commitments',
        v: 'Read your 30-day commitment aloud. Listen to theirs. Trade contact info.',
      },
      {
        n: 'Step 3',
        k: 'Schedule the check-in',
        v: 'Pick a date 30 days out. Put it on both calendars before you leave the room.',
      },
    ],
  },

  // 18
  takeaways: {
    eyebrow: 'Key takeaways',
    subtitle: 'What to remember from today',
    items: [
      {
        k: 'Disruption creates opportunity, not elimination.',
        v: 'The 1994 QuickBooks moment elevated accountants. The 2026 AI moment will too — for those who adapt.',
      },
      {
        k: `You can't transform what you haven't audited.`,
        v: 'The Four Quadrants and Traffic Light frameworks force the honest look most practices avoid.',
      },
      {
        k: 'Your unique value lives in the overlap.',
        v: 'Skilled + Fulfilled + Compensated. Three circles. Premium pricing happens in the middle.',
      },
      {
        k: 'Every red service blocks a green opportunity.',
        v: 'Capacity is the constraint. Eliminating the wrong work is what creates room for the right work.',
      },
      {
        k: `Without a date, it's a wish.`,
        v: '30-day commitment + accountability partner + scheduled check-in. That’s the formula.',
      },
    ],
  },

  // 19
  upNext: {
    eyebrow: 'Up next: Session 2 — People: team & clients',
    items: [
      {
        label: 'The team',
        title: 'The four roles in a scalable practice.',
        v: 'BOS, Admin, Business Analyst, Technical. The architecture that lets one firm serve 50-75 clients without burning out.',
      },
      {
        label: 'The clients',
        title: 'Gold, Silver, Bronze — or Fire.',
        v: 'How to spot your best clients, your worst clients, and the vertical you should own. Plus how to fire wrong-fit clients without guilt.',
      },
    ],
  },
}
