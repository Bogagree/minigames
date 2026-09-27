# QA — library filters (RSS-QS-2-1-4)

- Branch: `feat/library-filters` @ `a2222f0` (`fix: show the exported check on the selected sort option`), which includes `cba8cdd` (desktop lead size)
- Base URL: `http://127.0.0.1:5173/minigames/`
- Scope: Library title, lead, category chips, sort trigger, selected-option check. Game cards, pagination, and Game Details are the next plan steps. The reference frames show them. Their absence on the live page is not a defect for this step.
- Opened from the header primary nav (`a.header__nav-link` “Library”). URL stayed `http://127.0.0.1:5173/minigames/`.

This file replaces the report that said paint was unread and `check.svg` was not exported. That verdict is stale after the user frame exports and `a2222f0`. It is not reused.

## Evidence this run

No Figma MCP calls. Expected fill, stroke, and effect are pixel samples of the user exports:

- `tmp/pixel-perfect/library-375.png` (375×3315)
- `tmp/pixel-perfect/library-768.png` (768×1893)
- `tmp/pixel-perfect/library-1920.png` (1920×1450)

Page background in all three rasters is `#F9F8F3` `rgb(249, 248, 243)`. Pixels outside a control that match that color are recorded as effect **none** (no halo). `rgba(0, 0, 0, 0)` is transparent. Live ink width is `Range.getBoundingClientRect()` on the text node. Live page background is `rgb(249, 248, 243)`.

Samples (equator of the control, solid pixels, not anti-aliased corners):

| Sample              | Raster pixel                                                                      | Color                                               |
| ------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------- |
| Current chip fill   | 375 `(30, 172)`; 1920 `(122, 300)`                                                | `#FFD02B`                                           |
| Current chip stroke | 375 `(16–17, 181)` and `(166–167, 30)`; 768 `(40–41, 223)`; 1920 `(120–121, 300)` | `#242145` ×2, then fill. Pixel outside is `#F9F8F3` |
| Default chip fill   | 375 `(140, 170)`; 1920 `(250, 290)`                                               | `#FFFFFF`                                           |
| Default chip stroke | 375 `(116–117, 181)`; 1920 `(238, 300)`                                           | `#242145` ×2                                        |
| Default chip glyphs | 375 `(133, 181)`, `(145, 181)`                                                    | `#242145`                                           |
| Title glyphs        | 375 `(18, 94)`                                                                    | `#242145` on `#F9F8F3`                              |
| Lead glyphs         | 375 `(43, 125)`; 1920 `(122, 212)`                                                | `#5F5D75`                                           |
| Sort fill / stroke  | 375 `(18, 232)` / `(16–17, 232)`; 1920 `(1612, 300)` / `(1610–1611, 300)`         | `#FFFFFF` / `#242145` ×2. Outside `#F9F8F3`         |

The closed frames do not show the open menu. The check is compared to `src/assets/icons/check.svg`, not to a drawing invented for this run.

## Paint table

Stroke “inside” means the 2px ring is the outer pixels of the painted box and the next pixel outside is the page background.

| Surface                    | node-id                                   | Family | Fill                         | Stroke (weight + inside/outside + hex) | Effect / shadow | Live computed                                                                                          | Match                                                     |
| -------------------------- | ----------------------------------------- | ------ | ---------------------------- | -------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Title “Game Library”       | `2:628` (tablet `2:834`, mobile `2:1034`) | text   | transparent (page `#F9F8F3`) | none                                   | none            | transparent; `rgb(36, 33, 69)`; border 0; shadow none                                                  | PASS                                                      |
| Lead                       | `2:629` (tablet `2:835`, mobile `2:1035`) | text   | transparent (page `#F9F8F3`) | none                                   | none            | transparent; `rgb(95, 93, 117)`; border 0; shadow none                                                 | PASS                                                      |
| Chip current (“All Games”) | `2:632`                                   | chip   | `#FFD02B`                    | 2px inside `#242145`                   | none            | `rgb(255, 208, 43)`; text `rgb(36, 33, 69)`; border 0; inset `1px rgb(255, 208, 43)`; shadow none      | FAIL — stroke is 1px of the fill color, not 2px `#242145` |
| Chip default (“Puzzle”)    | `2:634`                                   | chip   | `#FFFFFF`                    | 2px inside `#242145`; glyphs `#242145` | none            | transparent (shows page `rgb(249, 248, 243)`); text `rgb(95, 93, 117)`; inset `1px rgb(210, 210, 210)` | FAIL — fill, stroke weight, stroke color, and label color |
| Sort trigger               | `2:646` (tablet `2:853`, mobile `2:1052`) | sort   | `#FFFFFF`                    | 2px inside `#242145`                   | none            | `rgb(255, 255, 255)`; `2px solid rgb(36, 33, 69)`; text `rgb(36, 33, 69)`; radius 12; shadow none      | PASS                                                      |
| Check on selected option   | `2:1952` (not in the closed frames)       | icon   | none                         | file stroke 3 `#3A2EBF`, 14×14         | none            | same path and `#3A2EBF` as `src/assets/icons/check.svg`; 14×14; visible only on the selected option    | PASS — compared to the SVG file                           |

## Layout (live − raster)

Filters measured inside the filters block. Page `clientWidth` equals the viewport at 375, 768, and 1920 (`scrollWidth` equals that width).

