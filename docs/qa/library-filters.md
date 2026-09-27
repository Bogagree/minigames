# QA — library filters (RSS-QS-2-1-4)

- Branch: `feat/library-filters` @ `9371ad6` (`fix: paint resting library chips with an inside stroke`)
- Base URL: `http://127.0.0.1:5173/minigames/`
- Scope: Library title, lead, category chips, sort trigger, selected-option check. Game cards, pagination, and Game Details are the next plan steps. The reference frames show them. Their absence on the live page is not a defect for this step.
- Opened from the header primary nav (`a.header__nav-link` “Library”). URL stayed `http://127.0.0.1:5173/minigames/`.

This file replaces the report that failed the 1px `#D2D2D2` chip stroke. That verdict is stale after `9371ad6`. It is not reused.

## Evidence this run

No Figma MCP calls. Expected fill, stroke, and effect are pixel samples of the user exports:

- `tmp/pixel-perfect/library-375.png` (375×3315)
- `tmp/pixel-perfect/library-768.png` (768×1893)
- `tmp/pixel-perfect/library-1920.png` (1920×1450)

Page background in all three rasters is `#F9F8F3`. Pixels outside a control that match that color are recorded as effect **none**. `rgba(0, 0, 0, 0)` is transparent. Live ink width is `Range.getBoundingClientRect()` on the text node.

Samples (solid pixels, not anti-aliased corners):

| Sample           | Raster pixel                                                         | Color                 |
| ---------------- | -------------------------------------------------------------------- | --------------------- |
| Current fill     | 375 `(30, 172)`; 1920 `(122, 300)`                                   | `#FFD02B`             |
| Current stroke   | 375 `(16, 181)`; 768 `(40, 223)`; 1920 `(120, 300)` and `(121, 300)` | `#242145` ×2          |
| Default fill     | 375 `(140, 170)`; 1920 `(250, 290)`                                  | `#FFFFFF`             |
| Default stroke   | 375 `(116, 181)`; 1920 `(238, 300)`                                  | `#242145`             |
| Default glyphs   | 375 `(133, 181)`                                                     | `#242145`             |
| Lead             | 1920 `(122, 212)`                                                    | `#5F5D75`             |
| Sort fill/stroke | 1920 `(1612, 300)` / `(1610, 300)`                                   | `#FFFFFF` / `#242145` |
| Page             | `(8, 8)` / `(10, 10)`                                                | `#F9F8F3`             |

The closed frames do not show the open menu. The check is compared to `src/assets/icons/check.svg`.

## Paint table

Stroke “inside” means the 2px ring is an inset shadow: the border box stays the chip size, and the next pixel outside is the page background.

| Surface              | node-id                             | Family | Fill                         | Stroke (weight + inside/outside + hex) | Effect / shadow | Live computed                                                                                        | Match |
| -------------------- | ----------------------------------- | ------ | ---------------------------- | -------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------- | ----- |
| Title “Game Library” | `2:628`                             | text   | transparent (page `#F9F8F3`) | none                                   | none            | `rgb(36, 33, 69)`; border 0; shadow none; ink 366.4 @1920                                            | PASS  |
| Lead                 | `2:629`                             | text   | transparent (page `#F9F8F3`) | none                                   | none            | `rgb(95, 93, 117)`; border 0; shadow none                                                            | PASS  |
| Chip current         | `2:632`                             | chip   | `#FFD02B`                    | 2px inside `#242145`                   | none            | `rgb(255, 208, 43)`; text `rgb(36, 33, 69)`; border 0; inset `2px rgb(36, 33, 69)`; shadow else none | PASS  |
| Chip default         | `2:634`                             | chip   | `#FFFFFF`                    | 2px inside `#242145`; glyphs `#242145` | none            | `rgb(255, 255, 255)`; text `rgb(36, 33, 69)`; inset `2px rgb(36, 33, 69)`                            | PASS  |
| Sort trigger         | `2:646`                             | sort   | `#FFFFFF`                    | 2px inside `#242145`                   | none            | `rgb(255, 255, 255)`; `2px solid rgb(36, 33, 69)`; text `rgb(36, 33, 69)`; radius 12; shadow none    | PASS  |
| Check                | `2:1952` (not in the closed frames) | icon   | none                         | file stroke 3 `#3A2EBF`, 14×14         | none            | 14×14, `hidden` except the selected option                                                           | PASS  |

