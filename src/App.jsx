import { useState } from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { getSession } from './lib/auth.js'

export default function App() {
  const [user, setUser] = useState(() => getSession())

  if (!user) return <Login onLogin={setUser} />
  return <Home user={user} onLogout={() => setUser(null)} />
}
