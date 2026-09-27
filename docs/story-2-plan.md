# Story 2 — план шагов

Общие правила: [implementation-plan.md](./implementation-plan.md).  
Спека и статус областей: [specs/story-2.md](./specs/story-2.md).  
Канон курса: [story-2.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-2.md) (**257**).

Критерии в комментариях — официальные id курса `RSS-QS-2-…`.

База: ветка `story-2` от `story-1`. Фичи мержим в `story-2`. PR `story-2` → `story-1` на cross-check **не мержить**. В `main` не вливаем и релизный тег не ставим, пока Story 1 на cross-check.

---

## Next (для нового чата / оркестратора)

```text
feat/library-filters    # RSS-QS-2-1-4
```

---

## Шаги

Маркер `[done]` = влито в `story-2`. Не пересоздавать ветку.

```text
story-1
└── story-2
    ├── feat/library-chrome                 # RSS-QS-2-1-1, RSS-QS-2-1-2, RSS-QS-2-1-3 [done]
    ├── feat/library-filters                # RSS-QS-2-1-4
    ├── feat/library-game-cards             # RSS-QS-2-1-5, RSS-QS-2-2-1
    ├── feat/game-details-motion            # RSS-QS-2-2-2
    ├── feat/game-details-hero-info         # RSS-QS-2-2-3, RSS-QS-2-2-4
    ├── feat/game-details-records-comments  # RSS-QS-2-2-5, RSS-QS-2-2-6
    ├── feat/library-pagination             # RSS-QS-2-1-6
    ├── feat/home-slider-logic              # RSS-QS-2-3-1
    └── feat/story-2-semantic-qa            # RSS-QS-2-4-1
```

Почему так сгруппировано:

- Chrome (header, burger, footer) — один шаг: те же компоненты + переход Home ↔ Library и active state.
- Карточки и триггер диалога вместе: критерий списка требует, чтобы Details открывал Game Details.
- Остальные секции диалога — отдельные шаги после того, как диалог уже открывается.
- Пагинация не меняет список карточек, поэтому после диалога, не внутри списка.
- Слайдер после диалога: клик по карточке слайдера открывает тот же Game Details.
- Nu-проверка последней: нужны Library, открытый диалог и открытый burger.

---

## Пока не делать (вне текущего Next)

- Карточки, диалог, пагинация, слайдер и Nu — пока не закрыт текущий `## Next`
- Реальную фильтрацию, сортировку и смену страницы данных
- History API
- API / Firebase
