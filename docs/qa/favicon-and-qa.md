# QA — feat/favicon-and-qa (RSS-QS-1-6-1 + favicon)

- Branch: `feat/favicon-and-qa` (this run; HEAD at report time + this file)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — `fileKey` `hkWWcHFefT8fIxSmQvvXMb`. Course Figma not used.
- Base URL: `http://127.0.0.1:4173/minigames/` (Vite **preview** of this branch’s `npm run build`; assets `index-BCA9mY6N.js` / `index-BiczOFgD.css`)
- Live: Playwright MCP, viewports **375 × 812**, **768 × 1024**, **1920 × 1080** (+ fluid 520, centered 2000)
- Re-QA: **overwrote** this file this run. There was no prior `docs/qa/favicon-and-qa.md`. Older `docs/qa/*.md` PASS files are **not** this run’s verdict.

## Why this run is not PASS

Figma MCP `get_metadata` / `get_design_context` / `get_screenshot` on child node-ids returned **Starter plan rate-limit** (402-class). No Dev Mode paste was supplied in this chat.

Geometry for layout Δ uses **repo cache** from prior MCP dumps recorded in earlier QA (absolute x/width/height). That cache is **layout only**.

Paint expected columns use **cache-with-paint / user-paste** only where a prior report recorded **fill + stroke + effect for that node-id**. Children without that triple are **BLOCKED**, so the run cannot be PASS.

Same-PR `tokens.scss` / specs are **not** the expected paint column.

## Favicon

| Check                            | Result                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `public/favicon.png` SHA-256     | `5A72DFFDB626E6D3A8E89DF91F1080F67CAF5F5C5924DEEE641160E040939469` (3056 bytes) |
| `src/assets/icons/logo-mark.png` | **identical hash and size**                                                     |
| `index.html` / dist              | `<link rel="icon" type="image/png" href="./favicon.png" />`                     |
| Preview                          | `GET /minigames/favicon.png` → 200, `image/png`, 3056 bytes                     |
| Invented SVG                     | **no**                                                                          |

Asset check: **PASS** (Figma brand mark copy, not a new drawing).

## Nu HTML Checker (AC)

Posted `'<!DOCTYPE html>\\n' + document.documentElement.outerHTML` to `https://validator.w3.org/nu/?out=json`. Playwright password-manager `wfd-id` attributes were stripped from a **clone** before POST (not present in app source).

| State                   | Errors | Warnings | Info |
| ----------------------- | -----: | -------: | ---: |
| Home (1920, default)    |      0 |        0 |    0 |
| Auth dialog open (1920) |      0 |        0 |    0 |
| Burger open (375)       |      0 |        0 |    0 |

Nu: **PASS** (no errors or warnings).

Landmarks: `header`, `main#main-content`, `footer`; sections with `h2`. Burger open: `hidden` removed, no `aria-hidden="false"`. Auth: native `<dialog open>`.

## `.slider__stat-label` (Reviewer non-blocking)

CSS: `position: absolute; width/height: 1px; overflow: hidden; clip: rect(0 0 0 0)`. Many labels have `offsetParent === null` (initial containing block). Featured-card labels parent to `div.slider__info` (`position: absolute`).

Live: every label `clip: rect(0px, 0px, 0px, 0px)`; box **0×0 or 1×1**; `labelVisibleCount = 0` at 375 / 768 / 1920. Text “Rating:” / “Likes:” does **not** paint on screen.

Not a FAIL. Residual: clip-based sr-only without a positioned ancestor on peek cards is brittle; still clipped.

## Layout vs draft geometry cache (live − Figma)

Scrollbar artifact: viewport 1920 → `documentElement.clientWidth` **1905**, `scrollWidth` **1905**, **no** `scrollWidth > innerWidth`. Gutters stay **120**. Track **1665** ≈ 1680 − 15. Same class of artifact at 768 (`client` 753) and 375 (`scrollWidth` 375 = `innerWidth`). Not a gutter FAIL.

