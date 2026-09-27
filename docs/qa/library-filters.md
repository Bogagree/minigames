# QA — library filters (RSS-QS-2-1-4)

- Branch: `feat/library-filters` @ `cba8cdd` (`fix: size the desktop library lead so its ink matches the frame`)
- Base URL: `http://127.0.0.1:5173/minigames/`
- Scope: Library title, category chips, sort control. Header, burger, and footer are out of scope unless this step broke them.
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) `fileKey` `hkWWcHFefT8fIxSmQvvXMb`. Course file not used.
- This run overwrites the report committed in `2da0b2f`. That report measured lead ink **330.8px** at `71163bc` and is stale after `cba8cdd`. A previous FAIL is not a PASS.

## Evidence this run

Figma MCP `get_design_context` on lead `2:629` returned the Starter rate limit. No further Figma MCP calls. No fills, strokes, or effects were read from any child.

`tmp/pixel-perfect/` has `README.md` and `diffs/` only. No reference PNG for the library frames (or `home-375.png` / `home-768.png` / `home-1920.png`). Diff rasters are not the draft.

No user Dev Mode paste. No cache with fills, strokes, and effects. Geometry figures in the frame column are the prior metadata cache of these node-ids (layout only: `x` / `width` / `height`). That cache was not re-fetched this run. It is not a color or effect PASS. `docs/specs/library-filters.md` and `tokens.scss` were not used as the expected paint column.

`rgba(0, 0, 0, 0)` is transparent.

Live ink is `Range.getBoundingClientRect()` on the text node (one line). The element box is `getBoundingClientRect()`.

## Paint table

Instance fill, stroke (weight + inside/outside + hex), and effect were not read for any child. Live computed values are recorded. Match is not PASS.

| Surface                         | node-id                                                                  | Family  | Fill   | Stroke (weight + inside/outside + hex) | Effect / shadow | Live computed                                                                                                                                                                 | Match                                                     |
| ------------------------------- | ------------------------------------------------------------------------ | ------- | ------ | -------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Title “Game Library”            | `2:628` (tablet `2:834`, mobile `2:1034`)                                | text    | unread | unread                                 | unread          | transparent; `rgb(36, 33, 69)`; shadow none; 700                                                                                                                              | BLOCKED                                                   |
| Lead                            | `2:629` (tablet `2:835`, mobile `2:1035`)                                | text    | unread | unread                                 | unread          | transparent; `rgb(95, 93, 117)`; 18px / 400 / line 22px at 1920; shadow none                                                                                                  | BLOCKED                                                   |
| Chip current (page “All Games”) | `2:632` (tablet `2:838`, mobile `2:1038`)                                | chip    | unread | unread                                 | unread          | `rgb(255, 208, 43)`; text `rgb(36, 33, 69)`; 700; radius 999; border 0; inset `1px rgb(255, 208, 43)`; shadow none                                                            | BLOCKED                                                   |
| Chip default (page “Puzzle”)    | `2:634` (siblings `2:636` `2:638` `2:640` `2:642` `2:644`)               | chip    | unread | unread                                 | unread          | transparent; text `rgb(95, 93, 117)`; 500; inset `1px rgb(210, 210, 210)`; shadow none                                                                                        | BLOCKED                                                   |
| Chip hover                      | guidebook states `2:1910` / `2:1915` / `2:1920` (labels not in geometry) | chip    | unread | unread                                 | unread          | Default (Puzzle, `aria-pressed=false`): `rgb(240, 238, 255)`, inset `1px rgb(210, 210, 210)`. Current (Puzzle after select): `rgb(229, 187, 0)`, inset `1px rgb(229, 187, 0)` | BLOCKED — instance fill not read, so live is not a match  |
| Sort trigger                    | `2:646` (tablet `2:853`, mobile `2:1052`)                                | sort    | unread | unread                                 | unread          | `rgb(255, 255, 255)`; `2px solid rgb(36, 33, 69)`; text `rgb(36, 33, 69)`; radius 12; shadow none. Hover `rgb(255, 249, 229)`                                                 | BLOCKED                                                   |
| Chevron                         | `2:648` / `2:855` / `2:1054` `chevron_right` 24×24                       | icon    | unread | unread                                 | unread          | no SVG in the trigger (`innerHTML` is the label text only)                                                                                                                    | BLOCKED — instance shows the icon; asset was not exported |
| Sort menu (open state)          | `2:1946`                                                                 | menu    | unread | unread                                 | unread          | white; `2px solid rgb(36, 33, 69)`; radius 12; shadow none; overflow hidden                                                                                                   | BLOCKED                                                   |
| Sort option default             | `2:1947` / `2:1956` / `2:1960`                                           | option  | unread | unread                                 | unread          | transparent; text `rgb(36, 33, 69)`; 500; `border-bottom` 1px `rgb(229, 231, 235)` (last item none); h 49; shadow none; no check SVG                                          | BLOCKED                                                   |
| Sort option current             | `2:1951`                                                                 | option  | unread | unread                                 | unread          | `rgb(255, 208, 43)`; 700; h 49; shadow none. Hover `rgb(229, 187, 0)`                                                                                                         | BLOCKED                                                   |
| Check on selected option        | `2:1952` `check` 14×14                                                   | icon    | unread | unread                                 | unread          | no SVG                                                                                                                                                                        | BLOCKED — instance shows the icon; asset was not exported |
| Menu divider                    | `2:1950` / `2:1955` / `2:1959`                                           | divider | unread | unread                                 | unread          | option `border-bottom` 1px `rgb(229, 231, 235)`                                                                                                                               | BLOCKED                                                   |

