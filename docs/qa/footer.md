# QA — feat/footer (RSS-QS-1-4-7)

- Branch: `feat/footer` (`9c3c53c` + this report)
- Draft: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Home Footer `2:468` (375), `2:252` (768), `1:211` (1920)
- Base URL: `http://127.0.0.1:5173/minigames/` (Vite `npm run dev` on `feat/footer`)
- Evidence this run: **none for paint**. Figma MCP `get_design_context` / `get_metadata` / `get_screenshot` → **402 / Starter plan rate limit**. No repo/session cache with **fills + strokes + effects** for these node-ids. No user Dev Mode paste. Same-PR `tokens.scss` / `docs/specs/footer.md` are **not** ground truth.
- Live: Playwright MCP, viewports 375 / 768 / 1920 (+ fluid 520, centered 2000)
- Re-QA: first write of `docs/qa/footer.md`. Not a reused PASS.

## Why this run is not PASS

1. **Paint table incomplete.** Every painted child needs fill + stroke (weight + inside/outside + hex) + effect from **that** canvas id. Geometry-only / guidebook «place» / live↔tokens is not color or effect PASS.
2. **Invented icons.** `src/assets/icons/share.svg`, `chat.svg`, `rss-feed.svg`, `code.svg` are Material-style 24×24 path drawings (typical MD `share` / `chat` / `rss_feed` / `code` outlines), not Figma exports of glyphs `1:235` / `1:237` / `1:239` / `13:2311`. Skill: invented SVG → **FAIL**, never non-blocking.

## Developer-reported nodes (unverified on canvas this run)

| Breakpoint | Footer | Key children |
| --- | --- | --- |
| 375 | `2:468` | brand `2:469`, tagline `2:472`, links `2:473`, community `2:484`, socials `2:487`/`2:489`/`2:491`, bottom `2:493`, RS `13:2346`, GitHub `13:2350` |
| 768 | `2:252` | top `2:253`, links row `2:258`, community `2:267`, socials `2:270`/`2:272`/`2:274`, bottom `13:2329`, RS `13:2332`, GitHub `13:2336` |
| 1920 | `1:211` | top `1:212`, Explore `1:219`, Company `1:225`, Community `1:231`, socials `1:234`/`1:236`/`1:238` (`share`/`chat`/`rss_feed`), bottom `1:240`, RS `13:2305`, GitHub `13:2309` (`code` `13:2311`) |

## Paint table (mandatory)

Instance columns are **missing** (MCP 402, no fills/effects cache, no user paste). Live computed is recorded for smoke only — **not** a match column vs canvas.

| Surface | node-id | Family | Fill (instance) | Stroke (weight + inside/outside + hex) | Effect / shadow | Live computed (1920 unless noted) | Match |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Footer section | `1:211` / `2:252` / `2:468` | footer | **missing** | **missing** | **missing** | bg `#1e1b3a`; border `0`; `box-shadow: none`; overflow visible | BLOCKED |
| Brand / title | `2:469` / (tablet via `2:253`) | text | **missing** | **missing** | **missing** | color `#ffffff`; bg transparent; shadow none | BLOCKED |
| Tagline | `2:472` | text | **missing** | **missing** | **missing** | color `#b9b5c9`; bg transparent; shadow none | BLOCKED |
| Explore / Company links | `1:219` / `1:225` / `2:473` / `2:258` | text | **missing** | **missing** | **missing** | link color `#b9b5c9`; bg transparent; shadow none | BLOCKED |
| Community group | `1:231` / `2:267` / `2:484` | group | **missing** | **missing** | **missing** | title `#ffffff`; bg transparent; shadow none | BLOCKED |
| Social chip (share) | `1:234` / `2:270` / `2:487` | social | **missing** | **missing** | **missing** | 1920: 40×40, bg `#2a264f`, radius 999px, border 0, shadow none; hover `#3c376e`; 375/768: 32×32 same fill | BLOCKED |
| Social chip (chat) | `1:236` / `2:272` / `2:489` | social | **missing** | **missing** | **missing** | same live as share chip | BLOCKED |
| Social chip (rss) | `1:238` / `2:274` / `2:491` | social | **missing** | **missing** | **missing** | same live as share chip | BLOCKED |
| Bottom bar | `1:240` / `13:2329` / `2:493` | divider | **missing** | **missing** | **missing** | `border-top: 1px solid #3c376e`; bg transparent; shadow none | BLOCKED |
| RS School mark | `13:2305` / `13:2332` / `13:2346` | credit | **missing** | **missing** | **missing** | mark bg `#ffd02b`, text `#242145`; 375/768 20×20; 1920 24×24; shadow none | BLOCKED |
| GitHub / code wrap | `13:2309` / `13:2336` / `13:2350` (`code` `13:2311`) | credit | **missing** | **missing** | **missing** | wrap bg `#ffffff`, radius 999px; 375/768 20×20; 1920 24×24; shadow none | BLOCKED |

