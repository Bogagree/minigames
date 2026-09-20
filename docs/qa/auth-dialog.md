# QA — feat/auth-dialog (RSS-QS-1-5-1 … RSS-QS-1-5-5)

- Branch: `feat/auth-dialog` (HEAD `f6d78bf` plus this report)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) (`fileKey` `hkWWcHFefT8fIxSmQvvXMb`) — Dialog windows Login / Registration. Course Figma not used.
- Node-ids: unresolved (`_pending QA_` in [specs/auth-dialog.md](../specs/auth-dialog.md)). Paint expected from **user Dev Mode paste** (two panels), not MCP.
- Base URL: `http://127.0.0.1:5173/minigames/`
- Live: Playwright MCP, viewports **375 × 812**, **768 × 1024**, **1920 × 1080**
- Re-QA: **overwrote** this file. Prior branch report was **BLOCKED** (MCP 402, no paste). That file is invalid for this run.

## Evidence

- **user-paste** (this run): Login frame 420×623 Hug; Registration Create Account 356×52. User: Login and Registration **windows** share effects; Login and Create Account **buttons** share effects.
- MCP `get_design_context` not used (may still be 402). Same-PR `tokens.scss` / spec **not** used as expected hex/effect.

**In-scope painted children:** dialog panel (both modes) + primary submit (Login + Create Account / live Sign Up). Google / eye / mail: out of batch (user: no new icons) — not BLOCKED.

## Paste ground truth (expected)

**Panel (both modes):** width 420 (tablet/desktop); height Hug (live may differ); padding 32; gap 24; radius 24; fill `bg` `#F9F8F3`; stroke `on-primary` `#242145`, Inside, **3**; drop shadow X 8 Y 8 blur 0 spread 0 `#111111` 100%; shadow **visible** (not clipped on the same box).

**Submit (Login + Create Account family):** ~356×52; fill `primary` `#FFD02B`; stroke `on-primary` Inside **2.5**; drop shadow X 0 Y 4 blur 0 spread 0 `on-primary` `#242145`.

## Paint table

Expected fill / stroke / effect from **paste**, not tokens. Live = `getComputedStyle` + bounding box. Login and Registration panels: **identical family** (one row + note). Both submits measured.

| Surface                                               | node-id                         | Family                       | Fill                  | Stroke (weight + inside/outside + hex) | Effect / shadow                        | Live computed                                                                                                                                                                                                                                                            | Match                                                                                                                             |
| ----------------------------------------------------- | ------------------------------- | ---------------------------- | --------------------- | -------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Dialog panel Login + Registration (same family)       | unresolved (paste: Hug 420×623) | dialog chrome                | `#F9F8F3` (`bg`)      | Inside **3**, `#242145`                | X 8 Y 8 blur 0 spread 0 `#111111` 100% | 768/1920: 420×502 border-box; pad 32; gap 24; radius 24; bg `rgb(249, 248, 243)`; border **3px** solid `rgb(36, 33, 69)`; `box-shadow: rgb(17, 17, 17) 8px 8px 0px 0px`; `overflow: visible` (scroll on `.auth-dialog__body`). 375: width 343 (`100% − 32`), same paint. | **PASS** (height Hug 502 vs paste 623 — content differs, not blocking). Width/pad/radius/fill/stroke/visible shadow within Δ≤10px |
| Submit Login (`.auth-dialog__submit` in Login panel)  | unresolved (paste ~356×52)      | primary submit               | `#FFD02B` (`primary`) | Inside **2.5**, `#242145`              | X 0 Y 4 blur 0 spread 0 `#242145`      | 768/1920: 350×52; bg `rgb(255, 208, 43)`; border **2px** solid `rgb(36, 33, 69)`; `box-shadow: rgb(36, 33, 69) 0px 4px 0px 0px`; overflow visible. 375: 273×52, same paint                                                                                               | **FAIL** — used `border-top-width` **2px** ≠ paste **2.5**. Fill, 0/4/0/0 shadow, geometry Δ width 6px (350 vs 356) OK            |
| Submit Create Account family (live label **Sign Up**) | unresolved (paste 356×52)       | primary submit (same family) | `#FFD02B`             | Inside **2.5**, `#242145`              | X 0 Y 4 blur 0 spread 0 `#242145`      | Same as Login submit at each breakpoint (Sign Up 350×52 / 273×52; border **2px**; shadow 0 4 0 0 `#242145`)                                                                                                                                                              | **FAIL** — same 2px vs 2.5px                                                                                                      |

