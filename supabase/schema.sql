-- =====================================================================
-- School Connect: database schema
-- Supabase Dashboard -> SQL Editor me paste karke Run kijiye.
-- Har naye module ka SQL isi file me neeche add hoga.
-- (Project me "Automatically expose new tables" OFF hai, isliye har table
--  ke saath GRANT likhna zaroori hai.)
-- =====================================================================

-- ---------- MODULE 1: profiles (kaun teacher hai, kaun student) ----------

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (role in ('teacher', 'student')),
  full_name   text not null,
  class_name  text,          -- student ke liye, jaise '8-A'
  roll_no     int,           -- student ke liye
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Login karne wala (authenticated) sirf padh sakta hai, aur sirf apni hi row.
grant select on public.profiles to authenticated;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- Insert/update/delete ka koi grant ya policy nahi hai, yaani app se koi
-- profile badal nahi sakta. Profiles sirf admin (SQL Editor) se banti hain.


-- ---------- TEST USERS KI PROFILE ----------
-- Pehle Dashboard -> Authentication -> Users -> Add user -> Create new user se
-- do users banaiye (Auto Confirm User ON rakhiye):
--     teacher@school.com   (apna khud ka password)
--     student@school.com   (apna khud ka password)
-- Phir neeche wali dono lines Run kijiye.

insert into public.profiles (id, role, full_name)
select id, 'teacher', 'Mrs. Sharma'
from auth.users where email = 'teacher@school.com'
on conflict (id) do nothing;

insert into public.profiles (id, role, full_name, class_name, roll_no)
select id, 'student', 'Aarav Patil', '8-A', 1
from auth.users where email = 'student@school.com'
on conflict (id) do nothing;
