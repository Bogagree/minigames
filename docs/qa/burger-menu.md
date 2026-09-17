# QA — burger-menu (RSS-QS-1-4-2)

- Branch: `feat/burger-menu`
- Draft node: `home-mobile-nav-guest` (`2:565`)
- Base URL: `http://127.0.0.1:5173/minigames/`
- Method: Figma draft metadata (node geometry) + Playwright viewport measures at 375 / 768 / 1920; interactive smoke (open/close, Esc, Auth)

## Measurements (vs Figma `2:565`)

| Metric | Figma | Live (375 / 768) | Δ |
| --- | --- | --- | --- |
| Panel padding | 24px | 24px | 0 |
| Logo | 32×32 | 32×32 | 0 |
| Close control | 32×32 | 32×32 | 0 |
| Brand gap (logo→title) | 8px | 8px | 0 |
| Header → nav gap | 32px | 32px | 0 |
| Nav link gap | 24px | 24px | 0 |
| Nav link font-size | ~18px (text h 22) | 18px | ≤2 |
| Title font-size | ~20px (text h 24) | 20px | 0 |
| Auth button gap | 16px | 16px | 0 |
| Auth button height | 37px | 41px | 4 |

Notes:

- Draft frame is **320×587**; AC requires full-viewport overlay — live uses full `100%` / viewport (375×812, 768×1024). Internal spacing compared above.
- Content x offset +2px vs draft from `border-left: 2px` on `.burger-menu__panel` (within ±10px).
- At **1920**: `.header__burger` and `.burger-menu` are `display: none`; desktop nav + Log In / Sign Up shown (expected).

## Semantics & smoke

- `banner` / `header`, `main`, menu `role="dialog"` + `aria-modal`, `nav[aria-label="Mobile"]`, buttons for close / Log In / Sign Up.
- Open via header burger; close via transformed header control, panel close, and `Esc`.
- Log In from open menu closes menu and opens Auth dialog (skeleton).
- No horizontal overflow at 375 / 520 / 768 / 1920 while checking layout.

## QA result

- Status: PASS
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=2-565
- Breakpoints:
  - 375: PASS — padding/gaps/logo/close Δ 0–4px; full-screen overlay; no H-scroll; open/close + Esc OK
  - 768: PASS — same spacing Δ≤4px; Sign Up + burger in header; full-screen menu; no H-scroll
  - 1920: PASS — burger + menu hidden; desktop nav/auth visible (burger UI N/A by design)
- Blocking defects:
  - none
- Non-blocking:
  - Figma MCP rate-limited during this run; geometry taken from draft metadata for `2:565` (same fileKey) plus live computed styles
  - Dual close affordances (header burger→× and in-panel close) both present per AC/spec
