# Architecture

Связано с [decisions.md](../decisions.md). Меняешь границы слоёв — обнови эту спеку и добавь/правь decision.

## Стек

- TypeScript (strict; без явного `any`)
- Vite (`base: '/minigames/'`)
- Sass/SCSS: `tokens`, `mixins`, `functions`, `globals`
- ESLint + Prettier + Husky (commit-msg, pre-push)

## Слои

```text
index.html          → точка входа (без разметки приложения)
src/app/            → bootstrap, router
src/pages/          → страницы (собирают компоненты)
src/components/     → UI-блоки (header, hero, …)
src/data/           → статические mock JSON (Story 1)
src/services/       → данные / API (позже)
src/state/          → состояние приложения (позже)
src/utils/          → чистые хелперы (dom, …)
src/styles/         → токены и глобальные стили
src/assets/         → картинки/иконки (только реальные ассеты)
```

## Правила модулей

- Имя блока = имя файлов: `header.ts` + `header.scss`, не `index.ts` в папке блока.
- Пустые каталоги в `src/` не держат через `.gitkeep`: сразу placeholder-модуль (`export {};` / `.block {}`). См. `.cursor/rules/empty-source-placeholders.mdc`.
- Страница не знает про Vite/деплой; роутер не знает вёрстку секций Home.
- Mock JSON импортируется в UI-модуль напрямую (`src/data/…`). HTTP/`src/services` — когда появится API.

## Роутинг (сейчас)

- `createRouter(routes, fallbackPath)` рендерит fallback-страницу в корень приложения.
- History API и многостраничный SPA — вне текущей архитектуры Story 1 (D-006).

## Деплой

- CI: GitHub Actions → GitHub Pages из `vite build`.
- Превью: https://bogagree.github.io/minigames/
