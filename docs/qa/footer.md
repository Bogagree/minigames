# QA — feat/footer (RSS-QS-1-4-7)

- Branch: `feat/footer` (`aa63ab2` + this report)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=1-211) — fileKey `hkWWcHFefT8fIxSmQvvXMb`. Home Footer `2:468` (375), `2:252` (768), `1:211` (1920)
- Base URL: `http://127.0.0.1:5173/minigames/` (Vite `npm run dev` on `feat/footer`)
- Evidence this run:
  - **MCP:** `get_design_context` on `1:211` → **402 / Starter plan rate limit**. No child-id paint from canvas.
  - **Cache:** no repo/session fills + strokes + effects for footer node-ids. Geometry-only metadata not pulled (same 402).
  - **User-paste (footer FRAME only):** Figma right panel for selected desktop footer `1:211`: Fill token **`bg-footer`** (dark swatch; **hex not shown**); Stroke empty (`+` only) → **no stroke**; Effects empty (`+` only) → **no effect / no shadow**. Selection colors (lilac, white, dark +3) are **not** per-child evidence.
  - **User-provided paint (assets):** SVG exports in `src/assets/icons/` as listed below. Not evidence for text / divider / credit **frames**.
  - Same-PR `tokens.scss` / `docs/specs/footer.md` are **not** ground truth for expected hex. Do **not** treat live `#1e1b3a` as matching an expected hex copied from tokens.
- Live: Playwright MCP, viewports 375 / 520 / 768 / 1920 / 2000
- Re-QA: overwrote this file after `aa63ab2`. Prior report (`7928e4a`) was **BLOCKED** with **missing** fill/stroke/effect on section `1:211`. This run adds user-paste for that **frame** only. It is **not** a reused PASS; the run is still **not PASS**.

## Why this run is not PASS

1. **Painted children still lack instance paint.** Brand, tagline, nav links, community title, bottom divider, and credit **frames** have no Dev Mode paste / MCP / fills+effects cache for **those** node-ids. Skill: missing fill + stroke + effect on a painted child → that child **BLOCKED**, **run cannot be PASS**.
2. **Footer frame fill hex is unproven.** Paste names token `bg-footer` but does not show hex. Live computed `#1e1b3a` is recorded as live only. Hex match would require a non-same-PR source. Stroke **none** and effect **none** can match live `border 0` / `box-shadow: none`.
3. **375 / 768 frames** (`2:468` / `2:252`) were **not** pasted. Treated as the same family as `1:211` **only as an assumption** (MCP 402). Not independent color evidence.

## Developer-reported nodes (structure only; 375/768 ids unverified on canvas this run)

| Breakpoint | Footer  | Key children                                                                                                                                                                                     |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 375        | `2:468` | brand `2:469`, tagline `2:472`, links `2:473`, community `2:484`, socials `2:487`/`2:489`/`2:491`, bottom `2:493`, RS `13:2346`, GitHub `13:2350`                                                |
| 768        | `2:252` | top `2:253`, links row `2:258`, community `2:267`, socials `2:270`/`2:272`/`2:274`, bottom `13:2329`, RS `13:2332`, GitHub `13:2336`                                                             |
| 1920       | `1:211` | top `1:212`, Explore `1:219`, Company `1:225`, Community `1:231`, socials `1:234`/`1:236`/`1:238` (`share`/`chat`/`rss_feed`), bottom `1:240`, RS `13:2305`, GitHub `13:2309` (`code` `13:2311`) |

## Paint table (mandatory)

Live computed is 1920 unless noted. `rgba(0,0,0,0)` recorded as transparent. Fill **instance** hex is not taken from `tokens.scss`.

