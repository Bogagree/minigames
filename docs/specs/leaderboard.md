# Leaderboard — RSS-QS-1-4-5

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) — Top Players Section nodes `2:421` (home-mobile), `2:189` (home-tablet), `2:12` (home-desktop).

## Scope

- Секция Top Players на Home: заголовок, статическая таблица из `src/data/leaderboard.json`.
- Breakpoints: 375 / 768 / 1920; плавный ресайз между ними.
- **Mobile:** 3 строки; колонки Rank / Player / Score / Streak; score compact (`94.2K`); streak `🔥 12d`; заголовок «Top Players».
- **Tablet:** 3 строки; колонки Rank / Player / Games / Score / Streak; score full; streak compact; заголовок «Top Players This Week».
- **Desktop:** 5 строк; колонки Rank / Player / Games Played / Total Score / Streak / Favorite Game; streak `🔥 12 days`.
- Интерактивных элементов нет.
- Цвета (гайдбук + канва `2:17` / `2:16`): шапка `--color-tertiary` `#3A2EBF`, текст `--color-white`; внешняя обводка таблицы `--border-width-md` (2px) `--color-on-primary` (не card 2.5px); зебра чётных строк — `--color-outline` на белом фоне; аватарки `--color-avatar-random-1…5` с бордером `--color-on-primary`; чип Favorite Game — заливка outline, обводка `--color-outline-variant`.

## Out of scope

- Сортировка, API, Game Dev, Footer
