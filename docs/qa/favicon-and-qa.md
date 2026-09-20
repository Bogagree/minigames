# QA — feat/favicon-and-qa (RSS-QS-1-6-1 + favicon)

- Branch: `feat/favicon-and-qa` (HEAD `44520ff` auth rebuild)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — `fileKey` `hkWWcHFefT8fIxSmQvvXMb`. Course Figma not used. Figma MCP **not called**.
- Base URL: `http://127.0.0.1:4174/minigames/` (Vite preview of current `dist`; assets **`index-ChI2nu0m.js`** / `index-B0sz6anh.css`)
- Live: Playwright MCP. Auth **must** be opened by click (no hash). PerfectPixel `capture_and_diff` failed (`designImagePath` `c:` protocol); fallback Playwright screenshots vs user PNGs (gitignored).
- Re-QA: **overwrote** this file this run. Prior `docs/qa/favicon-and-qa.md` **FAIL** (underline-tab dialog, 420×502, no Welcome Back / pills / Google / forgot / confirm) is **INVALID** against HEAD `44520ff`.

## User PNG map (1×)

| File                                          | Used as             | Pixels                              |
| --------------------------------------------- | ------------------- | ----------------------------------- |
| `tmp/pixel-perfect/home-mobile.png`           | Home **375**        | 375×2061                            |
| `tmp/pixel-perfect/home-tablet.png`           | Home **768**        | 768×2241                            |
| `tmp/pixel-perfect/home-desktop.png`          | Home **1920**       | 1920×2760                           |
| `tmp/pixel-perfect/home-mobile-nav-guest.png` | Burger open (guest) | 320×587 (crop, not 375)             |
| `tmp/pixel-perfect/Login Dialog.png`          | Auth login          | 428×631 (includes ~8px hard shadow) |
| `tmp/pixel-perfect/Register Dialog.png`       | Auth register       | 428×776 (includes ~8px hard shadow) |

Canonical `home-375.png` / `home-768.png` / `home-1920.png` absent; aliases above present → **not BLOCKED**.

## Why prior FAIL is invalid

That report measured the **old** underline “Login / Registration” dialog (no pills, no “Welcome Back”, no Google / OR, height **502**). This run opened Auth with Playwright **Log In** (header) and **Sign Up** (burger). Live chrome is pill tabs + Welcome Back / Create Account + Google + forgot + confirm password.

## Favicon

| Check                            | Result                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `public/favicon.png` SHA-256     | `5A72DFFDB626E6D3A8E89DF91F1080F67CAF5F5C5924DEEE641160E040939469` (3056 bytes) |
| `src/assets/icons/logo-mark.png` | **identical** hash and size                                                     |
| `index.html`                     | `<link rel="icon" type="image/png" href="./favicon.png" />`                     |
| Invented SVG                     | **no**                                                                          |

Asset check: **PASS**.

## Semantics (this run)

Landmarks: `header`, `nav`, `main#main-content`, `footer`; table `caption` + `th[scope=col]`. Auth: native `<dialog class="auth-dialog auth-dialog--open">`, `tablist` / `tab` / `tabpanel`. Burger open: `hidden` removed. `aria-modal` not set on dialog (non-blocking). Nu HTML Checker **not** re-posted this run.

## Layout vs user PNG / live boxes (Δ ≤ 10px)

Scrollbar: 1920 `innerWidth` **1920**, `clientWidth` **1905**, gutters **120**, track **1665** (1680 − 15). With body scroll lock (dialog open) client **1920**, CTA **958**. 768 client **753**. 375: `innerWidth` 375, `scrollWidth` 375, **no** `scrollWidth > innerWidth`. Fluid 520: no H-overflow. 2000: `#app` **1920** wide, x≈33, track **1680**, CTA **958×344**.

PNG auth width **428** vs live panel **420**: Δ −8 = hard shadow on the raster (allowed). Expected panel height ≈ PNG − ~8px shadow (login **~623**, register **~768**).

| BP               | Metric                            | PNG / draft                                      | Live                              | Δ                               |
| ---------------- | --------------------------------- | ------------------------------------------------ | --------------------------------- | ------------------------------- |
| 375              | header h (stroke y≈62–63)         | ~64                                              | 66                                | +2                              |
| 375              | header pad-x                      | 16                                               | 16                                | 0                               |
| 375              | hero h                            | 331                                              | 331                               | 0                               |
| 375              | leaderboard / CTA card / footer h | ~293 / 343×291 / ~524                            | 297 / 343×297 / 533               | +4 / +6 / +9                    |
| 375              | page h                            | 2061                                             | 2082                              | +21 (sum of ≤10 blocks)         |
| 768              | header h / pad                    | ~72 / 40                                         | 79 / 40                           | +7 / 0                          |
| 768              | hero h                            | 383                                              | 383                               | 0                               |
| 768              | footer h                          | 429                                              | 431                               | +2                              |
| 1920             | header h (stroke y≈83–84)         | ~85                                              | 91                                | +6                              |
| 1920             | header pad-x                      | 80                                               | 80                                | 0                               |
| 1920             | hero h                            | 627                                              | 627                               | 0                               |
| 1920             | section pad-x                     | 120                                              | 120                               | 0                               |
| 1920             | track / cards                     | 1680; 120/288/816/288/120 at 8/136/432/1256/1552 | 1665; **same** relative x         | −15 sb / 0                      |
| 1920             | CTA card                          | 958×344 @ x842                                   | 943×344 @ x842 (sb); 958 unlocked | −15 sb / 0                      |
| 1920             | footer h                          | 343                                              | 345                               | +2                              |
| Auth login       | panel                             | 428×631 PNG → ~420×623 chrome                    | **420×784**                       | width −8 OK; height **+161**    |
| Auth register    | panel                             | 428×776 PNG → ~420×768 chrome                    | **420×784**                       | width −8 OK; height **+16**     |
| Auth 375 Sign Up | panel                             | fluid (not 420)                                  | 343×738 (scrolls)                 | width OK for 375; not PNG frame |

