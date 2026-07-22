/* Session 2 — "People — team & clients".
   EXACT workshop content from Penny's slides (do not paraphrase). */

export const session2 = {
  tagline: 'Apps are not the answer. The relationship and talking to the client is.',
  taglineBy: '— Mike Chawner, CPA',

  // 1
  welcome: {
    eyebrow: 'Welcome back — today it’s about people',
    subtitle:
      'In Session 1 you defined your value and your portfolio. Now: who delivers the work, and who you deliver it for.',
    items: [
      {
        label: 'The team',
        v: 'The four roles that let one firm serve 50–75 clients without burning out — and the 52-card exercise to redesign yours.',
      },
      {
        label: 'The clients',
        v: 'Sort everyone Gold, Silver, Bronze or Fire. Grow the right ones, fire the wrong ones, and own a vertical.',
      },
    ],
  },

  // 2
  twoFirms: {
    eyebrow: 'A tale of two firms',
    subtitle: 'Both multi-office, same coast, same services — completely different outcomes.',
    firm1: {
      name: 'Firm 1',
      tag: '“the word no”',
      items: [
        '160 monthly clients, 6 months behind',
        'Cloud tools at ~50% adoption',
        'No virtual meetings, even during COVID',
        '“Too busy” to delegate',
        'Result: stagnation & stress',
      ],
    },
    firm2: {
      name: 'Firm 2',
      tag: '“the growth engine”',
      items: [
        '100% cloud-based operations',
        '3 focused verticals',
        'Virtual-first client meetings',
        'Outsourced bookkeeping support',
        'Result: growth & acquisition offers',
      ],
    },
    caption: 'The difference isn’t talent. It’s TEAM STRUCTURE.',
  },

  // 3
  team: {
    eyebrow: 'Building a diverse advisory team',
    subtitle:
      'Not everyone needs to be an accountant. One person serves 5–6 clients alone; the right team serves 50–75.',
    roles: [
      {
        name: 'The BOS',
        role: 'Business operations specialist',
        v: 'Owns the relationship, leads strategy, spots patterns — not the bookkeeping.',
      },
      {
        name: 'The admin orchestrator',
        role: 'The secret weapon',
        v: 'Workflow, document chasing, scheduling, prioritization — keeps the engine running.',
      },
      {
        name: 'The business analyst',
        role: 'Tech & process',
        v: 'Evaluates tools, optimizes process, analyzes data, owns AI & app integration.',
      },
      {
        name: 'The technical team',
        role: 'The production core',
        v: 'Bookkeepers (often outsourced), tax, payroll, compliance, quality control.',
      },
    ],
    insightLabel: 'Key insight:',
    insight:
      'Your next hire should NOT be another accountant — think a business-minded generalist who bridges accounting and strategy.',
  },

  // 4
  bos: {
    eyebrow: 'The BOS: your advisory anchor',
    subtitle:
      'The conductor of the orchestra, not another violin player — one BOS owns 30–50 relationships.',
    traits: [
      { k: 'Client focused', v: 'Knows each business intimately' },
      { k: 'Pattern recognition', v: 'Applies one client’s lesson to others' },
      { k: 'Communicator', v: 'Turns financial data into decisions' },
      { k: 'Proactive', v: 'Anticipates needs before they bite' },
      { k: 'Continuous learner', v: 'Current on trends, tech, verticals' },
      { k: 'Delegator', v: 'Stays on high-value advisory work' },
    ],
    doesLabel: 'What a BOS actually does',
    does: [
      'Monthly strategic client calls',
      'KPI & performance reviews',
      'cash-flow forecasting',
      'business-model optimization',
      'tech-stack recommendations',
      'growth strategy',
    ],
  },

  // 5
  admin: {
    eyebrow: 'The secret weapon: admin excellence',
    subtitle: 'The role nobody brags about is the one that unblocks everything.',
    caseLabel: 'Real case: the Midwest miracle',
    caseText:
      'The firm was stuck — managers hated chasing documents and work backed up for months. The fix wasn’t another accountant. They gave the front-desk admin 15 minutes of training on a document tool. Within 30 minutes, half the blocked work was flowing.',
    caseQuote: '“One person’s dog is another person’s pony.”',
    stats: [
      { v: '40%', k: 'Less BOS admin time' },
      { v: '60%', k: 'Faster client response' },
      { v: '3x', k: 'More client touchpoints' },
    ],
    caption:
      'A strong admin can absorb ~40% of professional workload — the most under-leveraged role in the firm.',
  },

  // 6
  exercise1: {
    tag: 'Exercise 1 • 12 min',
    title: 'The 52-card team pickup',
    lead: 'Take every task in your week and sort it into the role that should own it.',
    steps: [
      { time: '3 min', k: 'Brain dump', v: 'List every task, service or activity in a typical week.' },
      { time: '5 min', k: 'Sort to roles', v: 'Drop each into BOS, Admin, Analyst or Technical.' },
      {
        time: '4 min',
        k: 'Debrief',
        v: 'Where’s the bottleneck? Most firms find ~80% in the wrong bucket.',
      },
    ],
    note: 'Open the tool: beyond-numbers.com/exercises • no time pressure — reorganize as often as you like',
  },

  // 7
  nextHire: {
    eyebrow: 'Who will be your next hire?',
    subtitle: 'Before you hire another accountant, ask which role actually unlocks capacity.',
    items: [
      { k: 'Admin orchestrator', v: 'Frees ~40% of professional time first' },
      { k: 'Business analyst', v: 'Owns tech, process & AI integration' },
      { k: 'A future BOS', v: 'Grows into the relationship owner' },
    ],
    caption:
      'One person serves 5–6 advisory clients alone. With the right team and tech: 50–75 at higher value.',
  },

  // 8
  rightClients: {
    eyebrow: 'You don’t need more clients — you need the right ones',
    subtitle: 'Don’t go hunting for new clients. Look first at what you already have.',
    traditionalLabel: 'Traditional view',
    traditional: [
      'Clients = tax returns',
      'Once-a-year interaction',
      'Reactive service only',
      'Price-focused decisions',
    ],
    advisoryLabel: 'Advisory view',
    advisory: [
      'Clients = business partners',
      'Monthly strategic meetings',
      'Proactive guidance',
      'Value-focused relationships',
    ],
    caption: 'How many of your clients even know you WANT to be their advisor?',
  },

  // 9
  tiers: {
    eyebrow: 'Sort every client: Gold, Silver, Bronze, Fire',
    subtitle: 'Not a judgment of them — a decision about where your best work goes.',
    items: [
      { key: 'gold', name: 'GOLD', action: 'Keep & grow', v: 'Trusts you · pays premium · implements · refers' },
      { key: 'silver', name: 'SILVER', action: 'Develop', v: 'Growth potential · willing to learn · needs guidance' },
      { key: 'bronze', name: 'BRONZE', action: 'Systematize', v: 'Simple needs · compliance-only · price-sensitive · low touch' },
      { key: 'fire', name: 'FIRE', action: 'Exit gracefully', v: 'Always urgent · argues fees · won’t adopt tech · no appreciation' },
    ],
    caption: 'Every wrong-fit client you keep blocks a right-fit client you could be serving.',
  },

  // 10
  matrix: {
    eyebrow: 'Where the tiers come from: value vs effort',
    subtitle: 'Score each client on the value they bring and the effort they take.',
    quadrants: {
      gold: { name: 'GOLD', v: 'High value · low effort' },
      silver: { name: 'SILVER', v: 'High value · high effort' },
      bronze: { name: 'BRONZE', v: 'Low value · low effort' },
      fire: { name: 'FIRE', v: 'Low value · high effort' },
    },
    axisX: 'Value to firm →',
    axisY: 'Effort required →',
    scoreLabel: 'Score each client 1–5:',
    value: { k: 'VALUE', items: ['revenue & growth', 'referral quality', 'strategic importance'] },
    effort: { k: 'EFFORT', items: ['time demands', 'tech resistance', 'communication & deadline stress'] },
  },

  // 11
  exercise2: {
    tag: 'Exercise 2 • 12 min',
    title: 'Your client portfolio map',
    lead: 'Tier your real book of business — then decide who to grow and who to release.',
    steps: [
      { time: '2 min', k: 'List', v: 'Add your top 20 clients by revenue into the matrix tool.' },
      { time: '6 min', k: 'Score', v: 'Rate each on value (1–5) and effort (1–5); plot the point.' },
      {
        time: '4 min',
        k: 'Decide',
        v: 'Assign a tier, then mark one Fire to release and three Golds to approach.',
      },
    ],
    note: 'Open the tool: beyond-numbers.com/exercises • your matrix generates as you score',
  },

  // 12
  firing: {
    eyebrow: 'Firing wrong-fit clients — without guilt',
    subtitle: 'You can’t afford to keep the wrong ones. They block the right ones.',
    exitLabel: 'The graceful exit',
    exit: [
      'Communicate a clear end date',
      'Refer them to a better-fit firm',
      'Transition over 60–90 days',
      'Don’t apologize — it’s a business decision',
    ],
    hearLabel: 'When you hear yourself say…',
    hear: [
      { q: '“I can’t afford to lose any clients.”', a: 'You can’t afford to keep the wrong ones.' },
      { q: '“My clients won’t pay for advisory.”', a: 'They’re already paying someone else — why not you?' },
    ],
  },

  // 13
  vertical: {
    eyebrow: 'Build once, serve many: own a vertical',
    subtitle:
      'Once you build the processes and apps for one client, you roll them out to many.',
    examples: ['Restaurants', 'Contractors', 'Property mgmt', 'Non-profits', 'Wineries', 'Gig economy'],
    testsLabel: 'Pick your vertical on four tests:',
    tests: [
      { k: 'Genuine interest', v: 'You’ll live in it — choose something you enjoy.' },
      { k: 'Market size', v: 'Enough businesses, locally or virtually, to scale.' },
      { k: 'Your expertise', v: 'Leverage what you already know from current clients.' },
      { k: 'Common tech stack', v: 'Shared tools and integrations across the niche.' },
    ],
    caption:
      'Geni Whitehouse built a recognized niche serving wineries — proof that deep focus beats shallow breadth.',
  },

  // 14
  restaurant: {
    eyebrow: 'Success story: the restaurant vertical',
    subtitle: 'A Boston firm turned two restaurant clients into a repeatable practice.',
    steps: [
      'Started with 2 high-end restaurant clients',
      'Standardized the chart of accounts & daily sales',
      'Centralized all AP through one platform',
      'Trained restaurant staff over video',
      'Built a reusable procedures manual',
      'BOS ran monthly strategic meetings',
    ],
    results: [
      { v: '8', k: 'restaurant clients' },
      { v: '3x', k: 'revenue per client' },
      { v: '50%', k: 'less time per client' },
      { v: '100%', k: 'referral-based growth' },
    ],
  },

  // 15
  conversation: {
    eyebrow: 'Having “the conversation”',
    subtitle: 'Frame the advisory move around the client’s goals — never their failings.',
    doLabel: 'DO say',
    doSay: [
      '“We’re expanding to help businesses like yours thrive.”',
      '“You’d benefit from monthly financial insight.”',
      '“Let us take this burden off your plate.”',
    ],
    dontLabel: 'DON’T say',
    dontSay: [
      '“Your bookkeeping is a mess.”',
      '“You need to upgrade to our new services.”',
      '“This will cost more, but it’s worth it.”',
    ],
    actsLabel: 'The three acts',
    acts: [
      { k: 'Act 1 · Discovery', v: '“Tell me about your biggest challenges right now…”' },
      { k: 'Act 2 · Vision', v: '“Imagine real-time financial clarity every month…”' },
      { k: 'Act 3 · Partnership', v: '“Let’s work together toward your growth goals…”' },
    ],
  },

  // 16
  commitments: {
    eyebrow: 'Your 30-day commitments',
    subtitle: 'Two halves of one decision — concrete moves, not intentions.',
    team: {
      label: 'Team',
      items: [
        'Name your current or future BOS',
        'Delegate one task to admin this week',
        'Identify the role missing from your firm',
      ],
    },
    clients: {
      label: 'Clients',
      items: [
        'Fire one wrong-fit (Fire) client',
        'Approach three Gold clients for advisory',
        'Pick one vertical to explore and own',
      ],
    },
  },

  // 17
  pairUp: {
    eyebrow: 'Pair up — accountability partners',
    subtitle:
      'Sharing a commitment lifts follow-through from 35% to 65%; a scheduled check-in, to 95%.',
    steps: [
      {
        n: '1',
        k: 'Find your partner',
        v: 'Pair with someone in the room — doesn’t have to be someone you know.',
      },
      {
        n: '2',
        k: 'Exchange commitments',
        v: 'Read your moves aloud, listen to theirs, trade contact info.',
      },
      {
        n: '3',
        k: 'Schedule the check-in',
        v: 'Pick a date 30 days out and put it on both calendars now.',
      },
    ],
  },

  // 18
  takeaways: {
    eyebrow: 'Key takeaways',
    subtitle: 'What to remember from today.',
    items: [
      'Not everyone on the team needs to be an accountant — admin is the secret weapon.',
      'A BOS at the center is how one firm scales from 5 clients to 50.',
      'You don’t need more clients — you need the right ones.',
      'Sort everyone Gold / Silver / Bronze / Fire; every wrong-fit client blocks a right-fit one.',
      'Build once, sell many — own a vertical and your best work becomes repeatable.',
    ],
  },

  // 19
  upNext: {
    eyebrow: 'Up next: Session 3 — Technology — the enabler',
    text: 'The “little black dress” tech stack — the 4–6 apps that serve 80% of client needs and make the team-and-client model run efficiently.',
    quote: 'Technology is the enabler — relationships are the value.',
  },
}
