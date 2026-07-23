import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Games from './pages/Games'
import Workshops from './pages/Workshops'
import Session1 from './pages/Session1'
import Session2 from './pages/Session2'
import Session3 from './pages/Session3'
import Session4 from './pages/Session4'
import SessionPage from './pages/SessionPage'
import Videos from './pages/Videos'
import Blog from './pages/Blog'
import Podcast from './pages/Podcast'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checklists from './pages/Checklists'
import Contact from './pages/Contact'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />

        {/* The Workshops overview is public marketing (session tiles). The
            session content itself is gated: signed-in users only. */}
        <Route path="/workshops" element={<Workshops />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/workshops/session-1" element={<Session1 />} />
          <Route path="/workshops/session-2" element={<Session2 />} />
          <Route path="/workshops/session-3" element={<Session3 />} />
          <Route path="/workshops/session-4" element={<Session4 />} />
          <Route path="/workshops/:slug" element={<SessionPage />} />
        </Route>

        <Route path="/videos" element={<Videos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checklists" element={<Checklists />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
