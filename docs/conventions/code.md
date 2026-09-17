# Code conventions

Детали стека: [architecture.md](../specs/architecture.md), решения: [decisions.md](../decisions.md).

## TypeScript

- Vanilla TS, без UI-фреймворков.
- Без явного `any` (−5 за каждый по курсу).
- Без `console.log` в сдаваемом коде (−10 за уникальный вызов, до −30).

## SCSS

- Токены и mixins из `src/styles/`.
- BEM-классы; без Bootstrap/Tailwind.
- Не использовать `reset.css` (не рекомендуется курсом).

## Модули в `src/`

- Файлы блока по имени: `header.ts` + `header.scss`.
- Placeholder: `export {};` и `.header {}` — не `.gitkeep`.
- `public/` и `src/assets/` — только реальные ассеты.

## Запрещено (штрафы курса)

- Готовые UI-библиотеки (−200)
- Вёрстка скриншотами (−90)
- Magic values вместо токенов (−10 … −50)