## Layout (live − library frame)

Frame sizes are the prior geometry cache, not a new Figma read. Header height is the previous chrome step (live header 66 / 79 / 91 vs frames 64 / 72 / 85). Filters are measured inside the filters block. Page `clientWidth` at 1920 is 1920 (no scrollbar). At 2000, `#app` is 1920 at x=40; intro and controls padding stay `40px 120px` / `16px 120px`.

| Breakpoint | Metric                  | Frame                                   | Live                                    | Δ        |
| ---------- | ----------------------- | --------------------------------------- | --------------------------------------- | -------- |
| 375        | title section `2:1033`  | 375×86, pad 16                          | 375×86, pad 16                          | 0        |
| 375        | title box `2:1034`      | x=16, 343×29                            | x=16, 343×29                            | 0        |
| 375        | lead box `2:1035`       | x=16, 343×17                            | x=16, 343×17 (ink 289.5×17)             | 0        |
| 375        | filter section `2:1036` | 375×119                                 | 375×119, pad 16, gap 16                 | 0        |
| 375        | chip track `2:1037`     | x=16, 343×31                            | x=16, 343×31, `flex-wrap: nowrap`       | 0        |
| 375        | sort `2:1052`           | x=16, y=63, 343×40                      | relative y=63, 343×40                   | 0        |
| 375        | content width           | 343 (375−32)                            | 343                                     | 0        |
| 375        | H-scroll                | none                                    | `scrollWidth` 375                       | 0        |
| 768        | title section `2:833`   | 768×119, pad 24 / 40                    | 768×119, pad 24px 40px                  | 0        |
| 768        | title / lead            | 688×44 / 688×19                         | 688×44 / 688×19 (lead ink 330.8×20)     | 0        |
| 768        | filter bar `2:836`      | 768×121                                 | 768×121, pad 16px 40px, gap 16          | 0        |
| 768        | chip track `2:837`      | x=40, 688×33, gap 8                     | x=40, 688×33, gap 8                     | 0        |
| 768        | sort `2:853`            | 182×40                                  | 182×40                                  | 0        |
| 768        | content width           | 688 (768−80)                            | 688                                     | 0        |
| 768        | H-scroll                | none                                    | `scrollWidth` 768                       | 0        |
| 1920       | title section `2:627`   | 1920×178, pad 40 / 120                  | 1920×178, pad 40px 120px                | 0        |
| 1920       | title glyphs `2:628`    | 367×68                                  | 366.4×68 (56px / 700)                   | −0.6     |
| 1920       | lead glyphs `2:629`     | 375×22                                  | 372.2×21 ink, line box 22 (18px / 400)  | **−2.8** |
| 1920       | filter bar `2:630`      | 1920×76                                 | 1920×76, pad 16px 120px                 | 0        |
| 1920       | chips y / sort          | chips y=21.5; sort x=1610, 190×44       | chips y=21.5; sort x=1610, 190×44       | 0        |
| 1920       | track                   | gutter 120, right edge 1800, track 1680 | gutter 120, sort right 1800, track 1680 | 0        |
| 1920       | chip gap                | 16 (`2:634` x=118, chip 102)            | 16                                      | 0        |
| 1920       | H-scroll                | none                                    | `scrollWidth` 1920                      | 0        |
| 520        | H-scroll                | none                                    | `scrollWidth` 520                       | 0        |
| 2000       | shell                   | centered, max 1920                      | `#app` 1920 @ x=40; gutter 120          | 0        |

Desktop lead `2:629` is the text node 375×22. Live ink width is 372.2 (Δ −2.8) and the line box is 22. The prior 330.8px ink at `71163bc` is not this build. The paragraph element itself is the 1680 content track wide; the comparison is the glyph range, not that stretched box. At 375 and 768 the lead **boxes** are 343×17 and 688×19 (Δ 0). Tablet glyph ink is 20px tall inside the 19px line box.

Chip boxes (height matches: 33 at 768/1920, 31 at 375). Width Δ per chip ≤ 3.3.

