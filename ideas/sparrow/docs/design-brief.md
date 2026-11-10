# Sparrow: design brief

*Plan written 2026-11-10. Design locked v1 2026-11-09.*

## 0. Read this first

For coding agents: read this file and `docs/STATUS.md` before any task, then your task in
`docs/build-next.md`. §3 Core principles and §7 Firm constraints are non-negotiable. For
anything visible that the approved mockups don't cover, ask through `docs/open-questions.md`
(with the default you'd take) rather than guessing. The owner doesn't write code: every
user-facing word and tuning number lives in `content/*.yaml`.

## 1. The concept

Sparrow is the owner's private Bible journal and a quiet studio for sharing what God is
teaching them online, in their own words. The owner writes entries (a verse that hit them, an
influence, a lesson, a prayer). Sparrow learns their voice, drafts posts from entries they allow,
pairs them with approved images, verses and verified quotes from a library, and a reviewer
checks each one. Once a week the owner reviews and approves; a small always-on helper posts on
schedule to Facebook, Instagram and Threads, re-checking the news first.

Name: Matthew 10:29–31: not one sparrow falls without the Father. Small daily things matter.

## 2. Tone and feel

Morning Pages: a quiet desk at first light. Sage and mist, Literata for everything written,
Figtree for controls. Calm, private, unhurried; the owner decides everything. Full detail:
`docs/design/direction.md`, `tokens.json`, `voice.md`, `screens.md`, `feel.md`. Mockups:
https://claude.ai/artifact/XUdxx59t1HC4tDQuyQwvU4. Design system:
https://claude.ai/artifact/LbSKGWbV3jQgy9bPUvu5F7.

## 3. Core principles (non-negotiable)

1. **The owner approves everything public.** Nothing posts, and no reply or asset is used,
   without an explicit approval. "Hold all posts" always works, from any device.
2. **Private stays private.** Journal entries are encrypted on the device before syncing; the
   helper can't read them. Entries marked private are never sent to Claude.
3. **Never invent.** Drafts never make up experiences, people, feelings or quotes. Quotes come
   only from the verified quote bank of a trusted voice. Verses come only from the built-in
   public-domain texts (or a translation the owner adds with permission).
4. **Calm, not compulsive.** No streaks, badges, follower celebrations or urgency except the
   reviewer's amber "needs a decision".
5. **Journal first.** The journal must be useful on its own, even with posting switched off.
6. **Editable by the owner.** All wording and numbers in `content/*.yaml`.

## 4. Terminology

| Word | Means |
|---|---|
| Entry | One journal page: title, date, verse(s), reflection, prayer, tags, share switch |
| Prayer | A prayer inside an entry; can be marked answered (with date) |
| Okay to share | Per-entry switch allowing Sparrow to draft from it (off = private) |
| Library | Approved images, verses and trusted voices the bot may use |
| Trusted voice | A person the owner approved (e.g. C.S. Lewis), with a copyright note |
| Verified quote | A quote in a trusted voice's bank: exact words, work, where it was checked |
| Draft | A post Sparrow wrote, not yet approved |
| This week | The coming 7 days of scheduled drafts and approved posts |
| Reviewer | The checking agent; its notes are "flags" with two clear choices |
| Hold | Pause one post, or all posts |
| Helper | The always-on cloud piece (never called "server" or "backend" in the app) |
| Voice profile | What Sparrow has learned about how the owner writes and what matters to them |

## 5. Features and systems

**Features (MVP)**
- Write, edit, search entries; add verses by reference (text filled in from the built-in
  Bible); tags; prayers with "Mark answered"; export a backup file.
- Use Sparrow on Android and on both PCs, kept in sync.
- Teach Sparrow your voice (samples, influences); it learns from edits and approvals.
- Library: add images; approve or retire assets; trusted voices and their verified quotes.
- Drafts from shareable entries; occasional verse or quote posts; a rendered verse card image.
- Reviewer: checks drafts against guardrails; re-checks the news about an hour before posting
  and holds a post (with a phone notification) if needed.
- This week: plan, review, approve, edit, reschedule.
- Connect Facebook Page, Instagram (professional account) and Threads; post on schedule; post
  history.

**Systems**
| System | Where | Feeds |
|---|---|---|
| Local store (SQLite; expo-sqlite on Android and web) | each device | everything on screen |
| Content loader (YAML → zod-validated) | app | all wording, numbers, guardrails |
| Bible texts (KJV, BSB, WEB) | bundled in app | verse lookup, verse posts |
| Crypto (XChaCha20-Poly1305, key from recovery key) | app | sync |
| Sync engine (encrypted records, pull/push) | app + helper | multi-device |
| Helper API + auth | helper (Cloudflare Worker) | sync, Claude, posting |
| Asset store | helper (R2) | library images, post images (public URLs) |
| Claude gateway with monthly spending cap | helper | drafts, voice, reviewer |
| Reviewer | helper | draft checks, news checks |
| Scheduler and poster (cron) | helper | posting, holds, news checks |
| Platform connections (Meta OAuth tokens) | helper | posting |
| Notifications (Expo push) | helper → phone | held posts, posted |

## 6. Data model

**Content files (`content/`, owner-editable):** app wording (`strings.yaml`), guardrails and
reviewer rules (`guardrails.yaml`), posting defaults (times, platforms, hashtag rules)
(`posting.yaml`), card templates (`cards.yaml`), starter trusted voices and verified quotes
(`voices.yaml`, with spreadsheet mirror `voices.xlsx`), tuning numbers (`tuning.yaml`).

**Saved on devices (and synced, encrypted):** entries, prayers, tags, voice profile, drafts,
settings, library metadata, trusted voices and quotes.

**Stored by the helper, readable by it:** library images and post images (public by intent);
approved posts in the queue (text, image, time, platforms) and post history; platform tokens
(encrypted at rest); spending counter. Nothing else in plain form.

**Never leaves the device:** the recovery key and encryption key; entries marked private.

## 7. Firm constraints

- **Privacy:** end-to-end encryption for synced personal data; the recovery key is shown once
  at setup and is the only way to restore on a new device if all devices are lost.
- **Secrets:** no API key or token in the app. Claude key, Meta app secret and tokens live in
  helper secrets only.
- **Platform rules:** official APIs only; Meta app in development mode with the owner as app
  admin; respect publishing limits (Instagram 50 posts/24h); no automated replies.
- **Copyright:** public-domain Bibles built in; other translations only with permission. Trusted
  voices under copyright: one or two sentences, credited with the work. Images only from the
  owner, or sources whose license allows this use (recorded per asset).
- **Content safety:** guardrails on by default: nothing political, no controversial figures,
  news check before posting, only verified quotes; no engagement bait, guilt hooks or promised
  blessings; no AI images of Jesus or Bible figures.
- **Accessibility:** WCAG AA contrast, 44px targets, keyboard and screen-reader friendly,
  respects font size and reduced motion.
- **Spending:** a monthly cap on Claude use in the helper (and in the Anthropic console); when
  reached, drafting pauses with a plain message; posting already approved continues.

## 8. Monetization

None planned. Personal app.

## 9. Technical notes and open decisions

- One Expo (latest SDK) + React Native + TypeScript + Expo Router codebase: Android app via EAS;
  web build installed on Windows as an app (PWA: manifest, offline, own window), hosted on
  Cloudflare Pages. Web needs COOP/COEP headers for expo-sqlite.
- Helper: Cloudflare Worker (TypeScript, wrangler) in `helper/`, D1 database, R2 bucket, cron
  triggers (free plan allows 5).
- Crypto: pure-JS audited libraries (`@noble/ciphers`, `@noble/hashes`) so Android and web
  share code. Key storage: expo-secure-store on Android; IndexedDB on web.
- Claude model names live in `content/tuning.yaml` (`models.draft`, `models.review`).
- Open: YouTube upload rules for unverified projects (check before the Later milestone); Threads
  token refresh cadence; how the PC app shows notifications.

## 10. Roadmap

- **MVP:** M1–M7 in `docs/mvp-plan.md`.
- **Later:** Inbox (drafted replies); Insights; X; YouTube Shorts, music and clips.
- **Future:** TikTok; Pinterest; "Sparrow noticed" patterns; auto-suggested library finds.
