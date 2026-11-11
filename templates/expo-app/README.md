# Studio Expo starter (from Sparrow, 2026-11-11, Expo SDK 58)

Files that are the same in every project. `app-setup` copies them over a fresh
`npx create-expo-app@latest` project, then replaces `{{Name}}` and `{{slug}}`.

Also needed per project (not templated): `content/strings.yaml` + `tuning.yaml` matching
`src/content/schema.ts`; `docs/design/tokens.json`; `assets/brand/logo.svg` + `brand.json`;
package.json scripts and jest config (see below); app.json fields (package, icons, splash
from brand.json, `runtimeVersion: {policy: "fingerprint"}`, web `output: "single"`).

package.json scripts used: start (content watcher + `expo start --dev-client` via concurrently),
android (`cross-env APP_VARIANT=development expo run:android`), web, content, theme, brand,
typecheck, lint, test. Jest: `{"preset": "jest-expo"}`. tsconfig: `"types": ["jest"]`.
Dev deps: jest, jest-expo, @types/jest, @resvg/resvg-js, eslint, eslint-config-expo,
concurrently, cross-env.

CLAUDE.md and AGENTS.md contain {{Name}}-specific lines (marked by context): trim them per app.
