# QA — library chrome (RSS-QS-2-1-1, RSS-QS-2-1-2, RSS-QS-2-1-3)

- Branch: `feat/library-chrome` @ `da03373`
- Base URL: `http://127.0.0.1:5173/minigames/`
- Scope: shared header, burger, and footer on Library, plus in-memory Home ↔ Library navigation and active state. Catalog body is empty on this step.
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) `fileKey` `hkWWcHFefT8fIxSmQvvXMb`. Course file not used.
- This file is the first report for this slug. It is not a reused PASS.

## Evidence this run

Figma MCP `get_metadata` listed Library chrome, then `get_design_context` returned paint for library desktop header `25:2458` and guest burger `2:565` (and their children). The next calls hit the Starter rate limit, so no further Figma MCP calls. Footer fill / stroke / effect is sampled from the 1× home exports (same chrome family; library footer frames match that geometry):

- `tmp/pixel-perfect/home-desktop.png` (1920×2760)
- `tmp/pixel-perfect/home-tablet.png` (768×2241)
- `tmp/pixel-perfect/home-mobile.png` (375×2061)
- `tmp/pixel-perfect/home-mobile-nav-guest.png` (320×587) confirms burger paint

`rgba(0,0,0,0)` is transparent. Expected hex is from that node’s MCP output or from the PNG sample, not from `tokens.scss`.

Library frames used for geometry: header `25:2458` / `25:2475` / `25:2488`; footer `25:2498` / `25:2543` / `25:2755`. There is no library burger frame; guest menu is `2:565`.

## Paint table

| Surface                        | node-id                                                                | Family  | Fill        | Stroke (weight + inside/outside + hex)                                                              | Effect / shadow | Live computed                                                                             | Match                                                       |
| ------------------------------ | ---------------------------------------------------------------------- | ------- | ----------- | --------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Header bar                     | `25:2458` (tablet `25:2475`, mobile `25:2488`)                         | header  | `#F9F8F3`   | 2px **bottom**, inside the frame, `#242145` (PNG y=83–84 on 85px desktop; mobile y=62–63)           | none            | bg `rgb(249, 248, 243)`; `border-bottom` 2px `rgb(36, 33, 69)`; shadow none               | PASS                                                        |
| Brand title                    | `25:2462`                                                              | text    | `#242145`   | none                                                                                                | none            | 24px / 700 `rgb(36, 33, 69)`; shadow none                                                 | PASS                                                        |
| Current nav link               | `25:2465` (bold on-primary on this header)                             | text    | `#242145`   | none                                                                                                | none            | On Library: Library is 16px / 700 `rgb(36, 33, 69)`; shadow none                          | PASS (treatment). Frame still bolds Home — see non-blocking |
| Inactive nav links             | `25:2466` `25:2467` `25:2468`                                          | text    | `#5F5D75`   | none                                                                                                | none            | 16px / 500 `rgb(95, 93, 117)`; PNG Library glyphs `#5F5D75`                               | PASS                                                        |
| Log In                         | `25:2470`                                                              | button  | transparent | 2px solid `#242145` (frame 82×37)                                                                   | none            | transparent; 2px `rgb(36, 33, 69)`; radius 8; shadow none; 85×41                          | PASS (Δ +3 / +4)                                            |
| Sign Up                        | `25:2472`                                                              | button  | `#FFD02B`   | 2px solid `#242145` (frame 93×37)                                                                   | none            | `rgb(255, 208, 43)`; 2px `rgb(36, 33, 69)`; radius 8; shadow none; 97×41                  | PASS (Δ +4 / +4)                                            |
| Burger panel                   | `2:565` / `2:566`                                                      | burger  | `#1E1B3A`   | 2px **left**, inside the 320 frame, `#242145` (PNG x=0–1)                                           | none            | `rgb(30, 27, 58)`; `border-left` 2px `rgb(36, 33, 69)`; shadow none; pad 24; gap 32       | PASS                                                        |
| Burger title                   | `2:570`                                                                | text    | white       | none                                                                                                | none            | 20px / 700 `rgb(255, 255, 255)`                                                           | PASS                                                        |
| Close control                  | `2:571`                                                                | button  | `#2A264F`   | none                                                                                                | none            | `close.svg` rect `#2A264F` rx 8 + white glyph; button box transparent; 32×32              | PASS                                                        |
| Burger current link            | `2:574`                                                                | text    | `#FFD02B`   | none                                                                                                | none            | On Library: Library 18px / 700 `rgb(255, 208, 43)`                                        | PASS (treatment on the open page)                           |
| Burger inactive links          | `2:575` `2:576` `2:577`                                                | text    | `#B9B5C9`   | none                                                                                                | none            | 18px / 500 `rgb(185, 181, 201)`; PNG `#B9B5C9`                                            | PASS                                                        |
| Burger Log In                  | `2:579`                                                                | button  | transparent | 2px solid white                                                                                     | none            | transparent; 2px `rgb(255, 255, 255)`; text white; radius 8; shadow none; h 41 vs 37      | PASS                                                        |
| Burger Sign Up                 | `2:581`                                                                | button  | `#FFD02B`   | 2px solid `#242145`                                                                                 | none            | `rgb(255, 208, 43)`; 2px `rgb(36, 33, 69)`; text `rgb(36, 33, 69)`; radius 8; shadow none | PASS                                                        |
| Footer section                 | `25:2498` / `25:2543` / `25:2755` (paint from home PNG `1:211` family) | footer  | `#1E1B3A`   | none                                                                                                | none            | `rgb(30, 27, 58)`; border 0; shadow none                                                  | PASS                                                        |
| Footer brand                   | brand text on PNG                                                      | text    | white       | none                                                                                                | none            | `rgb(255, 255, 255)`; 24px / 700; shadow none                                             | PASS                                                        |
| Tagline                        | tagline box                                                            | text    | `#B9B5C9`   | none                                                                                                | none            | `rgb(185, 181, 201)`; 14px; 400×63 @1920                                                  | PASS                                                        |
| Column titles                  | Explore / Company PNG                                                  | text    | white       | none                                                                                                | none            | `rgb(255, 255, 255)`; 16px / 700                                                          | PASS                                                        |
| Explore / Company links        | Home link PNG                                                          | text    | `#B9B5C9`   | none                                                                                                | none            | `rgb(185, 181, 201)`; 14px; shadow none                                                   | PASS                                                        |
| Social chip                    | share chip PNG                                                         | social  | `#2A264F`   | none                                                                                                | none            | `rgb(42, 38, 79)`; 40×40; radius 999; border 0; shadow none; glyph white                  | PASS                                                        |
| Credits hairline               | line at footer bottom (PNG y=2670–2671)                                | divider | —           | ~1px, subpixel blend `#211D3F` / `#272349` on `#1E1B3A` (consistent with `#3C376E` on a half-pixel) | none            | `1px solid rgb(60, 55, 110)`                                                              | PASS                                                        |
| Copyright / Designed with love | PNG text                                                               | text    | `#B9B5C9`   | none                                                                                                | none            | `rgb(185, 181, 201)`                                                                      | PASS                                                        |

