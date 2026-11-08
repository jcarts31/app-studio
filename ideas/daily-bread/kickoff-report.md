# Kickoff Report: Daily Bread (working title)

Full report: https://claude.ai/artifact/GrPiq9UuVa3KBBVMBrhoNE

*Scouted 2026-11-08*

## 1. The idea

A bot that posts one meaningful Christian post a day to the owner's own accounts on every major platform, drawing on Bible verses, quotes from Christian thinkers and royalty-free clips. The owner approves a week of posts at a time; then it runs on its own.

**Defining features**

1. **Posts automatically** every day, to many platforms at once.
2. **Brings its own content**: a library of verses, quotes and clips, so the owner isn't making every post by hand.
3. **Makes the visuals**: verse/quote images and short vertical videos, sized for each platform.
4. **Weekly review**: the owner approves or swaps a week of posts in one sitting.
5. **Copyright-safe**: only content it's allowed to post.

## 2. Verdict

**Close cousins.** Plenty of tools do one or two of these, but nothing found does all five for one person's own accounts.

## 3. Closest matches

| App | What it does | 1 Auto-post | 2 Content | 3 Visuals | 4 Weekly review | 5 Copyright-safe | Price | Biggest gap |
|---|---|---|---|---|---|---|---|---|
| Outreach Social | Church graphics library (3,000+) with an auto-scheduler | ✓ FB, IG, X only | ✓ | ✓ (stock graphics) | ✓ (edit the auto-schedule) | ✓ | Not listed | No TikTok, YouTube, Threads, Pinterest; Facebook Pages only; church-branded |
| ChurchSocial | Church scheduler + sermon clips + templates | ✓ FB, IG, X, TikTok, YouTube | ✗ | ✓ (templates, AI) | ✗ | ✗ (AI output needs checking) | $15–89/mo | You bring the content; costs climb with add-ons |
| Social Bucket | ~30 ready church graphics + captions a month | ✗ | ✓ | ✓ | ✗ | ✓ | Not listed (7-day trial) | You download and schedule each post yourself |
| GoFaceless "Daily Bible Verse" | Turns a verse into a narrated vertical video (public-domain Bibles) | ✗ | partial | ✓ video | ✗ | ✓ | Plans, prices not listed | You post every video yourself |
| Insta Bible (iOS) | Verse image maker | ✗ | ✗ | ✓ | ✗ | – | Free + $9.99/mo Pro | Manual; 4.1★ from 9 ratings; crash complaints |
| General schedulers + IFTTT/Zapier (Buffer, Postiz, IFTTT "daily prayer tweet" recipes) | Post anything anywhere / simple daily text | ✓ | ✗ | ✗ | – | ✗ | Free–$$ | No faith content, no visuals |

## 4. The gap

- **One person, every platform, content included.** Church tools that include content stop at Facebook/Instagram/X (Outreach), and the ones that reach TikTok/YouTube make you bring the content (ChurchSocial).
- **A weekly "approve the week" ritual** instead of a calendar to fill. Nothing found is built around a 10-minute weekly review.
- **Quality and trust over volume.** Faith content on social media is crowded with AI "slop" and templated videos, and that's attracting both press backlash and platform crackdowns. Verified quotes (no fake C.S. Lewis lines), public-domain text, and a short personal reflection from the owner would set it apart.
- **Not a church product.** Existing tools speak to church staff (sermons, events, bulletins). A personal "content ministry" voice is unserved.

## 5. Demand signals

- Churches already pay for ready-made faith content plus scheduling: Outreach Social and Social Bucket both sell libraries of 1,000+ graphics.
- AI video tools now ship dedicated "daily Bible verse" templates, and short-video tools market Bible content as a niche worth chasing.
- People keep wiring up their own versions: several IFTTT recipes exist just to post a daily prayer or Bible episode automatically.
- Counter-signal: press coverage of Christian creators outsourcing AI-generated religious videos shows the audience notices low-effort content. Quality is the differentiator, not volume.

## 6. Dead attempts

None found. No shut-down app of exactly this kind turned up; the closest risk is platform rules (below), not market failure.

## 7. Feasibility and concerns

