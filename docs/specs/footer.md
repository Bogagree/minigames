# Footer — RSS-QS-1-4-7

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Footer nodes `2:468` (home-mobile), `2:252` (home-tablet), `1:211` (home-desktop).

## Scope

- Футер Home: бренд, tagline, колонки Explore / Company, Community (иконки), копирайт, RS School, GitHub студента, на desktop/tablet — «Designed with love».
- Breakpoints: 375 / 768 / 1920; плавный ресайз между ними.
- **Mobile:** колонка; ссылки Explore | Company в 2 колонки; Community ниже; внизу копирайт, затем RS School + GitHub. Без «Designed with love».
- **Tablet:** колонка сверху (бренд + 3 группы в ряд); низ — 4 слота space-between.
- **Desktop:** ряд бренд | группы; gutter `120px`; высота секции `343px`.
- Nav-ссылки и social-иконки ведут на Home (`BASE_URL`).
- RS School → `https://rs.school/` (новая вкладка). GitHub → `https://github.com/Bogagree` (`@Bogagree`), вместо плейсхолдера `@student-nickname` на макете.
- Цвета (канва Home): фон `--color-bg-footer`; бренд/заголовки `--color-white`; текст/ссылки `--color-on-bg-footer`; social fill `--color-bg-footer-low` (hover `--color-bg-footer-lowest`); RS mark `--color-primary`; github-icon круг `--color-white`.
- Иконки Community: Figma text-glyphs `share` / `chat` / `rss_feed` (`1:235` / `1:237` / `1:239`); github `code` (`13:2311`). SVG в `src/assets/icons/` по тем же glyph names. Логотип — существующий `logo-mark.png`.

## Out of scope

- Auth dialog, Library routing, реальные соцсети (кроме Home href)
