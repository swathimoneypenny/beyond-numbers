import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import * as api from '../lib/auth'
import { clearExerciseData } from '../lib/exerciseStorage'

/* Auth state for the whole app.

   Session restore + React StrictMode
   ----------------------------------
   StrictMode intentionally mounts effects twice in dev. The classic deadlock is
   to combine a `cancelled` flag with a ref guard: run 1 gets cancelled by its
   own cleanup, run 2 is skipped by the guard, and `booting` never flips to
   false - the app hangs on the loading screen forever.

   So this effect uses a ref guard and NO cancel flag, and always clears
   `booting` in a finally block. The bootstrap runs exactly once and always
   finishes. Setting state after unmount is a no-op in React 18, not a leak. */

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [booting, setBooting] = useState(true)
  const bootstrapped = useRef(false)

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true

    ;(async () => {
      try {
        if (!api.getToken()) {
          // Logged out at app load (e.g. the tab was closed without logging
          // out): hold no exercise data. A logged-in refresh still has its
          // token, so it never reaches this branch and keeps its answers.
          clearExerciseData()
          return
        }
        const payload = await api.me()
        setUser(api.normalizeUser(payload))
      } catch {
        // Expired/invalid token, or the backend is unreachable. Drop it and
        // fall back to logged-out rather than trapping the user. The token is
        // gone either way, so the next step is a fresh login - clear now too.
        api.clearToken()
        clearExerciseData()
        setUser(null)
      } finally {
        setBooting(false)
      }
    })()
  }, [])

  /* Always re-read the profile from /me so the user shape is consistent no
     matter what login/signup return. */
  const hydrate = useCallback(async () => {
    const payload = await api.me()
    const next = api.normalizeUser(payload)
    setUser(next)
    return next
  }, [])

  const login = useCallback(
    async (email, password) => {
      await api.login(email, password)
      // Fresh start every login: no exercise answers carry over between
      // sessions. Cleared only here/signup/logout - never mid-session - so the
      // HW1 -> HW2 -> HW3 -> HW4 hand-off still works within a session.
      clearExerciseData()
      return hydrate()
    },
    [hydrate],
  )

  const signup = useCallback(
    async (email, password) => {
      await api.signup(email, password)
      // If signup didn't issue a token, log in with the same credentials so the
      // user still lands authenticated.
      if (!api.getToken()) await api.login(email, password)
      clearExerciseData()
      return hydrate()
    },
    [hydrate],
  )

  const logout = useCallback(() => {
    api.logout()
    clearExerciseData()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, booting, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
