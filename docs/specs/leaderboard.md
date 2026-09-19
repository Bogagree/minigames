# Leaderboard — RSS-QS-1-4-5

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Top Players Section nodes `2:421` (home-mobile), `2:189` (home-tablet), `2:12` (home-desktop).

## Scope

- Секция Top Players на Home: заголовок, статическая таблица из `src/data/leaderboard.json`.
- Breakpoints: 375 / 768 / 1920; плавный ресайз между ними.
- **Mobile:** 3 строки; колонки Rank / Player / Score / Streak; score compact (`94.2K`); streak `🔥 12d`; заголовок «Top Players».
- **Tablet:** 3 строки; колонки Rank / Player / Games / Score / Streak; score full; streak compact; заголовок «Top Players This Week».
- **Desktop:** 5 строк; колонки Rank / Player / Games Played / Total Score / Streak / Favorite Game; streak `🔥 12 days`.
- Интерактивных элементов нет.
- Цвета (канва Home): шапка `2:17` `--color-tertiary` `#3A2EBF`, текст `--color-white`; внешняя рамка `.leaderboard__table-frame` как у `.slider__card`: `--border-width-card` + `--color-on-primary` + `--shadow-card` (shadow на обёртке, `overflow: hidden` на самой таблице, чтобы не срезать тень); зебра **с первой строки body**: нечётные (`2:30`, `2:62`, `2:94`) `--color-bg` `#F9F8F3`, чётные (`2:46`, `2:78`) белые; разделитель строк `--border-width-sm` (1px) `--color-outline`; аватарки `--color-avatar-random-1…5` с бордером `--color-on-primary`; чип Favorite Game — заливка прозрачная, обводка `--color-outline-variant`.

## Out of scope

- Сортировка, API, Game Dev, Footer