| Breakpoint | Metric                   | Frame raster                                   | Live                                               | Δ          |
| ---------- | ------------------------ | ---------------------------------------------- | -------------------------------------------------- | ---------- |
| 375        | section padding / track  | pad 16, track 343                              | pad 16, track 343                                  | 0          |
| 375        | chip row                 | y band 166–196, h 31, gap 8, visible width 343 | h 31, gap 8, width 343, `nowrap`                   | 0          |
| 375        | sort                     | 343×40                                         | 343×40                                             | 0          |
| 375        | lead ink                 | x 17–306, w 290, tight h 12, `#5F5D75`         | w 289.5, line box h 17                             | width −0.5 |
| 375        | chip widths              | 92 / 72 / 61 / 70                              | 91.1 / 70.4 / 59.5 / 67.9                          | ≤ 2.1      |
| 768        | section padding / track  | pad 40, track 688                              | `24px 40px` intro, controls `16px 40px`, track 688 | 0          |
| 768        | chip row                 | h 33, gap 8, union x 40–649 = 610              | h 33, gap 8, union 598.4                           | **−11.6**  |
| 768        | sort                     | 182×40                                         | 182×40                                             | 0          |
| 768        | lead ink                 | w 331, tight h 14                              | w 330.8, line box h 20                             | width −0.2 |
| 1920       | gutter / track           | x 120–1799, track 1680                         | gutter 120, sort right 1800, track 1680            | 0          |
| 1920       | intro / controls padding | content inset 120                              | intro `40px 120px`, controls `16px 120px`          | 0          |
| 1920       | chip row                 | h 33, gap 16, union x 120–777 = 658            | h 33, gap 16, union 646.4                          | **−11.6**  |
| 1920       | sort                     | x 1610, 190×44                                 | x 1610, 190×44                                     | 0          |
| 1920       | lead ink                 | w 373 (x 121–493)                              | w 372.2, line box h 22                             | width −0.8 |
| 1920       | title ink width          | w 364                                          | w 366.4                                            | +2.4       |

Chip widths at 768 and 1920 (raster / live): All Games 102 / 101, Puzzle 78 / 76.8, Card 65 / 64, Match 76 / 73.9, Farm 67 / 65.9, Strategy 92 / 88.7, Arcade 82 / 80.1. Each chip Δ ≤ 3.3. The union of the seven pills plus gaps is the chip-row width, and that sum is −11.6.

## Semantics and behavior

`section.library-filters` labelled by the visible `h1`. Chips are `role="group"` / `aria-label="Categories"`, each a `button` with `aria-pressed`. Sort trigger `aria-haspopup="listbox"`. Menu `role="listbox"`. Options `role="option"` / `aria-selected`.

| Check           | Result                                                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Start           | one `aria-pressed="true"` (All Games); label `Sort by: Rating ↓`                                                                              |
| Click Puzzle    | only Puzzle is `aria-pressed="true"`; main text is still title, lead, chips, and sort                                                         |
| Chip row at 375 | `scrollLeft` 0 → 180; `flex-wrap: nowrap`; all chips one y; `scrollbar-width: none`; `clientWidth` 343 = `offsetWidth` 343; `scrollWidth` 551 |
| Sort open       | `aria-expanded="true"`; four options; check visible only on Rating ↓                                                                          |
| Choose Name A→Z | label `Sort by: Name A→Z`; menu `hidden`; `aria-expanded="false"`; check hidden on the other three and shown on Name A→Z                      |
| Catalog         | no game cards after the chip click or the sort change                                                                                         |

The check `src` is the data URI of `src/assets/icons/check.svg` (same `M11.6664 3.5L5.25036 9.9162L2.33398 6.99975` path, `stroke="#3A2EBF"`, 14×14). The trigger has no separate chevron. The desktop frame’s trigger text is `Sort by: Rating ↓`, and the live label matches that, including the arrow inside the words.

## QA result

- Status: FAIL
- Draft: user frames `tmp/pixel-perfect/library-375.png`, `library-768.png`, `library-1920.png` (file `hkWWcHFefT8fIxSmQvvXMb`, library frames `2:611` / `2:820` / `2:1023`)
- Evidence: user-export-png (`tmp/pixel-perfect/library-….png`)
- Paint evidence: each in-scope child has fill + stroke + effect sampled from those frames. The check is the user SVG, because the closed frames do not show the menu.
- Report: overwrote docs/qa/library-filters.md this run (not a reused PASS)
- Breakpoints:
  - 375: FAIL — track 343, pad 16, chip h 31, sort 343×40, lead ink 289.5 vs 290 (Δ −0.5). Chip paint does not match the frame.
  - 768: FAIL — track 688, sort 182×40, lead ink Δ −0.2. Chip-row union 598.4 vs 610 (Δ −11.6). Chip paint does not match.
  - 1920: FAIL — track 1680, gutter 120, sort 190×44 at x 1610, lead ink 372.2 vs 373 (Δ −0.8). Chip-row union 646.4 vs 658 (Δ −11.6). Chip paint does not match.
- Blocking defects:
  - Current chip: frame stroke is 2px inside `#242145`. Live stroke is inset `1px` `#FFD02B` (the fill).
  - Default chip: frame fill `#FFFFFF`, stroke 2px inside `#242145`, glyphs `#242145`. Live fill is transparent over `#F9F8F3`, stroke is inset `1px` `#D2D2D2`, glyphs `#5F5D75`.
  - Chip-row union width is 11.6px short of the raster at 768 (598.4 vs 610) and at 1920 (646.4 vs 658).
- Non-blocking:
  - Sort trigger paint matches (white, 2px `#242145`, no shadow). Title and lead colors match. No drop shadow on the frame or live for these controls.
  - The trigger text is `Sort by: Rating ↓` (arrow inside the label). A separate right-chevron icon is not a defect.
  - `check.svg` matches the selected option’s icon and moves with the selection. The closed frames do not show the menu.
  - There is still no card list. Filtering and sorting do not change one.
  - Header is taller than the library frames (live 66 / 79 / 91). Filters’ own padding and track match the rasters.
