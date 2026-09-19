# QA — feat/leaderboard-gamedev (RSS-QS-1-4-5, RSS-QS-1-4-6)

- Branch: `feat/leaderboard-gamedev`
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Top Players `2:421` / `2:189` / `2:12`; table header `2:17`; table `2:16`; Developer CTA `12:2279` / `12:2260` / `10:2241`
- Base URL: `http://127.0.0.1:5173/minigames/`
- Evidence: **user-paste** (Home canvas `2:17` / `2:16` + guidebook avatar/chip hexes, 2026-09-19) + **cache** (absolute Figma geometry from prior MCP dump; this run MCP rate-limited)
- Live: Playwright MCP, viewports 375 / 768 / 1920 (+ fluid 520, centered 2000)
- Re-QA: **post-user-review** after header/table stroke correction. Prior color PASS is **invalid** (see below).

## Why prior PASS was invalid

The previous color re-QA treated the **same-PR spec / guidebook write-up** as ground truth and required table header fill **outline `#E5E7EB`**, forbidding **tertiary `#3A2EBF`**. It never compared live computed `th` / table stroke to Home canvas nodes **`2:17`** (Table Header) and **`2:16`** (Table).

That inverted the canvas:

| Target | Prior QA (false PASS) | Canvas nodes (this run) |
| ------ | --------------------- | ----------------------- |
| Header fill | `#E5E7EB`, not tertiary | `2:17` fill **tertiary `#3A2EBF`** |
| Header text | (not checked vs `2:17`) | `2:17` text **white `#FFFFFF`** |
| Table outer stroke | (not measured vs `2:16`) | `2:16` **2px** `#242145`, radius **12px** |

Skill ground truth is the **draft node**, not tokens or a same-PR spec that disagreed with `2:17`. A PASS that required `#E5E7EB` on the header was a **false PASS**. This run measures **computed** `backgroundColor` / `color` / `borderWidth` / `borderColor` / `borderRadius` on live `th` and `.leaderboard__table` vs those nodes — not vs CSS variable names.

## Figma baseline (absolute node geometry)

Cached from prior MCP `get_metadata` dump (`fileKey` `hkWWcHFefT8fIxSmQvvXMb` node `0:1`). Not taken from same-PR tokens.

| Node                    | Frame |   x | width | height |
| ----------------------- | ----- | --: | ----: | -----: |
| `2:421` Top Players     | 375   |   0 |   375 |    293 |
| `12:2279` Developer CTA | 375   |   0 |   375 |    566 |
| `2:189` Top Players     | 768   |   0 |   768 |    329 |
| `12:2260` Developer CTA | 768   |   0 |   768 |    628 |
| `2:12` Top Players      | 1920  |   0 |  1920 |    586 |
| `10:2241` Developer CTA | 1920  |   0 |  1920 | 562.79 |

Inner (desktop `10:2241`): illustration `x=120` `682×483`; card `x=842` `958×344` → **gap 40px** (section gutter 120, not 120 between columns). Track for leaderboard table/header: `x=120` `w=1680`.

## Color / stroke baseline (canvas + guidebook paste)

| Surface | Node / source | Expected |
| ------- | ------------- | -------- |
| Table header (`th`) fill | `2:17` | tertiary `#3A2EBF` |
| Table header (`th`) text | `2:17` | white `#FFFFFF` |
| Table outer stroke | `2:16` | **2px** `--color-on-primary` `#242145` (not game-card 2.5px) |
| Table radius | `2:16` | 12px |
| Table body | guidebook | white `#FFFFFF` |
| Even rows (2, 4) | guidebook | outline `#E5E7EB` |
| Odd rows (1, 3, 5) | guidebook | white (transparent on white table) |
| Avatars 1–5 | guidebook | `#E9EEF6` `#A3E2C9` `#BCE3FF` `#FFC6FF` `#E8DFF5` |
| Avatar stroke | guidebook / cache | on-primary `#242145` |
| Chip fill | guidebook | outline `#E5E7EB` |
| Chip stroke | guidebook | outline-variant `#D2D2D2` |

## Color / stroke measurements (live computed)

Same hex at 375 / 768 / 1920 unless noted. Proof is `getComputedStyle` hex / px, not `var(--…)`.

| Target | Expected (`2:17` / `2:16` / paste) | Live 1920 | Match |
| ------ | ---------------------------------- | --------- | :---: |
| `th` background | `#3A2EBF` (`2:17`) | `#3A2EBF` | ✓ |
| `th` color | `#FFFFFF` (`2:17`) | `#FFFFFF` | ✓ |
| table `borderWidth` | `2px` (`2:16`) | `2px` | ✓ |
| table `borderColor` | `#242145` (`2:16`) | `#242145` | ✓ |
| table `borderRadius` | `12px` (`2:16`) | `12px` | ✓ |
| table background | `#FFFFFF` | `#FFFFFF` | ✓ |
| row 1 / 3 / 5 | white | `transparent` on `#FFFFFF` | ✓ |
| row 2 / 4 | `#E5E7EB` | `#E5E7EB` | ✓ |
| avatar 1 | `#E9EEF6` | `#E9EEF6` | ✓ |
| avatar 2 | `#A3E2C9` | `#A3E2C9` | ✓ |
| avatar 3 | `#BCE3FF` | `#BCE3FF` | ✓ |
| avatar 4 | `#FFC6FF` | `#FFC6FF` | ✓ |
| avatar 5 | `#E8DFF5` | `#E8DFF5` | ✓ |
| avatar stroke | `#242145` | `#242145` 2px | ✓ |
| chip fill | `#E5E7EB` | `#E5E7EB` | ✓ |
| chip stroke | `#D2D2D2` 2px | `#D2D2D2` 2px | ✓ |

