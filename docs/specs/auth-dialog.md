# Auth dialog — RSS-QS-1-5-1 … RSS-QS-1-5-5

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) (`fileKey` `hkWWcHFefT8fIxSmQvvXMb`).  
Канон вёрстки при Figma MCP 402: PNG `tmp/pixel-perfect/Login Dialog.png` и `Register Dialog.png` (D-020).

## Figma node-ids

| Кадр         | node-id      | Notes                                           |
| ------------ | ------------ | ----------------------------------------------- |
| Login        | user PNG     | `tmp/pixel-perfect/Login Dialog.png` 428×631    |
| Registration | user PNG     | `tmp/pixel-perfect/Register Dialog.png` 428×776 |
| Style guide  | _pending QA_ | error states вне Story 1                        |

PNG включает drop-shadow кадра; живая панель — **420px** ширина (RSS-QS-1-5-5), не 428.

## Chrome (D-017)

Панель: fill `bg`, stroke inside 3 `on-primary`, shadow 8/8/0/0 `#111111`, radius 24, padding 32. Submit: fill `primary`, inset 2.5 `on-primary` + drop 0/4 `on-primary`. Google-кнопка — **другая** семья: fill white, stroke 2 `on-primary`, без `--shadow-auth-submit`.

## Scope

- Singleton `<dialog>` с header и burger. Центр, dimmed backdrop, open/close, Esc / backdrop / close.svg.
- Сегмент **Login / Register** (pill, active = fill `on-primary` + белый текст).
- Login: title «Welcome Back!», email, password + visibility, Forgot Password? (без API), submit Login, OR, Continue with Google (без OAuth), hint Register.
- Register: «Create Account», username, email, password, confirm password, Create Account, OR, Sign up with Google, hint Login.
- Семантика: `<form>`, типы `email` / `password` / `text`. Submit `preventDefault`. Validation errors — не в этом шаге.
- Иконки полей / Google / eye: `src/assets/icons/{mail,lock,user,eye,eye-off,google}.svg` (D-020). Не выдумывать новые растры персонажей.

## Out of scope

- Реальный login / register / Google / forgot-password API
- Validation / error UI
- Authenticated session UI
