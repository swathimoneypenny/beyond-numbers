/* Session 4 — "Procedures & Implementation".
   EXACT workshop content from Penny's slides (do not paraphrase). */

/* Title, question ("How do I make the work run — without me?") and the
   90 min / 2 exercises meta live in sessions.js and render via SessionHero. */
export const session4 = {
  tagline: "If you don't make documenting procedures a priority, it won't get done.",
  presenters: 'Penny Breslin & Damien Greathead • Beyond Numbers',

  // 1
  capstone: {
    eyebrow: 'The Capstone',
    subtitle: 'Where strategy becomes an operating manual',
    lead: 'Two working blocks, two hands-on exercises, one firm that runs without you.',
  },

  // 2
  facilitators: {
    eyebrow: 'Your Facilitators',
    subtitle: 'Co-led, every Wednesday',
    people: [
      { k: 'Penny Breslin', v: 'Penny@beyond-numbers.com' },
      { k: 'Damien Greathead', v: 'Damien@beyond-numbers.com' },
    ],
  },

  // 3
  objectives: {
    eyebrow: 'Session Objectives',
    items: [
      {
        n: '1',
        k: 'Get the Terminology Right',
        v: 'Workflow vs. Tasking and Policy vs. Procedure — and what belongs in each document.',
      },
      {
        n: '2',
        k: 'Master the 7 Rules',
        v: 'Apply the guiding principles for creating procedures that actually get followed.',
      },
      {
        n: '3',
        k: 'Build Your Playbook',
        v: 'Create documented procedures that make everyone — including you — replaceable.',
      },
      {
        n: '4',
        k: 'Cost Out Your Stack',
        v: 'Select and price the workflow, documentation and AI apps that make this scale.',
      },
    ],
    quote:
      "If you do not make documenting procedures a priority, it will not get done—and we'll show you how easy it can be.",
  },

  // 4
  roadmap: {
    eyebrow: 'Your 90 Minutes — The Roadmap',
    subtitle: 'Two working blocks bracketed by two hands-on exercises',
    items: [
      {
        tag: 'Part 1',
        k: 'Language & Why',
        v: 'Workflow vs. tasking, policy vs. procedure, and why documentation drives flat-fee profit.',
      },
      {
        tag: 'Exercise 1',
        k: 'Build Your Tech Stack',
        v: 'Cost out the apps that power a scalable, procedure-driven firm.',
      },
      {
        tag: 'Part 2',
        k: 'Playbooks & AI',
        v: 'The 7 rules, playbook structure, and how AI now writes and maintains procedures.',
      },
      {
        tag: 'Exercise 2',
        k: 'Build a Procedure',
        v: 'Write a real month-end reconciliation playbook you can use Monday.',
      },
    ],
    caption:
      'Rule of the day: you bought the tools, so USE them. Half-adoption guarantees failure.',
  },

  // 5
  workflowTasking: {
    eyebrow: 'Terminology: Workflow vs. Tasking',
    subtitle: 'These terms are used interchangeably — but they are not the same',
    items: [
      {
        k: 'Workflow',
        kind: 'always a noun',
        v: 'The sequence of processes a piece of work passes through, from initiation to completion.',
        ex: 'Example: "The monthly close workflow has 12 steps."',
      },
      {
        k: 'Tasking',
        kind: 'noun OR verb',
        v: 'A piece of work to be done (noun), or to assign that work to someone (verb).',
        ex: 'Example: "I\'m tasking you with the data entry."',
      },
    ],
    realLabel: "Real example: Liz Scott's browser workflow",
    real: 'The browser bar is labelled "MAKE DEPOSIT." Each button links to a step in QBO. The steps are the workflow. The actual clicks, data entry, saves and closes inside each step are the tasks. Remember — even a sole proprietor has a team: your client, and the AI you both use, are part of the workflow.',
  },

  // 6
  policyProcedure: {
    eyebrow: 'Terminology: Policy vs. Procedure',
    subtitle: 'Both are required — for different reasons',
    items: [
      {
        k: 'POLICY',
        kind: 'the WHY & the goal',
        v: 'A documented standard. It gives the reason and the goal of what we need to do.',
        ex: '"We reconcile bank accounts monthly to ensure accuracy and catch discrepancies early."',
      },
      {
        k: 'PROCEDURE',
        kind: 'the HOW',
        v: 'The step-by-step description of the task at hand. How the work actually gets executed.',
        ex: '"Step 1: Open QBO. Step 2: Banking. Step 3: Select account…"',
      },
    ],
    whyLabel: 'Why this matters',
    why: "Your team must understand the policy — the goal. Knowing the goal lets them follow the procedure AND recognise when a procedure no longer fits the goal. Share the procedure without the intentional outcome, and don't be surprised when you THINK a procedure wasn't followed — they just never knew the WHY.",
  },

  // 7
  documents: {
    eyebrow: 'What Goes Inside Each Document',
    subtitle: 'Digital, standard format, accessible and editable on a permissions basis',
    policy: {
      k: 'POLICY',
      items: [
        'Purpose',
        'Scope',
        'Policy details',
        'Responsible person(s)',
        'Additional resources + links',
      ],
    },
    procedure: {
      k: 'PROCEDURE',
      items: [
        'Purpose',
        'Scope',
        'Prerequisites',
        'Responsibilities',
        'Process steps',
        'Definitions',
        'Additional resources + links',
      ],
    },
  },

  // 8
  essential: {
    eyebrow: 'Why Procedures Are Essential for BOS',
    subtitle: 'Flat-fee pricing only works when you cut the time spent hunting for information',
    items: [
      {
        n: '1',
        k: 'Set the Anticipatory Set',
        v: 'Use the SLA to set expectations so everyone is on the same page.',
      },
      {
        n: '2',
        k: 'Document Your Procedures',
        v: 'Capture the "how" in a playbook for every client engagement.',
      },
      {
        n: '3',
        k: 'Follow Your Procedures',
        v: 'Consistency is everything — workflows only work if everyone follows them.',
      },
      {
        n: '4',
        k: 'Adapt When Needed',
        v: 'Review and update when a procedure stops working or the tech changes.',
      },
    ],
    caption:
      'The hourly trap: your $18/hr employee billed at $60/hr to phone the client, walk down the hall, and wait for a document with nothing to do. Flat-fee pricing makes that lost time YOUR cost — so kill it with procedures.',
  },

  // 9
  poll1: {
    eyebrow: 'Poll Question',
    q: 'When was your most recent procedure updated?',
  },

  // 10
  benefits: {
    eyebrow: 'Benefits of Documenting Procedures',
    subtitle: "We document each client's procedures in a single source we call a PLAYBOOK",
    items: [
      { k: 'Minimal Learning Curve', v: 'New hires get up to speed fast' },
      { k: 'Seamless Coverage', v: 'Anyone can cover illness or vacation' },
      { k: 'Everyone Is Replaceable', v: 'Including you — no single point of failure' },
      { k: 'Clients Stick to YOU', v: 'Not to an individual bookkeeper' },
      { k: 'Easy Duplication', v: 'Similar processes scale across clients' },
      { k: 'You Own the Brain Trust', v: 'Knowledge stays with the firm, not staff' },
      { k: 'Shared Vision', v: 'Everyone stays focused on the same goal' },
      { k: 'Maximize Firm Value', v: 'You sell systems, not just client names' },
    ],
    quote:
      'Which is worth more when you sell your firm: a contact list from a CRM, or a digital, up-to-date, step-by-step set of procedures for the firm and every client?',
  },

  // 11
  threeKinds: {
    eyebrow: 'The Three Kinds of Procedures',
    subtitle: 'Name them and you stop the confusion and the long learning curves',
    items: [
      {
        k: 'Internal Firm',
        v: 'How your firm gets work done and does business with the world: onboarding/offboarding clients and staff, how meetings run, which apps track workflow, and role expectations.',
      },
      {
        k: 'Standard Accounting',
        v: 'How you convert a client\'s information into a coherent set of books — your Accounting 101 foundations plus the apps in your "little black dress" of technology.',
      },
      {
        k: 'Client-Specific',
        v: "The variations that customize the work for one client: the apps they prefer, a POS-to-GL integration, GST/VAT handling. All of it lives in that client's Playbook.",
      },
    ],
    caption:
      'Add a new tech tool to the stack and be willing to tear apart your procedures to fit it. Retrofitting tech to old processes captures only ~5% of automation\'s value. — McKinsey',
  },

  // 12
  sevenRules: {
    eyebrow: 'The 7 Rules for Creating Procedures',
    subtitle:
      'Breaking down work you can do without thinking is hard — these rules keep it honest',
    items: [
      {
        n: '1',
        k: 'Peer Review Required',
        v: "Never let people write their own procedures unreviewed. It must make sense to someone who doesn't do the work.",
      },
      {
        n: '2',
        k: 'The "3 Times" Rule',
        v: 'Hear the same question three times? Document the answer in the Playbook with a named owner.',
      },
      {
        n: '3',
        k: 'Regular Reviews',
        v: 'Update procedures to reflect app changes, client changes, or efficiency gains — a check on scope creep.',
      },
      {
        n: '4',
        k: 'Make It a Priority',
        v: "If documenting isn't a scheduled priority, it will not get done.",
      },
      {
        n: '5',
        k: 'Assign a Dedicated Person',
        v: 'One person manages all procedures for all clients and attends every team meeting.',
      },
      {
        n: '6',
        k: 'Implement Fully',
        v: 'If you use a workflow app, use it for EVERYTHING — firm-facing and client-facing.',
      },
      {
        n: '7',
        k: 'Record Yourself',
        v: "Use Zoom, Loom, Otter.ai or your phone and narrate the work. You won't skip a step.",
      },
    ],
    note: "Let go! You'll apply these in Exercise 2 — building a real procedure together.",
  },

  // 13
  caseFail: {
    eyebrow: 'Case Study: When Workflows Fail',
    subtitle: 'The Canadian GST disaster',
    caveatLabel: 'The big caveat',
    caveat:
      'A Canadian firm was sold mid-year. The new owners kept the workflow app and procedures — then cut the cloud workflow system to save cost. The team kept doing monthly GSTs on "autopilot" from Slack messages. But the quarterly GST for one client was forgotten: the documentation never arrived, and no one asked for it. Q1 was missed. Q2 was completed. No one noticed until Q3 — a total failure on all parts of the circle.',
    lessonLabel: 'The lesson',
    lesson:
      'Another case of Richard III and the want of a nail. That missing GST could have been our Bosworth Hill.',
    ruleLabel: 'The rule it proves',
    rule:
      'Workflow tools only work when used consistently. Unless the whole firm — every partner and employee — is required to use it, it will fail. Or rather, you will fail it.',
  },

  // 14
  caseScope: {
    eyebrow: "Case Study: Know What You're Getting Into",
    subtitle: 'Before you quote a price, map the data — the $300 vs. $1,800 reconciliation',
    callLabel: 'The call from the dog park',
    call: 'A consultant asked what I\'d charge for monthly bookkeeping: one bank account, two cards, Shopify, QBO. He\'d been quoted $300/month — then the firm came back at $1,800 and added "you must manage inventory." He under-sold the work; the firm was right. There was a LOT more here — and it was actually two businesses. The fix: sit with the client and hand-draw the data flow before pricing anything.',
    phaseLabel: 'Phase One: Data Control',
    phase: [
      'Which data sets must be managed? (Bank, cards, Shopify… and the Amazon he forgot.)',
      'Where does each one come from — which feeds and which apps?',
      'Does every transaction need to hit the books, or will a daily summary do?',
      'What outcome does the owner actually want? Is KPI software needed?',
      'Put the GL in the middle of the page — then draw the diagram.',
    ],
  },

  // 15
  apps: {
    eyebrow: 'Workflow & Tasking Applications',
    subtitle: 'Apps we use and actually like — in no particular order',
    items: [
      {
        k: 'Workflow / Tasks Accounting Centric',
        v: 'Levvy, Karbon, Basil, Qount, Canopy, TaxDome, Financial Cents',
      },
      { k: 'General Purpose', v: 'Monday, Wrike, Asana, ClickUp' },
      { k: 'Documentation', v: 'Whale.io, OneNote, Google Docs, Notion, Process Street' },
      { k: 'Recording', v: 'Zoom, Loom, CoCreator, Otter.ai, Chorus.ai, your mobile device' },
      { k: 'Document Management', v: 'SharePoint, Soraban, Sanford, Google Drive' },
      {
        k: 'Communication',
        v: 'Slack, Teams, Teamline (Slack integration), Google Chat, integrated WF chats',
      },
    ],
    criteriaLabel: 'Key selection criteria',
    criteria: [
      'Great support (support is HUGE)',
      'Client interaction inside the workflow',
      'Integration with Slack or Teams',
      'An AI layer — how does AI enhance it?',
      'Searchability',
      'Know the data-extraction policy BEFORE you commit',
    ],
  },

  // 16
  amView: {
    eyebrow: 'How an Account Manager Sees the Playbooks',
    subtitle: 'A real board: every client card shows how many procedures are documented',
    items: [
      { k: 'Firm Details', v: 'Firm info + login/admin procedures' },
      { k: 'SOP', v: 'Standard operating procedures for all clients' },
      { k: 'Clients', v: 'Individual client playbooks + counts' },
      { k: 'Meetings', v: 'Schedules and recurring procedures' },
    ],
    caption:
      'Cedar Grove has 4 procedures; Mismack has 3. Instant visibility into what\'s documented — and what\'s missing.',
  },

  // 17
  playbook: {
    eyebrow: 'The Playbook Structure (Whale.io Example)',
    subtitle: 'A consistent card template means anyone finds the answer fast',
    cards: [
      {
        n: 'Card 1',
        k: 'Client Overview',
        v: 'Business description • industry/niche • key contacts • special requirements',
      },
      {
        n: 'Card 2',
        k: 'Access & Logins',
        v: 'All credentials • link to SECURE password manager • portal access • bank connections',
      },
      {
        n: 'Card 3',
        k: 'Team',
        v: 'Assigned staff • roles & responsibilities • escalation path • emergency contacts',
      },
      {
        n: 'Card 4',
        k: 'Standard Tasks',
        v: 'Recurring tasks • frequency • links to workflow • checklists',
      },
      {
        n: 'Cards 5+',
        k: 'Client-Specific Procedures',
        v: 'Detailed cards for unique needs: special COA accounts, inventory procedures, sales tax / GST / VAT, POS integrations, custom reporting.',
      },
    ],
    proTip:
      'link each task in your workflow app straight to the matching Whale.io card for instant access.',
  },

  // 18
  poll2: {
    eyebrow: 'Poll Question',
    q: 'Where are your policies and procedures stored today?',
  },

  // 19
  exercise1: {
    tag: 'Exercise 1 • 12 min',
    title: 'Build Your Procedure Tech Stack',
    embedId: 's4-ex1-procedure-tech-stack',
    profileLabel: 'Your firm profile',
    profile: [
      '5-person firm',
      '2 CPAs • 2 staff • 1 admin',
      '50 monthly bookkeeping clients',
      '500 tax returns annually',
      'Goal: scalable flat-fee model',
      'Today: NO documented procedures',
    ],
    taskLabel: 'Your task',
    task: 'Select ONE app in each of the 6 categories. Consider integrations and what you already own (MS Office? G-Suite?). Watch your running monthly total.',
    pointLabel: 'The point',
    point:
      "A $344 stack fully used beats a $949 stack ignored. Both are valid — it's about FULL adoption. You bought it, so use it.",
    goalLabel: 'Goal',
    goal: 'Open the interactive Tech Stack tool (or pricing handout). At two minutes, finalize. Debrief — who came in under $500? Over $1,000? Who leveraged MS Office or G-Suite across multiple categories?',
  },

  // 20
  aiWrites: {
    eyebrow: 'AI Now Writes — and Maintains — Your Procedures',
    subtitle: 'Record the work, let AI transcribe it, then keep it alive in the playbook',
    steps: [
      {
        n: '1',
        k: 'Capture',
        v: 'Narrate while you work — phone recorder, Loom or Zoom. People learn by sight, sound, touch and doing.',
      },
      {
        n: '2',
        k: 'Transcribe',
        v: 'Otter.ai or Chorus.ai, FireFlies.ai turn the recording into text in near real time — the holes the speaker skipped show up.',
      },
      {
        n: '3',
        k: 'Draft',
        v: 'Prompt an LLM: "You are a process and procedure writing expert…" and let it structure the steps.',
      },
      {
        n: '4',
        k: 'Maintain',
        v: 'Tools like Whale.io and Process Street surface tasks and turn weekly Q&A into recurring, owned procedures.',
      },
    ],
    sessionLabel: 'From a real Double / Otter.ai working session',
    sessionLead: 'A weekly client review becomes documented procedure in minutes:',
    quotes: [
      'Create recurring tasks in Double for the high-volume files.',
      'Do not create new QBO classes — map Airtable to the existing City/State class.',
      'Use Uncategorized for unclear items; clean up later.',
    ],
    closing:
      'Each clarified answer is captured once, assigned an owner, and never asked a third time. Inspect what you expect.',
  },

  // 21
  finished: {
    eyebrow: 'What a Finished Procedure Looks Like',
    subtitle: "Real example: a firm's daily time-entry procedure — specific, ordered, owned",
    hallmarksLabel: 'The hallmarks of a good procedure',
    hallmarks: [
      'States the WHY up front (why complete time matters to billing and revenue).',
      'Names the exact system and the exact path — no "you know the one."',
      'Defines the inputs for every field (Client ID, engagement, project, activity, hours).',
      'Sets the standard precisely: round to .1 of an hour — 15 min is .3, not .25.',
      'Gives concrete comment text for each task type, so entries are consistent.',
      'Adds Notes / Tips for the edge cases (training time, month coding, the timer).',
    ],
    tableLabel: 'Run a Month-End Reconciliation',
    tableHead: ['Step', 'Who', 'Description'],
    tableRows: [
      ['1', 'Staff', 'Download bank statement from portal'],
      ['2', 'Staff', 'Match transactions to the GL feed'],
      ['3', 'Staff', 'Investigate & clear discrepancies'],
      ['4', 'Senior', 'Review reconciliation report'],
      ['5', 'AM', 'Sign off in workflow → link to Playbook'],
    ],
  },

  // 22
  exercise2: {
    tag: 'Exercise 2 • 12 min',
    title: 'Build a Month-End Reconciliation Procedure',
    embedId: 's4-ex2-month-end-procedure',
    steps: [
      {
        n: 'Step 1',
        k: 'Write the POLICY (the WHY)',
        v: '2–3 sentences on why month-end reconciliation matters: accuracy, timeliness, client expectations, compliance. Example: "All client bank accounts are reconciled within 5 business days of month-end."',
      },
      {
        n: 'Step 2',
        k: 'Select the PROCEDURE steps',
        v: 'Work the 6 categories and check the steps that belong: gathering, matching, investigation, review, sign-off, hand-off. Assign an owner and an order to each — your first real playbook entry.',
      },
      {
        n: 'Step 3',
        k: 'Make it followable',
        v: 'Add the named system and exact path. State the standard (e.g. cleared within 5 days). Note the escalation — your name sits at the TOP of the chain only.',
      },
    ],
    takeawayLabel: 'The takeaway',
    takeaway:
      "You'll leave with a real, documented procedure you can drop into your playbook on Monday — reviewed by someone who doesn't do the work (Rule 1).",
  },

  // 23
  naming: {
    eyebrow: 'Resource: Naming Conventions',
    subtitle: 'Consistent naming saves time, prevents 1099 rejects — and stops confusing the bots',
    tableHead: ['Guideline', 'Example'],
    tableRows: [
      ['Include CORP, INC, LLC, LLP in the name', 'JONES CONSULTING LLC'],
      ['Move "THE" to the end, or omit it', 'NEW YORK TIMES THE'],
      ['Exclude prefixes (Mr., Ms., Dr.)', 'JOHN SMITH (not DR JOHN SMITH)'],
      ['Replace & with AND', 'JONES AND SMITH'],
      ['Avoid periods and apostrophes', 'READERS DIGEST ASSN'],
      ['Use standard abbreviations', 'CORP, INC, INTL, NATL, DEPT, DIV'],
    ],
    whyLabel: 'Why this matters',
    why: 'Wrong vendor naming = 1099 rejects, duplicate records, wrong payments and hours of cleanup — and it confuses AI models. Train ALL staff on the convention, including the bots.',
  },

  // 24
  sourceDocs: {
    eyebrow: 'Controlling & Obtaining Source Documents',
    subtitle: 'The most efficient method removes the client from the process where possible',
    flow: [
      { k: 'Bank Feeds', v: 'Real-time data in the GL' },
      { k: 'Auto-Capture', v: 'LedgerSync, RelayFi, MakersHub' },
      { k: 'Dedicated Email', v: 'ap@client.com with BCC' },
      { k: 'Client Portal', v: 'Structured uploads' },
      { k: 'Cloud Storage', v: 'Managed server / DMS' },
    ],
    bestLabel: 'Best practices',
    best: [
      'Define the capture method in the SLA.',
      'Pick ONE method and stick to it.',
      'Charge more for less efficient methods.',
      'Reward fast-adopting clients.',
    ],
    avoidLabel: 'Avoid these',
    avoid: [
      'Blended systems (half email, half upload).',
      'Files saved to local desktops — now you have two copies.',
      'Traditional mail (charge a premium!).',
      'Email with account numbers (insecure).',
    ],
  },

  // 25
  search: {
    eyebrow: 'The Power of Mighty Search',
    subtitle: 'A robust search engine is the key to finding information fast',
    fedLabel: 'Federated search',
    fed: 'One query, one interface — underneath, it hits several search engines and returns one aggregated view. It accesses multiple data sources at once, so folders, sub-folders and duplicate copies simply go away.',
    benefitsLabel: 'Benefits',
    benefits: [
      'Find data anywhere in your system.',
      'No more folder hierarchies.',
      'Scanned paper files become searchable.',
      'Multiple copies eliminated.',
    ],
    examplesLabel: 'Examples',
    examples: [
      'Microsoft FAST Search (SharePoint).',
      'Google Workspace with Gemini.',
      'A DMS with enterprise search.',
      'Many .NET / SharePoint extensions.',
    ],
  },

  // 26
  actionPlan: {
    eyebrow: "Your Procedure Action Plan — Let's Go Live",
    subtitle: "Change doesn't happen in the future — it happens in the next 48 hours",
    timeline: [
      { k: 'Today', v: 'Assign a Procedure Manager for your firm' },
      { k: 'This Week', v: 'Document ONE common task with your team' },
      { k: 'This Month', v: 'Create playbooks for your top 3 clients' },
      { k: '90 Days', v: 'Full workflow-app adoption across the firm' },
    ],
    commitLabel: 'The 48-hour commitment',
    commit: [
      'Select and commit to ONE workflow / tasking app.',
      'Schedule your first team procedure-documentation session.',
      'Identify your firm\'s "procedure champion."',
      'Review current naming conventions with the AP team.',
      'Try an LLM for inspiration — prompt: "You are a process and procedure writing expert…"',
    ],
  },

  // 27
  takeaways: {
    eyebrow: 'Key Takeaways',
    items: [
      'Workflow is the sequence of steps. Tasking is the actual work. Know the difference.',
      "Playbooks make everyone expendable — including you. That's a GOOD thing.",
      'Workflow apps only work with full adoption. You bought it — USE it.',
      "Document with a dedicated person. If it isn't a priority, it won't happen.",
      'AI now drafts and maintains procedures — record, transcribe, prompt, keep it alive.',
      'Consistent naming and federated search compound your time savings.',
    ],
    caption:
      'Selling clients vs. selling SYSTEMS — the firm with documented procedures transfers swiftly and is worth more.',
  },

  // 28
  close: {
    eyebrow: 'Week 4 of 4 • The Series Is Complete',
    quote: 'Thank you. Now go build one procedure.',
    kicker: "Change doesn't happen in the future. It happens in the next 48 hours.",
    items: [
      { k: 'Book a 1-hour consultation', v: 'Walk your first procedure through with us.' },
      { k: 'Reach the facilitators', v: 'Penny@beyond-numbers.com · Damien@beyond-numbers.com' },
      { k: 'Use the resources', v: "We don't save your data. Share them with your team." },
    ],
  },
}
