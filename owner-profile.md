# Owner profile

Read by every app-* skill at the start. Update it here once when something changes (a new
phone, a new PC, a new preference) rather than editing the skills.

**Last updated:** 2026-11-02

## Who
- GitHub `jcarts31` (jcarts31@gmail.com). Private repos.
- Doesn't write code. Has ideas, makes design calls, writes content, playtests. Claude writes
  all code.
- Plain words, no jargon. Explain a technical choice in one sentence of what it means for them.

## Default stack
- Expo (latest SDK) + React Native + TypeScript + Expo Router (routes in `src/app/`).
- zod for data validation, jest / jest-expo for tests, expo-sqlite for local data.
- Android first; keep iOS and web possible.
- Check the Expo version in `package.json` and read the matching docs; don't trust memory.

## How apps are made
- **Data-driven:** all user-facing text and tuning numbers live in editable files
  (`content/*.yaml`), with a spreadsheet mirror for big lists (see Spellfound's
  `content/spells.xlsx` and `scripts/spells-sheet.js`).
- **Privacy-first:** process on the device, ask for permissions only when needed, store locally
  unless a backend is truly needed. Never store or send camera frames, audio or transcripts.

## Setup
- Two Windows PCs. Projects in `C:\dev\<slug>`, outside OneDrive.
  (Spellfound on the first PC still lives at `C:\Users\jcart\games\Spellbook`.)
- Studio home cloned to `C:\dev\_studio\`.
- Android package: `com.jcarts.<slug>`.
- Test phone: Pixel 9 Pro, Android 17. Wireless adb, paired per PC.
- Build tools on both PCs: Git, GitHub CLI, Node 24 via nvm-windows, JDK 17
  (not Android Studio's bundled JDK), Android Studio + SDK command-line tools.
  Full notes and snags: Spellfound's `CLAUDE.md` → "Setting up a new machine".
- Always `git pull` before starting and push before stopping (two PCs).

## Reference project
Spellfound (`jcarts31/spellfound`, `C:\dev\spellfound`). Its `CLAUDE.md` and `docs/` show the
conventions the owner is used to.

## Preferences
- Working style preferences (autonomy level, build route) are set per app in its `STATUS.md`.
