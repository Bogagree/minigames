# Carousel / Slider section — RSS-QS-1-4-4

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — New Games Section nodes `2:383` (home-mobile), `2:134` (home-tablet), `1:36` (home-desktop).

## Scope

- Статический layout секции карусели на Home: заголовок «New Games», стрелки (tablet+), трек карточек.
- Breakpoints: 375 / 768 / 1920; плавный ресайз между ними.
- **Desktop (1920):** секция с gutter `120px` → трек/контент **1680px**. Карточки: peek `120` / side `288` / featured `816` / side `288` / peek `120`, gap `8`, inset трека `8` (как в Figma node `1:46`).
- **Правило 288px:** карточки шириной ≥ 288px показывают нижний info-overlay (title + rating + likes); уже — только изображение. Реализовано через CSS container query.
- Стрелки в разметке есть и стилизованы; **без переключения слайдов** на этом шаге.
- Ассеты карточек: `src/assets/images/games/*-card.jpg` (курс assets).

## Out of scope

- Интерактив слайдера / смена слайдов
- Leaderboard, Game Dev, Footer
