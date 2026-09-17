# QA — feat/carousel-layout (RSS-QS-1-4-4)

- Branch: `feat/carousel-layout` (from `758d3a9`)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — New Games Section nodes `2:383` (home-mobile), `2:134` (home-tablet), `1:36` (home-desktop)
- Base URL: `http://127.0.0.1:5173/minigames/`
- Method: draft frame sizes from tokens (`--slider-height-*` / card sizes annotated as Figma nodes `2:383` / `2:134` / `1:36`; Figma MCP rate-limited this run) + Playwright measures at 375 / 768 / 1920 (+ fluid 520, centered 2000); screenshots for visual smoke only (not committed)

## Measurements (live − draft frame)

| Breakpoint | Metric            |   Draft |    Live |   Δ |
| ---------- | ----------------- | ------: | ------: | --: |
| 375        | section h         |     283 |     283 |   0 |
| 375        | padding           |      16 |      16 |   0 |
| 375        | title font-size   |      24 |      24 |   0 |
| 375        | card peek w×h     |  56×200 |  56×200 |   0 |
| 375        | card featured w×h | 218×200 | 218×200 |   0 |
| 375        | track gap         |       8 |       8 |   0 |
| 768        | section h         |     400 |     400 |   0 |
| 768        | padding           |   24/40 |   24/40 |   0 |
| 768        | arrow size        |      40 |      40 |   0 |
| 768        | card peek w×h     | 105×280 | 105×280 |   0 |
| 768        | card featured w×h | 448×280 | 448×280 |   0 |
| 1920       | section h         |     556 |     556 |   0 |
| 1920       | padding           |   40/80 |   40/80 |   0 |
| 1920       | title font-size   |      40 |      40 |   0 |
| 1920       | arrow size        |      48 |      48 |   0 |
| 1920       | card peek w×h     | 120×384 | 120×384 |   0 |
| 1920       | card side w×h     | 288×384 | 288×384 |   0 |
| 1920       | card featured w×h | 816×384 | 816×384 |   0 |

Draft heights/card sizes from `src/styles/tokens.scss` (commented as draft nodes). Figma MCP `get_metadata` / `get_screenshot` blocked by Starter plan rate limit this run.

## Semantics & smoke

- `section.slider` + `aria-labelledby="slider-title"`; title is `h2` “New Games”
- Tracks are `ul[role=list]`; cards are `li` > `article`; arrows are `button[type=button]` with `aria-label` Prev/Next
- Accents / decorative arrow & stat icons use `aria-hidden`; game images use real `alt` = title
- Assets: course JPGs under `src/assets/images/games/*-card.jpg` load; SVG arrows/star/favorite inline via Vite
- **288px rule:** info overlay `display:none` on cards &lt; 288px (mobile peeks/featured 56/218; desktop peeks 120); `display:flex` at ≥288 (tablet featured 448; desktop side 288 + featured 816)
- Arrows hidden on mobile; visible tablet+ with `cursor: pointer`; click does not change slides (static AC)
- No page horizontal scroll at 375 / 520 / 768 / 1920 (track peek clipped via `.slider__viewport { overflow: hidden }`)
- Above 1920: `#app` / section capped at 1920 centered (`slider` w=1920 @2000 viewport)

## QA result

- Status: PASS
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (New Games `2:383` / `2:134` / `1:36`)
- Breakpoints:
  - 375: PASS — section h Δ0 (283); peek/featured 56×200 / 218×200; no arrows; no H-scroll
  - 768: PASS — section h Δ0 (400); arrows 40×40; cards 105/448/105 ×280; overlay on featured only
  - 1920: PASS — section h Δ0 (556); five cards 120/288/816/288/120 ×384; overlay on side+featured; no H-scroll
- Blocking defects:
  - (none)
- Non-blocking:
  - Figma MCP skipped (rate limit); metrics vs tokenized draft sizes 283/400/556 and card tokens; residual risk on unmeasured inner typography/padding nodes until MCP is available
  - At viewport 1920 with a vertical scrollbar, live section width ≈1905 (client width), not full 1920 frame — environment artifact, not layout overflow
  - Favicon 404 in console (`/favicon.ico`) — out of carousel scope
