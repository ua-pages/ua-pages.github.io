# ua-pages — інженерне портфоліо

Персональний сайт Олександра Васильєва про інженерні проєкти, developer tooling, platform engineering і технічний підхід.

Живий сайт: https://ua-pages.github.io/

## Основа

- Vanilla JavaScript і ES Modules
- Web Components
- CSS custom properties
- статичний GitHub Pages deployment
- без build step

Контент зберігається окремо від представлення у `src/js/data/portfolio-content.js`.

## Локальний перегляд

Сайт потребує звичайного статичного сервера:

```bash
python3 -m http.server 4200 --directory src
```

Після цього він буде доступний на `http://localhost:4200`.

## Структура

```text
src/
├── index.html
├── css/
├── assets/
└── js/
    ├── components/
    └── data/
```

## Ліцензія

MIT
