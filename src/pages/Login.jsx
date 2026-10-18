import { useState } from 'react'
import { signIn } from '../lib/auth.js'

export default function Login({ onLogin }) {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Email aur password dono bhariye.')
      return
    }
    setLoading(true)
    try {
      const user = await signIn({ email, password, role })
      onLogin(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="logo">🎓</div>
        <h1>School Connect</h1>
        <p>Attendance, homework, results aur notices ek hi jagah</p>
      </div>

      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <div className="role-toggle" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={role === 'student'}
            className={role === 'student' ? 'on' : ''}
            onClick={() => { setRole('student'); setError('') }}
          >
            🧑‍🎓 Student
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === 'teacher'}
            className={role === 'teacher' ? 'on' : ''}
            onClick={() => { setRole('teacher'); setError('') }}
          >
            👩‍🏫 Teacher
          </button>
        </div>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="username"
            placeholder="aap@school.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <div className="pw-wrap">
            <input
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="pw-toggle" onClick={() => setShowPw((s) => !s)}>
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        {error && <div className="error" role="alert">{error}</div>}

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Login ho raha hai…' : `${role === 'teacher' ? 'Teacher' : 'Student'} Login`}
        </button>

        <p className="login-help">Account school admin banate hain. Password bhool gaye to admin se sampark kijiye.</p>
      </form>

      <p className="login-foot">Prototype · Module 1b: Supabase login</p>
    </div>
  )
}