| Chip      | 375 frame | 375 live | 768/1920 frame | 1920 live |
| --------- | --------- | -------- | -------------- | --------- |
| All Games | 92        | 91.1     | 102            | 101       |
| Puzzle    | 72        | 70.4     | 78             | 76.8      |
| Card      | 61        | 59.5     | 65             | 64        |
| Match     | 70        | 67.9     | 76             | 73.9      |
| Farm      | 62        | 61.1     | 67             | 65.9      |
| Strategy  | 83        | 80.6     | 92             | 88.7      |
| Arcade    | 75        | 73.3     | 82             | 80.1      |

Hug width of the desktop chip row `2:631` is 658. Live union of the seven chips plus 16px gaps is 646.4 (Δ −11.6). The flex track itself is 1474 inside the 1680 content track, not 658.

Open menu was measured at 375: 343×200 (trigger width), options 49px tall. Guidebook menu `2:1946` is 200×199 with options 49px. Item height Δ 0. Menu height Δ +1. Width follows the mobile trigger (343), not the guidebook 200 artboard.

## Semantics and behavior

Opened from the header primary nav (`Library`), not the footer and not the History API. URL stayed `http://127.0.0.1:5173/minigames/`.

`section.library-filters`, visible `h1` “Game Library”, chips `role="group"` / `aria-label="Categories"`, each chip `button` with `aria-pressed`. Sort trigger `aria-haspopup="listbox"` / `aria-expanded` / `aria-controls`. Menu `role="listbox"`. Options `role="option"` / `aria-selected`.

| Check                | Result                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Start                | one `aria-pressed="true"` (All Games); label `Sort by: Rating ↓`                                                           |
| Click Puzzle         | pressed list is only Puzzle (6 others `false`); main text is still title, lead, chips, and sort                            |
| Drag chip row at 375 | `scrollLeft` 0 → 209; `flex-wrap: nowrap`; all chips one y; `scrollbar-width: none`; `clientWidth` 343 = `offsetWidth` 343 |
| Sort open            | `aria-expanded="true"`; four options; selected Rating ↓                                                                    |
| Choose Name A→Z      | label `Sort by: Name A→Z`; menu `hidden`; `aria-expanded="false"`; main still has no game cards                            |
| Cursor               | chips and sort `pointer`; chip track `grab`                                                                                |

## Assets

Sort frames include `chevron_right` 24×24 (`2:648`, `2:855`, `2:1054`, guidebook `2:1933`). The open menu includes `check` 14×14 (`2:1952`). Neither file is in `src/assets/`. Nothing was invented. Those children are BLOCKED. The label text matches the frame (`Sort by: Rating ↓` and the four method names). Missing the decorative icon is not, by itself, a FAIL.

## QA result

- Status: BLOCKED
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=2-611 (nodes: `library-desktop` `2:611`, `library-tablet` `2:820`, `library-mobile` `2:1023`; title `2:628`; lead `2:629`; chips `2:632`–`2:644`; sort `2:646` / `2:853` / `2:1052`; chevron `2:648` / `2:855` / `2:1054`; check `2:1952`; guidebook chips `2:1902`, sort `2:1923`, menu `2:1946`)
- Evidence: none of MCP-child / cache-with-paint / user-paste / user-export-png. Layout numbers are live this run against the prior geometry-only cache. Paint was not read (`get_design_context` on `2:629` hit the Starter rate limit; further Figma calls stopped).
- Paint evidence: missing for every in-scope child → not PASS
- Report: overwrote docs/qa/library-filters.md this run (not a reused PASS; prior FAIL at `71163bc` is stale)
- Breakpoints:
  - 375: BLOCKED — lead box 343×17 (Δ 0), section 86 and controls 119, track 343, sort 343×40, chip h 31; paint unread
  - 768: BLOCKED — lead box 688×19 (Δ 0), section 119, bar 121, track 688, sort 182×40; paint unread
  - 1920: BLOCKED — lead ink 372.2×21 vs `2:629` 375×22 (Δ −2.8 / −1), line box 22; track 1680, sort 190×44, title glyphs 366.4 vs 367; paint unread
- Blocking defects:
  - No fill, stroke (weight + inside/outside + hex), or effect on any painted child (MCP rate limit; no frame PNG; geometry cache only)
  - Chevron `2:648` / `2:855` / `2:1054` and check `2:1952` are on the instance and were not exported (BLOCKED, not a text-only FAIL)
- Non-blocking:
  - Desktop lead ink is 372.2 vs 375 (Δ −2.8). The 330.8px miss from `71163bc` is gone on `cba8cdd`
  - Desktop chip-row hug width 646.4 vs `2:631` 658 (Δ −11.6). Each chip Δ ≤ 3.3. Content track is 1680 at gutter 120
  - Current-chip hover live is `rgb(229, 187, 0)`; default-chip hover live is `rgb(240, 238, 255)`. Instance fills were not read, so this is not a color verdict
  - Header is taller than the library frames by the previous chrome step; filters’ own boxes match
  - At 2000 the shell stays 1920 wide and centered; gutters stay 120
