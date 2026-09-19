# Бриф: доработать агента QA

Статус: **сделано** (D-015, скиллы `minigames-qa` / `minigames-orchestrator`). Исторический бриф, не открытая задача.

Скилл: `.cursor/skills/minigames-qa/SKILL.md` (+ антипаттерны оркестратора). Не переписывать factory с нуля.

## Контекст

PR `feat/leaderboard-gamedev`, RSS-QS-1-4-5 / RSS-QS-1-4-6. Первый QA и ре-QA в `docs/qa/leaderboard-gamedev.md` были **PASS**. После этого человек нашёл ~10 тем (13 сообщений).

Рабочий макет: [MiniGames (Copy)](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1) (`fileKey` `hkWWcHFefT8fIxSmQvvXMb`). Курс `4MnLizE59gZI2DDxaSgZqi` для вёрстки **не** использовать.

## Что скилл уже запрещает

Не дублировать как «новое»; проверить, что агент **реально так делает**:

- circular PASS live ↔ same-PR spec / tokens
- PASS только по геометрии
- гайдбук «place» vs fill инстанса
- MCP нет → **BLOCKED**, не PASS
- выдуманный SVG → **FAIL**
- `rgba(0,0,0,0)` ≠ `#000000`
- спека противоречит канве → **FAIL**

## Дыры (закрыть)

1. **Неполный чеклист свойств.** Считаются fill / stroke / radius. Нет обязательных **effects**: `box-shadow` / Figma Drop shadow (X/Y/blur/spread/color/opacity), inside vs outside stroke, `2px` vs `2.5px`. CTA `10:2250`: stroke Inside 2, shadow `0 / 14 / 30 / −10`, `#000` 7.84%. Таблица потом должна совпасть с `.slider__card` (`--border-width-card` + `--shadow-card`), не с «2px из `2:16`» из прошлого отчёта.
2. **Дети секции не обязательны как FAIL.** В отчёте открыли секцию и иногда `2:17` / `2:16`, но не гарантированно: строки `2:30` / `2:46` / `2:62` / `2:78` / `2:94`, чип `2:44`, аватар, `cta-card` `10:2250` / `12:2269` / `12:2288`. Нет инстанса + fill/stroke/effect → не PASS по этому ребёнку (BLOCKED или FAIL).
3. **Гайдбук снова стал expected.** Ре-QA починил хедер и сразу записал zebra/chip expected из guidebook (`#E5E7EB`), хотя канва другая (зебра `--color-bg` `#F9F8F3` с нечётной первой строки; чип в итоге **transparent**). Правило: hex только **после** инстанса; гайдбук только именует токен.
4. **Cache геометрии = «есть evidence».** `get_metadata` x/width/height без fills не даёт color PASS. Required inputs в скилле всё ещё перечисляют такой cache как evidence #2 — поправить противоречие.
5. **Ассет non-blocking.** Выдуманный `game-developer-illustration.svg` при живом `illustration-side.jpg` от человека ушёл в non-blocking. Должен быть FAIL. MCP 402 / rate-limit → BLOCKED + сигнал скачать руками, не изобретать.
6. **Нет колонки «хром семейства».** Карточка карусели ≠ CTA ≠ таблица. Запретить «у всех карточек один бордер». Сверять эффект/stroke с **этим** node-id, не с соседним блоком, пока человек явно не сказал «как у X».
7. **overflow vs shadow.** `overflow: hidden` на том же боксе срезает `box-shadow` (таблица). QA должен мерить **видимую** тень (секция/обёртка), не только `getComputedStyle` у clipped элемента / element screenshot.
8. **Старый отчёт.** После user-review оркестратор должен **перезаписать** `docs/qa/<slug>.md`. Пока в файле PASS — задача QA не закрыта, если live уже другой. Скилл это почти не принуждает.

## Регрессионные кейсы

Новый скилл должен на них давать FAIL или BLOCKED, не PASS.

| Кейс                 | Инстанс                                                        | Ложный PASS                           |
| -------------------- | -------------------------------------------------------------- | ------------------------------------- |
| Хедер таблицы        | `2:17` tertiary `#3A2EBF` + белый текст                        | live/spec `#E5E7EB`                   |
| Внешний хром таблицы | как `.slider__card` / актуальный инстанс таблицы               | 2px без `--shadow-card` или наоборот  |
| Зебра                | нечёт body `2:30` `#F9F8F3`, чёт `2:46` белый, с первой строки | even `#E5E7EB`, старт с белого        |
| Чип Favorite         | `2:44` (сейчас fill transparent)                               | `#E5E7EB` «по гайдбуку»               |
| Аватарки             | random-1…5 + stroke on-primary                                 | один цвет на всех                     |
| CTA card             | `10:2250`: white, inside 2px on-primary, `--shadow-cta`        | без бордера / `--shadow-card` / точки |
| Иллюстрация          | jpg из драфта                                                  | сгенерированный SVG                   |

## Критерии готовности скилла

- Обязательная таблица: surface, **node-id**, fill, stroke (weight + inside/outside + hex), **effect/shadow**, live computed, match.
- `PASS` только если для каждого painted child в scope есть color **и** effect evidence с канвы (MCP `get_design_context` / `get_screenshot` на **child id**, user Dev Mode paste, или cache **с fills/effects**). Иначе BLOCKED.
- Явный запрет: expected hex из same-PR spec, `tokens.scss`, guidebook place, соседнего блока.
- Явный FAIL: invented asset; shadow в Figma есть, в live `none` (или наоборот, если на инстансе effects выключены).
- Оркестратор: post-user-review без свежего QA-отчёта ≠ зелёный PR; старый PASS не переиспользовать.
- MCP rate-limit: не PASS «по памяти гайдбука».

## Файлы и ограничения

- Трогать: `.cursor/skills/minigames-qa/SKILL.md`, при необходимости `.cursor/skills/minigames-orchestrator/SKILL.md`.
- Не мержить PR.
- Не гонять полный factory leaderboard, если не попросили.
- SDD: если меняется контракт QA — коротко в `docs/decisions.md` или в самом скилле, без романа в чате.
- Не требовать PNG в git; не сравнивать с курсовым Figma; не чинить вёрстку leaderboard в том же чате, если задача только про агента.
