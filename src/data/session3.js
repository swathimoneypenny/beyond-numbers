/* Session 3 — "Protect Your Firm — Cybersecurity and AI Governance".
   EXACT workshop content from Penny's slides (do not paraphrase). */

export const session3 = {
  theme: 'Cybersecurity and AI governance are leadership decisions, not IT tasks.',
  presenters: 'Penny Breslin & Damien Greathead • Beyond Numbers',

  // Public-overview objectives ("What you'll achieve")
  objectives: {
    eyebrow: "What you'll achieve",
    items: [
      {
        k: 'Assess your security arrangements',
        v: 'Find the gaps in what your WISP and controls actually cover.',
      },
      { k: 'Evaluate your AI uses and vendors', v: 'Check data handling and human oversight.' },
      {
        k: 'Assign role-specific responsibilities',
        v: 'Using the WISP & AI Governance Role Checklist.',
      },
    ],
  },

  // ── Exercise (HW) — wired in Session3.jsx in Chunk 3; card shape ──
  exercise1: {
    tag: 'Homework · Penny demos',
    title: 'WISP & AI Governance Role Checklist',
    lead: "Check off what your Written Information Security Plan actually covers, then mark the part you play at your level — Partner, Staff Accountant, Preparer or Bookkeeper. Everything you can't check lands on one gap list.",
    steps: [
      {
        time: '~10 min',
        k: 'Our WISP',
        v: "For each item, is it in writing today? Mark Have it / Partial / Missing / Don't know.",
      },
      {
        time: '~5 min',
        k: 'AI governance',
        v: 'Which AI policies does your firm have in writing?',
      },
      {
        time: '~10 min',
        k: 'My role',
        v: 'Mark your own duties, then review the gap list with owners and dates.',
      },
    ],
    note: 'Bring your gap list to your next partner or team meeting. A printable PDF worksheet is available below.',
  },

  // ─────────────────────────────────────────────────────────────
  // Written content — 8 sections, in order
  // ─────────────────────────────────────────────────────────────

  // 1 — Cybersecurity is now your job
  nowYourJob: {
    eyebrow: 'Cybersecurity is now your job',
    subtitle: 'The model has flipped — security moved from the server room to the boardroom.',
    oldLabel: 'The old model',
    old: ['An IT issue, delegated to IT or an MSP', 'Reviewed only when something broke', 'No named owner'],
    newLabel: 'The new model',
    new: [
      'A leadership duty with a named, accountable owner',
      'A standing item on the partner agenda',
      'Owned at the top, not outsourced',
    ],
    stats: [
      { v: '43%', k: 'of cyberattacks hit small businesses' },
      { v: '60%', k: 'of small firms close within 6 months of a breach' },
    ],
  },

  // 2 — The FTC Safeguards Rule
  ftcRule: {
    eyebrow: 'The FTC Safeguards Rule',
    subtitle: 'Tax preparers, CPAs and bookkeepers are all covered.',
    facts: [
      { v: 'June 2023', k: 'updated rule in force' },
      { v: '$51,744', k: 'max penalty per violation' },
    ],
    elementsLabel: 'The nine required elements',
    elements: [
      'A Qualified Individual',
      'A written WISP',
      'A risk assessment',
      'Access controls',
      'A data inventory',
      'Encryption',
      'MFA for everyone',
      'Secure disposal',
      'An annual report',
    ],
  },

  // 3 — IRS and the state patchwork
  irsStates: {
    eyebrow: 'IRS and the state patchwork',
    subtitle: 'A WISP on file is required for every PTIN holder (IRS Publication 4557).',
    points: [
      { k: 'A WISP is mandatory', v: 'Every PTIN holder must have one on file (IRS Publication 4557).' },
      { k: 'Report breaches fast', v: 'Breaches must be reported to the IRS and states quickly.' },
      { k: '50 different state laws', v: 'There are 50 separate state breach-notification laws.' },
      { k: 'Follow your clients', v: 'Your obligations follow where your clients live, not where your firm sits.' },
    ],
  },

  // 4 — AI governance has arrived
  aiGovernance: {
    eyebrow: 'AI governance has arrived',
    subtitle:
      'AI went from a productivity perk to a governance duty — insurers now ask for an AI policy, and state AI laws are in force.',
    kitLabel: 'The starter kit',
    kit: [
      'An acceptable-use policy',
      'Client disclosure',
      'Human review',
      'An AI vendor inventory',
      'A designated owner',
      'Staff training',
    ],
  },

  // 5 — What never gets pasted (GREEN / YELLOW / RED)
  neverPaste: {
    eyebrow: 'What never gets pasted',
    subtitle: 'Give every person one simple rule.',
    bands: [
      {
        key: 'green',
        label: 'GREEN',
        rule: 'Any approved tool',
        items: ['Public information', 'Firm templates', 'Generic how-to questions'],
      },
      {
        key: 'yellow',
        label: 'YELLOW',
        rule: 'Firm-licensed AI only, with no-training terms',
        items: ['Client financials', 'Workpapers', 'Reconciliations'],
      },
      {
        key: 'red',
        label: 'RED',
        rule: 'Never in a chat box',
        items: ['SSNs and dates of birth', 'Bank and card numbers', 'Passwords and full returns'],
      },
    ],
  },

  // 6 — What your insurer expects
  insurer: {
    eyebrow: 'What your insurer expects',
    subtitle: 'Coverage is only as good as the answers on your questionnaire.',
    deniedLabel: 'Claims get denied for',
    denied: [
      'Overstating controls on the questionnaire',
      'Missing a promised control deadline',
      'Ignoring vendor breach exposure',
    ],
    askLabel: 'Ask every vendor, in writing',
    ask: [
      'Do you have a SOC 2 Type II report?',
      'Where is our data stored?',
      "What's your breach-notification timeline?",
      'What are your cyber-insurance limits?',
      'Who can access our data?',
    ],
  },

  // 7 — The risks leaders miss
  risks: {
    eyebrow: 'The risks leaders miss',
    subtitle: 'The weak point is rarely the firewall.',
    stat: { v: '82%', k: 'of breaches involve a human element' },
    moversLabel: 'What moves the needle',
    movers: [
      'Quarterly phishing tests',
      'Role-specific training',
      'A no-blame reporting culture',
      'Weekly PII and daily server reminders that put the WISP in front of staff where they already work',
    ],
  },

  // 8 — The five non-negotiables
  fiveControls: {
    eyebrow: 'The five non-negotiables',
    subtitle: 'If you only do five things this quarter.',
    items: [
      'MFA everywhere',
      'A password manager for everyone',
      'EDR on every endpoint',
      'Tested offline backups',
      'A written incident-response plan',
    ],
  },

  // Up next — Session 3 is the last workshop; point to the Dec 10 open hours
  next: {
    eyebrow: 'Up next: Open Hours — December 10',
    text: 'Bring your WISP gap list, pricing questions or team-role gaps to the included open-hours Q&A with Damien and Penny on December 10.',
  },
}
