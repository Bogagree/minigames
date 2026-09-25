# Architecture

Связано с [decisions.md](../decisions.md). Меняешь границы слоёв — обнови эту спеку и добавь/правь decision.

## Стек

- TypeScript (strict; без явного `any`)
- Vite (`base: '/minigames/'`)
- Sass/SCSS: `tokens`, `mixins`, `functions`, `globals`
- ESLint + Prettier + Husky (commit-msg, pre-push)

## Слои

```text
index.html          → точка входа (без разметки приложения; favicon в head)
public/             → статическая раздача Vite (favicon.png = Figma logo mark)
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

## Роутинг (Story 2)

- `createRouter(routes, fallbackPath)` рисует страницу в корень. Текущая страница — `home` | `library` в памяти (D-021).
- `navigate` перерисовывает корень без перезагрузки. History API, hash и deep link — Story 4 (D-006).
- Какая подпись куда ведёт — `src/app/navigation.ts`. Chrome получает `ChromeContext`, второй копии header/burger/footer нет.
- Auth dialog — singleton native `<dialog>` на `document.body` (D-016), не страница роутера.

## Деплой

- CI: GitHub Actions → GitHub Pages из `vite build`.
- Превью: https://bogagree.github.io/minigames/
