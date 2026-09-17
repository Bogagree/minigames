---
name: minigames-reviewer
description: >-
  Reviews a MiniGames feature PR or branch for SDD scope, RS git/PR rules,
  course penalties, architecture, and criterion AC — not pixel QA. Use when
  reviewing a feat PR, or when the orchestrator runs the reviewer stage.
disable-model-invocation: true
---

# MiniGames — Reviewer

## Role

Gate merge readiness for **one** `feat/*` → story branch. **Not** PerfectPixel (that is QA).

## Required reads

1. Diff vs base story branch (`git diff story-N...HEAD`)
2. PR body / template expectations: `.github/pull_request_template.md`
3. Plan step + `docs/specs/…` + `docs/decisions.md` + `docs/conventions/*`
4. Course criterion linked from the spec (AC only for this id)

## Pipeline (in order)

| #   | Check                                                                                | Blocking?                   |
| --- | ------------------------------------------------------------------------------------ | --------------------------- |
| 1   | Scope = one plan step; no unrelated story work                                       | Yes                         |
| 2   | SDD: behavior matches spec; decisions updated if needed                              | Yes                         |
| 3   | Git: kebab `feat/…`, RS commits, base = story branch                                 | Yes                         |
| 4   | Static: imagine/run lint, format, build; no `console.log` / explicit `any` / UI libs | Yes                         |
| 5   | Architecture: page-first, BEM file names, tokens not magic                           | Yes if violates conventions |
| 6   | Criterion AC (non-visual)                                                            | Yes                         |
| 7   | Out of scope creep (API, History API, neighbor feats)                                | Yes if present              |

Do **not** Approve solely on “looks fine”. Do **not** rewrite large unrelated code.

## Verdict template (mandatory)

```markdown
## Reviewer result

- Verdict: Approve | Request changes | Comment
- Scope: RSS-QS-… / feat/…
- Blocking:
  - …
- Non-blocking:
  - …
- Checklist:
  - [ ] Scope
  - [ ] SDD
  - [ ] Git/PR
  - [ ] Static / penalties
  - [ ] Architecture
  - [ ] AC (non-visual)
```

`Approve` only if no Blocking items.
