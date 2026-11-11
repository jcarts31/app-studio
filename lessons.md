# Lessons

What went wrong or right on each project, and what changed because of it. Dated, with the
project named. Newest at the bottom.

- 2026-11-02, studio setup: Claude's GitHub sign-in only showed public repos until the Claude
  GitHub app was *installed* on the account (github.com/apps/claude, "All repositories").
  Signing in alone isn't enough.
- 2026-11-06, loaded-dice: a cloud session couldn't reach the studio repo until the owner
  approved GitHub access for that session in chat. Ask for it at the start of a session, before
  writing files, so nothing sits only in the workspace.
- 2026-11-08, daily-bread: first idea that isn't really a phone app (a scheduled cloud poster).
  Social platforms gate automated posting (TikTok audit, Pinterest Standard access), so the
  scout's "can the phone do it?" check needs a "which platform approvals are needed?" check too.
- 2026-11-11, sparrow: in the cloud sandbox `npx expo install` fails ("HTTP Proxy Network Error:
  Forbidden") because Expo's API is blocked; `EXPO_OFFLINE=1 npx expo install` works (uses the
  SDK's bundled versions). `expo lint` can't auto-configure either: install eslint +
  eslint-config-expo the same way and add eslint.config.js (now in templates/expo-app).
- 2026-11-11, sparrow: expo-router `Link asChild` around a Pressable with a style function lost
  its styles on web; use Pressable + `router.navigate()` for nav items (template AppShell does).
- 2026-11-11, sparrow: this session couldn't create GitHub repos (gh token invalid); asking the
  owner to make an empty private repo at github.com/new, then attaching it, took one minute.
- 2026-11-11, studio: first templates/expo-app created from Sparrow.
