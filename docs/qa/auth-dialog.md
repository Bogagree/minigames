# QA — feat/auth-dialog (RSS-QS-1-5-1 … RSS-QS-1-5-5)

- Branch: `feat/auth-dialog`
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) (`fileKey` `hkWWcHFefT8fIxSmQvvXMb`) — section **Dialog windows** (Login / Registration). Course Figma not used.
- Node-ids: **unresolved** (`_pending QA_` in [specs/auth-dialog.md](../specs/auth-dialog.md)). This run did not receive MCP child dumps.
- Base URL: `http://127.0.0.1:5173/minigames/`
- Live: Playwright MCP, viewports **375 × 812**, **768 × 1024**, desktop innerWidth **2000** (scrollbar artifact vs 1920)
- Re-QA: first write of `docs/qa/auth-dialog.md`. Not a reused PASS.

## Why this run is not PASS

Figma MCP Starter returned **402 rate-limit** on `get_metadata` (`fileKey` `hkWWcHFefT8fIxSmQvvXMb`) before child `get_design_context` / `get_screenshot`. Repo has **no** fills/strokes/effects cache for Dialog windows. No user Dev Mode paste this run.

Per QA skill: paint expected column must come from **this node-id** (fill + stroke weight/inside-outside + effect), not same-PR `tokens.scss` / spec / guidebook «place». Geometry-only metadata was not available either. Missing instance paint → children **BLOCKED** → run **not PASS**.

**Ask:** paste Dev Mode (fill / stroke / effect + node-ids) for Login and Registration frames under **Dialog windows**, including painted children (panel, close, tabs, inputs, submit, hint/link, backdrop).

## Paint table

Expected fill / stroke / effect: **missing** (no MCP-child, no cache-with-paint, no user-paste). Live column is `getComputedStyle` only — **not** a color PASS vs tokens.

| Surface                                   | node-id               | Family        | Fill                                              | Stroke (weight + inside/outside + hex) | Effect / shadow (X/Y/blur/spread/color/opacity) | Live computed                                                                                                                                                      | Match             |
| ----------------------------------------- | --------------------- | ------------- | ------------------------------------------------- | -------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| Dialog panel `.auth-dialog`               | unresolved            | dialog chrome | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | bg `rgb(249, 248, 243)`; color `rgb(36, 33, 69)`; border `2px solid rgb(36, 33, 69)`; radius `12px`; padding `24px`; `box-shadow: rgb(36, 33, 69) 4px 4px 0px 0px` | BLOCKED           |
| Backdrop `::backdrop`                     | unresolved            | overlay       | BLOCKED                                           | n/a                                    | n/a                                             | `color(srgb 0.141176 0.129412 0.270588 / 0.4)` opacity `1`                                                                                                         | BLOCKED           |
| Close control `.auth-dialog__close`       | unresolved            | icon button   | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | fill `rgba(0,0,0,0)`; border `none`; `box-shadow: none`; 32×32                                                                                                     | BLOCKED           |
| Close icon `close.svg`                    | n/a (existing export) | asset         | n/a (user: no new icons; do not FAIL missing eye) | n/a                                    | n/a                                             | 32×32 data URL of `src/assets/icons/close.svg` (`#2A264F` rect + white X)                                                                                          | n/a (asset reuse) |
| Tab Login (inactive when on Registration) | unresolved            | tab           | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | fill transparent; color `rgb(95, 93, 117)`; weight 500; bottom `2px solid rgb(229, 231, 235)`                                                                      | BLOCKED           |
| Tab Login (active)                        | unresolved            | tab           | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | fill transparent; color `rgb(36, 33, 69)`; weight 700; bottom `2px solid rgb(255, 208, 43)`                                                                        | BLOCKED           |
| Tab Registration (inactive)               | unresolved            | tab           | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | same family as inactive Login                                                                                                                                      | BLOCKED           |
| Tab Registration (active)                 | unresolved            | tab           | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | same family as active Login                                                                                                                                        | BLOCKED           |
| Label `.auth-dialog__label`               | unresolved            | text          | BLOCKED                                           | none live                              | none                                            | fill transparent; color `rgb(36, 33, 69)`; 14px / 500                                                                                                              | BLOCKED           |
| Input default `.auth-dialog__input`       | unresolved            | field         | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | bg `rgb(255, 255, 255)`; color `rgb(36, 33, 69)`; border `2px solid rgb(229, 231, 235)`; radius `8px`; `box-shadow: none`; 40px min-height                         | BLOCKED           |
| Submit `.auth-dialog__submit`             | unresolved            | CTA           | BLOCKED                                           | BLOCKED                                | BLOCKED                                         | bg `rgb(255, 208, 43)`; color `rgb(36, 33, 69)`; border `2px solid rgb(36, 33, 69)`; radius `8px`; `box-shadow: none`; ~41px height                                | BLOCKED           |
| Hint `.auth-dialog__hint`                 | unresolved            | text          | BLOCKED                                           | none                                   | none                                            | fill transparent; color `rgb(95, 93, 117)`; 14px / 400                                                                                                             | BLOCKED           |
| Inline link `.auth-dialog__link`          | unresolved            | text button   | BLOCKED                                           | none                                   | none                                            | fill transparent; color `rgb(58, 46, 191)`; weight 700; underline                                                                                                  | BLOCKED           |

