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

| Allowed baseline                                          | Forbidden baseline                                    |
| --------------------------------------------------------- | ----------------------------------------------------- |
| Figma draft node geometry                                 | `tokens.scss` / CSS values written in the **same** PR |
| Spec numbers **copied from Figma** and cited with node-id | “matches tokens” without Figma citation               |
| User-provided measurements                                | Guessing from screenshots alone for ±10px PASS        |

If **no** Figma evidence is available (MCP rate limit **and** no cache **and** no user numbers):

- Status: **`BLOCKED`** (not PASS, not FAIL)
- List which nodes/metrics could not be verified
- Ask user for `node-id` link or Dev Mode sizes
- Orchestrator must **not** open/update PR as green UI until unblocked **or** user explicitly accepts risk

## Checks

1. Breakpoints: **375**, **768**, **1920** (and fluid between — no horizontal scroll from 375+).
2. Per major block in scope: measure vs Figma — **section padding / content width**, heights, gaps, card sizes, font sizes. **Δ ≤ 10px**.
3. Always record **content/track width** when the draft defines a content frame (e.g. desktop track **1680** at gutter **120** on 1920).
4. Semantics: landmark/`header`/`nav`/`main`/buttons as appropriate — not only `div`.
5. Interactive: cursor, default/hover/active where in style guide; disabled if present.
6. Assets: real logo/icons (not screenshot layout); sizes match draft.
7. No layout break above 1920 (centered, side margins grow) if globals apply.
8. Note scrollbar artifact (client width &lt; 1920) separately — do not “fix” by shrinking gutters unless Figma says so.

## Method

1. Resolve draft `fileKey` from `docs/specs/overview.md`; collect node-ids from spec or user.
2. Pull Figma numbers (MCP → else cache → else user paste).
3. Run app; set viewport 375 → 768 → 1920; measure bounding boxes / computed styles.
4. Compare **live − Figma**, not live − tokens.
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
- Breakpoints:
  - 375: PASS|FAIL|BLOCKED — notes / Δ
  - 768: PASS|FAIL|BLOCKED — notes / Δ
  - 1920: PASS|FAIL|BLOCKED — notes / Δ
- Blocking defects:
  - …
- Non-blocking:
  - …
```

`PASS` only if no Blocking defects, all three breakpoints PASS, and Evidence ≠ missing.
