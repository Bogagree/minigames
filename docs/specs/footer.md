# Footer — RSS-QS-1-4-7

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Footer nodes `2:468` (home-mobile), `2:252` (home-tablet), `1:211` (home-desktop).

## Scope

- Футер Home: бренд, tagline, колонки Explore / Company, Community (иконки), копирайт, RS School, GitHub студента, на desktop/tablet — «Designed with love».
- Breakpoints: 375 / 768 / 1920; плавный ресайз между ними.
- **Mobile:** колонка; ссылки Explore | Company в 2 колонки; Community ниже; внизу копирайт, затем RS School + GitHub. Без «Designed with love».
- **Tablet:** колонка сверху (бренд + 3 группы в ряд); низ — 4 слота space-between.
- **Desktop:** ряд бренд | группы; gutter `120px`; высота секции `343px`.
- Explore: Home → Home, Library → Library, Categories и Tournaments → Home. Company и иконки Community → Home. Логотип → Home. Переход без перезагрузки и без History API (D-021).
- `aria-current="page"` только у пункта Explore, который совпадает с открытой страницей (Home или Library).
- RS School → `https://rs.school/` (новая вкладка). GitHub → `https://github.com/Bogagree` (`@Bogagree`), вместо плейсхолдера `@student-nickname` на макете.
- Цвета (канва Home + Dev Mode paste): фон `--color-bg-footer` `#1E1B3A`; бренд/заголовки колонок `--color-white`; tagline и nav-ссылки `--color-on-bg-footer` `#B9B5C9`; social fill `--color-bg-footer-low` `#2A264F`, hover `--color-bg-footer-lowest` `#3C376E`; stroke/effects у текста нет. RS / GitHub — экспорты контейнеров с канвы.
- Иконки Community: экспорт чипов `share` / `chat` / `rss_feed` (`src/assets/icons/share.svg`, `chat.svg`, `rss-feed.svg`). RS: `rs-logo-container.svg`. GitHub `code`: `github-icon.svg`. Логотип — существующий `logo-mark.png`.

## Out of scope

- Auth dialog, реальные соцсети (кроме перехода на Home)
