# QA — feat/favicon-and-qa (RSS-QS-1-6-1 + favicon)

- Branch: `feat/favicon-and-qa` (this run)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — `fileKey` `hkWWcHFefT8fIxSmQvvXMb`. Course Figma not used. Figma MCP **not called** (rate-limit).
- Base URL: `http://127.0.0.1:4173/minigames/` (Vite preview of `npm run build`; assets `index-BCA9mY6N.js` / `index-BiczOFgD.css`)
- Live: Playwright MCP. PerfectPixel `capture_and_diff` **did not capture** (Playwright Chromium 1243 missing; `npx playwright install chromium` timed out). Fallback: full-page Playwright PNGs vs user exports (same folder, gitignored).
- Re-QA: **overwrote** this file this run. Prior `docs/qa/favicon-and-qa.md` was **BLOCKED** (MCP-only paint). Invalid now: user PNG rasters exist and were compared.

## User PNG map (1×, dpi ~72)

| File                                          | Used as             | Pixels                       |
| --------------------------------------------- | ------------------- | ---------------------------- |
| `tmp/pixel-perfect/home-mobile.png`           | Home **375**        | 375×2061                     |
| `tmp/pixel-perfect/home-tablet.png`           | Home **768**        | 768×2241                     |
| `tmp/pixel-perfect/home-desktop.png`          | Home **1920**       | 1920×2760                    |
| `tmp/pixel-perfect/home-mobile-nav-guest.png` | Burger open (guest) | 320×587 (crop, not 375)      |
| `tmp/pixel-perfect/Sidebar Content.png`       | Burger logged-in    | 320×587 (out of guest smoke) |
| `tmp/pixel-perfect/Login Dialog.png`          | Auth login          | 428×631                      |
| `tmp/pixel-perfect/Register Dialog.png`       | Auth register       | 428×776                      |

Canonical names `home-375.png` / `home-768.png` / `home-1920.png` are **absent**; the three Home rasters above are present → **not BLOCKED** for missing `home-375.png`.

## Favicon

| Check                            | Result                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `public/favicon.png` SHA-256     | `5A72DFFDB626E6D3A8E89DF91F1080F67CAF5F5C5924DEEE641160E040939469` (3056 bytes) |
| `src/assets/icons/logo-mark.png` | **identical hash and size**                                                     |
| `index.html`                     | `<link rel="icon" type="image/png" href="./favicon.png" />`                     |
| Invented SVG                     | **no**                                                                          |

Asset check: **PASS**.

## Nu HTML Checker

Not re-posted this run (time). Prior run 0 errors / 0 warnings is **not** reused as this-run PASS. Landmarks live: `header`, `nav`, `main#main-content`, `footer`; table `caption` + `th[scope=col]`. Burger open: `hidden` removed, no `aria-hidden="false"`. Auth: native `<dialog open>`.

## Pixel similarity (Playwright raster − user PNG)

Sampled RGB (step 2–4, channel-sum tolerance 30). **Not** PerfectPixel MCP. Scrollbar makes live 768/1920 **narrower** than the design frame (753 vs 768, 1905 vs 1920), so a global % is contaminated by a −15px horizontal shift plus header-height shift (~+6 desktop).

| Pair          | Live      | Design    | Similarity        |
| ------------- | --------- | --------- | ----------------- |
| Home 375      | 375×2082  | 375×2061  | **~70.8%**        |
| Home 768      | 753×2255  | 768×2241  | **~68.7%**        |
| Home 1920     | 1905×2772 | 1920×2760 | **~77.3%**        |
| Auth login    | 420×502   | 428×631   | **~68.7%**        |
| Auth register | 420×502   | 428×776   | **~75.8%**        |
| Burger guest  | 375×812   | 320×587   | **~91.2%** (crop) |

Auth mismatch is **structural** (not only shift): see blocking defects.

## Layout vs user PNG / live boxes (Δ ≤ 10px course)

Scrollbar: 1920 `clientWidth` **1905**, gutters **120**, track **1665** (1680 − 15). 768 client **753**. 375: `inner` 375, `scrollWidth` 375, **no** `scrollWidth > innerWidth`. Fluid 520: no H-overflow. 2000: `#app` **1920** wide, x≈33, track **1680**.

