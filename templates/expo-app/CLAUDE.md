@AGENTS.md

# {{Name}}

A private Bible journal and a quiet studio for sharing the owner's reflections online.
Android app + installable PC app (web) from one Expo codebase, plus a small helper service.

## Project notes: read in this order

1. `docs/STATUS.md`: where things stand, what's next, who is working now.
2. `docs/design-brief.md`: the handoff document. §3 core principles and §7 firm constraints are non-negotiable.
3. Your task in `docs/build-next.md`.
4. `docs/design/` for anything visible (tokens, voice, screens, feel, post looks). Mockups: https://claude.ai/artifact/XUdxx59t1HC4tDQuyQwvU4
5. `docs/mvp-plan.md` for the milestones; `docs/decisions.md` for why things are the way they are.

When docs disagree: `decisions.md` (newest) wins, then `design-brief.md`, then the task brief.

## Owner rules

- The owner doesn't write code. Explain things in plain words; one action at a time when they need to do something.
- Every user-facing word and number goes in `content/*.yaml`. Keep `content/README.md` a plain guide.
- Privacy first: journal entries are encrypted before leaving a device; private entries never go to Claude; no secrets in the app.
- No new screens or visible changes beyond the approved design without the owner's OK (through app-design).
- Questions with a sensible default go in `docs/open-questions.md`; keep working.

## Build environment (Windows, main PC)

- `JAVA_HOME` = JDK 17 (`C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot`), not Android Studio's bundled JDK.
- `ANDROID_HOME` = `%LOCALAPPDATA%\Android\Sdk`.
- Gradle: `cmd /c "cd /d android && .\gradlew.bat assembleDebug"`.
- Start background tasks from the project root; a process running inside `android/` makes prebuild fail with EBUSY.
- Phone: `adb reverse tcp:8081 tcp:8081`, then `npm start` (runs `expo start --dev-client` plus the content watcher). Never `CI=1`.
- The first Gradle build takes 30–40 minutes.
- JS and YAML changes reload live; native changes and `app.json`/`app.config.ts` changes need a rebuild (`npm run android`).
- The dev build installs as **{{Name}} (dev)** (`com.jcarts.{{slug}}.dev`) via `APP_VARIANT=development`.
- PC app (web): `npm run web` for now; the installable version comes in task M1.4.

## Cloud route (later, when the owner asks)

`eas.json` has `development`, `preview` and `production` profiles. The owner will link the Expo project and connect GitHub on expo.dev; then pushes to `main` can publish updates or build install links. Not set up yet: the owner chose the local route for now.

## Two PCs

`git pull` before starting. Commit and push before stopping. Update "Working now" in `docs/STATUS.md` at the start and clear it at the end.

## Names

App name: **{{Name}}** (dev build: "{{Name}} (dev)"). Android package: `com.jcarts.{{slug}}` (dev: `com.jcarts.{{slug}}.dev`). Repo: `jcarts31/{{slug}}` (private).
