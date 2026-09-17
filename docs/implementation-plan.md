# MiniGames — план реализации (общий)

Общие правила порядка работ для [`Bogagree/minigames`](https://github.com/Bogagree/minigames).  
Шаги конкретной story — в отдельных планах. Требования и решения — в SDD-доках, здесь не дублируем.

## SDD (читать сначала)

| Артефакт | Путь |
| --- | --- |
| Как ведём проект | [docs/README.md](./README.md) |
| Закрытые решения | [decisions.md](./decisions.md) |
| Спеки | [specs/](./specs/) |
| Конвенции | [conventions/](./conventions/) |

Курс (баллы, Figma): ссылки в [docs/README.md](./README.md).

---

## Планы по story

| Story | План шагов | Спека |
| --- | --- | --- |
| Story 1 | [story-1-plan.md](./story-1-plan.md) | [specs/story-1.md](./specs/story-1.md) |
| Story 2 | [story-2-plan.md](./story-2-plan.md) | появится, когда курс откроет детали |
| Story 3 | [story-3-plan.md](./story-3-plan.md) | появится, когда курс откроет детали |
| Story 4 | [story-4-plan.md](./story-4-plan.md) | появится, когда курс откроет детали |

---

## Как пользоваться

1. Открыть план текущей story: блок **`## Next`** + её спеку; свериться с **decisions**.
2. Выполнять шаги сверху вниз. Один шаг = одна feature-ветка = один PR в ветку story = один короткий контекст чата.
3. После merge шага — `[done]` в дереве плана и сдвиг `## Next` (тот же PR фичи или сразу после merge).
4. Не пропускать git-процесс: [conventions/git.md](./conventions/git.md) (штрафы до −50).
5. Не начинать соседний UI-шаг, пока текущий `## Next` не закрыт.
6. После решения или смены поведения — обновить `decisions.md` / спеку в том же PR.

---

## Жёсткие ограничения

Кратко; полный список в [conventions/code.md](./conventions/code.md) и [specs/overview.md](./specs/overview.md).

Делать: TypeScript, vanilla HTML/SCSS/TS, Chrome latest, семантика, Pixel Perfect 375/768/1920 (±10px), адаптив от 375px, RS git convention.

Не делать: UI-фреймворки, Bootstrap/Tailwind, jQuery/Swiper и UI-библиотеки, вёрстка скриншотами, `console.log`, явный `any`, magic values. Backend / API — только когда story это явно открывает.

---

## Git-процесс (все story)

См. [conventions/git.md](./conventions/git.md). Схема:

```text
main
 └── story-1
      ├── feat/...
      └── PR story-1 → main     ← cross-check, НЕ мержить

 story-2 от story-1
 └── PR story-2 → story-1       ← сдать, НЕ мержить

 story-3 от story-2
 story-4 от story-3
```

Структура репозитория и слои — [specs/architecture.md](./specs/architecture.md).
