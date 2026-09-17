# Docs — Spec-Driven Development

MiniGames ведётся по **SDD**: требования и решения живут в репозитории и эволюционируют вместе с кодом.

## Карта

| Файл / папка                                       | Назначение                                  |
| -------------------------------------------------- | ------------------------------------------- |
| [decisions.md](./decisions.md)                     | Закрытые архитектурные решения (`Accepted`) |
| [specs/](./specs/)                                 | Спеки продукта, доменов и фич               |
| [conventions/](./conventions/)                     | Как пишем код, git, PR                      |
| [implementation-plan.md](./implementation-plan.md) | Порядок шагов Story 1 (ветки / PR)          |

## Как работать

1. **Задача** → короткая сессия агента / чата, одна feature-ветка.
2. **Перед кодом** → открыть нужную спеку и `decisions.md`.
3. **Решение принято** → записать в `decisions.md` со статусом `Accepted` (дата, кратко «почему»).
4. **Поведение изменилось** → обновить спеку в том же PR, что и код.
5. **Задача закрыта** → итог в спеке/decision/PR, контекст чата не нужен дальше.

## Источники курса (вне репо)

Канонические критерии баллов — у RS School. Локальные спеки их резюмируют и фиксируют _наши_ договорённости по реализации:

- [Story 1](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md)
- [Overview](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/README.md)
- [Common project requirements](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-project-requirements.md)
- [Common layout requirements](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-layout-requirements.md)
- [Figma](https://www.figma.com/design/4MnLizE59gZI2DDxaSgZqi/MiniGames)