375 / 768: `th` `#3A2EBF` / `#FFFFFF`; table `2px` `#242145` `12px`; zebra odd `transparent` / even `#E5E7EB`; avatars 1–3 match; chip (Favorite Game column hidden) same fill/stroke.

## Measurements (live − Figma)

Scrollbar: at 1920, `clientWidth` 1905; gutters stay 120. Content/track **1665** ≈ Figma **1680 − 15**. Same artifact at 768 (`clientWidth` 753) and 375 (`clientWidth` 360, `scrollWidth` 375 = `innerWidth`). Not treated as a gutter FAIL. Off-canvas closed burger sits at `left=360` and is not page overflow.

| BP   | Metric                      |          Draft |           Live |          Δ |
| ---- | --------------------------- | -------------: | -------------: | ---------: |
| 375  | leaderboard h               |            293 |            297 |         +4 |
| 375  | leaderboard pad / content w |       16 / 343 |       16 / 343 |          0 |
| 375  | table h / rows              |     216 / 3×56 |     220 / 3×56 |         +4 |
| 375  | game-dev h                  |            566 |            572 |         +6 |
| 375  | illustration                |        343×227 |        343×227 |          0 |
| 375  | card                        |        343×291 |        343×297 |         +6 |
| 375  | CTA button                  |         129×32 |         134×32 |     +5 / 0 |
| 768  | leaderboard h               |            329 |            333 |         +4 |
| 768  | pad-inline                  |             40 |             40 |          0 |
| 768  | table rows                  |           3×60 |           3×60 |          0 |
| 768  | game-dev h                  |            628 |            629 |         +1 |
| 768  | illustration h / card h     |      300 / 256 |      300 / 257 |     0 / +1 |
| 768  | CTA button                  |         155×37 |         155×41 |     0 / +4 |
| 1920 | leaderboard h               |            586 |            590 |         +4 |
| 1920 | pad-inline / track w        |     120 / 1680 |     120 / 1665 | 0 / −15 sb |
| 1920 | header/row h / rows         |    67 / 72 / 5 |    67 / 72 / 5 |          0 |
| 1920 | game-dev h                  |         562.79 |            563 |          0 |
| 1920 | illustration                |        682×483 |        682×483 |          0 |
| 1920 | card                        | 958×344 @ x842 | 943×344 @ x842 | −15 sb / 0 |
| 1920 | illustration–card gap       |             40 |             40 |          0 |
| 1920 | CTA button                  |         189×56 |         183×56 |     −6 / 0 |

All layout Δ ≤ 10px (scrollbar-aware for track/card width).

## Semantics & smoke

- `section.leaderboard` + `aria-labelledby`; semantic `table` / `th` / `td`; caption; **no** links/buttons/inputs in the table
- Mobile: title «Top Players»; Rank / Player / Score / Streak; 3 rows; score compact; streak `🔥 12d`
- Tablet: title «Top Players This Week»; Games / Score (short labels); streak compact; 3 rows
- Desktop: Games Played / Total Score / Streak / Favorite Game; streak `🔥 12 days`; 5 rows
- `section.game-developer` + `h2`; CTA `button[type=button]` «Submit Form», `cursor: pointer`; click does **not** navigate (`http://127.0.0.1:5173/minigames/`); burger stays `aria-hidden="true"`
- Contact `mailto:developers@minigames.com`
- No horizontal overflow at 375 / 520 / 768 / 1920 (`scrollWidth` ≤ layout/`innerWidth` except scrollbar vs `clientWidth`)
- Above 1920: `#app` `max-width: 1920` centered; section heights unchanged (2000: app `w=1920` `x≈33`; lb 590 / gd 563)

## QA result

- Status: PASS
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (nodes: Top Players `2:421` / `2:189` / `2:12`; header `2:17`; table `2:16`; Developer CTA `12:2279` / `12:2260` / `10:2241`)
- Evidence: user-paste + cache
- Breakpoints:
  - 375: PASS — layout Δ+4 / +6; `th` `#3A2EBF` / `#FFFFFF`; table `2px` `#242145` `12px`; zebra / avatars 1–3 match paste
  - 768: PASS — layout Δ+4 / +1; same header + table stroke; zebra / avatars 1–3 / chip `#E5E7EB` + `#D2D2D2` 2px
  - 1920: PASS — layout Δ+4 / 0; header `2:17` tertiary + white; table `2:16` 2px `#242145` 12px; even rows `#E5E7EB`; avatars 1–5 exact; chips match
- Blocking defects:
  - (none)
- Non-blocking:
  - Prior color PASS was **invalid**: compared live to same-PR spec (`#E5E7EB` header, tertiary forbidden), not canvas `2:17`
  - Desktop CTA column gap is **40px** in Figma `10:2241` (live 40). Spec wording «gutter 120px» is the **section** inset, not the illustration–card gap.
  - CTA illustration is a local SVG stand-in (`game-developer-illustration.svg`), not a Figma export
  - Folder `game-dev/` vs BEM `game-developer`
  - Button hover/active uses CSS `filter` / color, not tokens (visual Δ within hover, not layout)
  - Compact score `94.3K` (`toFixed(1)` on 94250) vs Figma copy `94.2K`
  - Scrollbar: 1920 client ~1905 → track/card width −15 vs 1680/958; gutters unchanged