## Layout (live − library frame)

Scrollbar: at 1920 the Library shell is shorter than the viewport, so `clientWidth` is **1920** and the track is **1680** at gutter **120**. At 2000, `clientWidth` **1985** (scrollbar 15); `#app` **1920** at x≈33; track still **1680**. Gutters were not shrunk.

| Breakpoint | Metric                | Frame                | Live                                                | Δ            |
| ---------- | --------------------- | -------------------- | --------------------------------------------------- | ------------ |
| 375        | header h              | 64                   | 66                                                  | +2           |
| 375        | header pad            | 16                   | 16                                                  | 0            |
| 375        | logo / burger         | 32×32 @ 16 and x=327 | 32×32 @ 16 and x=327                                | 0            |
| 375        | footer h              | 526 (`25:2755`)      | 533                                                 | +7           |
| 375        | footer pad            | —                    | 32×16                                               | —            |
| 375        | Designed with love    | hidden on mobile     | `display: none`                                     | —            |
| 375        | H-scroll              | none                 | `scrollWidth` 375                                   | 0            |
| 768        | header h              | 72                   | 79                                                  | +7           |
| 768        | header pad            | 40 / 20              | 40 / 20                                             | 0            |
| 768        | Sign Up               | 85×33 @ x=595        | 89×37 @ x=591                                       | +4 / +4 / −4 |
| 768        | burger                | 32×32 @ x=696        | 32×32 @ x=696                                       | 0            |
| 768        | desktop nav / Log In  | hidden               | `display: none`                                     | —            |
| 768        | footer h              | 429                  | 431                                                 | +2           |
| 768        | footer pad            | 40                   | 40                                                  | 0            |
| 768        | H-scroll              | none                 | `scrollWidth` 768                                   | 0            |
| 1920       | header h              | 85                   | 91                                                  | +6           |
| 1920       | header pad            | 80 / 24              | 80 / 24                                             | 0            |
| 1920       | nav gap / nav→buttons | 40 / 32              | 40 / 32                                             | 0            |
| 1920       | footer h              | 343                  | 345                                                 | +2           |
| 1920       | footer pad / track    | 40×120 / 1680        | 40×120 / 1680                                       | 0            |
| 1920       | burger                | hidden               | `display: none`                                     | —            |
| 520        | H-scroll              | none                 | `scrollWidth` = client 505 (scrollbar, no overflow) | —            |
| 2000       | shell                 | centered, max 1920   | `#app` 1920 @ x=33; track 1680                      | —            |

