# Library — chrome (RSS-QS-2-1-1, RSS-QS-2-1-2, RSS-QS-2-1-3)

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1). Шапка, burger и футер — те же компоненты, что на Home ([header](./header.md), [burger](./burger-menu.md), [footer](./footer.md)).

## Scope

- Страница Library собирает тот же header, burger и footer. Второй копии в коде нет.
- Home ↔ Library — смена страницы в памяти, без перезагрузки и без History API (D-021).
- Library-ссылки (header, burger, Explore в footer) открывают Library. Home и ссылки без своей страницы (Tournaments, Community, Categories, Company, соцсети, логотип) открывают Home.
- Активный пункт в header и в burger — открытая страница. `aria-current="page"` в Explore футера — на Home или Library, в зависимости от страницы.
- Оболочка страницы: header, `main` с скрытым `h1` «Library», footer. Каталог на этом шаге пустой.

## Out of scope

- Фильтры, карточки, Game Details, пагинация, логика слайдера
- Реальная фильтрация и History API
