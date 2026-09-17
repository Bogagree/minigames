# QA — feat/header-unauthenticated (RSS-QS-1-4-1)

Retrospective factory run after merge of PR #7 into `story-1` (2026-09-17).

Scope: guest header only — [specs/header.md](../specs/header.md).

## QA result

- Status: PASS
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Header nodes `1:14` (home-desktop), `2:116` (home-tablet), `2:368` (home-mobile)
- Breakpoints:
  - 375: PASS — height Δ+2; padding/logo/burger align; no H-scroll; auth buttons hidden
  - 768: PASS — height Δ+7; padding 40/20; Sign Up + burger; Log In hidden; no H-scroll
  - 1920: PASS — height Δ+6; full nav + both buttons; burger hidden; gaps/padding match; no H-scroll
- Blocking defects:
  - (none)
- Non-blocking:
  - Header height systematically ~2–7px taller than Figma (likely 2px bottom border + button box model)
  - Auth/button boxes a few px larger than draft (still ≤10px)

### Measured deltas (live − Figma)

| Breakpoint | Metric          | Figma |  Live |   Δ |
| ---------- | --------------- | ----: | ----: | --: |
| 375        | header h        |    64 |    66 |  +2 |
| 375        | padding         |    16 |    16 |   0 |
| 375        | logo            | 32×32 | 32×32 |   0 |
| 768        | header h        |    72 |    79 |  +7 |
| 768        | padding (x / y) | 40/20 | 40/20 |   0 |
| 768        | Sign Up         | 85×33 | 89×37 |  +4 |
| 1920       | header h        |    85 |    91 |  +6 |
| 1920       | padding (x / y) | 80/24 | 80/24 |   0 |
| 1920       | nav link gap    |    40 |    40 |   0 |
| 1920       | nav→buttons gap |    32 |    32 |   0 |

### Smoke

- Log In / Sign Up open auth dialog modes
- Burger present (`aria-label="Open menu"`); drawer out of scope (RSS-QS-1-4-2)
- Real `logo-mark.png` + burger SVG
- Above 1920: `#app` centered (`max-width: 1920`)
