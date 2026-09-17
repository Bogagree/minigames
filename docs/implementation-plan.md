# MiniGames — план реализации

Рабочий **чеклист шагов** для [`Bogagree/minigames`](https://github.com/Bogagree/minigames).  
Требования, архитектура и закрытые решения живут в SDD-доках — этот файл не дублирует их.

## SDD (читать сначала)

| Артефакт | Путь |
| --- | --- |
| Как ведём проект | [docs/README.md](./README.md) |
| Закрытые решения | [decisions.md](./decisions.md) |
| Спеки | [specs/](./specs/) |
| Конвенции | [conventions/](./conventions/) |

Курс (баллы, Figma): ссылки в [docs/README.md](./README.md).  
Stories 2–4: отдельные спеки — когда курс откроет детали.

---

## Как пользоваться

1. Свериться с **decisions** и нужной **спекой** (`specs/story-1.md`, `architecture.md`, …).
2. Выполнять шаги сверху вниз. Один шаг = одна feature-ветка = один PR в `story-1` = один короткий контекст чата.
3. Не пропускать git-процесс: [conventions/git.md](./conventions/git.md) (штрафы до −50).
4. Не начинать вёрстку, пока не закрыты tooling, токены и SPA-каркас.
5. После решения или смены поведения — обновить `decisions.md` / спеку в том же PR.

---

## Жёсткие ограничения

Кратко; полный список в [conventions/code.md](./conventions/code.md) и спеке overview.

Делать: TypeScript, vanilla HTML/SCSS/TS, Chrome latest, семантика, Pixel Perfect 375/768/1920 (±10px), адаптив от 375px, RS git convention.

Не делать: UI-фреймворки, Bootstrap/Tailwind, jQuery/Swiper и UI-библиотеки, вёрстка скриншотами, backend в Story 1, `console.log`, явный `any`, magic values.

---

## Git-процесс

См. [conventions/git.md](./conventions/git.md). Схема:

```text
main
 └── story-1
      ├── feat/...
      └── PR story-1 → main   ← cross-check, НЕ мержить
```

Структура репозитория и слои — [specs/architecture.md](./specs/architecture.md).

---

## Шаги после approve SDD / плана

```text
main
└── story-1
    ├── feat/sdd-adoption              # переход на SDD (docs + rules)
    ├── feat/repo-setup
    ├── feat/folder-structure
    ├── feat/pr-template
    ├── feat/bundler-typescript        # B1+B2
    ├── feat/eslint-prettier-scripts   # B3+B4+B5
    ├── feat/husky-hooks
    ├── feat/sass-tokens
    ├── feat/spa-architecture
    ├── feat/github-pages
    ├── feat/header-unauthenticated
    ├── feat/burger-menu
    ├── feat/hero-section
    ├── feat/carousel-layout
    ├── feat/leaderboard-gamedev       # C5+C6
    ├── feat/footer
    ├── feat/auth-dialog               # D1–D5
    └── feat/favicon-and-qa
```

Часть шагов уже влита в `story-1` — не пересоздавать; продолжать со следующего открытого пункта спеки Story 1.

### Что не входит, пока tooling/SPA не закрыты

- полноценная вёрстка Home по Figma
- Story 2–4 UI
- API / Firebase
- unit-тесты

Следующая фича: смотреть статус в [specs/story-1.md](./specs/story-1.md) и первую незакрытую `feat/…` выше.
