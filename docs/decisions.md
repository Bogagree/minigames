# Decisions

Закрытые решения. Статус `Accepted` = факт для агента и команды, не «обсуждали в чате».

Формат новой записи:

```md
## D-NNN: Короткий заголовок

- Status: Accepted
- Date: YYYY-MM-DD
- Почему: одно предложение

Текст решения.
```

---

## D-001: Bundler — Vite

- Status: Accepted
- Date: 2026-09-17
- Почему: быстрый dev/build, простой GitHub Pages `base`, достаточно для vanilla TS

Vite для dev и production-сборки. Webpack не используем.

---

## D-002: Стили — Sass/SCSS + токены

- Status: Accepted
- Date: 2026-09-17
- Почему: требования курса + единые design tokens без UI-библиотек

SCSS: CSS custom properties (токены) + mixins. Magic values в компонентах запрещены (см. штрафы курса).

---

## D-003: Структура — page-first

- Status: Accepted
- Date: 2026-09-17
- Почему: как в примере RSS-QS; страницы собирают компоненты

```text
src/pages/… → src/components/… → src/services|state|utils|styles
```

Feature-first не используем, пока не будет отдельного decision на смену.

---

## D-004: CSS-нейминг — BEM

- Status: Accepted
- Date: 2026-09-17
- Почему: предсказуемые классы без фреймворка

Примеры: `header__logo`, `btn--primary`. Один блок = одноимённые `.ts` / `.scss` (не общий `index.ts`).

---

## D-005: SPA в Story 1 — DOM из TypeScript

- Status: Accepted
- Date: 2026-09-17
- Почему: критерий Story 1; `index.html` не содержит разметки приложения

В `index.html`: пустой `body` + скрипт входа. Корень `#app` создаётся/монтируется из TypeScript.

---

## D-006: Роутер в Story 1 — тонкий интерфейс

- Status: Accepted
- Date: 2026-09-17
- Почему: Home сейчас; History API — Story 4

Интерфейс `Router` / `createRouter`. Пока рендер Home (fallback). Полный client-side routing — позже, отдельная спека/story.

---

## D-007: Данные Story 1 — статика + mock

- Status: Accepted
- Date: 2026-09-17
- Почему: backend/API вне скоупа Story 1

Статика и `leaderboard.json` (mock-data). Реальный API / Firebase не трогаем до соответствующих story.

---

## D-008: Деплой — GitHub Pages

- Status: Accepted
- Date: 2026-09-17
- Почему: требование превью; Vite `base: '/minigames/'`

Production-сборка Vite → GitHub Pages. Смена на Vercel/Netlify только новым decision.

---

## D-009: Feature-ветки — kebab-case

- Status: Accepted
- Date: 2026-09-17
- Почему: единый git-процесс курса и читаемые PR

Пример: `feat/header-unauthenticated`. Мелкие соседние критерии можно объединять в одной ветке по `story-N-plan.md`.

---

## D-010: Документация плана и SDD в репо

- Status: Accepted
- Date: 2026-09-17
- Почему: знания и решения должны переживать чаты и шариться командой

Держим `docs/` (спеки, decisions, conventions, `implementation-plan.md`, `story-N-plan.md`) до конца курса и обновляем вместе с кодом.

---

## D-011: Артефакт QA — `docs/qa/`

- Status: Accepted
- Date: 2026-09-17
- Почему: вердикт pixel-check должен переживать чат и ехать в том же PR, что фича

После QA-стадии фабрики пишем отчёт `docs/qa/<feat-slug>.md` (`feat/header-unauthenticated` → `header-unauthenticated.md`): статус, draft URL, Δ по 375/768/1920, blocking/non-blocking. Бинарные скриншоты в git не кладём. В PR в поле Screenshot — ссылка на этот файл (+ Deployment). FAIL-отчёт тоже коммитим в fix-ветку.

---

## D-012: Фабрика — post-user-review + Figma evidence для QA

- Status: Accepted
- Date: 2026-09-19
- Почему: ложный PASS карусели (live vs свои токены при rate-limit MCP) и ручные правки после ревью пользователя не были частью пайплайна

1. **Post-user-review:** замечания пользователя по открытому `feat/*` PR → тот же пайплайн Developer → Reviewer → QA на той же ветке, commit+push в существующий PR (не новый PR). См. orchestrator skill.
2. **QA ground truth:** PASS только против геометрии Figma draft (MCP / кэш metadata с `x|width|height` / paste пользователя с `node-id`). Сравнение live ↔ токены из того же PR запрещено. Нет evidence → статус `BLOCKED`, не зелёный PR.

---

## D-013: Mock JSON в `src/data/`

- Status: Accepted
- Date: 2026-09-19
- Почему: D-007 фиксирует статику + `leaderboard.json`, а слой `src/services` ещё без API

Story 1 кладёт курс-совместимый mock в `src/data/*.json` и импортирует его в компонент. Fetch/сервис появятся отдельным decision, когда подключат backend.
