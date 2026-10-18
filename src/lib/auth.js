// AUTH LAYER (Supabase)
// Login/logout aur "abhi kaun login hai" ka saara logic sirf is file me hai.
// UI files (Login.jsx, App.jsx, Home.jsx) Supabase ke baare me kuch nahi jaanti.

import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error('Supabase keys nahi mili. Project folder me .env file banaiye (README dekhiye) aur dev server restart kijiye.')
}

// Baaki modules bhi yahin se import karenge: import { supabase } from '../lib/auth.js'
export const supabase = createClient(url, key)

// profiles table se role/naam/class laata hai. Profile na mile to null.
async function loadProfile(authUser) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role, full_name, class_name, roll_no')
    .eq('id', authUser.id)
    .maybeSingle()

  if (error || !data) return null
  return {
    id: data.id,
    role: data.role,
    name: data.full_name,
    cls: data.class_name,
    roll: data.roll_no,
    email: authUser.email,
  }
}

// App khulte hi: pehle se login hai to user wapas deta hai, warna null.
export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession()
  const authUser = data.session?.user
  if (!authUser) return null
  const user = await loadProfile(authUser)
  if (!user) {
    await supabase.auth.signOut()
    return null
  }
  return user
}

export async function signIn({ email, password, role }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) {
    const msg = (error.message || '').toLowerCase()
    if (msg.includes('invalid login')) throw new Error('Email ya password galat hai.')
    if (msg.includes('email not confirmed')) throw new Error('Ye account abhi confirm nahi hua. School admin se sampark kijiye.')
    if (msg.includes('fetch') || msg.includes('network')) throw new Error('Internet ya server se connection nahi ho paya. Dobara try kijiye.')
    throw new Error('Login nahi ho paya. Dobara try kijiye.')
  }

  const user = await loadProfile(data.user)
  if (!user) {
    await supabase.auth.signOut()
    throw new Error('Is account ki profile nahi mili. School admin se sampark kijiye.')
  }

  if (user.role !== role) {
    await supabase.auth.signOut()
    throw new Error(
      user.role === 'teacher'
        ? 'Ye Teacher ka account hai. Upar se Teacher chuniye.'
        : 'Ye Student ka account hai. Upar se Student chuniye.'
    )
  }

  return user
}

export async function signOut() {
  await supabase.auth.signOut()
}

// Kisi bhi tab/jagah se logout hone par App ko batane ke liye.
export function onSignedOut(callback) {
  const { data } = supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') callback()
  })
  return () => data.subscription.unsubscribe()
}