## Layout (live − raster)

| Breakpoint | Metric           | Frame raster           | Live                                    | Δ    |
| ---------- | ---------------- | ---------------------- | --------------------------------------- | ---- |
| 375        | intro / controls | 86 / 119, pad 16       | 86 / 119, pad 16                        | 0    |
| 375        | chip row         | h 31, gap 8, track 343 | h 31, gap 8, client 343 = offset 343    | 0    |
| 375        | sort             | 343×40                 | 343×40                                  | 0    |
| 375        | lead ink         | w 290                  | 289.5, line box 17                      | −0.5 |
| 375        | page scroll      | none                   | `scrollWidth` 375                       | 0    |
| 768        | track / sort     | track 688, sort 182×40 | track via pad 40, sort 182×40           | 0    |
| 768        | chip-row union   | 610                    | 612.4, h 33, gap 8                      | +2.4 |
| 768        | lead ink         | w 331                  | 330.8                                   | −0.2 |
| 768        | page scroll      | none                   | `scrollWidth` 768                       | 0    |
| 1920       | track / gutter   | gutter 120, track 1680 | gutter 120, sort right 1800, track 1680 | 0    |
| 1920       | chip-row union   | 658                    | 660.4, h 33, gap 16, x 120              | +2.4 |
| 1920       | sort             | x 1610, 190×44         | x 1610, 190×44                          | 0    |
| 1920       | lead ink         | w 373                  | 372.2, line box 22                      | −0.8 |
| 1920       | title ink        | w 364                  | 366.4                                   | +2.4 |
| 1920       | page scroll      | none                   | `scrollWidth` 1920                      | 0    |

Chip widths at 375 while All Games is current: live 93.1 vs raster 92 (Δ +1.1). Other 375 widths with Puzzle current: 73.4 / 61.5 / 69.9 / 63.1 / 82.6 / 75.3 vs 72 / 61 / 70 / 62 / 83 / 75 (each Δ ≤ 1.4). Desktop chips: 103 / 78.8 / 66 / 75.9 / 67.9 / 90.7 / 82.1 vs 102 / 78 / 65 / 76 / 67 / 92 / 82 (each Δ ≤ 1.3).

## Semantics and behavior

`section.library-filters`, visible `h1` “Game Library”, chips `role="group"`, each `button` with `aria-pressed`. Sort trigger `aria-haspopup="listbox"`. Menu `role="listbox"`. Options `role="option"`.

| Check           | Result                                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Click Puzzle    | only Puzzle is `aria-pressed="true"`; main text is still title, lead, chips, and sort                                        |
| Chip row at 375 | `scrollLeft` 0 → 180; `flex-wrap: nowrap`; `scrollbar-width: none`; `clientWidth` 343 = `offsetWidth` 343; `scrollWidth` 565 |
| Sort            | choosing Name A→Z sets the label to `Sort by: Name A→Z`, closes the menu, and shows the 14×14 check only on that option      |
| Catalog         | no game cards                                                                                                                |

## QA result

- Status: PASS
- Draft: user frames `tmp/pixel-perfect/library-375.png`, `library-768.png`, `library-1920.png`
- Evidence: user-export-png (`tmp/pixel-perfect/library-….png`)
- Paint evidence: each in-scope child has fill + stroke + effect sampled from those frames
- Report: overwrote docs/qa/library-filters.md this run (not a reused PASS)
- Breakpoints:
  - 375: PASS — track 343, chip h 31, sort 343×40, lead ink Δ −0.5; current/default chips match the sampled stroke
  - 768: PASS — union 612.4 vs 610 (Δ +2.4), sort 182×40, lead ink Δ −0.2
  - 1920: PASS — union 660.4 vs 658 (Δ +2.4), sort 190×44 at x 1610, lead ink 372.2 vs 373
- Blocking defects:
  - none
- Non-blocking:
  - The closed frames do not show the open menu. The check matches the exported SVG and is visible only on the selected option.
  - The sort trigger is the text `Sort by: Rating ↓`. No separate chevron, matching the desktop frame and the user’s call.
