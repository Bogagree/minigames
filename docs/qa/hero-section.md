# QA — feat/hero-section (RSS-QS-1-4-3)

- Branch: `feat/hero-section` (`40e2e1f`+)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Hero Section nodes `2:376` (home-mobile), `2:127` (home-tablet), `1:29` (home-desktop)
- Base URL: `http://localhost:5173/minigames/`
- Method: cached draft metadata (section geometry; Figma MCP not called this run) + Playwright viewport measures at 375 / 768 / 1920 (+ fluid 520, centered 2000); screenshots for visual smoke only (not committed)

## Measurements (live − draft frame)

| Breakpoint | Metric           | Draft | Live |       Δ |
| ---------- | ---------------- | ----: | ---: | ------: |
| 375        | hero section h   |   331 |  328 |      −3 |
| 375        | content padding  |   n/a |   24 |       — |
| 375        | content gap      |   n/a |   16 |       — |
| 375        | title font-size  |   n/a |   24 |       — |
| 375        | button h         |   n/a |   41 |       — |
| 768        | hero section h   |   383 |  364 | **−19** |
| 768        | content padding  |   n/a |   32 |       — |
| 768        | content margin-x |   n/a |   40 |       — |
| 768        | title font-size  |   n/a |   32 |       — |
| 1920       | hero section h   |   627 |  604 | **−23** |
| 1920       | content padding  |   n/a |   40 |       — |
| 1920       | content margin-l |   n/a |   80 |       — |
| 1920       | content gap      |   n/a |   24 |       — |
| 1920       | title font-size  |   n/a |   40 |       — |
| 1920       | button h         |   n/a |   48 |       — |

Draft Hero frames in cached metadata are leaf nodes (no expanded children), so card width/padding/font targets could not be measured from Figma this run — section height is the hard pixel-check.

## Semantics & smoke

- `section.hero` + `aria-labelledby="hero-title"`; title is `h2`; CTA is `button[type=button]` “Browse Library”
- Real banner asset `hero-banner.jpg` (loaded; decorative `alt=""`, `aria-hidden`)
- Compact copy at ≤767; full copy from tablet-up
- CTA: `cursor: pointer`; hover/active → primary-high; click does not navigate or open dialogs (no action — per AC)
- No horizontal scroll at 375 / 520 / 768 / 1920
- Above 1920: `#app` centered (`max-width: 1920`); hero stays within centered shell

## QA result

- Status: FAIL
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (Hero `2:376` / `2:127` / `1:29`)
- Breakpoints:
  - 375: PASS — section h Δ−3; card + banner present; no H-scroll; compact text; CTA styled
  - 768: FAIL — section h Δ−19 (>10px vs draft 383); otherwise card left-aligned, full text, no H-scroll
  - 1920: FAIL — section h Δ−23 (>10px vs draft 627); card left (`margin-inline-start: 80`); banner fills; no H-scroll
- Blocking defects:
  - Hero section height short vs working draft at **768** (live 364 / draft 383, Δ−19) and **1920** (live 604 / draft 627, Δ−23)
- Non-blocking:
  - Figma MCP skipped (Starter rate limit); heights from cached draft metadata; residual risk on inner card pixel Δ until deeper node geometry is available
  - Banner export ~3840×1254 / large file size (reviewer note); not a layout blocker for this criterion
  - Header height already taller than draft (~+2…+6), so absolute Y of hero differs slightly; section-height Δ above is independent of that