Shadow visibility: panel `overflow: visible`; inner body scrolls. Viewport shot at 768 shows hard offset shadow on panel (8/8 `#111111`) and submit (0/4 on-primary). Not clipped. Panel shadow **PASS**.

CSS `border` on `box-sizing: border-box` width 420 ≈ Figma inside 3px on the 420 frame (outer size 420). Submit 2.5px is authored on `--border-width-card` but **computed used value is 2px** (Chromium integer border rounding) — still **not** a stroke PASS vs paste.

## Layout vs paste

| Viewport | Dialog width | Dialog height | Submit | H-scroll                 | Notes                           |
| -------- | -----------: | ------------: | -----: | ------------------------ | ------------------------------- |
| 375      |   343 (x=16) |       502 Hug | 273×52 | none (`scrollWidth` 375) | Fluid; paste 420 does not apply |
| 768      |  420 (x=174) |           502 | 350×52 | none                     | Width Δ 0; submit width Δ 6     |
| 1920     |  420 (x=750) |           502 | 350×52 | none on 1920 innerWidth  | Centered (1920−420)/2 = 750     |

## Semantics & smoke

- Singleton `<dialog class="auth-dialog">` `aria-modal="true"`; tabs `role="tablist"` / `tab` / `tabpanel`; two `<form>` panels. No inner `header`/`main` (non-blocking).
- Login: email + password. Registration: text + email + password. Submit `preventDefault`.
- 375: burger **Log In** → Login; burger **Sign Up** → Registration; burger `aria-hidden="true"` after open; Esc closes; tab Login ↔ Registration.
- 768: header **Sign Up** → Registration; burger **Log In** → Login; Esc; backdrop click (viewport 8,8) closes; body scroll lock cleared.
- 1920: header **Log In** / **Sign Up**; burger `display: none`; Esc; backdrop closes. Burger not applicable at this width.

## Why prior BLOCKED is invalid

Previous `docs/qa/auth-dialog.md` had no user-paste and listed live 2px/12px/no-submit-shadow from an older build. Chrome was reworked (`overflow: visible`, 3px panel, submit shadow). This run compares **live computed** to **this paste**.

## QA result

- Status: FAIL
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (`hkWWcHFefT8fIxSmQvvXMb`) (nodes: unresolved; paint from user-paste Login panel + Create Account submit)
- Evidence: user-paste
- Paint evidence: in-scope panel + both submits have fill + stroke + effect from paste; submit **stroke weight does not match**
- Report: overwrote docs/qa/auth-dialog.md this run (not a reused PASS / not the stale BLOCKED file)
- Breakpoints:
  - 375: FAIL — no H-scroll; panel paint matches paste; submit stroke 2px vs 2.5; smoke burger / Esc / tabs OK (Esc re-checked after a race)
  - 768: FAIL — width 420, panel fill/stroke/visible shadow PASS; submit 2px vs 2.5; smoke header + burger + Esc + backdrop OK
  - 1920: FAIL — width 420 centered; same panel PASS / submit stroke FAIL; smoke header Log In / Sign Up, Esc, backdrop OK
- Blocking defects:
  - Primary submit (Login and Sign Up / Create Account family): live computed stroke **2px** outside/CSS border vs paste **Inside 2.5**. Fill `#FFD02B` and shadow `0 4 0 0 #242145` match. Need a used-value 2.5px stroke (not Chromium-rounded 2px).
- Non-blocking:
  - Hug height 502 vs paste 623 (content: no Google row / different stack).
  - Submit width 350 vs 356 (border-box 3px panel border; Δ 6 ≤ 10).
  - Live submit copy **Sign Up** vs paste **Create Account** (same chrome family).
  - Tabs / inputs / close: no Dev Mode paste this batch; not chrome FAIL.
  - No Google / eye / mail icons (user: no new icons).
  - Dialog has no `header`/`main` landmarks.
  - Node-ids still `_pending QA_` on the spec.
