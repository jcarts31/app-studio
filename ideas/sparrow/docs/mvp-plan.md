# Sparrow: MVP plan

## Goals
A private Bible journal the owner uses every day, on phone and PCs, that turns the entries
they choose into posts in their own voice, checked by a reviewer, approved once a week and
posted on schedule to Facebook, Instagram and Threads.

## Platform
- Android (Pixel 9 Pro, Android 17): native app, built locally and installed over wireless adb.
- Windows PCs (two): the same app installed from Edge as a desktop app.
- Helper: **runs on the owner's main PC ("home base") during the local phase**, using the same
  Cloudflare Worker code run locally (no account, no cost). The phone and second PC sync with it
  over home Wi-Fi. Claude API with a monthly cap. The **cloud step** later moves the helper to
  Cloudflare unchanged.

## In scope (local phase)
Journal, encrypted sync through the home-base PC, voice learning, library (images, verses,
trusted voices with verified quotes), drafts, reviewer, This week, posting to Facebook while the
PC is on, post history, welcome and setup.

## The cloud step (when the owner says so)
Move the helper to Cloudflare (owner OK on cost first); Instagram and Threads posting; posting
and news checks while the PC is off; phone push notifications; sync away from home; cloud build
route. Tasks C1–C4 in build-next.md.

## Out of scope for now
Inbox, Insights, X, YouTube Shorts/music/clips (Later); TikTok, Pinterest, patterns,
auto-suggested finds (Future).

## Milestones

| # | Name | Goal (owner's words) | What you can try after this | Size |
|---|---|---|---|---|
| — | *Sample posts* | *Owner reacts to how posts look and sound (now, before building).* | *Mockups of sample posts.* | — |
| M1 | Walking skeleton | "Sparrow opens on my phone and PC." | Open Sparrow on the Pixel and in its own window on your PC, click through the five sections in the Morning Pages look; the helper runs on your PC. | M |
| — | *Phone layouts design pass* | *Owner OKs phone versions of the screens (app-design).* | *Mockups to react to.* | — |
| M2 | A journal you can use | "I can journal in Sparrow every day." | Write entries with verses filled in, tags and prayers; mark a prayer answered; search; save a backup file. | M |
| M3 | Sync and safekeeping | "My journal is on all my devices, and safe." | On home Wi-Fi, write on the PC and read it on the phone; set up your recovery key; add your second PC. | L |
| M4 | Library and your voice | "Sparrow knows my sources and how I write." | Add images; add trusted voices and verified quotes (together); teach Sparrow your voice. | M |
| M5 | Drafts and the reviewer | "Sparrow drafts posts that sound like me, and catches problems." | Switch an entry to "Okay to share", get a draft with a verse card, previewed as it would look; see the reviewer flag a test case. | M |
| M6 | This week | "I approve the week and posts are ready." | Approve a week; approved posts wait on a Ready shelf where you can copy the text and save the image. | M |
| — | *Asset pass* | *Real logo and sounds (app-design).* | *Pick the logo and chime.* | — |
| M7 | Welcome, polish and hardening | "It feels finished." | First-launch setup, sounds, dark mode, friendly empty and error states. | M |
| — | *Real use* | *Owner lives with it until happy with the direction; feedback becomes tasks (app-qa).* | — | — |
| M8 | Connect your socials and post | "It posts for me." | Connect your Facebook Page; posts go out while your PC is on, after a news check; hold one; see history. | L |
| C | *The cloud step* | *When the owner says so: helper to Cloudflare, Instagram and Threads, always-on posting, push.* | — | L |

## Risks and spikes
1. **Posting through Meta's official APIs (riskiest, tested last by the owner's choice).** Spike at the start of M8: from the helper on the PC,
   post one image to a test Facebook Page using a Meta app in development mode. Instagram and
   Threads are tested at the cloud step (they need a public image address). If it fails: stop and
   bring options to the owner.
1b. **The PC as home base:** posting and news checks only happen while the main PC is on and the
   helper is running; the phone syncs only on home Wi-Fi. Android needs permission to talk to the
   PC over the local network (plain HTTP to a local address, payloads encrypted). Backups matter
   more, since the PC holds the only shared copy: backup file export (M2.4) plus an automatic
   encrypted backup folder on the PC (M3).
2. **Encrypted sync on Android and web from one codebase.** Mitigated by pure-JS crypto and a
   simple record-level sync; a small round-trip test is M3's first task.
3. **Web build of expo-sqlite** needs special headers (COOP/COEP); checked in M1.
4. **Losing the recovery key.** Shown once, with a printable sheet and a confirm step; the
   welcome flow makes it clear.
5. **Token expiry** (Threads long-lived tokens ~60 days): the helper refreshes and warns.
6. **Spending:** cap enforced in the helper and the Anthropic console.

## Owner stops during the build
- Before M1: Claude Code on the main PC. Before M8: Meta developer account and Facebook Page.
  (No Cloudflare or Expo account needed in the local phase.) Before M4: Anthropic Console with
  billing and a spend cap.
- Phone layouts design pass (after M1); Voice setup and trusted-voices mockups (before M4); post
  editor and setup screens if needed.
- Recovery key setup (M3), connecting your real Facebook Page (M8), the first real post (M8).
- The cloud step: only when the owner says so, with the cost confirmed first.
- Asset pass (before M7).

## Status
- 2026-11-10: plan approved; then replanned local-first (owner): helper on the main PC, Facebook-only posting until the cloud step.
- 2026-11-11: socials moved to the end (owner): M8 Connect your socials and post; sample posts first for feedback.
