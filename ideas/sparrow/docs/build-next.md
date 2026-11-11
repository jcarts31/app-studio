# Sparrow: build next

## Before you start
- `git pull`. Read `CLAUDE.md`, `docs/STATUS.md`, `docs/design-brief.md` (§0, §3–§7) and your task.
- Check the Expo SDK version in `package.json` and read the matching docs
  (https://docs.expo.dev/llms.txt). Don't trust memory for APIs. Same for Cloudflare
  (developers.cloudflare.com), Meta Graph/Threads APIs and the Claude API (platform.claude.com).

## Rules that apply to every task
- The owner doesn't write code: every user-facing word and tuning number goes in
  `content/*.yaml`, validated by zod; wording follows `docs/design/voice.md`.
- Privacy: personal records are encrypted before they leave the device; private entries never go
  to Claude; never log entry text in the helper.
- Follow the locked design (`docs/design/`, mockups, design system). No new screens or visible
  changes beyond it: ask first.
- `npx expo install` for app packages; never hand-edit `android/` or `ios/`.
- **No secrets in the app.** Anything shipped in the app can be read by anyone. Claude key, Meta
  secrets and tokens live only in helper secrets (`wrangler secret`).
- The app must work on Android and web from the same code; test both.
- Helper code lives in `helper/` (TypeScript, wrangler); it has its own tests (vitest).

## Done means
- `npx tsc --noEmit`, `npx expo lint` and `npm test` pass (and `npm test` in `helper/` when touched).
- The acceptance checks are met.
- `content/README.md` updated if the content format changed.
- The task's status here and the Status in `docs/mvp-plan.md` are updated.
- Checked on the phone and on the web build, or you said plainly that you couldn't.

Parallel: tasks marked **∥** in the same milestone can run at the same time.

---

## M1 Walking skeleton

### M1.1 Theme and core components  [agent: ui-builder] [size: M] [status: todo] ∥
**Depends on:** setup done
**Goal:** Sparrow looks like Morning Pages everywhere.
**Read first:** docs/design/tokens.json, direction.md, feel.md; design system artifact.
**Build:** `src/ui/theme.ts` from tokens (light and dark), fonts via `@expo-google-fonts/literata` and `@expo-google-fonts/figtree`; components in `src/ui/`: Button (primary, secondary), Chip, Card, NavItem, TextField, Note (tint and attention variants), SectionTitle.
**Content:** none (components take text as props).
**Design:** match the key-screens mockups exactly; 44px targets; visible focus.
**Acceptance:** a dev-only `/components` route shows every component in light and dark; contrast pairs from tokens.json used as noted; works on Android and web.
**Tests:** theme exports every token; components render with long text and large font scale.
**Owner gate:** none.

### M1.2 Navigation shell and content loading  [agent: app-engineer] [size: M] [status: todo] ∥
**Depends on:** setup done
**Goal:** move between Journal, This week, Library, Inbox (placeholder), Insights (placeholder).
**Read first:** docs/design/screens.md; design-brief §5–§6.
**Build:** Expo Router layout in `src/app/` with the left navigation (PC width) and a bottom bar fallback for narrow screens until the phone design pass; `src/content/` loader for YAML with zod schemas; `content/strings.yaml` starter.
**Content:** nav labels, screen titles, empty-state lines from voice.md.
**Design:** navigation per mockups; Inbox and Insights show "Coming later" empty states.
**Acceptance:** all five sections reachable on phone and web; changing a label in strings.yaml changes the app; a bad YAML value shows a clear dev error.
**Tests:** content schemas accept the starter files and reject a broken one.
**Owner gate:** none.

### M1.3 Local store  [agent: app-engineer] [size: S] [status: todo]
**Depends on:** M1.2
**Goal:** data saves on the device on Android and web.
**Build:** `src/data/db.ts` with expo-sqlite, migrations, a `settings` table; web setup (Metro wasm, COOP/COEP headers in app config).
**Acceptance:** a setting survives restarting the app on Android and on web.
**Tests:** migrations run from empty; settings read/write.
**Owner gate:** none.

### M1.4 Installable PC app  [agent: app-engineer] [size: S] [status: todo]
**Depends on:** M1.2
**Goal:** install Sparrow from Edge as its own app on Windows.
**Build:** web manifest (name, icons from assets/brand, theme colors), service worker for offline; the web build is served by the home-base PC (via the helper, M1.5) with COOP/COEP headers; a script in `package.json` builds and publishes it locally. (Cloudflare Pages comes at the cloud step.)
**Acceptance:** Edge offers "Install Sparrow"; it opens in its own window; works with Wi-Fi off after first load.
**Tests:** manifest fields present.
**Owner gate:** none.

### M1.5 Helper skeleton on the home-base PC  [agent: backend-engineer] [size: M] [status: todo] ∥
**Depends on:** setup done
**Goal:** the helper runs on the main PC and only Sparrow can talk to it, from the PC or the phone on home Wi-Fi.
**Build:** `helper/` Worker with D1 and R2 bindings, `/health`, device pairing (a setup code shown in the app pairs a device; device gets a token; tokens revocable), request auth middleware, a scheduled job stub. Runs with wrangler's local mode, state persisted to a folder outside the repo (e.g. `%LOCALAPPDATA%\Sparrow\helper`), listening on the home network; secrets in a local `.dev.vars` (git-ignored); a small timer script triggers the scheduled job each minute; `helper:start` script plus a Windows login task so it runs in the background. Android: allow plain HTTP to local network addresses only (Expo config, not hand-edited), since payloads are encrypted. Code must deploy to Cloudflare later unchanged.
**Acceptance:** the PC app and the Pixel (same Wi-Fi) show "Helper connected" in a dev panel; requests without a token are refused; the scheduled job logs a heartbeat every minute; helper restarts after a PC reboot.
**Tests:** auth accepts valid tokens, rejects missing/revoked ones.
**Owner gate:** none (account created at setup).

## M2 A journal you can use
*Before M2: phone layouts design pass (app-design) and owner OK.*

### M2.1 Bible texts and verse lookup  [agent: content-designer] [size: M] [status: todo] ∥
**Depends on:** M1.3
**Goal:** type "Lam 3:22-23" and the verse text fills in, offline.
**Build:** import KJV, BSB, WEB (public domain; record source and license in `docs/credits.md`) into a bundled data file; `src/bible/` reference parser (book names, abbreviations, ranges) and lookup; default translation in settings.
**Acceptance:** common references and abbreviations resolve in all three translations; bad references give a friendly message from strings.yaml; works offline on Android and web.
**Tests:** parser cases (single, range, chapter, abbreviations, bad input).
**Owner gate:** none.

### M2.2 Entries: write and edit  [agent: app-engineer] [size: L] [status: todo]
**Depends on:** M1.1, M1.3, M2.1
**Goal:** write an entry with title, verses, reflection and prayer; it saves as you type.
**Build:** entries schema and repository; Journal screen (list, entry, draft panel placeholder) per mockup; verse chips with verse block; tags; "Okay to share" switch (off by default); autosave.
**Content:** labels, placeholders, empty journal line.
**Design:** "Journal (home)" mockup and the phone layout.
**Acceptance:** create, edit, delete (with confirm) an entry; verse block shows text and translation; autosave survives closing the app; share switch defaults off.
**Tests:** repository CRUD; autosave debounce.
**Owner gate:** none.

### M2.3 Prayers and search  [agent: app-engineer] [size: M] [status: todo]
**Depends on:** M2.2
**Goal:** mark prayers answered and find anything you've written.
**Build:** prayer status with answered date; search over titles, text, verses, tags; filter by tag.
**Acceptance:** marking answered records the date and shows it; search finds by word, verse reference and tag on Android and web.
**Tests:** search ranking basics; prayer status changes.
**Owner gate:** none.

### M2.4 Backup file  [agent: app-engineer] [size: S] [status: todo]
**Depends on:** M2.2
**Goal:** save a backup of the whole journal to a file, and restore it.
**Build:** export to a single readable file (JSON plus a Markdown copy); import with a preview.
**Acceptance:** export then import on another device recreates entries exactly.
**Tests:** round trip.
**Owner gate:** none.

## M3 Sync and safekeeping

### M3.1 Encryption and recovery key  [agent: app-engineer] [size: M] [status: todo]
**Depends on:** M2.2
**Goal:** your journal is locked with a key only your devices have.
**Build:** `src/crypto/` with @noble/ciphers (XChaCha20-Poly1305) and @noble/hashes; a recovery key (words) created at setup; key storage (secure store on Android, IndexedDB on web); encrypt/decrypt records.
**Content:** recovery key screens' wording (plain, calm, clear about what losing it means).
**Design:** recovery key screens need a mockup first.
**Acceptance:** round trip on Android and web; the same key decrypts on the other platform; recovery key confirm step works.
**Tests:** encrypt/decrypt round trip, wrong key fails, tamper detection.
**Owner gate:** design OK needed (recovery key screens).

### M3.2 Sync records in the helper  [agent: backend-engineer] [size: M] [status: todo] ∥
**Depends on:** M1.5
**Goal:** the helper (on the home-base PC) stores encrypted records and hands back changes.
**Build:** D1 tables for encrypted records (id, kind, updatedAt, deviceId, blob); push and pull-since-cursor endpoints; size limits.
**Acceptance:** helper never sees plain text; pull returns only newer records; refuses oversized records; a nightly encrypted backup copy is written to a folder on the PC (keeps the last 30).
**Tests:** push/pull cursor logic; auth.
**Owner gate:** none.

### M3.3 Sync engine in the app  [agent: app-engineer] [size: L] [status: todo]
**Depends on:** M3.1, M3.2
**Goal:** write on the PC, see it on the phone.
**Build:** background sync (on open, on change, every few minutes while open); last edit wins per record, with the other version kept as "conflicting copy"; sync status line; add a new device with the recovery key.
**Acceptance:** on home Wi-Fi, edits appear on another device within a minute while both are open; edits made away from home sync when back; the status line says plainly "Syncs when you're home"; adding the second PC with the recovery key brings everything over.
**Tests:** merge and conflict cases.
**Owner gate:** none.

## M4 Library and your voice
*Before M4: owner sets up Anthropic Console billing with a spend cap (money OK given 2026-11-10; account creation is the owner's); mockups for Voice setup and Library trusted voices approved.*

### M4.1 Claude gateway with spending cap  [agent: backend-engineer] [size: M] [status: todo]
**Depends on:** M1.5
**Goal:** Sparrow can ask Claude for help, and can never overspend.
**Build:** helper endpoint that calls the Claude API (key in the helper's local secrets on the PC), models from tuning config, monthly cost counter in D1, cap from settings; when reached, return a plain "paused" response.
**Acceptance:** requests work; cost counted; cap reached returns paused and the app shows the voice.md message.
**Tests:** cost accounting and cap.
**Owner gate:** money OK (given); owner pastes the API key into the helper secret via a guided step.

### M4.2 Library: images  [agent: app-engineer] [size: M] [status: todo] ∥
**Depends on:** M3.3, M1.5
**Goal:** add your own images and approve or retire them.
**Build:** upload to R2 via helper; library metadata (title, source, license, tags, use count, status) synced encrypted; Library screen images section per mockup; retire.
**Acceptance:** add an image on PC, see it on phone; retired images aren't offered to drafts; license field required for non-owner images.
**Tests:** metadata schema; upload flow.
**Owner gate:** none.

### M4.3 Trusted voices and verified quotes  [agent: content-designer] [size: M] [status: todo] ∥
**Depends on:** M3.3
**Goal:** keep your trusted voices and their verified quotes in one place.
**Build:** voices (name, years, copyright note: public domain or short-quotes-only, max length) and quotes (exact words, work, location, where checked, verified date); Library section per approved mockup; import from `content/voices.yaml` and `voices.xlsx` mirror script.
**Content:** starter `voices.yaml` with C.S. Lewis, C. H. Spurgeon, Augustine, John Bunyan, each with 2–3 example quotes verified against a source. `[owner writes]` more with Claude's help.
**Acceptance:** a quote can't be saved without work and where-checked; Lewis quotes over the length limit are refused; spreadsheet round trip works.
**Tests:** schema rules; length limits.
**Owner gate:** design OK needed (trusted voices mockup).

### M4.4 Teach Sparrow your voice  [agent: app-engineer] [size: M] [status: todo]
**Depends on:** M4.1, M3.3
**Goal:** Sparrow learns how you write and what matters to you.
**Build:** Voice setup screen (paste samples, name influences, topics you care about and avoid); a voice profile (summary, phrases, do/don't) built via the gateway from samples and shareable entries only; updated later from edits and approvals.
**Acceptance:** profile shown in plain words and editable; private entries never included (checked by test); rebuild on demand.
**Tests:** private-entry exclusion; profile schema.
**Owner gate:** design OK needed (Voice setup mockup).

## M5 Drafts and the reviewer

### M5.1 Verse card images  [agent: ui-builder] [size: M] [status: todo] ∥
**Depends on:** M4.2
**Goal:** posts get a clean card: verse or quote over sage or one of your images.
**Build:** card templates from `content/cards.yaml` (square 1080×1080 and portrait 1080×1350), rendered in the app to JPEG and uploaded to R2.
**Acceptance:** cards match the Morning Pages look; long verses fit or warn; text stays readable over photos.
**Tests:** layout fitting rules.
**Owner gate:** none (templates follow the design system); owner reacts during playtest.

### M5.2 Drafting  [agent: app-engineer] [size: L] [status: todo]
**Depends on:** M4.1, M4.3, M4.4, M5.1
**Goal:** turn an entry into a post that sounds like you; sometimes a verse or quote post.
**Build:** draft from a shareable entry (text, card, platforms); "Rewrite it" with a note; verse/quote posts using only the Bible texts and the verified quote bank; drafts synced encrypted; draft panel per mockup.
**Content:** prompt framing in `content/drafting.yaml` (editable), voice.md rules.
**Acceptance:** drafts never quote outside the bank (test with a fake quote); private entries can't be drafted; rewrite keeps the facts.
**Tests:** source constraints; private exclusion.
**Owner gate:** none.

### M5.3 Reviewer: draft checks  [agent: backend-engineer] [size: M] [status: todo] ∥
**Depends on:** M4.1
**Goal:** every draft is checked before you see it.
**Build:** reviewer in the helper using `content/guardrails.yaml` (political, controversial figures, quote verification against the bank, copyright length, never-do list, tone); returns ok or a flag with reason and two suggested choices.
**Acceptance:** a test set of drafts (political, misattributed quote, guilt hook, clean) gets the right results; flags read like the voice.md example.
**Tests:** the test set as fixtures.
**Owner gate:** none.

## M6 This week (approve and get posts ready)

### M6.2 This week  [agent: app-engineer] [size: L] [status: todo]
**Depends on:** M5.2, M5.3
**Goal:** review and approve the coming week in one sitting.
**Build:** week plan (suggested from drafts and posting.yaml defaults: times, mix of entry/verse/quote posts); This week screen per mockup; approve one or all ready; resolve flags; edit text, image, time, platforms; approved posts sent to the helper queue.
**Acceptance:** approving plays the chime; flagged posts can't be bulk-approved; changes sync across devices.
**Tests:** plan generation rules; approval state machine.
**Owner gate:** none.

### M6.4 Phone notifications  [agent: app-engineer] [size: S] [status: moved to cloud step (C3)]
**Depends on:** M1.5
**Goal:** your phone tells you when a post is held or something needs you.
**Build:** expo-notifications push token registered with the helper; notification wording from strings.yaml; tapping opens This week.
**Acceptance:** helper test notification arrives on the Pixel; tapping opens the right post.
**Tests:** registration flow.
**Owner gate:** none (standard notification permission, asked in context).

### M6.5 Ready shelf: copy and save  [agent: app-engineer] [size: S] [status: todo]
**Depends on:** M6.2
**Goal:** before socials are connected, approved posts wait on a Ready shelf where you can copy the text and save the image to post by hand.
**Build:** "Copy text" and "Save image" on each approved post; marked "posted by hand" when you say so.
**Acceptance:** copied text and saved image match the preview exactly, on PC and phone.
**Tests:** status changes.
**Owner gate:** design OK needed (small addition to This week).

## M7 Welcome, polish and hardening
*Before M7: asset pass (logo, chime).*

### M7.1 Welcome and setup flow  [agent: ui-builder] [size: M] [status: todo]
*Step 4 (connect accounts) shows "Later" until M8.*
**Depends on:** M3.3, M4.4
**Goal:** first launch walks you through setup, per the Welcome mockup.
**Acceptance:** fresh install → first entry in under two minutes; steps 2–4 resumable later.
**Owner gate:** none (mocked up).

### M7.2 Sound, motion and dark mode  [agent: ui-builder] [size: M] [status: todo] ∥
**Acceptance:** chime on approve (off switch), settle motion, reduced motion respected, dark theme checked for contrast.
**Owner gate:** none.

### M7.3 Empty states, errors and offline  [agent: app-engineer] [size: S] [status: todo] ∥
**Acceptance:** every screen has an empty state and plain errors from strings.yaml; offline banner; helper unreachable handled.
**Owner gate:** none.

### M7.4 Accessibility pass  [agent: qa-tester] [size: S] [status: todo]
**Acceptance:** screen reader labels, keyboard use on PC, large font scale, contrast; issues filed as tasks.
**Owner gate:** none.

## M8 Connect your socials and post  (when the owner is happy with the direction)
*Owner sets up a Meta developer account and Facebook Page first. The spike runs before anything else in M8; if it fails, stop and bring options.*

### M8.1 Posting spike (Facebook)  [agent: backend-engineer] [size: M] [status: todo]
**Depends on:** M1.5; owner ready to set up socials; owner's Meta developer account and a test Facebook Page
**Goal:** prove the helper on the PC can post an image with text to a Facebook Page.
**Build:** throwaway route in `helper/spike/`: sign-in for a development-mode Meta app (owner as admin), long-lived Page token, direct photo upload to the test Page. Note in `docs/spikes/meta-posting.md` the steps, token lifetimes, limits, and what Instagram and Threads will need at the cloud step (public image URL).
**Acceptance:** one test post visible on the test Page; findings written; tokens stored only in the helper (encrypted in D1 or `.dev.vars`), never in the app.
**Tests:** none (spike); findings doc is the output.
**Owner gate:** owner signs in on Meta's own screens; director reviews findings with the owner if anything failed.

### M8.2 Connect your Facebook Page  [agent: backend-engineer] [size: M] [status: todo]
**Depends on:** M8.1 findings
**Goal:** connect your real Facebook Page from Sparrow. (Instagram and Threads at the cloud step; show them as "Coming with the cloud step".)
**Build:** production version of the spike: connect flow opened from the app, tokens in the helper (encrypted), refresh before expiry, a warning when a sign-in needs renewing; disconnect.
**Acceptance:** connect and disconnect each platform; app shows connected status; expiring token produces a warning.
**Tests:** token refresh scheduling.
**Owner gate:** owner signs in (connecting real accounts).

### M8.3 Scheduler, news check and posting  [agent: backend-engineer] [size: L] [status: todo]
**Depends on:** M8.2, M6.2
**Goal:** approved posts go out on time while the PC is on, after a last-minute check.
**Build:** scheduled job: about an hour before each post, reviewer news check (Claude with web search, max 3 searches); flagged → post held and shown in This week; at time → publish to Facebook; if the PC was off at post time, the post waits and the app asks "Post now, or reschedule?" (never posts late silently); retries with backoff; post history with links; "Hold all posts" and per-post hold from any device.
**Acceptance:** a test post goes out on time; a forced flag holds it; a missed post (PC off) asks before posting; Hold all stops everything until released; history shows links.
**Tests:** scheduling, hold logic, retry rules.
**Owner gate:** first real post (owner watches it).

## The cloud step (only when the owner says so; cost confirmed first)

### C1 Move the helper to Cloudflare  [agent: backend-engineer] [size: M] [status: later]
**Goal:** the helper runs always-on in the cloud with the same code and data.
**Build:** Cloudflare account (owner creates), deploy Worker, D1, R2; migrate data from the PC; cron triggers; Cloudflare Pages for the web app; devices re-point to the cloud address.
**Owner gate:** money OK (free plan or $5), account creation.

### C2 Instagram and Threads posting  [agent: backend-engineer] [size: M] [status: later]
**Goal:** post to Instagram and Threads too.
**Build:** public image URLs from R2; Instagram (container then publish) and Threads publishing; token refresh.
**Owner gate:** connecting accounts.

### C3 Phone notifications and sync away from home  [agent: app-engineer] [size: S] [status: later]
**Goal:** your phone tells you when a post is held, and syncs anywhere.
**Build:** expo-notifications push via the helper; sync works on any network.

### C4 Cloud build route  [agent: app-engineer] [size: S] [status: later]
**Goal:** phone builds via EAS and an install link, no PC needed.
**Owner gate:** Expo account.
