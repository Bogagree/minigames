# MiniGames — Orchestrator (agent factory)

## Goal

Ship **one** plan step as a PR into the story branch (`story-1`, …). User merges.

Pipeline (strict order):

1. **Developer** → `.cursor/skills/minigames-developer/SKILL.md`
2. **Reviewer** → `.cursor/skills/minigames-reviewer/SKILL.md`
3. **QA** → `.cursor/skills/minigames-qa/SKILL.md`
4. **PR** only if Developer PASS + Reviewer Approve + QA PASS

## Input from user

Require:

- Story base (`story-1`, …)
- Optional: “docs-only” → skip QA stage

If step / `RSS-QS-…` not given: read `docs/story-N-plan.md` → section **`## Next`** (single `feat/…` line). Do **not** invent a different step. Confirm once in the run log.

After a green feature PR is ready (or when updating the plan in that PR): mark the step `[done]` in the plan tree and advance `## Next` to the following open `feat/…`.

## How to run stages

Prefer **isolated subagents** (`Task`) with `model: inherit`. Each prompt must:

1. Say: read and follow the named `SKILL.md` completely.
2. Pass: repo path, base branch, feat name, criterion id, relevant spec paths.
3. Demand the skill’s **mandatory handoff/verdict block** as the final message.
4. Forbid merging into `main` / story branch; forbid skipping stages.

If Task is unavailable, run stages sequentially in one session by reading each skill in order — still emit each stage’s verdict block before continuing.

### Loop on failure (pre-PR)

- Reviewer **Request changes** or QA **FAIL** → hand defects to Developer (same branch), re-run Reviewer, then QA.
- Max **2** fix loops unless user says continue.
- After max loops still red → stop; no PR; summarize blockers.

### Post-user-review fix (PR already open)

When the user reviews an **open** `feat/*` PR (or local branch) and reports defects (chat, screenshots, Figma panels, node-ids):

1. Treat feedback as a **blocking defect list** — do **not** open a new PR.
2. Run on the **same** `feat/…` branch: Developer (fix) → Reviewer → QA.
3. Commit + push to the existing PR head.
4. **Overwrite** `docs/qa/<feat-slug>.md` with a **new** QA run after the latest Developer UI commit. A file that still says PASS is not a closed QA stage. Do **not** reuse the previous report.
5. Emit the run log with `PR: <existing url> (updated)`.
6. Max **2** fix loops per user review batch unless user says continue.

Green PR after user review requires a QA report **from this run**. Post-user-review **without** a fresh `docs/qa/<feat-slug>.md` ≠ green.

Triggers (examples): «докидывай правки», «после ревью», paste of Figma stroke/shadow, «неправильный бордер», layout width complaints while PR #N is open.

### Docs-only / non-UI

- Skip QA if the diff has no user-visible UI (pure `docs/`, CI, tooling with no layout).
- State skip explicitly in the run log.

## PR stage (after all green)

1. Ensure QA **overwrote** `docs/qa/<feat-slug>.md` (D-011 / D-015) in **this** factory run and it is committed. An older PASS on the branch is not enough after UI or user-review changes.
2. Push `feat/…` if needed.
3. `gh pr create --base <story-branch>` with **Summary + Test plan** only. Link QA report (`docs/qa/…`).  
   **Do not** put the course checklist (Task / Screenshot / Deployment / Done / Score) — that is only for `story-N` → `main`.  
   **Do not** add `Made with Cursor` (or similar) to the PR body.
4. Return PR URL. **Do not merge.**

## Run log (mandatory at end)

```markdown
## Factory run

- Step: feat/… (RSS-QS-…)
- Mode: new-step | post-user-review
- Developer: PASS | FAIL
- Reviewer: Approve | Request changes | Comment
- QA: PASS | FAIL | SKIPPED | BLOCKED (no Figma evidence)
- QA report: docs/qa/<feat-slug>.md | n/a
- PR: <url> | updated <url> | not created (<reason>)
```

## Anti-patterns

- Starting Reviewer/QA before Developer PASS
- Creating PR while any stage is red
- Reviewing the entire repository
- Using course Figma instead of the draft in `docs/specs/overview.md` for layout QA
- **QA PASS by comparing live UI to tokens or specs authored in the same PR** (circular “proof”)
- **QA PASS on geometry only** when the block has fills/strokes/effects (table header/rows, chips, avatars, borders, shadows)
- Treating `get_metadata` x/width/height cache as color or shadow evidence
- Treating guidebook «place» hex as expected when the Home **instance** fill/effect differs
- Copying chrome (stroke/shadow) from a neighbor family (carousel card vs table vs CTA)
- Measuring clipped `box-shadow` (`overflow: hidden`) as a visible-shadow PASS
- Reusing `docs/qa/<slug>.md` PASS after live or user-review changed
- Inventing Figma rasters/SVGs when MCP export fails (402 / rate-limit) — **BLOCKED**, ask the user to download; invented asset is **FAIL**, not non-blocking
- QA PASS «from guidebook memory» while MCP is rate-limited
- Ignoring user post-PR feedback until the next story step
- Merging the PR
