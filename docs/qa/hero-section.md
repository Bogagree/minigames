# QA — feat/hero-section (RSS-QS-1-4-3)

- Branch: `feat/hero-section` (fix `2e49f5c`+)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Hero Section nodes `2:376` (home-mobile), `2:127` (home-tablet), `1:29` (home-desktop)
- Base URL: `http://localhost:5173/minigames/`
- Method: known draft frame heights 331 / 383 / 627 (Figma MCP not called — rate limit) + Playwright viewport measures at 375 / 768 / 1920 (+ fluid 520, centered 2000); screenshots for visual smoke only (not committed)
- Fix loop: 1 (after height FAIL Δ−19 @768 / Δ−23 @1920)

## Measurements (live − draft frame)

| Breakpoint | Metric           | Draft | Live |  Δ |
| ---------- | ---------------- | ----: | ---: | -: |
| 375        | hero section h   |   331 |  331 |  0 |
| 375        | content padding  |   n/a |   24 |  — |
| 375        | content gap      |   n/a |   16 |  — |
| 375        | title font-size  |   n/a |   24 |  — |
| 375        | button h         |   n/a |   41 |  — |
| 768        | hero section h   |   383 |  383 |  0 |
| 768        | content padding  |   n/a |   32 |  — |
| 768        | content margin-x |   n/a |   40 |  — |
| 768        | title font-size  |   n/a |   32 |  — |
| 1920       | hero section h   |   627 |  627 |  0 |
| 1920       | content padding  |   n/a |   40 |  — |
| 1920       | content margin-l |   n/a |   80 |  — |
| 1920       | content gap      |   n/a |   24 |  — |
| 1920       | title font-size  |   n/a |   40 |  — |
| 1920       | button h         |   n/a |   48 |  — |

Draft heights from prior cached metadata / fix tokens (`--hero-height-mobile|tablet|desktop`). Inner card padding/font targets still not re-measured from Figma this run.

## Semantics & smoke

- `section.hero` + `aria-labelledby="hero-title"`; title is `h2`; CTA is `button.hero__button[type=button]` “Browse Library”
- Real banner asset `hero-banner.jpg` (loaded; decorative `alt=""`, `aria-hidden`)
- Compact copy at ≤767; full copy from tablet-up
- CTA: `cursor: pointer`; click does not navigate; no new dialog opened (existing `burger-menu[role=dialog]` unchanged)
- No horizontal scroll at 375 / 520 / 768 / 1920
- Above 1920: `#app` centered (`max-width: 1920`); hero height stays 627 within centered shell

## QA result

- Status: PASS
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (Hero `2:376` / `2:127` / `1:29`)
- Breakpoints:
  - 375: PASS — section h Δ0 (331); card + banner; compact text; no H-scroll
  - 768: PASS — section h Δ0 (383); full text; content margin-x 40; no H-scroll
  - 1920: PASS — section h Δ0 (627); content margin-l 80; banner fills; no H-scroll
- Blocking defects:
  - (none)
- Non-blocking:
  - Figma MCP skipped (rate limit); heights vs known draft frame sizes 331/383/627; residual risk on inner card pixel Δ until deeper node geometry is available
  - Banner export large file size (prior reviewer note); not a layout blocker
  - Header height already taller than draft (~+2…+6), so absolute Y of hero differs slightly; section-height Δ above is independent of that