Per-block **Home** Δ ≤ 10px (scrollbar-aware). Auth login height vs PNG is **FAIL**. Register height +16 vs ~768 is over the 10px budget. Login screenshot shows **empty cream** under the hint: dialog height follows the taller register panel in both modes.

## Paint table

Expected fill / stroke / effect sampled from **this run’s user PNG** + live `getComputedStyle`. Not guidebook «place», not same-PR `tokens.scss`. `rgba(0,0,0,0)` = transparent.

| Surface            | node-id                              | Family       | Fill (PNG sample)                                                   | Stroke (weight + inside/outside + hex)                              | Effect / shadow                                                    | Live computed                                                                                       | Match                                                                   |
| ------------------ | ------------------------------------ | ------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Header bar         | `1:14` / `2:116` / `2:368`           | header       | `#F9F8F3` (desktop 960,40; mobile 187,40)                           | ~2px **bottom** `#242145` (desktop y=83–84; mobile y=62–63)         | none on bar                                                        | bg `#F9F8F3`; `border-bottom` 2px `#242145`; shadow none                                            | **PASS**                                                                |
| Hero section       | `1:29` / `2:127` / `2:376`           | hero         | illustration (desktop 960,90 `#716576`); not a flat hex             | none                                                                | none                                                               | bg `#FFF9E5`; border 0; shadow none; `overflow: hidden`                                             | **PASS** (photo covers)                                                 |
| Slider card        | carousel (`1:36` subtree)            | carousel     | featured image; page cream outside                                  | PNG `#242145` ~2px (desktop 557,850)                                | live 4px 4px; card `overflow: hidden`                              | bg `#FFF9E5`; border **2px** `#242145`; radius 12; `box-shadow: 4px 4px 0 #242145`; overflow hidden | Fill/stroke **PASS**; visible-shadow **not PASS** (clipped on same box) |
| Table header row   | `2:17`                               | table header | `#3A2EBF` (140,1420) + white text                                   | none on `th`                                                        | none                                                               | `thead tr` / `th` `#3A2EBF`; color `#FFFFFF`; th border 0                                           | **PASS**                                                                |
| Table outer chrome | `2:16` / `.leaderboard__table-frame` | table        | white inside                                                        | PNG ~2px `#242145` (122,1395)                                       | live 4/4; PNG edge is stroke                                       | `#FFFFFF`; 2px `#242145`; radius 12; visible `4px 4px 0 #242145`; `overflow: visible`               | Fill/stroke **PASS**; effect visible                                    |
| Body odd (1st)     | `2:30`                               | zebra        | `#F9F8F3` (200,1480)                                                | none                                                                | none                                                               | row0 `#F9F8F3`; shadow none                                                                         | **PASS**                                                                |
| Body even (2nd)    | `2:46`                               | zebra        | `#FFFFFF` (200,1550)                                                | none                                                                | none                                                               | row1 transparent on white table                                                                     | **PASS**                                                                |
| Favorite chip      | `2:44`                               | chip         | row cream shows through (no solid chip fill)                        | raster mixed/AA                                                     | none                                                               | fill **transparent**; border **2px** `#D2D2D2`; radius 12; shadow none                              | **PASS** vs transparent-chip PNG                                        |
| Avatars 1–5        | random-1…5                           | avatar       | live `#E9EEF6` `#A3E2C9` `#BCE3FF` `#FFC6FF` `#E8DFF5`              | live 2px `#242145`                                                  | none                                                               | those fills; 2px `#242145`                                                                          | **PASS** vs live + prior paste; PNG disks not isolated                  |
| CTA card           | `10:2250`                            | cta-card     | `#FFFFFF` (900,2000)                                                | `#242145` at edge (850,1970)                                        | live Drop `0/14/30/−10` `#000` ~8%; PNG (900,2080) mixed `#878597` | `#FFFFFF`; 2px `#242145`; `rgba(0,0,0,0.08) 0 14px 30px -10px`; overflow visible                    | **PASS**                                                                |
| Footer             | `1:211`                              | footer       | `#1E1B3A` (960,2500; mobile 187,1537+)                              | none                                                                | none                                                               | `#1E1B3A`; border 0; shadow none                                                                    | **PASS**                                                                |
| Auth panel         | Login/Register PNG                   | dialog       | `#F9F8F3` (214,20); PNG left stroke then cream width **3** at mid-y | **3px** `#242145`; PNG right/bottom first opaque `#111111` (shadow) | PNG hard offset; live `8px 8px 0 #111`                             | 420×784; `#F9F8F3`; 3px `#242145`; radius 24; pad 32; `8px 8px 0 #111`; overflow visible            | Paint **PASS**; **geometry FAIL** (height)                              |
| Auth pill track    | Dialog PNG                           | tabs         | PNG white cluster y≈36–76 (login)                                   | none on track                                                       | none                                                               | tablist `#FFFFFF`; radius 999; h 60; active tab `#242145` / white text; inactive transparent        | **PASS** vs segmented PNG (not underline)                               |
| Auth submit        | Dialog PNG                           | primary      | `#FFD02B` (login mid y=404–448; register y=550–594)                 | PNG `#242145` under button                                          | live `0 4px #242145` + inset 2.5                                   | `#FFD02B`; 350×52; `0 4px #242145` + inset 2.5px                                                    | **PASS**                                                                |
| Auth Google        | Dialog PNG                           | google       | PNG white (login mid y≈504–544)                                     | dark outline on raster                                              | none                                                               | `#FFFFFF`; 2px `#242145`; 350×52; shadow none                                                       | **PASS**                                                                |
| Burger overlay     | `2:565`                              | burger       | PNG `#1E1B3A`; Sign Up `#FFD02B` (160,560)                          | panel live left 2px `#242145`                                       | none                                                               | 375×812; `#1E1B3A`; Sign Up yellow; guest Log In outline                                            | **PASS** vs guest PNG (320 crop)                                        |

