// AUTH LAYER
// Abhi demo accounts se chalta hai. Supabase lagate waqt SIRF is file ke
// andar ke functions badlenge (signIn / signOut / getSession). UI files same rahengi.

const SESSION_KEY = 'school_session'

const DEMO_USERS = [
  { id: 't1', role: 'teacher', name: 'Mrs. Sharma', email: 'teacher@school.com', password: 'teacher123' },
  { id: 's1', role: 'student', name: 'Aarav Patil', email: 'student@school.com', password: 'student123', cls: '8-A', roll: 1 },
]

export const demoAccounts = DEMO_USERS.map(({ role, email, password }) => ({ role, email, password }))

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export async function signIn({ email, password, role }) {
  await wait(500) // network jaisa feel
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
  if (!user || user.password !== password) {
    throw new Error('Email ya password galat hai.')
  }
  if (user.role !== role) {
    throw new Error(
      user.role === 'teacher'
        ? 'Ye Teacher ka account hai. Upar se Teacher chuniye.'
        : 'Ye Student ka account hai. Upar se Student chuniye.'
    )
  }
  const { password: _pw, ...safe } = user
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe))
  return safe
}

export async function signOut() {
  localStorage.removeItem(SESSION_KEY)
}
