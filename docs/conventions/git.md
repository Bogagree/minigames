# Git & PR

Источники: [RS Git convention](https://rs.school/docs/git-convention), [PR requirements](https://rs.school/docs/short-track/pull-request-requirements).

## Ветки

```text
main
 └── story-1                 ← база Story 1; сюда мержим фичи
      ├── feat/...
      └── PR story-1 → main  ← сдать на cross-check, НЕ мержить (−30 если смержен)

 story-2 от story-1
 └── PR story-2 → story-1    ← сдать, НЕ мержить
```

- Feature: `feat/<kebab-case>` (D-009).
- Один шаг плана ≈ одна ветка ≈ один PR в `story-1`.

## Коммиты

- История по шагам, не 1–2 огромных коммита.
- Сообщения по RS convention (тип + краткое описание).

## PR `feat/*` → `story-N`

Шаблон: `.github/pull_request_template.md` — только Summary + Test plan.  
Ссылка на QA: `docs/qa/<feat-slug>.md` (D-011).  
Чеклист курса (Task / Screenshot / Deployment / Done / Score) **не заполнять**.  
Футер `Made with Cursor` / co-authored Cursor в описании PR **не добавлять**.

Для внутренних SDD-PR (процесс, docs): в описании указать затронутые файлы `docs/specs/…` и `docs/decisions.md`.

## PR `story-1` | `story-2` | `story-3` → `main`

Только здесь — чеклист курса для cross-check (не мержить в `main`):

1. Task: ссылка на story
2. Screenshot (можно сводный QA / скрины)
3. Deployment: https://bogagree.github.io/minigames/
4. Done / deadline
5. Score: ___ / 294
