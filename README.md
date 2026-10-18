# School Connect

Student & Teacher app prototype (React + Vite). Backend: Supabase (aane wale modules me).

## Chalane ka tareeka

```bash
npm install
npm run dev
```

Terminal me `Network: http://192.168.x.x:5173` dikhega. Phone ko **same WiFi** par rakhkar wahi link browser me kholiye.

## Demo accounts (Module 1)

| Role    | Email               | Password   |
|---------|---------------------|------------|
| Student | student@school.com  | student123 |
| Teacher | teacher@school.com  | teacher123 |

## Folder structure

```
src/
  main.jsx          entry
  App.jsx           login / home switch (naye modules ka routing yahin jodenge)
  styles.css        saari styling, ek hi file
  lib/auth.js       login logic (Supabase yahin lagega)
  pages/Login.jsx   login screen
  pages/Home.jsx    login ke baad ki screen (modules yahin add honge)
```

## Modules

- [x] 1. Login (frontend)
- [ ] 1b. Login (Supabase backend)
- [ ] 2. Attendance
- [ ] 3. Homework & Syllabus
- [ ] 4. Results
- [ ] 5. Announcements
- [ ] 6. Timetable + dashboards

## Git (pehli baar)

```bash
git init
git add .
git commit -m "Module 1: login frontend"
git branch -M main
git remote add origin <aapka-github-repo-url>
git push -u origin main
```