| BP            | Metric                        | PNG / draft                                      | Live                      | Δ                       |
| ------------- | ----------------------------- | ------------------------------------------------ | ------------------------- | ----------------------- |
| 375           | header h (PNG stroke y≈62–63) | ~64                                              | 66                        | +2                      |
| 375           | header pad-x                  | 16                                               | 16                        | 0                       |
| 375           | hero h                        | 331                                              | 331                       | 0                       |
| 375           | leaderboard / CTA / footer h  | 293 / 343×291 / 524                              | 297 / 343×297 / 533       | +4 / +6 / +9            |
| 375           | page h                        | 2061                                             | 2082                      | +21 (sum of ≤10 blocks) |
| 768           | header h / pad                | 72 / 40                                          | 79 / 40                   | +7 / 0                  |
| 768           | hero h                        | 383                                              | 383                       | 0                       |
| 768           | footer h                      | 429                                              | 431                       | +2                      |
| 1920          | header h (PNG stroke y≈83–84) | ~85                                              | 91                        | +6                      |
| 1920          | header pad-x                  | 80                                               | 80                        | 0                       |
| 1920          | hero h                        | 627                                              | 627                       | 0                       |
| 1920          | section pad-x                 | 120                                              | 120                       | 0                       |
| 1920          | track / cards                 | 1680; 120/288/816/288/120 at 8/136/432/1256/1552 | 1665; **same** relative x | −15 sb / 0              |
| 1920          | CTA                           | 958×344 @ x842                                   | 943×344 @ x842            | −15 sb / 0              |
| 1920          | footer h                      | 343                                              | 345                       | +2                      |
| Auth login    | panel                         | 428×631 PNG                                      | **420×502**               | −8 / **−129**           |
| Auth register | panel                         | 428×776 PNG                                      | **420×502**               | −8 / **−274**           |

Per-block Home Δ ≤ 10px (scrollbar-aware). Auth height vs PNG is **FAIL**.

## Paint table

Expected fill / stroke / effect sampled from **this run’s user PNG** (and live `getComputedStyle`). Not guidebook «place», not same-PR `tokens.scss`. `rgba(0,0,0,0)` = transparent.

| Surface            | node-id                              | Family       | Fill                                                                                                         | Stroke (weight + inside/outside + hex)                                          | Effect / shadow                                                    | Live computed                                                                                       | Match                                                                          |
| ------------------ | ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Header bar         | `1:14` / `2:116` / `2:368`           | header       | PNG `#F9F8F3` (40,40 / 960,40)                                                                               | PNG ~2px **bottom** `#242145` (desktop y=83–84; mobile y=62–63); no side stroke | none on bar                                                        | bg `#F9F8F3`; `border-bottom` 2px `#242145`; shadow none                                            | **PASS** vs PNG                                                                |
| Hero section       | `1:29` / `2:127` / `2:376`           | hero         | PNG below header is **illustration** (960,90 `#706576`); not a flat hex                                      | none                                                                            | none                                                               | bg `#FFF9E5`; border 0; shadow none; `overflow: hidden`                                             | **PASS** (photo covers; no extra stroke/shadow)                                |
| Slider card        | carousel (`1:36` subtree)            | carousel     | PNG featured left: image; page cream `#F9F8F3` outside                                                       | PNG `#242145` ~2px (x=557–558 at y=850)                                         | offset dark (live has 4px 4px); card `overflow: hidden`            | bg `#FFF9E5`; border **2px** `#242145`; radius 12; `box-shadow: 4px 4px 0 #242145`; overflow hidden | Fill/stroke **PASS** vs PNG; visible-shadow **not PASS** (clipped on same box) |
| Table header row   | `2:17`                               | table header | PNG `#3A2EBF` (140,1420) + white text                                                                        | none on `th`                                                                    | none                                                               | `thead tr` `#3A2EBF`; color `#FFFFFF`; th border 0                                                  | **PASS**                                                                       |
| Table outer chrome | `2:16` / `.leaderboard__table-frame` | table        | PNG white inside frame                                                                                       | PNG ~2px `#242145` (x=122–123 at y=1395)                                        | live offset 4/4; PNG left edge is stroke not a measured drop       | frame: `#FFFFFF`; 2px `#242145`; radius 12; visible `4px 4px 0 #242145`; `overflow: visible`        | Fill/stroke **PASS**; effect present live (not clipped)                        |
| Body odd (1st)     | `2:30`                               | zebra        | PNG `#F9F8F3` (200,1480)                                                                                     | none                                                                            | none                                                               | row0 `#F9F8F3`; shadow none                                                                         | **PASS**                                                                       |
| Body even (2nd)    | `2:46`                               | zebra        | PNG `#FFFFFF` (200,1550)                                                                                     | none                                                                            | none                                                               | row1 transparent on white table                                                                     | **PASS**                                                                       |
| Favorite chip      | `2:44`                               | chip         | PNG row shows `#F9F8F3` through chip (no solid chip fill)                                                    | raster mixed/AA; not a clean 2.0 sample                                         | none                                                               | fill **transparent**; border **2px** `#D2D2D2`; radius 12; shadow none                              | Fill **PASS**; stroke **PASS** vs transparent-chip PNG (live outline-variant)  |
| Avatars 1–5        | random-1…5                           | avatar       | live `#E9EEF6` `#A3E2C9` `#BCE3FF` `#FFC6FF` `#E8DFF5` (PNG sample at live coords hit rank/streak, not disk) | live 2px `#242145`                                                              | none                                                               | those fills; 2px `#242145`; radius 999                                                              | **PASS** vs live + prior paste; PNG disks not isolated this sample             |
| CTA card           | `10:2250`                            | cta-card     | PNG `#FFFFFF` (900,2000)                                                                                     | PNG `#242145` at card edge (850,1970)                                           | live Drop `0/14/30/−10` `#000` ~8%; PNG (900,2080) mixed `#878597` | `#FFFFFF`; 2px `#242145`; `rgba(0,0,0,0.08) 0 14px 30px -10px`; overflow visible                    | **PASS** vs PNG fill/stroke + visible shadow                                   |
| Footer             | `1:211`                              | footer       | PNG `#1E1B3A` (960,2500)                                                                                     | none                                                                            | none                                                               | `#1E1B3A`; border 0; shadow none                                                                    | **PASS**                                                                       |
| Auth panel         | Dialog PNG                           | dialog       | PNG `#F9F8F3`; live same                                                                                     | PNG edge `#242145` (x=1); live **3px** `#242145`                                | PNG export has hard offset; live `8px 8px 0 #111`                  | 420×502; `#F9F8F3`; 3px `#242145`; `8px 8px 0 #111`                                                 | Paint **PASS**; **geometry/chrome FAIL** vs PNG                                |
| Auth submit        | Dialog PNG                           | primary      | PNG `#FFD02B` (login y=410)                                                                                  | PNG `#242145` under button (y=430)                                              | live `0 4px #242145` + inset 2.5                                   | `#FFD02B`; `0 4px #242145` + inset 2.5px                                                            | **PASS** paint                                                                 |
| Burger overlay     | `2:565`                              | burger       | PNG `#1E1B3A`; Sign Up `#FFD02B`                                                                             | panel live left 2px `#242145`                                                   | none                                                               | 375×812; `#1E1B3A`; Sign Up yellow                                                                  | **PASS** vs guest PNG (320 crop)                                               |