| Surface                 | node-id                                              | Family  | Fill (instance)                                                                                        | Stroke (weight + inside/outside + hex)  | Effect / shadow                         | Live computed                                                                                                                      | Match                                                                                      |
| ----------------------- | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Footer section          | `1:211` (375/768 `2:468`/`2:252` **assumed family**) | footer  | user-paste: token **`bg-footer`** (dark swatch); **hex not shown** — not `#1e1b3a` from tokens         | user-paste: **none** (Stroke `+` only)  | user-paste: **none** (Effects `+` only) | bg `#1e1b3a`; border `0px none`; `box-shadow: none`; overflow visible                                                              | stroke/effect **PASS vs paste**; fill hex **unproven** → row **not PASS**. 375/768 assumed |
| Brand / title           | `2:469` / (tablet via `2:253`)                       | text    | **missing** (no paste for this id)                                                                     | **missing**                             | **missing**                             | color `#ffffff`; bg transparent; shadow none; 375/768 20px; 1920 24px                                                              | **BLOCKED**                                                                                |
| Tagline                 | `2:472`                                              | text    | **missing**                                                                                            | **missing**                             | **missing**                             | color `#b9b5c9`; bg transparent; shadow none; 14px                                                                                 | **BLOCKED**                                                                                |
| Explore / Company links | `1:219` / `1:225` / `2:473` / `2:258`                | text    | **missing**                                                                                            | **missing**                             | **missing**                             | link color `#b9b5c9`; bg transparent; shadow none; hover `#ffffff` + underline (live only)                                         | **BLOCKED**                                                                                |
| Community group         | `1:231` / `2:267` / `2:484`                          | group   | **missing** (selection colors on `1:211` are not this id)                                              | **missing**                             | **missing**                             | title `#ffffff`; bg transparent; shadow none                                                                                       | **BLOCKED**                                                                                |
| Social chip (share)     | `1:234` / `2:270` / `2:487`                          | social  | **frame instance missing**; user SVG: chip `#2A264F`, glyph `white` (`#FFFFFF`)                        | SVG root `fill="none"`; no stroke attrs | none in SVG                             | `<img>` is export 40×40; wrapper bg **transparent**, border 0, shadow none, radius 999px; displayed 40×40 (1920) / 32×32 (375/768) | **PASS vs user SVG asset**; frame `1:234` still **BLOCKED**                                |
| Social chip (chat)      | `1:236` / `2:272` / `2:489`                          | social  | same as share (user SVG `#2A264F` + white glyph)                                                       | same                                    | none in SVG                             | same live as share                                                                                                                 | **PASS vs user SVG asset**; frame `1:236` still **BLOCKED**                                |
| Social chip (rss)       | `1:238` / `2:274` / `2:491`                          | social  | same as share (user SVG `#2A264F` + white glyph)                                                       | same                                    | none in SVG                             | same live as share                                                                                                                 | **PASS vs user SVG asset**; frame `1:238` still **BLOCKED**                                |
| Bottom bar              | `1:240` / `13:2329` / `2:493`                        | divider | **missing**                                                                                            | **missing** (no divider stroke paste)   | **missing**                             | `border-top: 1px solid #3c376e`; bg transparent; shadow none                                                                       | **BLOCKED**                                                                                |
| RS School mark          | `13:2305` / `13:2332` / `13:2346`                    | credit  | **frame instance missing**; user SVG `rs-logo-container.svg`: circle `#242145`, glyph `#FFD02B`, 24×24 | none in SVG                             | none in SVG                             | live `<img>` is that export; displayed 24×24 (1920) / 20×20 (375/768); wrap bg transparent; shadow none                            | **PASS vs user SVG asset**; instance still **BLOCKED**                                     |
| GitHub / code wrap      | `13:2309` / `13:2336` / `13:2350` (`code` `13:2311`) | credit  | **frame instance missing**; user SVG `github-icon.svg`: circle white, glyph `#242145`, 24×24           | none in SVG                             | none in SVG                             | live `<img>` is that export (not Material `code.svg`); displayed 24×24 (1920) / 20×20 (375/768); wrap bg transparent; shadow none  | **PASS vs user SVG asset**; instance still **BLOCKED**                                     |

Hover (live only, not instance): `.footer__social` `filter: brightness(1.15)` on hover; wrapper stays transparent (paint is inside SVG).

## Live layout (not vs instance — instance geometry not pulled this run)

Scrollbar: viewport 1920 → `clientWidth` **1905**; footer **1905**; content track **1665** (gutter still **120**). Viewport **2000**: `#app` **1920** centered (`margin` 32.5px); footer **1920 × 345**; padding `40px 120px` → track **1680**. Do not treat 1665 as a gutter shrink.

At 375: `innerWidth` 375, `clientWidth` 360, `scrollWidth` 375 (`scrollWidth` ≤ inner → no layout H-scroll beyond viewport). `scrollLeftMax` vs client is the classic scrollbar strip, not extra content width.

