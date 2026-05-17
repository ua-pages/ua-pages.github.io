# Oleksandr Portfolio Workspace

Angular SSR + SCSS frontend, NestJS API, and Telegram lead-intake integration.

## Structure

```txt
portfolio/
  package.json          # root scripts
  scripts/              # app/dev/build/clear helpers
  portfolio-web/        # Angular SSR + SCSS frontend
  portfolio-api/        # NestJS API + Telegram service
```

## First run after cloning

From the root folder:

```bash
npm run app
```

This will:

1. install dependencies in `portfolio-api`
2. install dependencies in `portfolio-web`
3. build both projects
4. start API + Web in dev mode

Local URLs:

```txt
Web: http://localhost:4200
API: http://localhost:3333/api
```

## Useful commands

```bash
npm run install:all   # install FE + BE deps
npm run build         # build FE + BE
npm run dev:all       # start FE + BE in background
npm run dev:status    # show running dev processes
npm run dev:logs      # show last logs
npm run dev:stop      # stop dev processes
npm run app:clear     # clean node_modules/dist/cache/logs before archiving
```

## Telegram setup

Copy the API env example:

```bash
cp portfolio-api/.env.example portfolio-api/.env
```

Then fill:

```env
PORT=3333
WEB_ORIGIN=http://localhost:4200
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

Do not commit `.env`.

## Before sending archive

```bash
npm run app:clear
```

Then archive the `portfolio` folder.
