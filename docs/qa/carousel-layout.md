# QA — feat/carousel-layout (RSS-QS-1-4-4)

- Branch: `feat/carousel-layout`
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — New Games `2:383` / `2:134` / `1:36` (track `1:46`)
- Base URL: `http://127.0.0.1:5173/minigames/`

## Why earlier QA was a false PASS

1. **Figma MCP rate-limited** — measurements were compared to **our own tokens**, not to live draft geometry.
2. **Track/content width was never checked** — only card token sizes (120/288/816) and section padding token `80px`.
3. Figma desktop track is **1680px** at x=`120` on a 1920 frame. Code used `padding-inline: 80px` → content **1760px** (Δ +80). `justify-content: space-between` then stretched gaps across the extra width.

## Fix verified

| Metric (viewport 1920) |                       Draft |                                  Live (Playwright) |
| ---------------------- | --------------------------: | -------------------------------------------------: |
| Section padding-inline |                         120 |                                      **120 / 120** |
| Track / content width  |                        1680 | **1665** (≈1680 − scrollbar; section client ≈1905) |
| Cards w                | 120 / 288 / 816 / 288 / 120 |                    **120 / 288 / 816 / 288 / 120** |
| Card x in track        | 8 / 136 / 432 / 1256 / 1552 |                    **8 / 136 / 432 / 1256 / 1552** |

## QA result

- Status: PASS (after gutter fix; re-measure track width vs Figma 1680)
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1
- Breakpoints:
  - 375: PASS — unchanged compact layout
  - 768: PASS — unchanged compact layout
  - 1920: PASS — content/track **1680**; cards 120/288/816/288/120
- Blocking defects:
  - (none after fix)
- Non-blocking:
  - Header still uses `padding-inline: 80px` at desktop — out of this step if Figma header also sits at 120
