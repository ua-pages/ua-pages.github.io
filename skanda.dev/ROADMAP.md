# TASKS — Portfolio Project

Файл для задач, ідей та наступних кроків по портфоліо-проєкту.

## Поточний статус

- [x] Vanilla JS Web Components SPA запускається локально
- [x] Node.js HTTP server (static file server) підготовлений
- [x] Root-level scripts додані (`start`, `start:dev`)
- [x] `.gitignore` доданий
- [x] `.env.example` доданий
- [x] Основні UI-тексти українською
- [x] QR code на Telegram додано
- [x] robots.txt доданий
- [x] sitemap.xml доданий
- [x] Open Graph metadata (частково — бракує og:image, og:url)
- [x] Telegram notification service + API endpoint для форми заявки
- [x] README.md + MIT LICENSE
- [x] UI перевірено після QR-коду

## Найближчі задачі

- [x] README.md
- [x] LICENSE (MIT)
- [x] Додати Telegram notification service у backend
- [x] Підключити реальний `TELEGRAM_BOT_TOKEN`
- [x] Отримати й додати `TELEGRAM_CHAT_ID`
- [x] Перевірити відправку заявки в Telegram
- [x] Додати `.env` локально на основі `.env.example`
- [x] Перевірити форму заявки локально — API endpoint працює
- [x] Перевірити UI після додавання QR-коду
- [ ] Додати production build script (якщо потрібно)

## Frontend ideas

- [ ] Покращити Hero section
- [ ] Додати screenshots / preview у README
- [ ] Додати og:image та og:url метадані
- [ ] Додати блок кейсів / pet-проєктів
- [ ] Додати downloadable CV
- [ ] Додати англійську версію сайту
- [ ] Додати UA / EN перемикач
- [ ] Перемикати бюджет на гривні
- [ ] Оновити список послуг
- [ ] Можливість прикріпити файл з технічним описом завдання
- [ ] Додати номер телефону та email у розділ контактів; прибрати LinkedIn
- [ ] Виділити форму заявки + Telegram-відправку в окремий компонент і винести в окремий репозиторій

## Backend ideas

- [ ] Додати Telegram notification service з форматованим повідомленням
- [ ] Додати DTO/валідацію для lead form
- [ ] Додати basic anti-spam protection
- [ ] Додати rate limit для contact endpoint
- [ ] Додати health endpoint

## Deployment

- [ ] Обрати hosting для frontend
- [ ] Обрати hosting для backend (якщо буде окремий)
- [ ] Налаштувати environment variables
- [ ] Налаштувати CORS для production domain
- [ ] Перевірити Telegram bot у production

## Архітектурні нотатки

**Поточна архітектура:**
- Фронтенд: Vanilla JS Web Components
- Бекенд: простий Node.js HTTP сервер для статики
- Стек був переглянутий на користь мінімалістичного підходу

**Telegram:**
QR code веде напряму на Telegram-профіль:
```txt
https://t.me/copcoopallie
```

Пізніше можна перенаправити QR на Telegram bot, якщо буде потрібен повноцінний bot flow.