Draft heights/pads/card sizes from prior MCP metadata (header / hero / carousel / leaderboard / CTA / footer QA).

| BP   | Metric                        |                                      Draft |                            Live | Δ                    |
| ---- | ----------------------------- | -----------------------------------------: | ------------------------------: | -------------------- |
| 375  | header h / pad                |                                    64 / 16 |                         66 / 16 | +2 / 0               |
| 375  | hero h                        |                                        331 |                             331 | 0                    |
| 375  | slider pad / content          |                                   16 / 343 |                        16 / 343 | 0                    |
| 375  | cards w                       |                                  peek/feat |                   56 / 218 / 56 | ≤10 (prior carousel) |
| 375  | leaderboard h / pad           |                                   293 / 16 |                        297 / 16 | +4 / 0               |
| 375  | game-dev h / CTA              |                              566 / 343×291 |                   572 / 343×297 | +6 / +6              |
| 375  | footer h                      |                                        524 |                             533 | +9                   |
| 375  | H-scroll                      |                                         no |                              no | —                    |
| 768  | header h / pad                |                                    72 / 40 |                         79 / 40 | +7 / 0               |
| 768  | hero h                        |                                        383 |                             383 | 0                    |
| 768  | slider pad / content          |                                         40 |                        40 / 673 | 0 (client 753)       |
| 768  | leaderboard h                 |                                        329 |                             333 | +4                   |
| 768  | game-dev h                    |                                        628 |                             629 | +1                   |
| 768  | footer h                      |                                        429 |                             431 | +2                   |
| 768  | H-scroll                      |                                         no |                              no | —                    |
| 1920 | header h / pad-x              |                                    85 / 80 |                         91 / 80 | +6 / 0               |
| 1920 | hero h                        |                                        627 |                             627 | 0                    |
| 1920 | slider / lb / gd / footer pad |                                        120 |                             120 | 0                    |
| 1920 | content/track (client 1905)   |                                       1680 |                            1665 | −15 scrollbar        |
| 1920 | cards w / x in track          | 120/288/816/288/120 at 8/136/432/1256/1552 |                        **same** | 0                    |
| 1920 | leaderboard h                 |                                        586 |                             590 | +4                   |
| 1920 | game-dev h / CTA              |                    562.79 / 958×344 @ x842 |            563 / 943×344 @ x842 | 0 / −15 sb           |
| 1920 | footer h / track              |                                 343 / 1680 |                      345 / 1665 | +2 / sb              |
| 1920 | H-scroll                      |                                         no |                              no | —                    |
| 520  | H-scroll                      |                                         no |          no (`scrollWidth` 505) | —                    |
| 2000 | `#app`                        |                              1920 centered | 1920 ×, x≈32.5; tracks **1680** | PASS                 |

All compared layout Δ ≤ 10px (scrollbar-aware). Header desktop inset **80** vs section track **120** matches prior header node cache (`1:14` pad 80), not a track FAIL.

## Paint table

Expected fill / stroke / effect from **that node-id’s cache or user-paste**, not guidebook «place» and not live tokens. Live = `getComputedStyle` at 1920 unless noted. `rgba(0,0,0,0)` = transparent.

