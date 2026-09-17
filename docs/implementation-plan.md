# MiniGames — план реализации

Рабочий план для репозитория [`Bogagree/minigames`](https://github.com/Bogagree/minigames).  
Сначала ревью этого файла, затем выполнение шагов по порядку. Менять план можно прямо в чекбоксах и в блоке «Решения на ревью».

Источники:

- [Story 1](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md) — **294 балла**, детали доступны
- [Overview](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/README.md)
- [Common project requirements](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-project-requirements.md)
- [Common layout requirements](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-layout-requirements.md)
- [Figma](https://www.figma.com/design/4MnLizE59gZI2DDxaSgZqi/MiniGames)
- [Git convention](https://rs.school/docs/git-convention)
- [PR requirements](https://rs.school/docs/short-track/pull-request-requirements)

Stories 2–4 в этом документе описаны каркасно: подробные критерии ещё закрыты курсом.

---

## Как пользоваться этим файлом

1. Пройти блок **«Решения на ревью»** и отметить согласие / правки.
2. Выполнять шаги сверху вниз. Один шаг = одна feature-ветка = один PR в `story-1`.
3. Не пропускать git-процесс: за него стоят штрафы до −50.
4. Не начинать вёрстку, пока не закрыты tooling, токены и SPA-каркас.

---

## Решения на ревью

Предложения по умолчанию. Если не согласен — напиши альтернативу в комментарии к PR.

| Тема | Предложение | Ок? |
| --- | --- | --- |
| Bundler | **Vite** (dev + production build), не Webpack | [ ] |
| Стили | **Sass/SCSS**: токены как CSS custom properties + mixins | [ ] |
| Структура | **Page-first** (как в примере RSS-QS-1-1-2) | [ ] |
| CSS-нейминг | **BEM** (`header__logo`, `btn--primary`) | [ ] |
| SPA в Story 1 | Весь DOM из TypeScript. В `index.html` пустой `body` + один `#app` и `script` | [ ] |
| Роутер в Story 1 | Тонкий интерфейс `Router`, пока только Home. History API — в Story 4 | [ ] |
| Данные Story 1 | Статика + `leaderboard.json` из mock-data. Полный API не трогаем | [ ] |
| Деплой | **GitHub Pages** из production-сборки Vite (`base: '/minigames/'`). Подключаем после SPA, до вёрстки | [ ] |
| Feature-ветки | kebab-case: `feat/header-unauthenticated` | [ ] |
| Объединение задач | Мелкие соседние критерии можно в одной ветке, см. шаги ниже | [ ] |
| Этот план в репо | Оставляем `docs/implementation-plan.md` до конца курса | [ ] |

Другие варианты, если нужно сменить:

- Деплой: Vercel / Netlify (проще для будущего History API, без `base` path).
- Структура: feature-first вместо page-first.

---

## Жёсткие ограничения

Делать:

- TypeScript
- Vanilla HTML/SCSS/TS, без UI-фреймворков
- Google Chrome latest
- Семантические теги
- Pixel Perfect на **375 / 768 / 1920**, допуск ±10px
- Адаптив от 375px и выше без горизонтального скролла
- Выше 1920px: макет по центру, не растягивается
- Коммиты по [RS Git convention](https://rs.school/docs/git-convention), история по шагам, не 1–2 огромных коммита

Не делать:

- React / Vue / Angular / Svelte
- Bootstrap / Tailwind
- jQuery, Swiper и готовые UI-библиотеки (**−200**)
- Вёрстка скриншотами (**−90**)
- `reset.css` (не рекомендуется)
- Backend / реальный API в Story 1
- `console.log` (**−10** за уникальный вызов, до −30)
- Явный `any` (**−5** за каждый)
- Magic values вместо токенов (**−10** за случай, до −50)

---

## Git-процесс на весь курс

Это не «приятно иметь», а критерии и штрафы.

```text
main
 └── story-1                    ← база Story 1, сюда мержим фичи
      ├── feat/...
      └── PR story-1 → main     ← сдать на cross-check, НЕ мержить (−30 если смержен)

 story-2 ветвится от story-1
 └── PR story-2 → story-1       ← сдать, НЕ мержить

 story-3 от story-2
 story-4 от story-3
```

Шаблон описания PR:

1. Task: https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md
2. Screenshot:
   <!-- drag-and-drop -->
3. Deployment: https://bogagree.github.io/minigames/
4. Done DD.MM.YYYY / deadline DD.MM.YYYY
5. Score: ___ / 294

Предлагаемая структура репозитория

```text
minigames/
├── .github/
│   └── pull_request_template.md
├── .husky/
│   ├── commit-msg
│   └── pre-push
├── docs/
│   └── implementation-plan.md      ← этот файл
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── index.ts                # bootstrap
│   │   └── router.ts               # заглушка SPA-роутера
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home-page.ts
│   │   │   └── home-page.scss
│   │   └── library/                # заготовка, контент в Story 2
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── burger-menu/
│   │   ├── hero/
│   │   ├── slider/
│   │   ├── leaderboard/
│   │   ├── game-dev/
│   │   └── dialogs/
│   │       └── auth-dialog/
│   ├── services/                   # позже: api, storage
│   ├── state/                      # позже: auth, ui
│   ├── utils/
│   │   └── dom.ts
│   ├── styles/
│   │   ├── tokens.scss
│   │   ├── mixins.scss
│   │   ├── functions.scss
│   │   └── globals.scss
│   └── assets/
│       ├── icons/
│       └── images/
├── index.html                      # пустой body + #app + script
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── .prettierrc
├── .gitignore
└── README.md
```

После ревью плана:

```text
main
└── story-1
    ├── feat/repo-setup
    ├── feat/folder-structure
    ├── feat/pr-template
    ├── feat/bundler-typescript        # B1+B2
    ├── feat/eslint-prettier-scripts   # B3+B4+B5
    ├── feat/husky-hooks
    ├── feat/sass-tokens
    ├── feat/spa-architecture
    ├── feat/github-pages              # публичный превью, дальше UI смотрим по ссылке
    ├── feat/header-unauthenticated
    ├── feat/burger-menu
    ├── feat/hero-section
    ├── feat/carousel-layout
    ├── feat/leaderboard-gamedev       # C5+C6
    ├── feat/footer
    ├── feat/auth-dialog               # D1–D5, много коммитов
    └── feat/favicon-and-qa
```

Что не входит в первый спринт после ревью
Не делать, пока этот план не подтверждён:

код приложения
установку зависимостей сверх того, что нужно шагу
Story 2–4 UI
API / Firebase
unit-тесты
Первый шаг после approve: создать story-1 от main и выполнить A1.
