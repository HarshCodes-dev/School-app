import { useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { getCurrentUser, onSignedOut } from './lib/auth.js'

export default function App() {
  // undefined = abhi check ho raha hai, null = login nahi hai, object = login hai
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => setUser(null))
    return onSignedOut(() => setUser(null))
  }, [])

  if (user === undefined) return <div className="splash">Loading…</div>
  if (!user) return <Login onLogin={setUser} />
  return <Home user={user} onLogout={() => setUser(null)} />
}
