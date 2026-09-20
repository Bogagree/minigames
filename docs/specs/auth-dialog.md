# Auth dialog — RSS-QS-1-5-1 … RSS-QS-1-5-5

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) (`fileKey` `hkWWcHFefT8fIxSmQvvXMb`). Секция canvas: **Dialog windows** (Login / Registration на dimmed backdrop). Курс-only файл для вёрстки не использовать.

## Figma node-ids

Figma MCP Starter на момент реализации был rate-limited (402). **QA должен снять node-ids** с рабочего драфта (типично кадры Login / Registration ~420px). Зафиксировать сюда после inspect:

| Кадр               | node-id      | Notes                                     |
| ------------------ | ------------ | ----------------------------------------- |
| Login              | _pending QA_ | Dialog windows                            |
| Registration       | _pending QA_ | Dialog windows                            |
| Style guide inputs | _pending QA_ | default / focus; error states вне Story 1 |

## Scope

- Один и тот же singleton `<dialog>` с header (desktop Log In / Sign Up) и burger (меню закрывается).
- Центр вьюпорта, dimmed backdrop (`color-mix` on-primary + `--opacity-backdrop`).
- Open/close animation; dismiss: backdrop click, Esc, close (`src/assets/icons/close.svg`, без новых иконок).
- Tabs **Login** / **Registration** (active ≠ inactive) + animated panel switch; inline **Register** / **Login**; без reload.
- Semantic `<form>`: login — email + password; registration — nickname + email + password. Типы `email` / `password` / `text`. Submit без API (`preventDefault`). Validation error states — не в этом шаге.
- Нет password-visibility / eye SVG (в драфте нет отдельного экспорта; не выдумывать).
- Desktop/tablet ширина **420px**; mobile — `100% − 32px`, max 420px; без H-scroll.

## Out of scope

- Реальный login/register API
- Validation / error UI
- Authenticated session UI