| Surface                   | node-id                                                    | Family         | Fill                                                                                              | Stroke (weight + inside/outside + hex)                                                                                                                     | Effect / shadow (X/Y/blur/spread/color/opacity)               | Live computed                                                                                                                                                 | Match                                                                                                             |
| ------------------------- | ---------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Header bar                | `1:14` / `2:116` / `2:368`                                 | header         | **no fill+stroke+effect cache this run** (prior header QA geometry only)                          | MCP 402                                                                                                                                                    | MCP 402                                                       | bg `#F9F8F3`; `border-bottom` **2px solid `#242145`**; shadow none                                                                                            | **BLOCKED**                                                                                                       |
| Hero section              | `1:29` / `2:127` / `2:376`                                 | hero           | no paint cache                                                                                    | MCP 402                                                                                                                                                    | MCP 402                                                       | bg `#FFF9E5`; border 0; shadow none; `overflow: hidden`                                                                                                       | **BLOCKED**                                                                                                       |
| Slider card               | carousel card family (`1:36` subtree)                      | carousel       | no paint cache (carousel QA geometry only)                                                        | MCP 402 (guidebook 2.5 inside not used as expected)                                                                                                        | MCP 402                                                       | bg `#FFF9E5`; `borderWidth` **2px** `#242145`; radius 12; `box-shadow: rgb(36,33,69) 4px 4px 0 0`; **`overflow: hidden` on same box**                         | **BLOCKED** (no instance; clipped shadow not a visible-shadow PASS)                                               |
| Table header row / `th`   | `2:17`                                                     | table header   | `#3A2EBF` + text `#FFFFFF` (user-paste, leaderboard QA)                                           | none recorded                                                                                                                                              | none recorded                                                 | `thead tr` / `th` bg `#3A2EBF`; color `#FFFFFF`; th border 0; shadow none                                                                                     | **PASS** fill/text vs paste; stroke/effect none vs none                                                           |
| Table outer chrome        | `.leaderboard__table-frame` vs `2:16` / slider-card family | table          | `#FFFFFF` (paste)                                                                                 | paste `2:16`: **2px** `#242145` radius 12. Later decision wants slider-card **2.5 + `--shadow-card`** — **not** used as expected without this-run instance | paste had **no** effect row                                   | frame: bg `#FFFFFF`; border **2px** `#242145`; radius 12; **visible** `4px 4px 0 #242145` (`overflow: visible`); table itself `overflow: hidden`, shadow none | stroke/fill vs `2:16` paste **PASS**; effect **BLOCKED** (no `2:16` effect in cache; live has card offset shadow) |
| Body odd (1st)            | `2:30`                                                     | zebra          | cache mixed: old QA guidebook even `#E5E7EB` **forbidden**; Accepted decision cites odd `#F9F8F3` | none                                                                                                                                                       | none                                                          | row0 bg `#F9F8F3`; shadow none                                                                                                                                | **BLOCKED** (MCP; no fills/effects dump of `2:30` this run)                                                       |
| Body even (2nd)           | `2:46`                                                     | zebra          | same                                                                                              | none                                                                                                                                                       | none                                                          | row1 `transparent` on white table `#FFFFFF`; shadow none                                                                                                      | **BLOCKED**                                                                                                       |
| Favorite chip             | `2:44`                                                     | chip           | old QA used guidebook `#E5E7EB` (**forbidden**); later spec/decision: transparent                 | outline-variant `#D2D2D2`                                                                                                                                  | none                                                          | fill **transparent**; border **2px** `#D2D2D2`; radius 12; shadow none                                                                                        | **BLOCKED** (conflicting caches; MCP did not re-read `2:44`)                                                      |
| Avatars 1–5               | random-1…5 (paste)                                         | avatar         | `#E9EEF6` `#A3E2C9` `#BCE3FF` `#FFC6FF` `#E8DFF5`                                                 | 2px `#242145`                                                                                                                                              | none                                                          | exact those fills; 2px `#242145`; radius 999; shadow none                                                                                                     | **PASS** vs user-paste hexes                                                                                      |
| CTA card                  | `10:2250`                                                  | cta-card       | factory/skill instance example + prior CTA notes: `#FFFFFF`                                       | Inside **2**, `#242145`                                                                                                                                    | Drop `0 / 14 / 30 / −10`, `#000` 7.84%; `overflow` not hidden | bg `#FFFFFF`; border **2px** `#242145`; radius 12; `rgba(0,0,0,0.08) 0 14px 30px -10px`; overflow visible                                                     | **PASS** vs documented `10:2250` instance (not neighbor `--shadow-card`)                                          |
| Footer section            | `1:211`                                                    | footer         | `#1E1B3A` (user-paste)                                                                            | none                                                                                                                                                       | none                                                          | bg `#1E1B3A`; border 0; shadow none                                                                                                                           | **PASS**                                                                                                          |
| Auth panel (open)         | unresolved paste                                           | dialog         | `#F9F8F3`; Inside **3** `#242145`; shadow 8/8/0/0 `#111111`                                       | see fill col                                                                                                                                               | see fill col                                                  | 420×502; bg `#F9F8F3`; border **3px** `#242145`; `8px 8px 0 #111111`; overflow visible                                                                        | **PASS** vs auth user-paste                                                                                       |
| Auth submit               | unresolved paste                                           | primary submit | `#FFD02B`; Inside 2.5 via inset; drop 0/4 `#242145`                                               | inset 2.5                                                                                                                                                  | 0/4                                                           | bg `#FFD02B`; border 0; `0 4px #242145` + `inset 0 0 0 2.5px #242145`                                                                                         | **PASS**                                                                                                          |
| Burger overlay (375 open) | `2:565`                                                    | burger         | prior burger QA **geometry only**                                                                 | MCP 402                                                                                                                                                    | MCP 402                                                       | 375×812; bg `#1E1B3A`; panel border-left 2px `#242145`                                                                                                        | **BLOCKED**                                                                                                       |

