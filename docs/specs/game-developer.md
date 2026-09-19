# Game developer CTA — RSS-QS-1-4-6

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Developer CTA Section nodes `12:2279` (home-mobile), `12:2260` (home-tablet), `10:2241` (home-desktop).

## Scope

- Секция «Are You a Game Developer?» на Home: иллюстрация, карточка, CTA **Submit Form**, контактный email.
- Breakpoints: 375 / 768 / 1920; плавный ресайз между ними.
- **Mobile/tablet:** колонка (иллюстрация над карточкой). **Desktop:** ряд, gutter `120px`, иллюстрация `682×483`, карточка `958×344`.
- Кнопка есть и стилизована; **без действия** на этом шаге.
- Карточка `cta-card` (`10:2250` / `12:2269` / `12:2288`): заливка `--color-white`; stroke **Inside** weight **2** `--color-on-primary` (`--border-width-md`, `box-sizing: border-box`); Drop shadow X `0` Y `14` blur `30` spread `-10` `#000000` 7.84% (`--shadow-cta`). Не `--border-width-card` и не `--shadow-card` карусели. Без точечного паттерна, если его нет на инстансе.
- Ассет иллюстрации: `src/assets/images/illustration-side.jpg` (экспорт из драфта, кладёт человек). Не подменять SVG-заглушкой.

## Out of scope

- Отправка формы, Footer, Auth dialog
