---
name: minigames-qa
description: >-
  Visual and layout QA for MiniGames UI against the personal Figma draft at
  375/768/1920 (±10px), semantics, states, overflow. Use for pixel-check,
  layout QA, or when the orchestrator runs the QA stage after reviewer Approve.
disable-model-invocation: true
---

# MiniGames — QA

## Role

**Pixel / layout verification** for the changed UI vs the **working Figma draft** in `docs/specs/overview.md`. Not a full code review (that is Reviewer).

## Required inputs

- Branch or local build of the feature
- Feature spec (e.g. `docs/specs/header.md`) + **Figma node-id(s)** for the section **and** every painted child in scope
- Figma evidence (one of, in order) — split by what it can prove:
  1. MCP `get_design_context` / `get_screenshot` on the **child** `node-id` (not only the section), or user Dev Mode paste / panel screenshot for that id
  2. Repo/session cache that includes **fills, strokes (weight + inside/outside), and effects** for that id
  3. `get_metadata` / cache with only `x` / `width` / `height` — **geometry only**. Not color PASS. Not effect PASS. Not “evidence #2” for paint.
- Browser: Playwright or Cursor browser at `BASE_URL` (prefer `http://127.0.0.1:…`, not `localhost`)

If MCP is 402 / rate-limited: **BLOCKED** (not PASS from guidebook memory or same-PR tokens). Ask the user for Dev Mode paste or a download. Do not invent.

## Ground truth (mandatory)

Which **token name** belongs on a surface is decided by **this node’s Home (or page) instance** fill / stroke / effect — not by the guidebook column «place», not by a neighbor block, not by `tokens.scss` / spec in the **same** PR.

Hex is recorded **only after** the instance is read. Guidebook may **name** the token once the instance hex is known. Guidebook hex is never the expected column.

| Allowed baseline                                                            | Forbidden baseline                                                |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| This `node-id`: fill + stroke (weight, inside/outside, hex) + effect/shadow | Same-PR `tokens.scss` / CSS / `docs/specs` as expected            |
| Guidebook **name** after instance hex is known                              | Guidebook «place» hex as expected (zebra/chip/header)             |
| User Dev Mode paste / panel for **this** id                                 | Neighbor chrome (“all cards share one border”)                    |
| Cache **with fills + strokes + effects**                                    | Geometry cache (`x/width/height`) as color/effect evidence        |
| Visible shadow on an ancestor that is not `overflow: hidden`                | `getComputedStyle` / element shot of a clipped box as shadow PASS |

If **no** paint evidence for a painted child (MCP fail **and** no fills/effects cache **and** no user paste): that child is **BLOCKED**, the run is not PASS.

If the **spec in this PR contradicts the canvas instance**: **FAIL** (or BLOCKED until hex/effect confirmed). Do **not** PASS because live matches the spec.

## Checks

1. Breakpoints: **375**, **768**, **1920** (and fluid between — no horizontal scroll from 375+).
2. Per major block in scope: measure vs Figma — **section padding / content width**, heights, gaps, card sizes, font sizes. **Δ ≤ 10px**.
3. Always record **content/track width** when the draft defines a content frame (e.g. desktop track **1680** at gutter **120** on 1920).
4. **Paint** on every painted child in scope (fill, stroke, effect). Geometry-only is not a color/effect PASS.
5. Semantics: landmark/`header`/`nav`/`main`/buttons as appropriate — not only `div`.
6. Interactive: cursor, default/hover/active where in style guide; disabled if present.
7. Assets: file in `src/assets/` must be the **Figma export**. Invented SVG/drawing (including when a jpg already exists in the draft) → **FAIL**, never non-blocking. MCP 402 / rate-limit / empty export → **BLOCKED** + Developer `ASSET BLOCKED` signal (user downloads). Do not invent.
8. No layout break above 1920 (centered, side margins grow) if globals apply.
9. Note scrollbar artifact (client width &lt; 1920) separately — do not “fix” by shrinking gutters unless Figma says so.

## Paint table (mandatory)

Opening the **section** is not enough. Every painted child in scope needs its own row. Missing instance + fill/stroke/effect for a child → that child is not PASS (**BLOCKED** or **FAIL**).

Leaderboard-shaped scope (example — use the ids actually on the canvas): header `2:17`; outer table chrome (same family as `.slider__card`, not “2px from `2:16`” as a slogan); body rows `2:30` / `2:46` / `2:62` / `2:78` / `2:94`; chip `2:44`; avatars; CTA `10:2250` / `12:2269` / `12:2288`.

