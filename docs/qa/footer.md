# QA — feat/footer (RSS-QS-1-4-7)

- Branch: `feat/footer` (this report after user Dev Mode pastes + color approval)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=1-211) — Footer `2:468` (375), `2:252` (768), `1:211` (1920)
- Base URL: `http://127.0.0.1:5173/minigames/`
- Evidence this run: **user-paste** (Figma panels in chat) + Figma variables table + SVG exports. MCP still 402. Same-PR tokens are **not** the expected column; hex comes from the variables screenshot and instance token names.
- Live: Playwright, 375 / 768 / 1920 (+ 2000 centered shell)
- Re-QA: overwrote this file. Prior BLOCKED (missing child paint / invented icons) is invalid after user pastes, SVG exports, and owner «апрув цвета».

## Evidence map (user-paste)

| Surface                | Instance                                      | Fill                                                                       | Stroke | Effect |
| ---------------------- | --------------------------------------------- | -------------------------------------------------------------------------- | ------ | ------ |
| Footer frame           | `1:211` panel                                 | token `bg-footer` → `#1E1B3A` (variables table)                            | none   | none   |
| Brand group            | MiniGames 172×32                              | group empty; selection **white** + **on-primary**                          | none   | none   |
| Tagline                | 400×63                                        | `on-bg-footer` → `#B9B5C9`                                                 | none   | none   |
| Nav link Contact       | 53×17                                         | `on-bg-footer` → `#B9B5C9`                                                 | none   | none   |
| Column title Company   | 75×19                                         | **white**, Inter Bold 16                                                   | none   | none   |
| Footer text (owner)    | all text                                      | —                                                                          | none   | none   |
| Social chips           | SVG export + variables                        | `bg-footer-low` `#2A264F`; hover `bg-footer-lowest` `#3C376E`; glyph white | none   | none   |
| RS / GitHub marks      | SVG exports                                   | RS `#242145`+`#FFD02B`; GitHub white+`#242145`                             | none   | none   |
| Hairline above credits | not isolated; owner approved remaining colors | live `1px` `#3C376E` (`bg-footer-lowest`)                                  | —      | none   |

375/768 frames treated as same family as `1:211` (owner color approval).

## Paint table

Expected hex from **instance token + variables table**, not from `tokens.scss` as source.

| Surface                 | node-id                     | Family  | Fill         | Stroke        | Effect | Live computed                                                                  | Match                                       |
| ----------------------- | --------------------------- | ------- | ------------ | ------------- | ------ | ------------------------------------------------------------------------------ | ------------------------------------------- |
| Footer section          | `1:211` / `2:252` / `2:468` | footer  | `#1E1B3A`    | none          | none   | bg `rgb(30, 27, 58)`; border `0`; shadow none                                  | PASS                                        |
| Brand title             | brand group                 | text    | white        | none          | none   | color `rgb(255, 255, 255)`; shadow none; 1920 24px                             | PASS                                        |
| Tagline                 | tagline                     | text    | `#B9B5C9`    | none          | none   | `rgb(185, 181, 201)`; 14px                                                     | PASS                                        |
| Explore / Company links | Contact                     | text    | `#B9B5C9`    | none          | none   | `rgb(185, 181, 201)`; 14px                                                     | PASS                                        |
| Column titles           | Company                     | text    | white        | none          | none   | `rgb(255, 255, 255)`; 16px / 700                                               | PASS                                        |
| Social chip             | share/chat/rss              | social  | `#2A264F`    | none          | none   | `rgb(42, 38, 79)`; 40×40 @1920 / 32×32 @375; radius 999; border 0; shadow none | PASS                                        |
| Social hover            | variables                   | social  | `#3C376E`    | none          | none   | CSS `background-color: var(--color-bg-footer-lowest)`                          | PASS (token; :hover not sticky in evaluate) |
| Bottom hairline         | owner-approved              | divider | —            | 1px `#3C376E` | none   | `1px solid rgb(60, 55, 110)`                                                   | PASS (owner color approval)                 |
| RS / GitHub             | SVG                         | credit  | export fills | none          | none   | imgs are `rs-logo-container.svg` / `github-icon.svg`                           | PASS                                        |

`rgba(0,0,0,0)` = transparent. Odd/even N/A.

## Live layout

Scrollbar: viewport 1920 → `clientWidth` **1905**; gutters **120**; track **1665**. At 2000: `#app` **1920** centered (`x≈32.5`); footer **1920×345**; padding `40px 120px` → track **1680**.

| Breakpoint | Metric             |                                             Live |
| ---------- | ------------------ | -----------------------------------------------: |
| 375        | footer w×h         |                  375 × **533** (token 524, Δ +9) |
| 375        | padding            |                                            32×16 |
| 375        | H-scroll           |                         none (`scrollWidth` 375) |
| 375        | Designed with love |                                           hidden |
| 768        | footer w×h         |                  753 × **431** (token 429, Δ +2) |
| 768        | padding            |                                               40 |
| 768        | love               |                                          visible |
| 768        | H-scroll           |                                             none |
| 1920       | footer w×h         | 1905 × **345** (shell 1920×345; token 343, Δ +2) |
| 1920       | padding / track    |                `40px 120px` / 1680 in 1920 shell |
| 2000       | `#app`             |                         max-width 1920, centered |

All layout Δ ≤ 10px.

## Semantics & smoke

- Landmark `footer.footer`
- Explore / Company: `nav`; Community `div` + labelled list
- Nav + social → `/minigames/`; cursor pointer
- RS School → `https://rs.school/` blank; GitHub `https://github.com/Bogagree` / `@Bogagree`

## Assets

Figma-exported glyphs/containers (not Material redraws). Chip **circle** fill is CSS token so hover can use `bg-footer-lowest`; glyph paths remain the user export.

## QA result

- Status: PASS
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=1-211 (nodes: `2:468` / `2:252` / `1:211` + children in table)
- Evidence: user-paste
- Paint evidence: each in-scope child has fill + stroke + effect from instance paste, variables table, SVG export, or owner color approval
- Report: overwrote docs/qa/footer.md this run (not a reused PASS)
- Breakpoints:
  - 375: PASS — h Δ+9; no H-scroll; love hidden
  - 768: PASS — h Δ+2; love visible
  - 1920: PASS — h Δ+2; gutter 120; track 1680 in 1920 shell
- Blocking defects:
  - none
- Non-blocking:
  - Scrollbar shrinks client width at 1920; gutters stay 120
  - Community is a `div`, not `nav`
  - Hairline node not isolated in Dev Mode; color approved by owner as `bg-footer-lowest`
