# Sparrow: MVP plan

## Goals
A private Bible journal the owner uses every day, on phone and PCs, that turns the entries
they choose into posts in their own voice, checked by a reviewer, approved once a week and
posted on schedule to Facebook, Instagram and Threads.

## Platform
- Android (Pixel 9 Pro, Android 17): native app built with EAS.
- Windows PCs (two): the same app installed from Edge as a desktop app.
- Helper: Cloudflare (Workers, D1, R2, cron). Claude API with a monthly cap.

## In scope
Journal, encrypted sync, voice learning, library (images, verses, trusted voices with verified
quotes), drafts, reviewer, This week, posting to Facebook/Instagram/Threads, post history,
welcome and setup.

## Out of scope for now
Inbox, Insights, X, YouTube Shorts/music/clips (Later); TikTok, Pinterest, patterns,
auto-suggested finds (Future).

## Milestones

| # | Name | Goal (owner's words) | What you can try after this | Size |
|---|---|---|---|---|
| M1 | Walking skeleton + posting test | "Sparrow opens on my phone and PC, and we know posting works." | Open Sparrow on the Pixel and in its own window on a PC, click through the five sections in the Morning Pages look. See one test post appear on a test Facebook Page, Instagram and Threads. | L |
| — | *Phone layouts design pass* | *Owner OKs phone versions of the screens (app-design).* | *Mockups to react to.* | — |
| M2 | A journal you can use | "I can journal in Sparrow every day." | Write entries with verses filled in, tags and prayers; mark a prayer answered; search; save a backup file. (Each device separate for now.) | M |
| M3 | Sync and safekeeping | "My journal is on all my devices, and safe." | Write on the PC, read it on the phone. Set up with a recovery key; add your second PC with it. | L |
| M4 | Library and your voice | "Sparrow knows my sources and how I write." | Add images; add trusted voices and verified quotes (we fill these together); teach Sparrow your voice. | M |
| M5 | Drafts and the reviewer | "Sparrow drafts posts that sound like me, and catches problems." | Turn on "Okay to share", get a draft with a verse card image; see the reviewer flag a test case. | M |
| M6 | This week and posting | "I approve the week and it posts for me." | Connect your real accounts; approve a week; watch posts go out; hold one from your phone; see history. | L |
| — | *Asset pass* | *Real logo and sounds (app-design).* | *Pick the logo and chime.* | — |
| M7 | Welcome, polish and hardening | "It feels finished." | First-launch welcome and setup, sounds, dark mode, friendly empty and error states. | M |
| — | *Two weeks of real use* | *Owner lives with it; feedback becomes tasks (app-qa).* | — | — |

## Risks and spikes
1. **Posting through Meta's official APIs (riskiest).** Spike in M1: from the helper, post one
   image to a test Facebook Page, Instagram professional account and Threads using a Meta app in
   development mode. If it fails: stop and bring options to the owner (posting service such as
   Upload-Post, ~$16–24/month, or a narrower platform set).
2. **Encrypted sync on Android and web from one codebase.** Mitigated by pure-JS crypto and a
   simple record-level sync; a small round-trip test is M3's first task.
3. **Web build of expo-sqlite** needs special headers (COOP/COEP); checked in M1.
4. **Losing the recovery key.** Shown once, with a printable sheet and a confirm step; the
   welcome flow makes it clear.
5. **Token expiry** (Threads long-lived tokens ~60 days): the helper refreshes and warns.
6. **Spending:** cap enforced in the helper and the Anthropic console.

## Owner stops during the build
- Before M1: accounts: Expo (EAS), Cloudflare, Meta developer account and a test Facebook Page,
  Instagram and Threads; later Anthropic Console with billing and a spend cap (before M4).
- Phone layouts design pass (after M1); Voice setup and trusted-voices mockups (before M4); post
  editor and setup screens if needed.
- Recovery key setup (M3), connecting real accounts (M6), the first real post (M6).
- Asset pass (before M7).

## Status
- 2026-11-10: plan written; waiting on owner approval (Checkpoint 3).
