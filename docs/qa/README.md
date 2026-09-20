# QA — отчёты и локальные экспорты Figma

Отчёты фабрики: `docs/qa/<feat-slug>.md` (числа и вердикт, **без** PNG в git). Контракт: [D-011](../decisions.md), скилл `.cursor/skills/minigames-qa/SKILL.md`.

## Когда Figma MCP недоступен (402 / rate-limit)

Скачай кадры **рабочего драфта** (не файл курса) руками и положи PNG **1×** сюда (сами PNG в `.gitignore`, папка видна по `tmp/pixel-perfect/README.md`):

```text
tmp/pixel-perfect/home-375.png
tmp/pixel-perfect/home-768.png
tmp/pixel-perfect/home-1920.png
```

| Файл            | Экспорт                     |
| --------------- | --------------------------- |
| `home-375.png`  | Home, ширина кадра **375**  |
| `home-768.png`  | Home, ширина кадра **768**  |
| `home-1920.png` | Home, ширина кадра **1920** |

Опционально секция: `tmp/pixel-perfect/<block>-<375|768|1920>.png` (например `header-375.png`).

Auth: `Login Dialog.png`, `Register Dialog.png` (канон D-020). Burger: `home-mobile-nav-guest.png`. Home: `home-mobile.png` / `home-tablet.png` / `home-desktop.png` (алиасы 375 / 768 / 1920).

QA при отбивке MCP **сначала** читает эти файлы. Пустая папка → **BLOCKED**, не PASS из гайдбука. Pixel Perfect MCP: `designImagePath` = абсолютный путь к этим PNG, `url` = live preview.
