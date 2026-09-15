# MiniGames Story 1 — implementation plan

Status: **draft for review**. Do not implement application code until this plan is approved.

- Task: [MiniGames Story 1](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md)
- Common rules: [common-project-requirements.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-project-requirements.md)
- Layout rules: [common-layout-requirements.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-layout-requirements.md)
- Figma: [MiniGames](https://www.figma.com/design/4MnLizE59gZI2DDxaSgZqi/MiniGames?node-id=0-1)
- Assets: `tasks/assets` in qualifying-stage
- Mock data: `tasks/mock-data` in qualifying-stage (optional this story; leaderboard may use static mock rows)
- Repo: `Bogagree/minigames`
- Total: **294 points**

Previous cloud session: [bc-760e6a47-9e0f-43db-88c5-557818c1f4d1](https://cursor.com/agents/bc-760e6a47-9e0f-43db-88c5-557818c1f4d1). Transcript was not available in this workspace (no `cursor-cloud` / `batch-fetch-details` tool; agent page requires Cursor login). This document is reconstructed from the official Story 1 criteria.

---

## 0. Goal of this story

1. Repository, tooling (bundler, TypeScript, ESLint, Prettier, Husky), Sass tokens.
2. Adaptive Home page at 375 / 768 / 1920 and fluid in between.
3. Auth dialog layout (unauthenticated only).

Backend integration is **out of scope**. Auth is UI only (open/close, login/register switch). No real API, no session.

---

## 1. Hard constraints (penalties)

| Risk | Penalty |
| --- | --- |
| Cross-check URL is not a PR link | −20 |
| Changes after deadline | −40 |
| Wrong main/base branch name vs workflow | −20 |
| Cross-check PR merged into target | −30 |
| All work in one branch, no task branches | −50 |
| Forbidden libraries (React, Vue, Angular, Bootstrap, Tailwind, jQuery, Swiper, etc.) | −200 |
| Layout blocks as screenshots/images | −90 |
| `console.log` | −10 each, max −30 |
| Commits / PR description not RS style | −30 |
| Magic CSS instead of tokens | −10 each, max −50 |
| ESLint / Prettier errors | −5 each |
| Explicit `any` | −5 each |
| Large task in 1–2 bulk commits | course expulsion risk |

Also:

- TypeScript is required.
- Chrome latest is the check browser.
- `reset.css` is not recommended.
- Source must stay readable (no minify/obfuscation of student code).
- Pixel Perfect: ±10px, PerfectPixel scale 1, OS/browser zoom 100%.
- No horizontal scrollbar from 375px up. Below 375px is not checked.
- ≥1921px: desktop layout stays centered; only side spacing grows.
- Hover must not “stick” in mobile device type.

---

## 2. Recommended stack (subject to review)

Vanilla TypeScript SPA, no UI frameworks.

| Area | Choice | Why |
| --- | --- | --- |
| Bundler | **Vite** | Dev + production, Sass plugin, simple SPA |
| Language | TypeScript `strict` + `noImplicitAny` | RSS-QS-1-2-2 |
| Lint | ESLint + typescript-eslint + **eslint-plugin-unicorn**, `noInlineConfig: true`, `no-explicit-any` | RSS-QS-1-2-3 |
| Format | Prettier | RSS-QS-1-2-4 |
| Hooks | Husky: `commit-msg` (RS git convention), `pre-push` (ESLint + Prettier, fail on error **or warning**) | RSS-QS-1-2-5 |
| Styles | Sass + tokens/mixins/functions, no Tailwind/Bootstrap | RSS-QS-1-2-6 |
| Deploy | GitHub Pages (or Netlify/Vercel) from `story-1` build | required public URL |
| Commit lint | commitlint or a small script matching [RS git convention](https://rs.school/docs/git-convention) | reject bad `commit-msg` |

Alternative bundlers (Webpack/Parcel/Rollup) are allowed by the rubric. Prefer Vite unless review asks otherwise.

---

## 3. Git / PR workflow (mandatory)

From [common-project-requirements](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-project-requirements.md):

1. `main` stays the default branch (already exists).
2. Create long-lived **`story-1`** from `main`.
3. Each logical group of tasks → feature branch from `story-1` → PR **into `story-1`** → **merge** those PRs.
4. When Story 1 is done: PR **`story-1` → `main`**. **Do not merge.** That unmerged PR is the Cross-Check link.
5. Later stories: `story-N` from `story-(N-1)`; final PR `story-N` → `story-(N-1)`, also unmerged.

This docs file may live on `cursor/implementation-plan-f4d1` (or another docs branch) for review. After approval, either merge the plan into `story-1` or keep it as a working note; it is not a scoring item.

Commit messages: RS School style (`feat:`, `fix:`, `docs:`, `chore:`, …) with a step-by-step history. Do not squash a whole criterion into one giant commit if the work is large.

PR descriptions: official RS PR template as the base (RSS-QS-1-1-3). Extra sections allowed; required sections must stay.

---

## 4. Folder structure (RSS-QS-1-1-2)

Page-first SPA, aligned with the official example (names may vary if consistent):

```text
.
├── .github/pull_request_template.md
├── .husky/
├── docs/implementation-plan.md
├── public/                 # favicon, static files copied as-is
├── src/
│   ├── app/
│   │   ├── index.ts        # bootstrap
│   │   └── router.ts       # SPA routes (Home only this story)
│   ├── pages/
│   │   └── home/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   └── dialogs/        # auth-dialog
│   ├── features/
│   │   └── slider/         # static carousel layout
│   ├── services/           # later API; stub/storage optional
│   ├── state/              # later; skip real auth state this story
│   ├── utils/
│   ├── styles/
│   │   ├── tokens.scss
│   │   ├── mixins.scss
│   │   ├── functions.scss
│   │   └── globals.scss
│   └── assets/
│       ├── icons/
│       └── images/
├── index.html              # empty body except one script tag
├── package.json
├── tsconfig.json
├── eslint.config.*
├── .prettierrc
└── README.md
```

SPA (RSS-QS-1-2-7): all visible HTML is created in JS/TS. Static `index.html`: empty `body`, or `body` with only the bundler `<script>`. One script tag may sit in `head` or `body`.

---

## 5. Implementation steps (PRs)

Work **after plan approval**. Suggested feature PRs into `story-1`. Small related tasks may share a branch (allowed by the course).

### PR A — Repository hygiene (25 pts)

**Branch:** `feat/repo-setup`  
**Criteria:** RSS-QS-1-1-1, 1-1-2, 1-1-3

1. Expand README: project name, stack, scripts, deploy link (placeholder until first deploy).
2. Node/Vite `.gitignore` (`node_modules`, `dist`, OS/editor junk).
3. Add official RS pull request template under `.github/`.
4. Document the folder map in README (short).

Do not add app UI here beyond empty `index.html` if the bundler PR follows immediately.

### PR B — Tooling (63 + 10 pts)

**Branch:** `feat/dev-environment`  
**Criteria:** RSS-QS-1-2-1 … 1-2-7, 1-3-1, 1-3-2

1. Vite + `dev` / `build` / `preview`.
2. TypeScript: `strict`, `noImplicitAny`; typed params/returns; interfaces; no `any`. Enums/generics/utility types where they earn their keep.
3. ESLint: typescript-eslint, unicorn, `noInlineConfig: true`, `no-explicit-any`.
4. Prettier config.
5. Scripts: `lint` (ESLint over `src`), `format` / `format:check` (Prettier).
6. Husky:
   - `commit-msg` → RS commit convention.
   - `pre-push` → ESLint + Prettier; abort on errors **and warnings**.
7. Sass wired into Vite. Tokens file: colors, sizes, shadows, radii, button sizes, font family/size/weight, breakpoints. Mixins/functions in separate files. No magic values without a comment that Pixel Perfect needed a calc.
8. SPA bootstrap: empty body, JS mounts `#app` (or equivalent created in JS — if a root node is required, create it in TS, do not leave markup in HTML). Home route only; other routes can stub-redirect to Home.

### PR C — Design tokens + global chrome shell

**Branch:** `feat/styles-tokens` (may merge with B if small)

1. Duplicate Figma file to drafts (student account) before measuring.
2. Copy allowed assets (icons, pictures) from `tasks/assets`, not screenshots of UI chrome.
3. Favicon on the implemented page (4 pts, story global).

### PR D — Header + burger (40 pts)

**Branch:** `feat/header-unauthenticated`  
**Criteria:** RSS-QS-1-4-1 (15), RSS-QS-1-4-2 (25)

Unauthenticated only.

Header:

- Semantic tags (`header`, `nav`, …), not a `div` soup.
- Nav links → Home.
- Sign-in opens Auth dialog (wire after PR F exists; until then a stub callback is OK).
- Breakpoints 375 / 768 / 1920 + fluid, no overflow.

Burger (≤768px, hidden on desktop):

- Full-screen menu, animated open/close.
- Burger morphs to × with animation.
- Links → Home; Login/Sign up opens Auth and **closes the menu**.
- Close via × and `Esc`.
- No horizontal scrollbar during animation.

### PR E — Home sections (115 pts)

**Branch:** `feat/home-layout` (or split hero/carousel vs rest if PRs get huge)  
**Criteria:** 1-4-3 … 1-4-7

| Block | Pts | Notes |
| --- | --- | --- |
| Hero | 15 | Button styled, **no action** |
| Carousel (static) | 25 | Arrows/dots **non-functional**. Cards ≥288px: overlay (title, likes, rating); title one line + ellipsis. Cards &lt;288px: **image only**, no overlay |
| Leaderboard | 15 | Static mock data; **no** interactive styles |
| Game developer CTA | 15 | Button styled, **no action** |
| Footer | 20 | Nav + social → Home; RS School course URL as in mockup/task; GitHub profile link (`Bogagree`) per mockup |

Every block: common layout requirements (semantics, PP ±10px, states, cursor, no overflow, centered ≥1921px).

### PR F — Auth dialog (50 pts)

**Branch:** `feat/auth-dialog`  
**Criteria:** RSS-QS-1-5-1 … 1-5-5

1. Trigger: header Login/Sign up; mobile menu Login/Sign up (closes menu). Centered dialog + dimmed backdrop.
2. Open/close animation. Close: backdrop click, `Esc`. Works for both login and register. No layout/scroll breakage.
3. Login / Registration switcher with distinct active/inactive. Animated block switch. Inline Register/Login links do the same. No reload; dialog stays open.
4. Semantic `form`; `email` / `password` (and other correct types). Style guide states except **validation errors** (later story).
5. Responsive quality: desktop/tablet dialog **width 420px**, PP ±10px. Common layout requirements.

No backend, no real submit.

### PR G — Global verification + deploy (16 pts + process)

**Branch:** `feat/story-1-qa`  
**Criteria:** RSS-QS-1-6-1 (12) + favicon (4)

1. HTML validity (W3C Direct Input):
   - Home (default)
   - Auth dialog open
   - Burger open (≤768px)  
   Target: no errors and no warnings. Info messages ignored.  
   Course text says View Page Source; for SPA generated DOM, also validate **outerHTML of the live document** if source stays empty — confirm with mentor/review if needed, but keep static `index.html` valid too.
2. PerfectPixel at 375, 768, 1920; fluid drag 1920→375; no horizontal scroll.
3. Deploy public URL; README updated; works in incognito.
4. Open **unmerged** PR `story-1` → `main` with RS template. Submit that PR URL in RS App Cross-Check.

---

## 6. Scoring map

| Group | Points |
| --- | --- |
| Repository setup | 25 |
| Dev environment | 63 |
| Scripts | 10 |
| Home adaptive layout | 130 |
| Auth dialog | 50 |
| Global layout + favicon | 16 |
| **Total** | **294** |

---

## 7. Explicitly not in Story 1

- Authenticated header / profile menu
- Carousel drag, autoplay, working arrows
- Form validation / error states
- Real login/register API
- Library / other pages (routing stubs only if needed)
- React/Vue/etc.

---

## 8. Review checklist (before coding)

- [ ] Vite vs Webpack is OK
- [ ] Page-first folders vs feature-first
- [ ] GitHub Pages vs another host
- [ ] Leaderboard: copy mock JSON into `src` vs inline constants
- [ ] How many feature PRs (A–G vs fewer combined branches)
- [ ] Confirm W3C check method for SPA (page source vs live DOM)

After this file is approved, start from **PR A** on branch `story-1`.
