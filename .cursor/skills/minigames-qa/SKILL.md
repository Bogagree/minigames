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
- Feature spec (e.g. `docs/specs/header.md`) + **Figma node-id(s)** for the block
- Figma evidence (one of, in order):
  1. Figma MCP `get_metadata` / `get_screenshot` / `get_design_context` on draft `fileKey`
  2. Cached metadata from this repo/session that quotes **absolute** Figma geometry (`x`, `width`, `height` for the node)
  3. User-pasted Dev Mode numbers / panel screenshots / `node-id` link
- Browser: Playwright or Cursor browser at `BASE_URL` (prefer `http://127.0.0.1:…`, not `localhost`)

## Ground truth (mandatory)

Which **token name** belongs on a surface is decided by the **Home (or page) instance fill/stroke**, not by the guidebook column «place» alone.

| Allowed baseline                                                                                              | Forbidden baseline                                            |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Draft **instance** node: geometry **and** fill/stroke/radius (MCP screenshot + Dev Mode hex, cited `node-id`) | `tokens.scss` / CSS / `docs/specs` written in the **same** PR |
| Guidebook hex **only** to name a token after the instance hex is known                                        | “matches tokens” / “matches spec” without canvas `node-id`    |
| User Dev Mode paste / panel screenshot for that node                                                          | Guessing from a zoomed-out section screenshot for color PASS  |
| Cached metadata that includes **fills**, not only `x/width/height`                                            | Layout Δ ≤ 10px as a substitute for color checks              |

If **no** Figma evidence is available (MCP rate limit **and** no cache **and** no user numbers):

- Status: **`BLOCKED`** (not PASS, not FAIL)
- List which nodes/metrics could not be verified
- Ask user for `node-id` link or Dev Mode sizes
- Orchestrator must **not** open/update PR as green UI until unblocked **or** user explicitly accepts risk

If the **spec in this PR contradicts the canvas instance** (e.g. spec says header outline, node `2:17` is tertiary): **FAIL** (or BLOCKED until hex confirmed). Do **not** PASS because live matches the spec.

## Checks

1. Breakpoints: **375**, **768**, **1920** (and fluid between — no horizontal scroll from 375+).
2. Per major block in scope: measure vs Figma — **section padding / content width**, heights, gaps, card sizes, font sizes. **Δ ≤ 10px**.
3. Always record **content/track width** when the draft defines a content frame (e.g. desktop track **1680** at gutter **120** on 1920).
4. **Fills / strokes** on every painted child in scope (see Color below). Geometry-only is not a color PASS.
5. Semantics: landmark/`header`/`nav`/`main`/buttons as appropriate — not only `div`.
6. Interactive: cursor, default/hover/active where in style guide; disabled if present.
7. Assets: **Figma export** in `src/assets/` (not an invented SVG/drawing). Invented stand-in → **FAIL**. If the export is missing, **BLOCKED** and ask the user to download (same signal as Developer `ASSET BLOCKED`).
8. No layout break above 1920 (centered, side margins grow) if globals apply.
9. Note scrollbar artifact (client width &lt; 1920) separately — do not “fix” by shrinking gutters unless Figma says so.

## Color (mandatory for tables, chips, avatars, buttons, borders)

Open **child** nodes, not only the section frame. Example leaderboard: Table `2:16`, Header `2:17`, odd/even body rows (`2:30` / `2:46`, …), chip, avatar.

Record a table:

| Surface | Figma node-id | Figma fill / stroke / radius | Live computed | Match |

Live rules:

- Compare **computed** `backgroundColor`, `color`, `borderWidth`, `borderColor`, `borderRadius` to the **instance** hex — not to CSS variable names.
- `rgba(0,0,0,0)` is **transparent** (shows parent fill). Do not report it as `#000000`.
- Odd/even table rows are **different nodes**. Measure at least one odd and one even body row.
- Guidebook «table header» / «border» labels do not override a different fill on the Home instance.

## Method

1. Resolve draft `fileKey` from `docs/specs/overview.md`; collect **child** node-ids from spec or layers (header, rows, chips — not only the section).
2. Pull Figma geometry **and** fills (MCP `get_screenshot` / `get_design_context` on those ids → else user paste → else BLOCKED for color). Cache of `x/width/height` alone is **not** color evidence.
3. Run app; set viewport 375 → 768 → 1920; measure bounding boxes **and** computed colors.
4. Compare **live − Figma instance**, not live − tokens, not live − same-PR spec.
5. Exercise critical clicks from AC — smoke only.

## Artifact (mandatory)

Persist the verdict in the **same PR** as the feature (or fix branch):

- Path: `docs/qa/<feat-slug>.md`  
  Example: `feat/header-unauthenticated` → `docs/qa/header-unauthenticated.md`
- Include the `## QA result` block below; add a short measurements table when useful.
- If re-QA after a false PASS: document **why** prior PASS was invalid.
- **Do not** commit binary screenshots (PNG/JPEG) — numbers + notes only.
- Chat handoff still ends with the same `## QA result` block.

## Verdict template (mandatory)

```markdown
## QA result

- Status: PASS | FAIL | BLOCKED
- Draft: <figma url or fileKey> (nodes: …)
- Evidence: MCP | cache | user-paste
- Color evidence: instance nodes … (fills/strokes) | missing → not PASS
- Breakpoints:
  - 375: PASS|FAIL|BLOCKED — notes / Δ
  - 768: PASS|FAIL|BLOCKED — notes / Δ
  - 1920: PASS|FAIL|BLOCKED — notes / Δ
- Blocking defects:
  - …
- Non-blocking:
  - …
```

`PASS` only if no Blocking defects, all three breakpoints PASS, Evidence ≠ missing, and **color table vs instance nodes is complete** for every painted child in scope (or Color evidence is explicitly N/A for non-visual diffs).