| Breakpoint | Metric               |                                                          Live |
| ---------- | -------------------- | ------------------------------------------------------------: |
| 375        | footer w × h         |                                                 375 × **533** |
| 375        | padding / gap        |                                                    32×16 / 24 |
| 375        | content w (top)      |                                                           343 |
| 375        | social / RS / GH     |                                                  32 / 20 / 20 |
| 375        | «Designed with love» |                                                        hidden |
| 375        | H-scroll vs inner    |                                      none (`scrollWidth` 375) |
| 768        | footer w × h         |                      753 × **431** (viewport 768 − scrollbar) |
| 768        | padding / gap        |                                                       40 / 40 |
| 768        | nav groups           |                        row, gap 40; Explore/Company/Community |
| 768        | bottom               |  row space-between; love visible; credits `display: contents` |
| 768        | H-scroll vs inner    |                             none (`scrollWidth` 753 ≤ client) |
| 1920       | footer w × h         |   1905 × **345** (scrollbar); true 1920 shell: **1920 × 345** |
| 1920       | padding              |                                                  `40px 120px` |
| 1920       | top                  | row space-between; brand-block max **400**; groups gap **80** |
| 1920       | title                |                                                24px `#ffffff` |
| 1920       | social / RS / GH     |                                                  40 / 24 / 24 |
| 520        | H-scroll             |                 none vs client; love hidden; footer h **524** |
| 2000       | `#app`               |                                      max-width 1920, centered |

Same-PR tokens claim draft heights 524 / 429 / 343. Live − token: 375 **Δ +9**, 768 **Δ +2**, 1920 **Δ +2**. **Not** a canvas PASS (heights not confirmed from this node’s metadata this run). Δ ≤ 10px vs those token numbers only — forbidden as expected baseline.

## Semantics & smoke

- Landmark: `footer.footer` (`contentinfo`)
- Explore / Company: `nav` + `h2` + lists; Community is a `div` + `h2` + `ul` (labelled)
- Nav + social `href` = `/minigames/` (Home); cursor `pointer`
- Footer Explore **Home** click stays on `http://127.0.0.1:5173/minigames/`
- RS School → `https://rs.school/` `target=_blank` `rel=noopener noreferrer`
- GitHub → `https://github.com/Bogagree`, visible `@Bogagree` (not `@student-nickname`)
- Logo: existing `logo-mark.png` (64×64 natural, 32×32 rendered)
- Console after hard reload: no errors (stale HMR `codeIconUrl` from an earlier session is **not** current)
- No content `scrollWidth` > `innerWidth` at 375 / 520 / 768 / 1920 / 2000

## Assets

| File                                      | Verdict                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `src/assets/icons/logo-mark.png`          | existing product mark; not newly invented this PR                                                      |
| `share.svg` / `chat.svg` / `rss-feed.svg` | user Figma SVG export: 40×40, chip `#2A264F`, glyph white; live `<img>` is this data-URL, not a redraw |
| `github-icon.svg`                         | user export: 24×24, circle white, glyph `#242145`; live img matches                                    |
| `rs-logo-container.svg`                   | user export: 24×24, circle `#242145`, glyph `#FFD02B`; live img matches                                |
| `code.svg`                                | **absent** (removed in `6cf1003`)                                                                      |

## Unblock

Need MCP `get_design_context` (or user Dev Mode paste / fills+strokes+effects cache) for remaining painted children: brand, tagline, nav, community chrome, bottom **divider stroke**, credit frames — and hex for `bg-footer` from the instance (not `tokens.scss`). Optional: paste `2:468` / `2:252` to drop the family assumption.

## QA result

- Status: BLOCKED
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=1-211 (nodes: `2:468` / `2:252` / `1:211` + children in table above)
- Evidence: user-paste for footer **frame** `1:211` (token name + empty stroke/effect); user-paste for **icon SVG assets**; MCP 402; no cache-with-paint for children
- Paint evidence: **incomplete**. Frame `1:211`: stroke/effect none vs live none; fill is token `bg-footer` **without hex**. Text, divider, credit frames still **missing** fill + stroke + effect from **those** ids — not PASS.
- Report: overwrote `docs/qa/footer.md` this run (not a reused PASS)
- Breakpoints:
  - 375: BLOCKED — live 533×375; paint/geometry vs `2:468` unconfirmed (family assumed from `1:211`)
  - 768: BLOCKED — live 431h; paint/geometry vs `2:252` unconfirmed (family assumed from `1:211`)
  - 1920: BLOCKED — live 345h, gutter 120, track 1680 in 1920 shell; child paint vs `1:211` children unconfirmed
- Blocking defects:
  - Figma paint (fill + stroke + effect) not available for painted children: brand, tagline, links, community title, bottom divider, credit frames (MCP 402; no per-id paste)
  - Footer frame fill hex unproven (token `bg-footer` only; do not use same-PR `#1e1b3a` as expected)
- Non-blocking:
  - Scrollbar shrinks client width at 375/768/1920; gutters stay 16/40/120 — not a gutter shrink
  - Community group is `div`, not `nav`
  - Social hover is CSS `brightness(1.15)` on a transparent wrapper (not instance-confirmed)
  - Live↔same-PR token height Δ +2…+9 only (not canvas evidence)
  - 375/768 footer frames assumed same family as `1:211`
