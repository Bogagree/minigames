# Header (unauthenticated) — RSS-QS-1-4-1

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) (`Header` на home-desktop / home-tablet / home-mobile).

## Scope

- Только guest-состояние хедера.
- Breakpoints: 375 (logo + burger), 768 (logo + Sign Up + burger), 1920 (logo + nav + Log In + Sign Up).
- Home открывает Home; Library открывает Library; Tournaments и Community (страниц в макете нет) открывают Home. Переход без перезагрузки и без History API (D-021).
- Текущий пункт: `header__nav-link--current` и `aria-current="page"`. На Home это Home, на Library — Library.
- Логотип открывает Home.
- Log In / Sign Up открывают [Auth dialog](./auth-dialog.md) (`login` / `register`).
- Кнопка burger в разметке есть; панель меню — [burger-menu.md](./burger-menu.md) (RSS-QS-1-4-2). Тот же header на [Library](./library.md).

## Out of scope

- Authenticated header
- Вёрстка содержимого диалога (см. [auth-dialog.md](./auth-dialog.md))
