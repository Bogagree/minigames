# Story 1 — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).  
Спека и статус: [specs/story-1.md](./specs/story-1.md).  
Канон курса: [story-1.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md) (**294**).

Критерии в комментариях — официальные id курса `RSS-QS-1-…` (не внутренние A/B/C).

База: ветка `story-1`. Фичи мержим сюда; PR `story-1` → `main` на cross-check **не мержить**.

---

## Шаги

```text
main
└── story-1
    ├── feat/sdd-adoption              # docs/SDD (вне баллов курса)
    ├── feat/repo-setup                # RSS-QS-1-1-1
    ├── feat/folder-structure          # RSS-QS-1-1-2
    ├── feat/pr-template               # RSS-QS-1-1-3
    ├── feat/bundler-typescript        # RSS-QS-1-2-1, RSS-QS-1-2-2
    ├── feat/eslint-prettier-scripts   # RSS-QS-1-2-3, RSS-QS-1-2-4, RSS-QS-1-3-1, RSS-QS-1-3-2
    ├── feat/husky-hooks               # RSS-QS-1-2-5
    ├── feat/sass-tokens               # RSS-QS-1-2-6
    ├── feat/spa-architecture          # RSS-QS-1-2-7
    ├── feat/github-pages              # deploy (common requirements)
    ├── feat/header-unauthenticated    # RSS-QS-1-4-1
    ├── feat/burger-menu               # RSS-QS-1-4-2
    ├── feat/hero-section              # RSS-QS-1-4-3
    ├── feat/carousel-layout           # RSS-QS-1-4-4
    ├── feat/leaderboard-gamedev       # RSS-QS-1-4-5, RSS-QS-1-4-6
    ├── feat/footer                    # RSS-QS-1-4-7
    ├── feat/auth-dialog               # RSS-QS-1-5-1 … RSS-QS-1-5-5
    └── feat/favicon-and-qa            # RSS-QS-1-6-1 + favicon
```

Часть шагов уже влита в `story-1` — не пересоздавать; продолжать со следующего открытого пункта спеки.

---

## Пока tooling / SPA не закрыты — не делать

- полноценную вёрстку Home по Figma
- Story 2–4 UI
- API / Firebase
- unit-тесты

Следующая фича: статус в [specs/story-1.md](./specs/story-1.md) + первая незакрытая `feat/…` выше.