Shadow note: live `box-shadow` is on `.auth-dialog`, which also has `overflow-x: hidden` and `overflow-y: auto`. Visible-shadow PASS is not possible this run (no instance + possible clip). Do not treat `getComputedStyle` shadow as instance match.

Eye / password-visibility icon: not in draft per spec + user; **not a FAIL**.

## Layout (live only — no Figma Δ)

Cannot compute Δ vs canvas without node geometry. Spec-shaped live sizes (not used as paint expected):

| Viewport                |      Dialog width | Dialog height | Position                  | H-scroll                  |
| ----------------------- | ----------------: | ------------: | ------------------------- | ------------------------- |
| 375                     | 343 (`100% − 32`) |           445 | x=16, centered vertically | none (`scrollWidth` 375)  |
| 768                     |               420 |           445 | x=174 = (768−420)/2       | none                      |
| ~1920 (innerWidth 2000) |               420 |           445 | x=790 = (2000−420)/2      | none on `#app` 1920 track |

Tablet/desktop **420px** matches spec; mobile **343px** matches `100% − 32px`, max 420.

## Semantics & smoke

- Singleton `<dialog class="auth-dialog">` `aria-modal="true"`; `header` / `main` present.
- Login form: `email` + `password`. Registration: `text` nickname + `email` + `password`. Submit `preventDefault` (no reload).
- Tabs `role="tablist"` / `tab` / `tabpanel`; active ≠ inactive (weight + underline color).
- Header **Log In** → login; header **Sign Up** → registration (desktop). Tablet header **Sign Up** → registration; burger **Log In** → login and burger `hidden` + `aria-hidden="true"`.
- Mobile: no header auth buttons; burger **Sign Up** → registration, burger dismissed.
- Dismiss: close (`aria-label="Close dialog"`), **Esc**, backdrop (`dialog.click()` with `target === dialog`). Body scroll lock cleared after close.
- Inline **Register** / **Login** switch mode without reload.
- Close asset is existing `src/assets/icons/close.svg`, not a new icon.

## QA result

- Status: BLOCKED
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1 (`hkWWcHFefT8fIxSmQvvXMb`) (nodes: unresolved — spec still `_pending QA_` for Login / Registration / style-guide inputs)
- Evidence: none (MCP 402; no cache-with-paint; no user-paste)
- Paint evidence: missing for every painted child → not PASS
- Report: overwrote docs/qa/auth-dialog.md this run (not a reused PASS)
- Breakpoints:
  - 375: BLOCKED — smoke OK (burger Log In / Sign Up, width 343, no H-scroll); paint/Δ vs instance unavailable
  - 768: BLOCKED — smoke OK (header Sign Up + burger Log In, width 420, no H-scroll); paint/Δ vs instance unavailable
  - 1920: BLOCKED — smoke OK (header Log In / Sign Up, width 420, centered); paint/Δ vs instance unavailable (Playwright innerWidth 2000 scrollbar artifact)
- Blocking defects:
  - Figma MCP Starter **402**; cannot resolve Dialog windows child node-ids or fills/strokes/effects. Need Dev Mode paste (or MCP quota) for Login + Registration frames and painted children.
- Non-blocking:
  - Possible clip of hard shadow: `overflow-x: hidden` + `overflow-y: auto` on the same dialog box as `box-shadow` (cannot judge vs instance).
  - No password-visibility / eye control (expected: none in draft; existing close.svg only).
  - Submit CTA live `box-shadow: none` — cannot FAIL or PASS without the instance effect.
