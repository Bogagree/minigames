# Library — filters (RSS-QS-2-1-4)

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1), кадры `library-desktop` `2:611`, `library-tablet` `2:820`, `library-mobile` `2:1023`. Покой чипов — эти кадры. Открытый сорт — guidebook `2:1902` / `2:1923`.

## Scope

Секция на Library: заголовок, чипы категорий, контроль сортировки. Только layout и UI-состояние (D-022). Карточки не рисуем и не фильтруем.

- `h1` — **Game Library**. Подзаголовок — «Browse our collection of casual mini-games». На desktop (`2:629`, кадр 375×22) размер `--font-size-title-xxx-small` и line-height 22px. Tablet и mobile оставляют свои размеры.
- Чипы, один активный (старт — **All Games**): All Games, Puzzle, Card, Match, Farm, Strategy, Arcade.
- Клик по чипу делает его активным и снимает предыдущий. Список игр не меняется.
- Чипы в одну строку, без переноса. Если ряд не влезает, он обрезается краем трека и листается свайпом или перетаскиванием мышью. Полоса прокрутки скрыта и не резервирует место.
- Сорт: **Rating ↑**, **Rating ↓** (старт), **Name A→Z**, **Name Z→A**. В кнопке видно `Sort by: <метод>`. После выбора список закрывается. Карточки не сортируются.
- У выбранного пункта видна галочка из `src/assets/icons/check.svg` (14×14, экспорт как есть, без перекраски). У остальных пунктов её нет.
- Отдельного шеврона на кнопке нет: кадр desktop показывает подпись `Sort by: Rating ↓`, стрелка направления уже внутри текста. `arrow-forward.svg` остаётся шевроном карусели.
- Чип в покое (кадры library, не guidebook): default — заливка `--color-white`, current — `--color-primary`. У обоих глифы `--color-on-primary` и внутренняя обводка `--border-width-md` цвета `--color-on-primary` (`box-shadow: inset`, без внешней рамки и без тени). Следующий пиксель снаружи чипа — `--color-bg`. Hover чипа — `--color-secondary`, у current — `--color-primary-high`. Сорт — белая кнопка с `--border-width-md` и `--color-on-primary`, пункт current `--color-primary`.
- Горизонтальный padding чипа — `--size-2` плюс `--border-width-sm`. На 768 зазор ряда `--size-1`, сумма семи чипов и зазоров около 610px; на 1920 зазор `--size-2`, сумма около 658px. На 375 высота чипа 31px, зазор `--size-1`, трек 343px, без переноса, полоса прокрутки скрыта.

## Out of scope

- Реальная фильтрация, сортировка и смена страницы
- Карточки, пагинация, Game Details
- Отдельная SVG-иконка шеврона на кнопке сорта