**Family chrome:** carousel card ≠ table ≠ CTA. Stroke/effect only from **this** `node-id`. Do not copy `--shadow-card` onto CTA or drop table shadow because a neighbor has none — unless the user said «как у X».

Required columns:

| Surface | node-id | Family | Fill | Stroke (weight + inside/outside + hex) | Effect / shadow (X/Y/blur/spread/color/opacity) | Live computed | Match |

Stroke: `2px` ≠ `2.5px`; **inside** ≠ outside. Example CTA `10:2250`: inside 2, Drop shadow `0 / 14 / 30 / −10`, `#000` 7.84% (`--shadow-cta`). Table outer chrome must match **that** table instance (typically `--border-width-card` + `--shadow-card`), not a remembered 2px.

Live rules:

- Compare computed `backgroundColor`, `color`, `borderWidth`, `borderColor`, `borderStyle`, `borderRadius`, `boxShadow` to the **instance** — not to CSS variable names.
- `rgba(0,0,0,0)` is **transparent**. Do not report it as `#000000`.
- Odd/even rows are **different nodes**. Measure at least one odd and one even body row (first body row is odd).
- Effects: if the instance has Drop shadow, live `box-shadow: none` → **FAIL**. If the instance has effects off, live shadow → **FAIL**.
- **Overflow vs shadow:** `overflow: hidden` on the same box clips `box-shadow`. Measure **visible** shadow on a wrapper/section that can show it (or a section screenshot). `getComputedStyle` / element screenshot of the clipped node is not a shadow PASS.

## Method

1. Resolve draft `fileKey` from `docs/specs/overview.md`. List **child** node-ids (not only the section).
2. Pull paint per child (`get_design_context` / `get_screenshot` on **that** id → else user paste → else BLOCKED). Geometry-only metadata is layout-only.
3. Run app; viewports 375 → 768 → 1920; measure boxes **and** computed fill/stroke/shadow (visible shadow if clipped).
4. Compare **live − this instance**, never live − tokens, live − same-PR spec, live − guidebook place, live − neighbor.
5. Exercise critical clicks from AC — smoke only.
6. **Overwrite** `docs/qa/<feat-slug>.md` every QA run. A file that still says PASS after live changed does **not** close the stage.

## Artifact (mandatory)

- Path: `docs/qa/<feat-slug>.md`
- Include `## QA result` + the paint table.
- Re-QA: rewrite the file; note why a prior PASS was invalid.
- **Do not** commit binary screenshots (PNG/JPEG) — numbers + notes only.

## False PASS cases (must FAIL or BLOCKED)

| Case               | Instance                                                     | False PASS                                 |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| Table header       | `2:17` tertiary `#3A2EBF` + white text                       | live/spec `#E5E7EB`                        |
| Table outer chrome | `.slider__card` / current table instance                     | 2px without `--shadow-card` or the reverse |
| Zebra              | odd body `2:30` `#F9F8F3`, even `2:46` white, from first row | even `#E5E7EB`, start on white             |
| Favorite chip      | `2:44` (fill transparent)                                    | `#E5E7EB` «from guidebook»                 |
| Avatars            | random-1…5 + stroke on-primary                               | one fill on every avatar                   |
| CTA card           | `10:2250`: white, inside 2px on-primary, `--shadow-cta`      | no border / `--shadow-card` / dots         |
| Illustration       | jpg from the draft                                           | generated SVG                              |

## Verdict template (mandatory)

```markdown
## QA result

- Status: PASS | FAIL | BLOCKED
- Draft: <figma url or fileKey> (nodes: …)
- Evidence: MCP-child | cache-with-paint | user-paste
- Paint evidence: each in-scope child has fill + stroke + effect from **that** node-id | missing → not PASS
- Report: overwrote docs/qa/<feat-slug>.md this run (not a reused PASS)
- Breakpoints:
  - 375: PASS|FAIL|BLOCKED — notes / Δ
  - 768: PASS|FAIL|BLOCKED — notes / Δ
  - 1920: PASS|FAIL|BLOCKED — notes / Δ
- Blocking defects:
  - …
- Non-blocking:
  - …
```

`PASS` only if: no blocking defects; all three breakpoints PASS; evidence is not missing; **paint table is complete** (fill **and** stroke **and** effect) for every painted child in scope; assets are exports not inventions; report file was written **this** run. Color evidence N/A only for non-visual diffs.
