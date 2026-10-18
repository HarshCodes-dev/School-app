# School Connect

Student & Teacher app prototype (React + Vite + Supabase).

## Chalane ka tareeka

1. Project folder me `.env` file hona chahiye (`.env.example` dekhiye). Isme Supabase URL aur anon key jaati hai. `.env` GitHub par nahi jaati.
2. Phir:

```bash
npm install
npm run dev
```

Terminal me `Network: http://192.168.x.x:5173` dikhega. Phone ko **same WiFi** par rakhkar wahi link browser me kholiye.

`.env` badalne ke baad dev server band karke dobara `npm run dev` chalana padta hai.

## Supabase setup (ek baar)

1. Supabase Dashboard, **SQL Editor** me `supabase/schema.sql` ka sara code paste karke Run.
2. **Authentication, Users, Add user, Create new user** se teacher aur student banao (Auto Confirm ON).
3. `schema.sql` ke neeche wali insert lines dobara Run, taaki dono ki profile ban jaye.
4. **Authentication, Sign In / Providers** me "Allow new users to sign up" OFF karo. Account sirf admin banayega.

## Folder structure

```
src/
  main.jsx          entry
  App.jsx           login / home switch (naye modules ka routing yahin jodenge)
  styles.css        saari styling, ek hi file
  lib/auth.js       Supabase client + login logic
  pages/Login.jsx   login screen
  pages/Home.jsx    login ke baad ki screen (modules yahin add honge)
supabase/
  schema.sql        saari tables + security rules (har module yahin jodta hai)
```

## Modules

- [x] 1. Login (frontend)
- [x] 1b. Login (Supabase backend)
- [ ] 2. Attendance
- [ ] 3. Homework & Syllabus
- [ ] 4. Results
- [ ] 5. Announcements
- [ ] 6. Timetable + dashboards
