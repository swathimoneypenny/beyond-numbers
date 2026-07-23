/* Public session-overview content, assembled from the EXISTING session data
   (src/data/session1..4.js) — no new copy is written here. The four session
   files have different shapes, so this adapter normalises them to one form the
   SessionOverview page can render:

     { tagline, objectives: [{k,v}]|null, topics: [string], exercises: [{tag,title,desc}] }

   - objectives: sessions 3 & 4 have an objectives block; 1 & 2 don't (null).
   - topics: verbatim section headings (eyebrows) from each session's data.
   - exercises: each session's exercise1/exercise2 tag (carries the duration) +
     title + the first available one-line field (lead / task / takeaway).
   - tagline: the session's own tagline, or session 3's theme line. */

import { session1 } from './session1'
import { session2 } from './session2'
import { session3 } from './session3'
import { session4 } from './session4'

// One-line "what you'll do" for an exercise, taken from whichever field exists.
const exDesc = (ex) => ex.lead || ex.task || ex.takeaway || ex.goal || ''
const toExercises = (s) =>
  [s.exercise1, s.exercise2]
    .filter(Boolean)
    .map((ex) => ({ tag: ex.tag, title: ex.title, desc: exDesc(ex) }))

// Objectives normalised to { k, v }; null when the session has no objectives block.
const toObjectives = (s) =>
  s.objectives?.items?.map((o) => ({ k: o.k, v: o.v })) ?? null

export const sessionOverviews = {
  'session-1': {
    tagline: session1.tagline,
    objectives: toObjectives(session1),
    topics: [
      'The day everything changed',
      'Binary vs. advisory work',
      'The four service quadrants',
      'The $100K question',
      'The five boxes',
      'Your unique value lives in the overlap',
      'Four decisions, one per service',
      'Your 30-day commitment',
    ],
    exercises: toExercises(session1),
  },
  'session-2': {
    tagline: session2.tagline,
    objectives: toObjectives(session2),
    topics: [
      'A tale of two firms',
      'Building a diverse advisory team',
      'The BOS: your advisory anchor',
      'The secret weapon: admin excellence',
      'Sort every client: Gold, Silver, Bronze, Fire',
      'Where the tiers come from: value vs effort',
      'Firing wrong-fit clients — without guilt',
      'Build once, serve many: own a vertical',
      'Having “the conversation”',
    ],
    exercises: toExercises(session2),
  },
  'session-3': {
    tagline: session3.theme,
    objectives: toObjectives(session3),
    topics: [
      'The Technology Evolution',
      'Your “Little Black Dress” of Technology',
      'The 80/20 Rule for Technology',
      'Choosing Your Apps: 6 Critical Criteria',
      'Core App Categories for Advisory',
      'The Power of Integration',
      'AI in Your Practice: Where It Fits',
      'AI Governance: Why It Matters Now',
      'A Framework You Can Use Monday',
    ],
    exercises: toExercises(session3),
  },
  'session-4': {
    tagline: session4.tagline,
    objectives: toObjectives(session4),
    topics: [
      'Terminology: Workflow vs. Tasking',
      'Terminology: Policy vs. Procedure',
      'Why Procedures Are Essential for BOS',
      'The Three Kinds of Procedures',
      'The 7 Rules for Creating Procedures',
      'The Playbook Structure (Whale.io Example)',
      'AI Now Writes — and Maintains — Your Procedures',
      'Controlling & Obtaining Source Documents',
      'The Power of Mighty Search',
    ],
    exercises: toExercises(session4),
  },
}

export const getSessionOverview = (slug) => sessionOverviews[slug]
