# Story 1 — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).  
Спека и статус областей: [specs/story-1.md](./specs/story-1.md).  
Канон курса: [story-1.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md) (**294**).

Критерии в комментариях — официальные id курса `RSS-QS-1-…` (не внутренние A/B/C).

База: ветка `story-1`. Фичи мержим сюда; PR `story-1` → `main` на cross-check **не мержить**.

---

## Next (для нового чата / оркестратора)

```text
feat/burger-menu    # RSS-QS-1-4-2
```

Оркестратор без явного шага берёт **только** эту строку. После merge шага: пометить его `[done]` ниже и сдвинуть `## Next` на следующую незакрытую `feat/…` (в том же PR фичи или сразу после merge).

---

## Шаги

Маркер `[done]` = влито в `story-1`. Не пересоздавать ветку.

```text
main
└── story-1
    ├── [done] feat/sdd-adoption              # docs/SDD (вне баллов курса)
    ├── [done] feat/repo-setup                # RSS-QS-1-1-1
    ├── [done] feat/folder-structure          # RSS-QS-1-1-2
    ├── [done] feat/pr-template               # RSS-QS-1-1-3
    ├── [done] feat/bundler-typescript        # RSS-QS-1-2-1, RSS-QS-1-2-2
    ├── [done] feat/eslint-prettier-scripts   # RSS-QS-1-2-3, RSS-QS-1-2-4, RSS-QS-1-3-1, RSS-QS-1-3-2
    ├── [done] feat/husky-hooks               # RSS-QS-1-2-5
    ├── [done] feat/sass-tokens               # RSS-QS-1-2-6
    ├── [done] feat/spa-architecture          # RSS-QS-1-2-7
    ├── [done] feat/github-pages              # deploy (common requirements)
    ├── [done] feat/agent-factory             # docs/chore: skills + docs/qa (D-011)
    ├── [done] feat/header-unauthenticated    # RSS-QS-1-4-1
    ├── feat/burger-menu                      # RSS-QS-1-4-2  ← Next
    ├── feat/hero-section                     # RSS-QS-1-4-3
    ├── feat/carousel-layout                  # RSS-QS-1-4-4
    ├── feat/leaderboard-gamedev              # RSS-QS-1-4-5, RSS-QS-1-4-6
    ├── feat/footer                           # RSS-QS-1-4-7
    ├── feat/auth-dialog                      # RSS-QS-1-5-1 … RSS-QS-1-5-5
    └── feat/favicon-and-qa                   # RSS-QS-1-6-1 + favicon
```

---

## Пока не делать (вне текущего Next)

- Story 2–4 UI
- API / Firebase
- unit-тесты
- полноценную вёрстку Home целиком в одном шаге (идём по `feat/…` выше)