Paint evidence for Home children: fill + stroke + effect from user PNG this run. Auth paint matches PNG; height does not.

## Smoke

- Favicon identical to logo-mark; `<link rel="icon">` present
- Header **Log In** → `<dialog open>`; title **Welcome Back!**; pill Login/Register; Forgot Password?; Continue with Google; OR; input icons; hint Register
- Tab **Register** → **Create Account**; Username + Email + Password + **Confirm Password**; Sign up with Google
- 375 burger Open menu fills viewport; guest Log In / Sign Up; **Sign Up** → Create Account (343×738, body scrolls)
- No horizontal overflow 375 / 520 / 768 / 1920
- Above 1920: `#app` max 1920 centered; tracks 1680
- No auth deep-link (click only)

## QA result

- Status: FAIL
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (nodes: header `1:14`/`2:116`/`2:368`; hero `1:29`/`2:127`/`2:376`; New Games `1:36`; Top Players `2:12`/`2:17`/`2:16`/`2:30`/`2:46`/`2:44`; CTA `10:2250`; footer `1:211`; burger `2:565`; auth Login/Register exports)
- Evidence: user-export-png (`tmp/pixel-perfect/home-mobile.png`, `home-tablet.png`, `home-desktop.png`, `home-mobile-nav-guest.png`, `Login Dialog.png`, `Register Dialog.png`)
- Paint evidence: Home children + auth panel/pills/submit/Google sampled from those rasters + live computed (see table)
- Report: overwrote docs/qa/favicon-and-qa.md this run (not a reused PASS / not the stale underline-tab FAIL)
- Breakpoints:
  - 375: PASS — per-block Δ≤10 vs PNG; no H-scroll; page h +21 (sum); burger guest chrome OK
  - 768: PASS — per-block Δ≤10; client 753 vs 768 sb
  - 1920: PASS — gutters 120; track 1665 (1680 − sb); cards 120/288/816/288/120
- Blocking defects:
  - Auth **login** vs `Login Dialog.png`: structure now matches (Welcome Back, pills, Google, forgot, icons). Chrome **420×784** vs expected **~420×623** (PNG 428×631 minus ~8px shadow). Height Δ **+161px** (empty cream below the login stack; dialog hug follows the register panel). Width −8 vs 428 is allowed (shadow on PNG).
  - Auth **register** vs `Register Dialog.png`: structure matches (Create Account, confirm password, Google). Chrome **420×784** vs **~420×768** (PNG 428×776 minus shadow). Height Δ **+16px** (>10).
- Non-blocking:
  - Prior FAIL (underline tabs / 502px / missing Google) invalid after `44520ff`
  - PerfectPixel MCP: `c:` path protocol error; used Playwright screenshots
  - Scrollbar: 1920/768 client −15 vs design frame; gutters unchanged
  - Header desktop pad 80 vs section track 120
  - Carousel card `overflow: hidden` clips `--shadow-card` on the same box
  - Burger export is **320×587**, live overlay **375×812**; guest chrome matches
  - 375 register dialog scrolls (`max-height`); PNG is a tall desktop export
  - Dialog has no `aria-modal`
  - Nu not re-run this pass
