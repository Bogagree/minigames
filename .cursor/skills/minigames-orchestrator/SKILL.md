---
name: minigames-orchestrator
description: >-
  Multi-agent factory for MiniGames: runs developer → reviewer → QA in order,
  then opens a PR to the story branch only if all stages PASS/Approve. Use when
  the user asks for the agent factory, orchestrator, full feature pipeline,
  «разработчик ревьюер qa», or end-to-end feat with PR.
disable-model-invocation: true
---

# MiniGames — Orchestrator (agent factory)

## Goal

Ship **one** plan step as a PR into the story branch (`story-1`, …). User merges.

Pipeline (strict order):

1. **Developer** → `.cursor/skills/minigames-developer/SKILL.md`
2. **Reviewer** → `.cursor/skills/minigames-reviewer/SKILL.md`
3. **QA** → `.cursor/skills/minigames-qa/SKILL.md`
4. **PR** only if Developer PASS + Reviewer Approve + QA PASS

## Input from user

Require (or infer from plan + ask once if missing):

- Story base (`story-1`)
- Step / branch (`feat/…`) and `RSS-QS-…` id
- Optional: “docs-only” → skip QA stage

## How to run stages

Prefer **isolated subagents** (`Task`) with `model: inherit`. Each prompt must:

1. Say: read and follow the named `SKILL.md` completely.
2. Pass: repo path, base branch, feat name, criterion id, relevant spec paths.
3. Demand the skill’s **mandatory handoff/verdict block** as the final message.
4. Forbid merging into `main` / story branch; forbid skipping stages.

If Task is unavailable, run stages sequentially in one session by reading each skill in order — still emit each stage’s verdict block before continuing.

### Loop on failure

- Reviewer **Request changes** or QA **FAIL** → hand defects to Developer (same branch), re-run Reviewer, then QA.
- Max **2** fix loops unless user says continue.
- After max loops still red → stop; no PR; summarize blockers.

### Docs-only / non-UI

- Skip QA if the diff has no user-visible UI (pure `docs/`, CI, tooling with no layout).
- State skip explicitly in the run log.

## PR stage (after all green)

1. Push `feat/…` if needed.
2. `gh pr create --base <story-branch>` with template fields: Task, Screenshot note, Deployment URL, Done/deadline placeholders, Score for the criterion.
3. Return PR URL. **Do not merge.**

## Run log (mandatory at end)

```markdown
## Factory run

- Step: feat/… (RSS-QS-…)
- Developer: PASS | FAIL
- Reviewer: Approve | Request changes | Comment
- QA: PASS | FAIL | SKIPPED
- PR: <url> | not created (<reason>)
```

## Anti-patterns

- Starting Reviewer/QA before Developer PASS
- Creating PR while any stage is red
- Reviewing the entire repository
- Using course Figma instead of the draft in `docs/specs/overview.md` for layout QA
- Merging the PR
