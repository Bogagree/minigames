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

Пример: `feat/header-unauthenticated`. Мелкие соседние критерии можно объединять в одной ветке по `implementation-plan.md`.

---

## D-010: Документация плана и SDD в репо

- Status: Accepted
- Date: 2026-09-17
- Почему: знания и решения должны переживать чаты и шариться командой

Держим `docs/` (спеки, decisions, conventions, implementation-plan) до конца курса и обновляем вместе с кодом.
