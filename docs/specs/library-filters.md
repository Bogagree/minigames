# Library — filters (RSS-QS-2-1-4)

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1), кадры `library-desktop` `2:611`, `library-tablet` `2:820`, `library-mobile` `2:1023`. Состояния чипов и сорта — guidebook `2:1902` / `2:1923`.

## Scope

Секция на Library: заголовок, чипы категорий, контроль сортировки. Только layout и UI-состояние (D-022). Карточки не рисуем и не фильтруем.

- `h1` — **Game Library**. Подзаголовок — «Browse our collection of casual mini-games». На desktop (`2:629`, кадр 375×22) размер `--font-size-title-xxx-small` и line-height 22px. Tablet и mobile оставляют свои размеры.
- Чипы, один активный (старт — **All Games**): All Games, Puzzle, Card, Match, Farm, Strategy, Arcade.
- Клик по чипу делает его активным и снимает предыдущий. Список игр не меняется.
- Чипы в одну строку, без переноса. Если ряд не влезает, он обрезается краем трека и листается свайпом или перетаскиванием мышью. Полоса прокрутки скрыта и не резервирует место.
- Сорт: **Rating ↑**, **Rating ↓** (старт), **Name A→Z**, **Name Z→A**. В кнопке видно `Sort by: <метод>`. После выбора список закрывается. Карточки не сортируются.
- Состояния default / hover / current — токены гайдбука: чип current `--color-primary`, hover `--color-secondary`, обводка `--color-outline-variant`; сорт — белая кнопка с `--border-width-md` и `--color-on-primary`, пункт current `--color-primary`.

## Out of scope

- Реальная фильтрация, сортировка и смена страницы
- Карточки, пагинация, Game Details
- Отдельная SVG-иконка шеврона и галочка в пункте (экспорт Figma на этом шаге недоступен; критерий принимает контроль без иконки стрелки)
