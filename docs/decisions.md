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
2. **QA ground truth:** PASS только против **канвы** draft (геометрия **и** fills/strokes дочерних узлов: шапка, ряды body, чипы, аватарки). MCP / скрин узла / Dev Mode paste с `node-id`. Live ↔ токены или спека **того же PR** запрещены. Подпись «place» в гайдбуке не перебивает fill инстанса на Home. Нет evidence по цвету видимого блока → `BLOCKED` или FAIL, не зелёный PASS.

---

## D-013: Mock JSON в `src/data/`

- Status: Accepted
- Date: 2026-09-19
- Почему: D-007 фиксирует статику + `leaderboard.json`, а слой `src/services` ещё без API

Story 1 кладёт курс-совместимый mock в `src/data/*.json` и импортирует его в компонент. Fetch/сервис появятся отдельным decision, когда подключат backend.

---

## D-014: Color tokens = полный гайдбук Figma

- Status: Accepted
- Date: 2026-09-19
- Почему: в `tokens.scss` не хватало avatar-random / outline-variant / secondary / tertiary; `--color-like` расходился с гайдбуком

Имена CSS-переменных совпадают с guidebook (General / Borders / Additional). Hex — из Dev Mode paste. Какой токен на Home — решает **fill инстанса** (`2:17` tertiary; зебра с первой строки body `--color-bg`, затем белая). Рамка таблицы как у `.slider__card`: `--border-width-card` + `--shadow-card`. Разделитель строк — `--border-width-sm`. CTA `cta-card`: `--border-width-md` (2px, inside) + `--shadow-cta` (0 / 14 / 30 / −10 / black 7.84%), не hard offset карточки карусели.

---

## D-015: QA — effects, family chrome, visible shadow, stale reports

- Status: Accepted
- Date: 2026-09-19
- Почему: PASS в `docs/qa/leaderboard-gamedev.md` не поймал ~10 дыр (shadow/inside stroke, гайдбук как expected, соседний хром, clipped shadow, выдуманный SVG, старый отчёт)

Контракт QA (скилл `minigames-qa`, оркестратор):

1. Paint evidence на **каждом** painted child в scope: fill, stroke (weight + inside/outside), **effect/shadow**. Geometry-only `get_metadata` не даёт color/effect PASS.
2. Hex только с **этого** instance `node-id`. Гайдбук именует токен после hex; expected из same-PR spec/`tokens.scss`/«place»/соседа запрещён.
3. Карточка карусели ≠ таблица ≠ CTA — хром не копировать между семействами.
4. Тень мерить **видимую** (обёртка/секция), не `getComputedStyle` у `overflow: hidden`.
5. Выдуманный ассет → **FAIL**; MCP 402/rate-limit → **BLOCKED**, не PASS по памяти.
6. Post-user-review без **перезаписанного** `docs/qa/<slug>.md` в этом прогоне ≠ зелёный PR; старый PASS не переиспользовать.

---

## D-016: Auth dialog — native `<dialog>` singleton

- Status: Accepted
- Date: 2026-09-20
- Почему: один UI для header и burger, top-layer + Esc/backdrop без UI-библиотеки

Auth (Story 1) — один `HTMLDialogElement` на `document.body` (`openAuthDialog`). Close — существующий `src/assets/icons/close.svg`. Password visibility / eye SVG не добавляем: в рабочем драфте нет отдельного экспорта. Backend/validation — вне скоупа.

---

## D-017: Auth dialog chrome tokens (own family)

- Status: Accepted
- Date: 2026-09-20
- Почему: Dev Mode paste задаёт отдельный хром окна и submit; карусель и CTA — другие семьи

Login и Registration — один chrome панели; Login и Create Account — один chrome submit. Токены: `--border-width-auth-dialog` (3px inside), `--shadow-auth-dialog` (8/8/0/0 `--color-black`), `--shadow-auth-submit` (0/4/0/0 `--color-on-primary`), `--radius-auth-dialog` (`--size-3`). Не копировать `--shadow-card` / `--shadow-cta`. Тень панели не на том же боксе, что `overflow` (скролл — `.auth-dialog__body`). Submit 2.5px: не CSS `border` (Chromium округляет used-value до 2px); inside stroke — `inset` spread `--border-width-card` в том же `box-shadow`, что drop shadow.

---

## D-018: Favicon — существующий logo mark из драфта

- Status: Accepted
- Date: 2026-09-20
- Почему: в рабочем драфте нет отдельного кадра favicon; MCP export rate-limit; invent SVG запрещён

Иконка вкладки — тот же Figma brand mark, что уже лежит в `src/assets/icons/logo-mark.png`. Копия для раздачи: `public/favicon.png`, `<link rel="icon">` в `index.html`. Новый SVG/ICO не выдумываем.
