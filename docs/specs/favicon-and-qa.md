# Favicon + global HTML check — RSS-QS-1-6-1

Рабочий макет: [наш драфт](https://www.figma.com/design/hkWWcHFefT8fIxSmQvvXMb/MiniGames--Copy-?node-id=0-1).  
Канон: [RSS-QS-1-6-1](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/tasks/story-1/RSS-QS-1-6-1-global-semantic-validation.md).  
Favicon: строка в [story-1.md](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md) + [common project requirements](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/common-project-requirements.md).

Pixel Perfect 375 / 768 / 1920 — отчёт фабрики: `docs/qa/favicon-and-qa.md` (этот файл **не** подменяет QA PASS). При 402 Figma MCP — PNG в `tmp/pixel-perfect/` ([инструкция](../qa/README.md)).

## Favicon

- Иконка вкладки — бренд-марк из драфта, уже экспортированный как `src/assets/icons/logo-mark.png` (header / burger / footer).
- Копия для Vite `public/`: `public/favicon.png`.
- Подключение: `index.html` → `<link rel="icon" type="image/png" href="./favicon.png" />`.
- Отдельного кадра Favicon в драфте нет; новый SVG не рисуем (D-018).

## RSS-QS-1-6-1 — self-check

Ну-чекер: [validator.w3.org/nu](https://validator.w3.org/nu/). Полные баллы: _Document checking completed. No errors or warnings to show._ Info игнорировать.

SPA (D-005): View Page Source — оболочка `index.html`. Для Home / Auth / burger курс просит те же шаги на открытом состоянии; для живого DOM сдаём `document.documentElement.outerHTML` с префиксом `<!DOCTYPE html>`.

Состояния:

1. Home (default)
2. Auth dialog open
3. Burger menu open (viewport ≤ 768)

## Developer notes (не QA pixel-отчёт)

- Оболочка: `html lang="en"`, charset, viewport, title, favicon, входной script.
- Семантика Home: `header` / `main#main-content` / `footer`; секции с `h2`; карусель — `ul` без лишнего `role="list"`; таблица — `caption` + `th[scope=col]`.
- `aria-hidden="false"` не ставим (Nu warning). Скрытый бургер — только `hidden` (без дубля `aria-hidden`); открытый — `hidden` снят. Неактивная auth-панель — `aria-hidden="true"` + `inert`. `role="tabpanel"` на обёртке панели, не на `<form>`. Статы карусели — видимое значение + sr-only подпись, без `aria-label` на generic `<span>`.
- Нативный `<dialog>` без лишнего `aria-modal`.
