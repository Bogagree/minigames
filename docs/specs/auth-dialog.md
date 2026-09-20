# Auth dialog — RSS-QS-1-5-1 … RSS-QS-1-5-5

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) (`fileKey` `hkWWcHFefT8fIxSmQvvXMb`). Секция canvas: **Dialog windows** (Login / Registration на dimmed backdrop). Курс-only файл для вёрстки не использовать.

## Figma node-ids

Figma MCP Starter на момент реализации был rate-limited (402). **QA должен снять node-ids** с рабочего драфта (типично кадры Login / Registration ~420px). Зафиксировать сюда после inspect:

| Кадр               | node-id      | Notes                                     |
| ------------------ | ------------ | ----------------------------------------- |
| Login              | _pending QA_ | Dialog windows                            |
| Registration       | _pending QA_ | Dialog windows                            |
| Style guide inputs | _pending QA_ | default / focus; error states вне Story 1 |

## Chrome (user Dev Mode paste, 2026-09-20) — ground truth

Login and Registration share **one window chrome family**. Login and Create Account / Sign Up share **one submit chrome family**. Do **not** copy carousel `--shadow-card` onto the dialog. Do **not** copy CTA `--shadow-cta` onto the submit.

### Dialog panel (both modes identical)

Selected Hug frame **420×623**:

| Property      | Value                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Padding       | 32 all sides (`--auth-dialog-padding` / `--size-4`)                                                                     |
| Gap           | 24 (`--auth-dialog-gap` / `--size-3`)                                                                                   |
| Clip content  | off                                                                                                                     |
| Corner radius | 24 (`--radius-auth-dialog` → `--size-3`)                                                                                |
| Fill          | `bg` (`--color-bg`)                                                                                                     |
| Stroke        | `on-primary`, **Inside**, weight **3** (`--border-width-auth-dialog`)                                                   |
| Drop shadow   | X **8**, Y **8**, Blur **0**, Spread **0**, Color **#111111** 100% (`black` / `--color-black` → `--shadow-auth-dialog`) |

Visible shadow: do **not** put `overflow: hidden` (or scroll overflow) on the same box as this `box-shadow`. Inner scroll wrapper (`.auth-dialog__body`) if the panel must scroll.

### Primary submit (Login and Create Account identical)

Selected **356×52** (full content width minus padding):

| Property    | Value                                                                                   |
| ----------- | --------------------------------------------------------------------------------------- |
| Fill        | `primary` (`--color-primary`)                                                           |
| Stroke      | `on-primary`, **Inside**, weight **2.5** (`--border-width-card`)                        |
| Drop shadow | X **0**, Y **4**, Blur **0**, Spread **0**, Color `on-primary` (`--shadow-auth-submit`) |
| Size        | `--auth-dialog-submit-height` 52px; width 100% of content                               |

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
