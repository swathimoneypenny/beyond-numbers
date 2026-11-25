/* Exercise answer storage - wiped at every login, signup and logout.

   The interactive exercises (srcDoc iframes, same origin as the app) save
   answers to localStorage and pass data between homeworks (HW1 -> HW2 -> HW3
   -> HW4, S2-HW2 -> S2-HW1/HW3) through these keys. Policy: hold no exercise
   data across sessions. Attendees save/print their own PDF or download.

   So we clear ONLY at auth boundaries (login / signup / logout), never
   mid-session, which keeps the hand-off between homeworks working while a user
   stays logged in (including page refreshes, which restore the session without
   going through login).

   Only localStorage is touched. The auth token lives in sessionStorage under
   'bn.auth.token' (see lib/auth.js) and is never affected. */

export const EXERCISE_STORAGE_KEYS = [
  // Session 1
  'bn-traffic-light-v1', // HW1 state
  'bn-traffic-light', // HW1 output -> HW2, HW3, HW4
  'bn-100k-v1', // HW2 state
  'bn-100k', // HW2 output -> HW4
  'bn-team-pickup-v1', // HW3 state
  'bn-team-pickup', // HW3 output -> HW4
  'bn-team-purpose-map-v1', // HW4 state
  // Session 2
  'bn-client-matrix-v1', // HW1 state
  'bn-ideal-clients', // shared HW1/HW2/HW3
  'bn-true-cost-v1', // HW2 state
  'bn-true-cost-by-client', // HW2 output
  'bn-true-cost-results', // HW2 output -> HW1, HW3
  'bn-true-cost-result', // HW2 output (singular) -> HW1, HW3
  'bn-firm-cost-v1', // HW3 state
  // Session 3
  'bn-wisp-role-checklist-v1', // HW1 state
]

// Safety net for keys added by future exercises. The auth token uses 'bn.'
// (dot) and lives in sessionStorage, so this prefix can never match it.
const EXERCISE_KEY_PREFIX = 'bn-'

export function clearExerciseData() {
  try {
    const keys = new Set(EXERCISE_STORAGE_KEYS)
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(EXERCISE_KEY_PREFIX)) keys.add(k)
    }
    keys.forEach((k) => localStorage.removeItem(k))
  } catch {
    // Storage unavailable (private mode / blocked) - nothing persisted to clear.
  }
}