All compared layout Δ ≤ 10px. Burger artboard is 320×587; live overlay is the viewport (375×812) with the same padding and gaps.

## Semantics and navigation

Same modules on Home and Library (`createHeader` / `createBurgerMenu` / `createFooter`). Landmarks: `header`, `nav` (Primary, Mobile, Explore, Company), `main`, `footer`. Library `h1` is “Library”, visually hidden (`position: absolute`, `clip: rect(0,0,0,0)`).

In-memory only: `location.href` stayed `http://127.0.0.1:5173/minigames/`, `history.length` stayed 3, and a `window` mark survived every click (no reload, no History API).

| Action                                                       | Result                                                                           |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Header Library                                               | Library; header, burger, and footer Explore `aria-current="page"` on Library     |
| Header Home / Tournaments / Community                        | Home; current returns to Home                                                    |
| Footer Library / Home / Categories / Contact / social / logo | Library or Home as specified; company and social go Home                         |
| Burger on Library                                            | Library is current (`#FFD02B`, 700). Home / Tournaments / Community are inactive |
| Burger Home, Library, Tournaments, logo                      | Navigates and closes the menu                                                    |
| Escape                                                       | Closes the menu; page stays Library                                              |
| Burger Log In                                                | Closes the menu and opens Auth (“Welcome Back!”)                                 |

Cursor is `pointer` on links, buttons, and the burger. No horizontal scroll at 375, 520, 768, or 1920, including while the menu is open.

## Assets

Close control is `src/assets/icons/close.svg` (rounded `#2A264F` chip + white glyph), matching `2:571` and the guest PNG. Footer social chips and RS / GitHub marks are the existing footer exports (`https://rs.school/`, `https://github.com/Bogagree` / `@Bogagree`). No new invented drawing in this step.

## QA result

- Status: PASS
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (nodes: library header `25:2458` / `25:2475` / `25:2488`; burger `2:565`; library footer `25:2498` / `25:2543` / `25:2755`)
- Evidence: MCP-child (`25:2458`, `2:565`) + user-export-png (`tmp/pixel-perfect/home-desktop.png`, `home-tablet.png`, `home-mobile.png`, `home-mobile-nav-guest.png`) after MCP rate limit
- Paint evidence: each in-scope child has fill + stroke + effect from that node’s design context or from the PNG sample (see table)
- Report: overwrote docs/qa/library-chrome.md this run (not a reused PASS)
- Breakpoints:
  - 375: PASS — header Δ+2, footer Δ+7, burger full-viewport, Library active, no H-scroll
  - 768: PASS — header Δ+7, footer Δ+2, Sign Up + burger, nav hidden, no H-scroll
  - 1920: PASS — header Δ+6, footer Δ+2, track 1680 at gutter 120, burger hidden, no H-scroll
- Blocking defects:
  - none
- Non-blocking:
  - Header is 2–7px taller than the frame (2px bottom border + button box 41 vs 37). Buttons are about 4px larger. All ≤10px
  - Library header frame `25:2458` still emphasizes Home (`25:2465` bold `#242145`) and leaves Library inactive (`25:2466` `#5F5D75`). Live applies that current-link paint to Library, and the inactive paint to the other links. Burger frame `2:565` is the Home guest menu; live applies its current paint (`#FFD02B` bold) to Library. That is the active state this step requires
  - Footer MCP paint was rate-limited; footer color is from the home PNG aliases, geometry from the library footer nodes
  - Burger export is 320×587; live menu fills the viewport
  - At 2000, client width is 1985 because of the scrollbar; the 1920 shell stays centered and gutters stay 120
