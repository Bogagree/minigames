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
- Feature spec (e.g. `docs/specs/header.md`) + node hints from draft
- Figma MCP: `fileKey` from draft URL only
- Browser: Playwright or Cursor browser at `BASE_URL` (dev or preview)

## Checks

1. Breakpoints: **375**, **768**, **1920** (and fluid between — no horizontal scroll from 375+).
2. Per major block in scope: measure vs Figma (height, padding, gaps, font sizes). **Δ ≤ 10px**.
3. Semantics: landmark/`header`/`nav`/`main`/buttons as appropriate — not only `div`.
4. Interactive: cursor, default/hover/active where in style guide; disabled if present.
5. Assets: real logo/icons (not screenshot layout); sizes match draft.
6. No layout break above 1920 (centered, side margins grow) if globals apply.

## Method

1. `get_design_context` / screenshot for the target Figma node(s).
2. Run app; set viewport 375 → 768 → 1920; screenshot each.
3. Compare with numbers (bounding boxes / computed styles), not vibes.
4. Exercise critical clicks from AC (e.g. Log In opens dialog) — smoke only.

## Artifact (mandatory)

Persist the verdict in the **same PR** as the feature (or fix branch):

- Path: `docs/qa/<feat-slug>.md`  
  Example: `feat/header-unauthenticated` → `docs/qa/header-unauthenticated.md`
- Include the `## QA result` block below; add a short measurements table when useful.
- **Do not** commit binary screenshots (PNG/JPEG) — numbers + notes only.
- Chat handoff still ends with the same `## QA result` block.

## Verdict template (mandatory)

```markdown
## QA result

- Status: PASS | FAIL
- Draft: <figma url or fileKey>
- Breakpoints:
  - 375: PASS|FAIL — notes / Δ
  - 768: PASS|FAIL — notes / Δ
  - 1920: PASS|FAIL — notes / Δ
- Blocking defects:
  - …
- Non-blocking:
  - …
```

`PASS` only if no Blocking defects and all three breakpoints PASS.
