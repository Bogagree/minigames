# Product & domain overview

## Что это

MiniGames — SPA каталога мини-игр (RS School qualifying stage): Home, Library, диалоги Auth и Game Details. Стек: TypeScript + HTML + SCSS, без UI-фреймворков и готовых UI-библиотек.

## Доменные области

| Область            | Смысл                                                         | Где в коде (план)                         |
| ------------------ | ------------------------------------------------------------- | ----------------------------------------- |
| Home               | Лендинг: hero, карусель игр, leaderboard, блок game developer | `src/pages/home/` + компоненты            |
| Library            | Список/каталог игр                                            | `src/pages/library/` (контент со Story 2) |
| Auth               | Логин / регистрация (диалог)                                  | `src/components/dialogs/auth-dialog/`     |
| Game Details       | Карточка/детали игры (диалог)                                 | позже по story                            |
| Session / UI state | auth, открытые диалоги                                        | `src/state/` (по мере надобности)         |
| Data               | mock / позже API                                              | `src/services/`                           |

## Внешние артефакты

- **Рабочий макет (для вёрстки):** [MiniGames (Copy) — наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1)
- Канон курса (не править, только сверка): [Figma MiniGames](https://www.figma.com/design/4MnLizE59gZI2DDxaSgZqi/MiniGames)
- Баллы и чеклисты: Story-файлы qualifying-stage (см. [docs/README.md](../README.md))

Агент и команда верстают **только по рабочему драфту**. Общий файл курса — источник задания, не рабочая копия.

## Инварианты продукта (все story)

- Semantic HTML, Chrome latest
- Pixel Perfect 375 / 768 / 1920 (±10px); адаптив от 375px без горизонтального скролла
- Выше 1920px: макет по центру, не растягивается
- Нет React/Vue/Angular/Svelte, Bootstrap/Tailwind, jQuery/Swiper и прочих UI-библиотек
