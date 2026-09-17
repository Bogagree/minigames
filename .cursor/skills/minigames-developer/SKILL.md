---
name: minigames-developer
description: >-
  Implements one MiniGames story feature step (feat/*) under SDD: reads specs
  and decisions, codes only in scope, updates docs, commits. Use when the user
  asks to implement a feat step, RSS-QS criterion, or when the orchestrator
  runs the developer stage.
disable-model-invocation: true
---

# MiniGames — Developer

## Role

Implement **one** plan step. Do not review the whole repo. Do not open PR (orchestrator does).

## Required reads (before code)

1. `docs/story-N-plan.md` — confirm step / branch name / `RSS-QS-…`
2. Matching `docs/specs/…` (+ feature spec if linked)
3. `docs/decisions.md`
4. `docs/conventions/code.md`, `docs/conventions/git.md`
5. UI: working Figma draft from `docs/specs/overview.md` (never the course-only file for layout)

## Workflow

1. Branch `feat/<kebab>` from current story base (`story-1`, …).
2. Implement only that criterion’s AC.
3. Tokens / BEM / page-first; no UI libs; no `console.log`; no explicit `any`.
4. Update spec status / feature spec if behavior clarified; new arch → `Accepted` in `decisions.md`.
5. `npm run lint` && `npm run format:check` && `npm run build` — must pass.
6. Commit(s) with RS convention (`feat:`, `fix:`, `docs:`, …). Push if orchestrator will PR.

## Stop conditions

- Missing / conflicting AC → ask user; do not guess across stories.
- Neighbor steps (e.g. burger panel while doing header) → leave stubs only if AC requires a hook; no full neighbor feature.

## Handoff output (mandatory)

```markdown
## Developer result

- Status: PASS | FAIL
- Branch: feat/…
- Criterion: RSS-QS-…
- Specs touched: …
- Commits: …
- Notes: …
```
