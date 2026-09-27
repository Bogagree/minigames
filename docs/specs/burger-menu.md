# Burger menu (mobile) — RSS-QS-1-4-2

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=2-565) (`home-mobile-nav-guest`).

## Scope

- Guest-вариант полноэкранного mobile menu (≤ desktop breakpoint; burger виден до 1920).
- Открытие по burger; плавная анимация open/close без горизонтального скролла.
- Burger → close (×) с анимацией иконки; close внутри панели; закрытие по `Esc`.
- Home открывает Home; Library открывает Library; Tournaments и Community открывают Home. Переход без перезагрузки и без History API (D-021). Меню закрывается.
- Текущий пункт: `burger-menu__nav-link--current` и `aria-current="page"`. Совпадает с открытой страницей и с header.
- Логотип открывает Home и закрывает меню.
- Log In / Sign Up → [Auth dialog](./auth-dialog.md); меню закрывается.
- Тот же burger на [Library](./library.md).

## Out of scope

- Authenticated menu variant
- Вёрстка содержимого Auth dialog (RSS-QS-1-5-*)
