import { signOut } from '../lib/auth.js'

// Placeholder: har naya module (Attendance, Homework, ...) isi file me add hoga.
export default function Home({ user, onLogout }) {
  const isTeacher = user.role === 'teacher'

  async function handleLogout() {
    await signOut()
    onLogout()
  }

  return (
    <div className="home-page">
      <header className="topbar">
        <div>
          <div className="topbar-sub">{isTeacher ? 'Teacher' : `Student · Class ${user.cls}`}</div>
          <div className="topbar-name">Namaste, {user.name}</div>
        </div>
        <button className="btn-ghost" onClick={handleLogout}>Logout</button>
      </header>

      <main className="home-main">
        <div className="card">
          <h2>Login ho gaya ✅</h2>
          <p>
            Aap <b>{isTeacher ? 'Teacher' : 'Student'}</b> ke roop me login hain. Role ke hisaab se
            alag screens yahin aayengi.
          </p>
        </div>
        <div className="card muted">
          <b>Aane wale modules</b>
          <ul>
            <li>Attendance</li>
            <li>Homework &amp; Syllabus</li>
            <li>Results</li>
            <li>Announcements</li>
            <li>Timetable</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
