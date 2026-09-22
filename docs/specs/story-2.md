# Story 2 — spec

Канонические баллы: [story-2.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-2.md) (**257**).  
Здесь — рабочий скоуп и статус. Обновлять при закрытии шагов. Детали критериев не копируем: ссылка на файл курса в таблице.

## Цель

Страница Library, диалог Game Details, логика слайдера Home и семантическая проверка состояний Story 2. Без API и без History API.

## Git

По [common project requirements](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-project-requirements.md):

- База `story-2` от `story-1` (не от `main`: Story 1 ещё на cross-check, в `main` не влита, релизный тег не ставим).
- Фичи: `feat/…` → PR в `story-2`, **мержить**.
- Сдача: PR `story-2` → `story-1`, **не мержить**.

## In scope

| Область              | Ожидание                                                                   | Баллы                                                                                                                                                                | Статус |
| -------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Header на Library    | Тот же header, что Story 1; Library-ссылки открывают Library; active state | 5 · [RSS-QS-2-1-1](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-1-1-library-header-unauthenticated.md) | нет    |
| Burger на Library    | Тот же burger; active state в меню                                         | 5 · [RSS-QS-2-1-2](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-1-2-library-burger-menu.md)            | нет    |
| Footer на Library    | Тот же footer; ссылки по правилам навигации Story 2                        | 5 · [RSS-QS-2-1-3](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-1-3-library-footer.md)                 | нет    |
| Фильтры и сортировка | Заголовок, чипы, сорт — layout + UI-состояние, без реальной фильтрации     | 25 · [RSS-QS-2-1-4](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-1-4-library-filtering-sorting.md)     | нет    |
| Карточки игр         | Статичный список, ellipsis описания, кнопка Details открывает диалог       | 40 · [RSS-QS-2-1-5](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-1-5-library-game-cards-list.md)       | нет    |
| Пагинация            | Layout и визуальные состояния; список карточек не перерисовывается         | 15 · [RSS-QS-2-1-6](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-1-6-library-pagination.md)            | нет    |
| Game Details         | Триггер, backdrop, анимации, hero, info, top records, comments             | 70 · RSS-QS-2-2-1 … 2-2-6                                                                                                                                            | нет    |
| Слайдер Home         | Логика карусели Story 1; pixel-perfect на этом шаге не оценивают           | 80 · [RSS-QS-2-3-1](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-3-1-home-slider-interaction-logic.md) | нет    |
| Семантика            | Nu Html Checker по трём состояниям                                         | 12 · [RSS-QS-2-4-1](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/RSS-QS-2-4-1-global-semantic-validation.md)    | нет    |

Вёрстка — по [рабочему драфту](./overview.md), не по общему файлу курса.

## Общие правила Story 2

Источники курса (обязательны для затронутых задач):

- [SPA navigation](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/common-spa-navigation-requirements.md)
- [Game Details content](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-2/common-game-details-content-requirements.md)
- [Common layout](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-layout-requirements.md) — для секций Library и диалога
- [Common project](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-project-requirements.md)

Навигация:

- Home ↔ Library — client-side смена страницы без полной перезагрузки. History API, deep link и синхронизация URL — не в этой story (D-006, Story 4).
- Пункт текущей страницы активен и в header, и в burger; состояние обновляется при переходе.
- Ссылки без своей страницы в макете (соцсети, заглушки) по-прежнему ведут на Home.
- Header, burger и footer — те же компоненты, что на Home, без второй копии.

Фильтры, сорт, пагинация — только UI:

- Чипы: один активный; в узком вьюпорте не переносятся, обрезаются границей секции и листаются свайпом. Полоса прокрутки не видна и не сдвигает layout. Клик не фильтрует список.
- Сорт: выбранный метод виден в контроле; список закрывается после выбора. Смена не сортирует карточки. Нативный `<select>` на macOS плохо попадает в макет — кастомный контроль допустим.
- Пагинация: один активный номер; на первой странице disabled «назад», на последней — «вперёд»; desktop/tablet не больше 4 номеров, mobile не больше 3 (плюс стрелки). Клик не меняет список карточек.

Game Details:

- Всегда один и тот же статичный контент: **Tukoni: Forest Keepers**, с любой карточки Library и с любой карточки слайдера.
- Кнопка основного действия — `Play Now` (игра бесплатная). Вариант `Buy Now` не делаем. Клик по `Play Now` ничего не делает.
- `Add to Favorites`, лайки комментариев и текст комментария — временные. После закрытия диалога сбрасываются. Не сохраняем.
- Диалог по центру вьюпорта; backdrop как у Auth (Story 1).
- Открытие и закрытие анимированы. Закрытие: кнопка внутри, клик по backdrop, `Esc`. Без горизонтального скролла страницы.
- Ширина: 600px на desktop и tablet; на 375px — вся ширина 375px.
- Textarea комментария растёт до 88px, дальше внутренний скролл. `Submit` стилизован и ничего не отправляет.
- Лайк одного комментария не меняет остальные. Top Records без интерактива.
- Описание карточки Library, не влезающее в карточку, обрезается многоточием через CSS.

Слайдер (логика, не pixel-check):

- Ровно 9 карточек — игры с `"featured": true` в [all-games-seed.json](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/mock-data/all-games-seed.json). Файл можно не подключать: достаточно того же статичного списка.
- Закольцован в обе стороны. Свайп, стрелки, автошаг влево каждые 4 секунды.
- Удержание паузит таймер; отпускание без свайпа доигрывает остаток; свайп после удержания сбрасывает таймер на 4 секунды.
- Ширина карточки ≥ 288px — оверлей: title, likes, звёзды. Меньше 288px — только картинка. Длинный title на широкой карточке — ellipsis в одну строку.
- Клик по любой карточке слайдера открывает тот же Game Details.
- Размеры карточек анимируются: ближе к центру крупнее. Только TypeScript и SCSS, без библиотек карусели.
- Число карточек, пропорции и общий вид на 375 / 768 / 1920 совпадают с макетом; попиксельная сверка этого шага курсом не оценивается.

Семантика (Nu Html Checker, rendered DOM, не View Source):

1. Library, состояние по умолчанию.
2. Library с открытым Game Details.
3. Library, burger открыт, ширина ≤ 768px.

Полные баллы состояния — «No errors or warnings». Только warnings — половина. Info не считается.

Mock API и backend не подключаем. Хардкод из макета допустим.

## Out of scope

- Реальная фильтрация, сортировка и смена страницы списка
- Контент диалога по конкретной игре, `Buy Now`, сохранение избранного, лайков и черновика
- History API и URL страниц
- Backend, Firebase, unit-тесты
- UI-фреймворки и готовые слайдеры
- Влитие `story-1` в `main` и релизный тег

## Порядок реализации

Шаги и `## Next` — [story-2-plan.md](../story-2-plan.md).  
Стек — [architecture.md](./architecture.md) + [decisions.md](../decisions.md).

## Definition of done (фича Story 2)

- [ ] Layout-шаги: Figma на 375 / 768 / 1920 (±10px), кроме RSS-QS-2-3-1 (там логика, не pixel-check)
- [ ] Семантика + BEM + токены, без magic values
- [ ] Нет `console.log` / явного `any`
- [ ] Коммиты по RS git convention; один логичный PR в `story-2`
- [ ] Спека области обновлена, если поведение уточняли

Отдельная фича-спека (например `specs/library.md`) появляется в PR этого шага; строка таблицы выше тогда ссылается на неё.