Paint evidence for Home painted children: fill + stroke + effect from **user PNG** this run (avatars: live + incomplete PNG hit). Auth **chrome** vs PNG is a layout FAIL, not missing evidence.

## Smoke

- Favicon identical to logo-mark
- Log In opens `<dialog>`; Register tab switches panel
- Burger Open menu at 375 fills viewport; guest Log In / Sign Up; `hidden` off
- No horizontal overflow 375 / 520 / 768 / 1920
- Above 1920: `#app` max 1920 centered; tracks 1680
- No auth deep-link (`openAuthDialog` only); PerfectPixel cannot screenshot dialog-at-URL

## QA result

- Status: FAIL
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (nodes: header `1:14`/`2:116`/`2:368`; hero `1:29`/`2:127`/`2:376`; New Games `1:36`; Top Players `2:12`/`2:17`/`2:16`/`2:30`/`2:46`/`2:44`; CTA `10:2250`; footer `1:211`; burger `2:565`; auth Login/Register exports)
- Evidence: user-export-png (`tmp/pixel-perfect/home-mobile.png`, `home-tablet.png`, `home-desktop.png`, `home-mobile-nav-guest.png`, `Login Dialog.png`, `Register Dialog.png`)
- Paint evidence: Home children sampled from those rasters + live computed (see table)
- Report: overwrote docs/qa/favicon-and-qa.md this run (not a reused PASS)
- Breakpoints:
  - 375: PASS — per-block Δ≤10 vs PNG; no H-scroll; page h +21 (sum); similarity ~70.8% (shift/AA)
  - 768: PASS — per-block Δ≤10; client 753 vs 768 sb; similarity ~68.7%
  - 1920: PASS — gutters 120; track 1665 (1680 − sb); cards 120/288/816/288/120; similarity ~77.3%
- Blocking defects:
  - Auth **login** vs `Login Dialog.png`: live underline tabs, no segmented Login/Register pills, no “Welcome Back”, no input icons, no Forgot Password, no Google / OR row; size 420×502 vs 428×631 (height Δ **129px**). PerfectPixel URL-only cannot open dialog (no hash/query).
  - Auth **register** vs `Register Dialog.png`: no confirm-password, no Google; copy “Registration” / “Sign Up” vs “Create Account”; height 502 vs 776 (Δ **274px**).
- Non-blocking:
  - PerfectPixel MCP: Chromium binary missing (install timeout); used Playwright screenshots
  - Scrollbar: 1920/768 client −15 vs design frame; gutters unchanged
  - Header desktop pad 80 vs section track 120
  - Carousel card `overflow: hidden` clips `--shadow-card` on the same box
  - Burger export is **320×587**, live overlay **375×812** (full viewport); guest chrome matches (~91% on overlap)
  - `Sidebar Content.png` is Log Out (logged-in); not exercised
  - `.slider__stat-label` remains clip sr-only
  - Nu not re-run this pass
