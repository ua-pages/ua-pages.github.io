# Портфоліо Олександра Васильєва

Персональний сайт-портфоліо. Старший універсальний програміст з ухилом на клієнтську частину.

## Стек

- Vanilla JS Web Components
- Node.js HTTP server
- CSS (власні стилі)

## Запуск

```bash
npm start          # production mode
npm run start:dev  # dev mode з --watch
```

Сайт буде доступний на `http://localhost:4200`.

## Як це працює

Фронтенд — SPA на нативних Web Components без фреймворків.
Сервер — простий Node.js HTTP сервер, який роздає статику з `portfolio/`.
Форма заявки надсилає POST-запит на `/api/contact`. Сервер валідує дані та пересилає повідомлення в Telegram через Bot API.

## Структура

```
├── portfolio/
│   ├── index.html
│   ├── assets/
│   ├── css/
│   ├── js/
│   │   └── components/
│   │       ├── app-root.js
│   │       └── lead-intake.js
│   ├── robots.txt
│   └── sitemap.xml
├── server.js
├── package.json
├── ROADMAP.md
└── README.md
```

## Ліцензія

MIT
