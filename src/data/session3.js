/* Session 3 — "Technology & AI".
   EXACT workshop content from the slides (do not paraphrase). */

export const session3 = {
  theme: 'Building Your Scalable, AI-Ready Advisory Practice',
  presenters: 'Penny Breslin & Damien Greathead • Beyond Numbers',

  // 1
  objectives: {
    eyebrow: 'Today’s Objectives',
    items: [
      { n: '1', k: 'Your Little Black Dress', v: 'Curate a core stack that serves 80% of clients consistently.' },
      { n: '2', k: 'Become the Guru', v: 'Deep expertise in YOUR chosen apps — focus beats breadth.' },
      { n: '3', k: 'Integration Mastery', v: 'Know how apps talk to each other and where data intersects.' },
      { n: '4', k: 'Cost & Scale', v: 'Cost out a full advisory tech stack and read the ROI.' },
      { n: '5', k: 'AI in the Workflow', v: 'Where AI fits across bookkeeping, tax & advisory today.' },
      { n: '6', k: 'AI Governance', v: 'Use AI on client work without creating liability.' },
    ],
    caption:
      'Technology is the enabler. It keeps the numbers current so you can have the conversation that creates value — and now AI takes more of the keystrokes, so the judgment can stay human.',
  },

  // 2
  evolution: {
    eyebrow: 'The Technology Evolution',
    timeline: [
      { k: 'Ledger Books', t: 'Pre-1990s' },
      { k: 'Desktop Software', t: '1990s–2015' },
      { k: 'Cloud Apps', t: '2015–2024' },
      { k: 'AI + Agents', t: 'Now & Next' },
    ],
    p1: 'Remember 1994? QuickBooks, Peachtree, ACCPAC and MAS retired the ledger book. Then the cloud moved the books online — and clients started arriving already savvy about add-on apps, asking us to manage the data intersections.',
    shiftLabel: 'The AI Shift',
    shift:
      'AI now reads documents, categorizes, reconciles, drafts and even acts across steps. The landscape will always feel confusing — the goal hasn’t changed: pick a limited set of tools, learn them deeply, and let them mind the little things.',
  },

  // 3
  lbd: {
    eyebrow: 'Your “Little Black Dress” of Technology',
    core: '4–6 apps you know deeply + accessorize with specialty apps only when a specific client needs them',
    conceptLabel: 'The Concept',
    concept: [
      'Focus on 4–6 core applications you know deeply',
      'Train your team intensively on those apps',
      'Add specialty apps only when needed',
      'Roll the same stack across similar clients',
      'Avoid “Bright Shiny Object” syndrome',
    ],
    caption:
      'A client who brings an app to you is a great team member — and usually a great client who sends referrals.',
  },

  // 4
  eightyTwenty: {
    eyebrow: 'The 80/20 Rule for Technology',
    items: [
      {
        pct: '80%',
        k: 'Make It Consistent',
        v: 'Same apps, same processes, same training across all clients. This is where efficiency — and scale — live.',
      },
      {
        pct: '20%',
        k: 'Client-Specific Needs',
        v: 'The unique requirements that differ by client. Where you earn premium fees — and discover the real cost.',
      },
    ],
    caseLabel: 'Case Study — The Perfect-App Trap',
    case: 'A firm wanted to drop their tasking app because it lacked two features they used elsewhere — they wanted one app to do everything. But those two functions aren’t core to any tasking app; there are integrations for that. The complaints gave the whole team license to stop fully using the app. At the monthly price, that’s a very costly 20%.',
  },

  // 5
  criteria: {
    eyebrow: 'Choosing Your Apps: 6 Critical Criteria',
    items: [
      { n: '1', k: '80/20 Rule Fit', v: 'Meets most of what you and your clients need. Software always misses something.' },
      { n: '2', k: 'SOC 2 Compliant', v: 'Security is non-negotiable when you hold client data.' },
      { n: '3', k: 'Peer Recommendations', v: 'Real-world experience from other pros beats marketing claims. (ie. TWEAKS)' },
      { n: '4', k: 'Deep Customer Support', v: 'A responsive support team is worth its weight in gold.' },
      { n: '5', k: 'Understands Accounting', v: 'Does the vendor know debits from credits? Saves hours of workarounds.' },
      { n: '6', k: 'Plays Well With Others', v: 'API integrations reduce manual entry and data errors.' },
    ],
    caption:
      'New in 2026 — add an AI & data lens: for any tool with AI features, also ask what happens to your data (retention, model-training, deletion). Criteria 2 and 6 now extend to AI. We build this into Exercise 2.',
  },

  // 6
  categories: {
    eyebrow: 'Core App Categories for Advisory',
    items: [
      { k: 'General Ledger', v: 'QBO, Xero, Sage Intacct, Custom Books, NetSuite' },
      { k: 'Payroll', v: 'Rippling, ADP, Gusto, Justworks, Onpay' },
      { k: 'Time Tracking', v: 'QuickBooks Time, Timesheets, Clockify' },
      { k: 'Expenses / AP', v: 'Ramp, RelayFi, MakersHub, Expensify, Bill' },
      { k: 'FP&A / KPIs', v: 'Jirav, Fathom, Reach Reporting, LiveFlow, Clockwork, FinOptimal' },
      { k: 'Document Mgmt', v: 'Soraban, ShareFile, Qbox, Google Drive' },
      { k: 'Workflow / Tasks', v: 'Levvy, Karbon, Canopy, Financial Cents' },
      { k: 'Communication', v: 'Slack, Teams, Zoom, Liscio' },
      { k: 'Vertical-Specific', v: 'Katana, MarginEdge, Practice Gauge' },
    ],
    proTip:
      'start with the vertical: if you niche, choose the industry-specific app first, then the GL it integrates with — not the other way around.',
  },

  // 7
  integration: {
    eyebrow: 'The Power of Integration',
    native: {
      k: 'Native Integrations',
      v: 'Apps talk directly. No extra cost, automatic sync, fewer errors.',
      ex: 'Example: Gusto → Xero (native sync)',
    },
    third: {
      k: 'Third-Party Integrators',
      v: 'Connect apps that don’t talk natively. Extra cost, powerful automation.',
      ex: 'Examples: Zapier, Make, SaaSant, Webgility',
    },
    stackLabel: 'Real-World Stack — International E-Commerce Client',
    stack: ['Shopify', 'Xero', 'Hubdoc', 'Gusto', 'Timesheets'],
    result:
      'Payroll runs in under 7 minutes each period. The client sees every step completed, so she doesn’t mind the little things. Reality check: AI isn’t perfect and neither is API — we remove integrations that pull junk data and cause duplications.',
  },

  // 8
  documents: {
    eyebrow: 'Solving Document Retrieval',
    quote:
      'Obtaining source documents is the hardest part of virtual back-office work. Waiting for documents is the death knell.',
    tools: [
      { k: 'LedgerSync', v: 'Bank & card statements' },
      { k: 'MakersHub', v: 'Receipts & invoices' },
      { k: 'RelayFi', v: 'Banking + AP' },
      { k: 'Soraban', v: 'Client document collection' },
    ],
    processLabel: 'The Process That Works',
    process:
      'Notify vendors that all invoicing must go to the assigned email. Each app gives every client file a dedicated address — documents arrive without you asking.',
    warnLabel: 'Bank-Feed Warning',
    warn: 'Feeds break constantly and unpredictably. Assign upkeep to your admin team — your bookkeeper shouldn’t chase information. Your time is better spent on client goals.',
  },

  // 9
  exercise1: {
    tag: 'Exercise 1 • 12 min',
    title: 'Build Your Advisory Tech Stack',
    clientLabel: 'Client: Regional Distribution Co.',
    client: [
      '20 onsite + 10 remote/traveling staff',
      'Sales-quote tracking, PO generation & inventory',
      'Time tracking for all 30 employees',
      'Travel expense capture & reimbursement',
      'Management reporting & KPIs',
      'Moving off QuickBooks Desktop to full cloud',
    ],
    taskLabel: 'Your Task',
    task: 'Using the calculator (or your pricing handout), pick ONE app per category and total the monthly cost:',
    categories: [
      'Inventory',
      'Expenses',
      'Time tracking',
      'Payroll (30)',
      'General Ledger',
      'FP&A / Reporting',
      '+ Optional AI line item (embedded or add-on)',
    ],
    goalLabel: 'Goal',
    goal: 'What’s your total monthly tech cost — and does it scale?',
  },

  // 10
  aiFits: {
    eyebrow: 'AI in Your Practice: Where It Fits',
    intro:
      'Back in Session 1 we split the work: machines do the binary work, humans do the advisory work. AI widens what ‘machines can do’ — which is exactly why the judgment must stay yours.',
    gen: {
      k: 'Generative AI',
      v: 'Drafts, summarizes, answers questions. You review each output before you act on it.',
      items: [
        'Natural-language queries of the books',
        'Draft client emails, memos & narratives',
        'Tax research with cited sources',
        'First-pass transaction categorization',
      ],
    },
    agentic: {
      k: 'Agentic AI',
      v: 'Completes multi-step tasks on its own — several actions may finish before a human sees them.',
      items: [
        'Multi-step reconciliation across ledgers',
        'Continuous anomaly monitoring',
        'End-to-end close & compliance workflows',
        'Higher autonomy = higher risk profile',
      ],
    },
  },

  // 11
  aiAcross: {
    eyebrow: 'AI Across Bookkeeping, Tax & Advisory',
    groups: [
      {
        k: 'In the GL',
        items: [
          'Intuit Assist — plain-language queries, learns each file',
          'Xero JAX (+ JAX Assure checks output vs the ledger)',
          'Sage Copilot — monitors & syncs Intacct ledgers',
        ],
      },
      {
        k: 'Bookkeeping & Capture',
        items: [
          'Booke AI — AI bookkeeper inside QBO/Xero',
          'UnCat, Xennett, Aider — automated close & categorization',
          'Makershub / Hubdoc — AI document capture',
        ],
      },
      {
        k: 'Tax Research & Prep',
        items: [
          'CoCounsel Tax, Blue J, Bloomberg Tax AI',
          'TaxGPT, CCH AnswerConnect AI layer',
          'Must be citation-backed: IRC, regs, rulings, case law',
        ],
      },
    ],
    signalLabel: 'The market signal',
    signal:
      'the 2026 Thomson Reuters Institute report found about a third of tax firms already use generative AI, and roughly half more are planning or considering it. This is the new ‘client brings an app to you’ moment.',
  },

  // 12
  governance: {
    eyebrow: 'AI Governance: Why It Matters Now',
    intro:
      'Before any AI tool touches client work, the AICPA Confidential Client Information Rule (§1.700.001) applies. The question in 2026 isn’t whether to use AI — it’s how, without creating liability.',
    items: [
      { k: 'Confidentiality', v: 'Don’t expose client data to tools that train on or retain it.' },
      { k: 'Accuracy', v: 'A wrong AI answer can still look completely professional.' },
      { k: 'Client Trust', v: 'Many clients have strong feelings about AI on their data.' },
      { k: 'Defensibility', v: 'You must be able to show your work and your review.' },
    ],
    patchLabel: 'No single “AI law for accounting” — it’s a patchwork',
    patch:
      'State law is uneven and moving fast. Example: the Texas Responsible AI Governance Act (HB 149) took effect January 1, 2026, with civil penalties for certain uses. Federal guidance and frameworks (NIST, ISO 42001, the EU AI Act’s high-risk obligations) are still settling. The AICPA position is not to ban AI or use it blindly — it’s governance, documentation, disclosure and professional judgment.',
  },

  // 13
  nist: {
    eyebrow: 'A Framework You Can Use Monday',
    intro:
      'NIST AI Risk Management Framework — four words that translate into a practical approval flow:',
    steps: [
      { k: 'GOVERN', v: 'Assign an owner. Document acceptable use inside your existing security policy.' },
      { k: 'MAP', v: 'Map the data: what client information would touch the tool?' },
      { k: 'MEASURE', v: 'Test the output. Define a confidence threshold and a review rule.' },
      { k: 'MANAGE', v: 'Document the review, keep evidence, manage incidents.' },
    ],
    startLabel: 'Start narrow',
    start: 'One workflow. One owner. One client-data category. One review rule. One place you keep the evidence.',
    tellLabel: 'Tell your clients',
    tell: 'Insurers now recommend engagement-letter language disclosing AI use — plus a clause that lets clients opt out. Disclosure is contextual, not one-size-fits-all.',
  },

  // 14
  exercise2: {
    tag: 'Exercise 2 • 10 min',
    title: 'AI Vendor Due-Diligence Scorecard',
    lead: 'Score a sample AI tool red / yellow / green across six areas. Any critical area scored RED blocks client-data use until it’s resolved.',
    areas: [
      'Client-data exposure',
      'Model-training risk',
      'Confidentiality & disclosure fit',
      'Accuracy & review controls',
      'Audit-trail quality',
      'Contract & security evidence',
    ],
    legend: [
      { key: 'green', k: 'GREEN', v: 'Approved' },
      { key: 'yellow', k: 'YELLOW', v: 'Conditions' },
      { key: 'red', k: 'RED', v: 'Blocked' },
    ],
  },

  // 15
  hardware: {
    eyebrow: 'Hardware & Getting Started',
    items: [
      { k: 'Scanner', v: 'Fujitsu ScanSnap is still the best. Pairs well with procedure tracking.' },
      { k: 'Mobile Device', v: 'More powerful than a computer. If your clients are there, you should be too.' },
      { k: 'Laptop / Tablet', v: 'With cloud apps and your MSP, almost nothing lives on local hardware.' },
    ],
    needLabel: 'What you actually need to start a client',
    need: 'name, address, phone, EIN/SSN, passwords. That’s it. A Chromebook and password-protected Wi-Fi runs the whole thing.',
    secLabel: 'Security reality check',
    sec: 'A CPA office asked us to email back a W-9. The answer: no — provide a secure upload. Sending SSNs or EINs by email is an invitation for identity theft. Use an encrypted channel or a proper document-management system. This applies double to anything you paste into an AI tool.',
  },

  // 16
  stories: {
    eyebrow: 'Success Stories',
    items: [
      {
        k: 'Moving to Cloud at the Changing of the Guard',
        v: 'A two-state process-server firm came to us as the owner retired and his daughter took over the back office — QB Desktop and paper timesheets. We moved them to QBO, Gusto and QuickBooks Time. The local CPA resisted, so we searched a 150 mile radius to find a cloud-friendly one. The daughter is happy, Dad is fly-fishing, and the new CPA now outsources the work to our team in Chennai.',
      },
      {
        k: 'Managing Receivables to Avert Disaster',
        v: 'A CPA took on back-office support for a $2M training company on Intacct and Bill. Huge receivables from one institution were sitting uncollected. She presented the daily cost of delay, then went with the CEO to renegotiate the payment AND fee schedule. A $30,000/year client was saved from disaster — and the negotiation meeting was billable at her standard hourly rate.',
      },
    ],
  },

  // 17
  actionPlan: {
    eyebrow: 'Your Technology & AI Action Plan',
    items: [
      { k: 'TODAY', v: 'List every app in use. Flag redundancies and gaps.' },
      { k: 'THIS WEEK', v: 'Define your Little Black Dress — 4–6 core apps.' },
      { k: 'THIS MONTH', v: 'Evaluate against the 6 criteria. Pick ONE AI pilot.' },
      { k: 'NEXT 90 DAYS', v: 'Train the team deeply. Write a one-page AI policy.' },
    ],
    confLabel: 'Conferences to attend',
    conferences: [
      { k: 'QuickBooks Connect', v: 'QBO ecosystem' },
      { k: 'Xerocon', v: 'Xero ecosystem' },
      { k: 'AICPA / DCPA shows', v: 'GL-agnostic' },
      { k: 'Bridging the Gap', v: 'firm-owner health' },
    ],
    teamLabel: 'Team structure tip',
    team: [
      'Add an onboarding agent — not a bookkeeper',
      'They love tech and enjoy talking to people',
      'They become your main contact for app support',
      'Increasingly, also your AI-tool owner',
    ],
  },

  // 18
  takeaways: {
    eyebrow: 'Key Takeaways',
    items: [
      'Technology is the ENABLER — the relationship is the VALUE.',
      'Build a Little Black Dress of 4–6 core apps.',
      '80% consistent, 20% customized = a scalable practice.',
      'Evaluate apps on 6 criteria — now with an AI & data lens.',
      'AI does the keystrokes; human judgment stays in the loop.',
      'Govern AI before it touches client data — narrow, documented, disclosed.',
    ],
    quote:
      'Technology let clients enter their own data — and gave us garbage-in, garbage-out. As the back office, you add value by giving them GOOD numbers to run the business.',
  },

  // 19
  next: {
    eyebrow: 'Next Session: Session 4 — Procedures & Implementation',
    text: 'Turning your stack, your AI policy and your team into repeatable SOPs — the capstone that makes it all run without you.',
    beforeLabel: 'Before next time',
    before: [
      'Finish your tech-stack worksheet (Exercise 1)',
      'Run one AI tool through the scorecard (Exercise 2)',
      'Draft a one-line AI use statement for your engagement letter',
    ],
    caption: 'Change doesn’t happen in the future. It happens in the next 48 hours.',
  },
}
