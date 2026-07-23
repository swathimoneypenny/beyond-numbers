import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/* Route guard for signed-in-only areas. Reuses the shared auth context — it is
   the single gate, not a parallel auth system.

   Used as a layout route wrapping the protected children; it renders <Outlet />
   when authenticated, otherwise redirects to /login.

   Waits for `booting` (the initial /api/auth/me session restore) before
   deciding, so a signed-in user refreshing a protected URL isn't bounced to
   /login before their session is restored.

   Passes the attempted location as `state.from` (which Login already reads to
   send the user back after signing in) plus a `notice` for the sign-in page. */
export default function ProtectedRoute() {
  const { isAuthenticated, booting } = useAuth()
  const location = useLocation()

  if (booting) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-teal">
        <Loader2 size={26} className="animate-spin" />
        <span className="sr-only">Checking your session…</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          notice: 'Please sign in to access the workshop content.',
        }}
      />
    )
  }

  return <Outlet />
}
