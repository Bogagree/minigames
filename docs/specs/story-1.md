# Story 1 — spec

Канонические баллы: [story-1.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md) (**294**).  
Здесь — наш рабочий скоуп и статус. Обновлять при закрытии шагов и уточнении UI.

## Цель

Репозиторий, tooling, SPA-каркас, вёрстка Home (unauthenticated) и layout Auth-диалога. Без реального API.

## In scope

| Область                | Ожидание                                         | Статус                   |
| ---------------------- | ------------------------------------------------ | ------------------------ |
| Tooling                | Vite, TS, ESLint, Prettier, Husky, Sass tokens   | есть                     |
| SPA                    | bootstrap, тонкий router, Home stub              | есть (stub; UI по шагам) |
| Deploy                 | GitHub Pages preview                             | есть                     |
| Header                 | [unauthenticated](./header.md), по нашему драфту | есть (RSS-QS-1-4-1)      |
| Burger                 | mobile menu                                      | todo ← Next              |
| Hero                   | секция Home                                      | todo                     |
| Carousel               | layout слайдера игр                              | todo                     |
| Leaderboard + Game Dev | секции Home                                      | todo                     |
| Footer                 |                                                  | todo                     |
| Auth dialog            | RSS-QS-1-5-1 … 1-5-5                             | todo                     |
| Favicon + QA           | pixel-check breakpoints                          | todo                     |

## Out of scope (Story 1)

- Library UI (Story 2+)
- History API / полные роуты (Story 4)
- Backend, Firebase, unit-тесты (пока план не расширен)
- UI-фреймворки и готовые UI-библиотеки

## Порядок реализации

Шаги и имена веток — [story-1-plan.md](../story-1-plan.md).  
Общие правила планов — [implementation-plan.md](../implementation-plan.md).  
Стек и структура — [architecture.md](./architecture.md) + [decisions.md](../decisions.md).

## Definition of done (фича Story 1)

- [ ] Соответствует Figma на 375 / 768 / 1920 (±10px)
- [ ] Семантика + BEM + токены, без magic values
- [ ] Нет `console.log` / явного `any`
- [ ] Коммиты по RS git convention; один логичный PR в `story-1`
- [ ] Спека этой области обновлена, если поведение уточняли

Когда появится отдельная фича-спека (например `specs/header.md`) — строка в таблице выше ссылается на неё.