## Live layout (not vs instance — instance geometry not pulled this run)

Scrollbar artifact: at viewport 1920, `clientWidth` **1905**; footer **1905** wide; content track **1665** (gutter still 120). At viewport **2000**, `#app` is **1920** centered (`margin` 32.5); footer **1920** × **345**; padding `40px 120px` → track **1680**. Do not treat 1665 as a gutter bug.

| Breakpoint | Metric | Live |
| --- | --- | ---: |
| 375 | footer w × h | 375 × **529** |
| 375 | padding / gap | 32×16 / 24 |
| 375 | content w (top) | 343 |
| 375 | «Designed with love» | hidden |
| 375 | H-scroll | none (`scrollWidth` 375) |
| 768 | footer w × h | 753 × **431** (viewport 768 − scrollbar) |
| 768 | padding / gap | 40 / 40 |
| 768 | nav groups | row, gap 40; Explore/Company/Community |
| 768 | bottom | row space-between; love visible; credits `display: contents` |
| 768 | H-scroll | none (`scrollWidth` 753 ≤ client) |
| 1920 | footer w × h | 1905 × **345** (scrollbar); true 1920 shell: **1920 × 345** |
| 1920 | padding | `40px 120px` |
| 1920 | top | row space-between; brand-block max **400**; groups gap **80** |
| 1920 | title | 24px `#ffffff` |
| 520 | H-scroll | none; love hidden; footer h 524 |
| 2000 | `#app` | max-width 1920, centered |

Same-PR tokens claim draft heights 524 / 429 / 343. Live − token: 375 **Δ +5**, 768 **Δ +2**, 1920 **Δ +2**. **Not** a canvas PASS (heights not confirmed from this node’s metadata this run).

## Semantics & smoke

- Landmark: `footer.footer`
- Explore / Company: `nav` + `h2` + lists; Community is a `div` + `h2` + `ul` (labelled)
- Nav + social `href` = `/minigames/` (Home); cursor `pointer`
- RS School → `https://rs.school/` `target=_blank` `rel=noopener noreferrer`
- GitHub → `https://github.com/Bogagree`, visible `@Bogagree` (not `@student-nickname`)
- Logo: existing `logo-mark.png` (64×64 natural, 32×32 rendered)
- Social hover fill live `#3c376e` (not instance-confirmed)
- No horizontal overflow from 375+ in checked widths

## Assets

| File | Verdict |
| --- | --- |
| `src/assets/icons/logo-mark.png` | existing product mark; not newly invented this PR |
| `share.svg` / `chat.svg` / `rss-feed.svg` / `code.svg` | **FAIL** — invented Material paths, not draft glyph exports |

## Unblock

Need one of: MCP `get_design_context` on **each child id**, or a fills/strokes/effects cache, or user Dev Mode paste / panel for those ids; plus **Figma-exported** SVGs for `share` / `chat` / `rss_feed` / `code`.

## QA result

- Status: FAIL
- Draft: https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=1-211 (nodes: `2:468` / `2:252` / `1:211` + children in table above)
- Evidence: **missing** (MCP 402; no cache-with-paint; no user-paste)
- Paint evidence: **missing** for every in-scope child — not PASS
- Report: overwrote `docs/qa/footer.md` this run (not a reused PASS; file was absent)
- Breakpoints:
  - 375: BLOCKED — live 529×375; paint/geometry vs `2:468` unconfirmed
  - 768: BLOCKED — live 431h; paint/geometry vs `2:252` unconfirmed
  - 1920: BLOCKED — live 345h, gutter 120, track 1680 in 1920 shell; paint/geometry vs `1:211` unconfirmed
- Blocking defects:
  - Figma paint (fill + stroke + effect) not available for any listed child node-id (MCP rate limit)
  - Invented Community/GitHub SVGs (`share` / `chat` / `rss-feed` / `code`) instead of draft glyph exports
- Non-blocking:
  - Scrollbar shrinks client width at 768/1920; gutters stay 40/120 — not a gutter shrink
  - Community group is `div`, not `nav`
  - Live↔same-PR token height Δ +2…+5 only (not canvas evidence)