| Area | | Why |
|---|---|---|
| Can the phone do it? | 🟡 | A phone can't reliably post every day on its own. This is a small **cloud service** (runs on a schedule) plus a **weekly review screen**, which could be a web page or a phone app. It breaks from the usual Expo-only setup. |
| Store / platform policy | 🟡 | No Play Store needed if the review screen is a web page. The real gatekeepers are the platforms: **TikTok** keeps every post private until an app passes an audit; **Pinterest** keeps pins invisible to others until "Standard" access is approved (needs a demo video and privacy policy); **Instagram** needs a business/creator account (50 posts/day limit, fine). YouTube uploads work without verification (100 uploads/day quota). Using an already-approved posting service skips most of this. |
| Privacy and legal | 🟡 | Little personal data (only the owner's account logins, held by the posting service). **Copyright is the real issue:** KJV, Berean Standard Bible and World English Bible are public domain; ESV allows up to 500 verses with its copyright notice (about 16 months of daily posts); C.S. Lewis and most 20th-century writers are still under copyright (rights held by the C.S. Lewis Company). Pexels clips are free without credit, but not posted unaltered on their own. Many famous quotes are misattributed, so each one needs a verified source. |
| Backend and running costs | 🟡 | Needs a small server or scheduled job. Cheapest sane route: a posting service that's already approved on all platforms, e.g. Upload-Post (free for 10 posts/month; ~$16–24/month unlimited, 22 platforms). Self-hosting the open-source Postiz is ~free but brings back the TikTok/Pinterest approvals. Posting to X directly costs ~$0.45/month at one post a day ($0.015/post; $0.20 if the post has a link). Only one user, so the 100 / 10,000-user question doesn't apply. **Estimate: ~$20–35/month.** |
| Money | 🟡 | Optional. The accounts could later earn from YouTube/Facebook programs, but both now demote or demonetize "mass-produced, repetitive" and unoriginal content (YouTube from July 2025, Meta from July 2025). Original visuals plus the owner's own words keep it on the right side. |
| Effort | M | See below. |
| Wellbeing and safety | 🟢 | Low risk. Never-do list: no engagement bait ("type Amen or…"), no AI images of Jesus or Bible figures speaking, no fear or guilt hooks, no promises of blessings for sharing. |

## 8. Effort

**Size: M** (3–4 milestones): content library and post generator → weekly review screen → posting to image platforms (Facebook, Instagram, Threads, X, Pinterest) → short videos for TikTok and YouTube Shorts.

- **Hardest part:** good-looking short videos made automatically (verse text over a licensed clip, with music that's cleared for each platform).
- **Riskiest unknown:** will a posting service reliably publish to *all* your accounts, especially TikTok publicly, at the price shown?
- **Spike (one evening):** sign up for a posting service's free tier, connect a test Facebook Page, Instagram and TikTok, and post one generated verse image and one short clip. If all three go public, the riskiest part is settled.

## 9. Recommendation

**Go with changes.**

1. Build it as a **cloud service with a weekly review page**, not a Play Store app. Simpler, cheaper, nothing to publish to a store.
2. **Use an already-approved posting service** rather than connecting to each platform yourself, so the TikTok and Pinterest approvals aren't your problem.
3. **Phase it:** images and text first (Facebook, Instagram, Threads, X, Pinterest), short videos (TikTok, YouTube Shorts) second.
4. **Public-domain-first content with verified sources**, plus a one-line reflection in your voice on each post. That protects you on copyright and keeps platforms from treating it as recycled content.

The gap is real but modest; what makes this worth building is that it's yours, cheap to run, and genuinely better-made than the volume-driven accounts it shares a feed with.

## 10. Sources

- [Outreach Social](https://outreach.com/social)
- [ChurchSocial review, Learn of Christ](https://learnofchrist.com/resources/churchsocial)
- [Social Bucket, faith.tools](https://faith.tools/app/552-social-bucket)
- [GoFaceless Daily Bible Verse template](https://www.gofaceless.ai/en/templates/daily-verse)
- [Insta Bible, App Store](https://apps.apple.com/us/app/insta-bible/id763908534)
- [IFTTT: post daily prayer tweet on X](https://ifttt.com/applets/w6Wiv3PJ-post-daily-prayer-tweet-on-x-at-set-time)
- [Christian creators outsourcing AI videos, AI Chief](https://aichief.com/news/christian-content-creators-are-outsourcing-ai-slop-to-gig-workers-on-fiverr/)
- [TikTok Content Posting API: Direct Post](https://developers.tiktok.com/doc/content-posting-api-reference-direct-post)
- [YouTube Data API: Videos insert](https://developers.google.com/youtube/v3/docs/videos/insert)
- [Instagram content publishing limit](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/content_publishing_limit)
- [Pinterest API access tiers](https://developers.pinterest.com/docs/key-concepts/access-tiers/)
- [X API pricing (checked against docs.x.com Oct 2026), OpenTweet](https://opentweet.io/x-api-pricing)
- [Ayrshare and Upload-Post pricing, Upload-Post](https://www.upload-post.com/ayrshare-pricing/)
- [Postiz README](https://cdn.jsdelivr.net/gh/gitroomhq/postiz-app@main/README.md)
- [Crossway ESV permissions](https://www.crossway.org/permissions/)
- [C.S. Lewis Foundation: rights FAQ](https://www.cslewis.org/aboutus/faq/faq-rights-use-lewis-works/)
- [Christianity Today: misattributed C.S. Lewis quotes](https://www.christianitytoday.com/2024/11/mere-christianity-misattribution-misquotable-fake-c-s-lewis-quotes)
- [Pexels terms of service](https://pexels.com/terms-of-service)
- [YouTube inauthentic content rules, Gulf News](https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660)
- [Meta unoriginal content crackdown, Search Engine Journal](https://www.searchenginejournal.com/meta-follows-youtube-in-crackdown-on-unoriginal-content/551096/)