Paint evidence: **incomplete** — several in-scope Home children lack fill+stroke+effect from **this** node-id this run.

## Smoke

- Favicon PNG served; identical to `logo-mark.png`
- Log In opens `<dialog>`; Escape closes
- Burger Open menu at 375 fills viewport; labels still clipped
- No horizontal overflow 375 / 520 / 768 / 1920
- Above 1920: `#app` `max-width: 1920` centered; tracks 1680

## QA result

- Status: BLOCKED
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (nodes: header `1:14`/`2:116`/`2:368`; hero `1:29`/`2:127`/`2:376`; New Games `1:36`/`2:134`/`2:383`; Top Players `2:12`/`2:189`/`2:421`; `2:17`/`2:16`/`2:30`/`2:46`/`2:44`; CTA `10:2250`/`10:2241`; footer `1:211`; burger `2:565`; auth paste unresolved)
- Evidence: cache-with-paint / user-paste for a subset; **MCP-child failed (rate-limit)** for this run
- Paint evidence: missing fill+stroke+effect on header, hero, carousel cards, table effect, zebra rows, chip, burger → **not PASS**
- Report: overwrote docs/qa/favicon-and-qa.md this run (not a reused PASS)
- Breakpoints:
  - 375: BLOCKED — layout Δ≤10 vs geometry cache; Nu clean; no H-scroll; paint incomplete
  - 768: BLOCKED — layout Δ≤10 vs geometry cache; no H-scroll; paint incomplete
  - 1920: BLOCKED — gutters 120; track 1665 (1680 − scrollbar); cards 120/288/816/288/120; paint incomplete
- Blocking defects:
  - Figma MCP Starter rate-limit: no child `get_design_context` / `get_screenshot` this run. Ask for Dev Mode paste or a download for remaining painted children (header, hero, carousel card, table effect, `2:30`/`2:46`, `2:44`, burger).
- Non-blocking:
  - `.slider__stat-label` is `position:absolute` without a positioned parent on peek cards; **clip still hides** text (not a visual leak)
  - Scrollbar: 1920 client ~1905 → track −15 vs 1680; gutters unchanged
  - Header desktop pad 80 vs content track 120 (header node cache is 80)
  - Carousel card `overflow: hidden` clips `--shadow-card` on the same box
  - Playwright injected `wfd-id` on inputs; stripped before Nu (not in source)
  - CTA illustration historically a stand-in SVG (out of favicon step unless re-exported)
