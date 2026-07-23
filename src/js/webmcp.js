import { brand, profile, services, projects, stack, whyUaPages, openSource, approach } from './data/portfolio-content.js';

function initWebMCP() {
  if (!('modelContext' in navigator)) return;

  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'get-developer-info',
        description: 'Отримати інформацію про розробника: ім\'я, роль, контакти, про себе',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
        execute() {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  name: profile.name,
                  role: profile.role,
                  location: profile.location,
                  email: profile.email,
                  github: profile.github,
                  brand: brand.name,
                  tagline: brand.tagline,
                  about: profile.about,
                  titles: profile.titles,
                }, null, 2),
              },
            ],
          };
        },
      },
      {
        name: 'get-focus-areas',
        description: 'Отримати напрями інженерної роботи Олександра',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
        execute() {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(services, null, 2),
              },
            ],
          };
        },
      },
      {
        name: 'get-projects',
        description: 'Отримати список проєктів з портфоліо',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
        execute() {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  projects.map(p => ({
                    title: p.title,
                    url: p.url,
                    problem: p.problem,
                    solution: p.solution,
                    result: p.result,
                    tech: p.tech,
                  })),
                  null,
                  2,
                ),
              },
            ],
          };
        },
      },
      {
        name: 'get-project-details',
        description: 'Отримати деталі конкретного проєкту за назвою',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Назва проєкту (наприклад: "DevNest", "Seed", "IT Терміносфера", "ua-pages")',
            },
          },
          required: ['title'],
        },
        execute({ title }) {
          const project = projects.find(
            p => p.title.toLowerCase() === title.toLowerCase(),
          );
          if (!project) {
            return {
              content: [{ type: 'text', text: `Проєкт "${title}" не знайдено. Доступні проєкти: ${projects.map(p => p.title).join(', ')}` }],
            };
          }
          return {
            content: [{ type: 'text', text: JSON.stringify(project, null, 2) }],
          };
        },
      },
      {
        name: 'get-engineering-focus',
        description: 'Отримати інженерні напрями, сильні сторони та принципи прийняття рішень',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
        execute() {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ stack, whyUaPages, approach }, null, 2),
              },
            ],
          };
        },
      },
      {
        name: 'get-open-source',
        description: 'Отримати список відкритих інструментів і внесків у спільноту',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
        execute() {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(openSource, null, 2),
              },
            ],
          };
        },
      },
      {
        name: 'navigate-to-section',
        description: 'Перейти до секції портфоліо (напрями, підхід, проєкти, open source, про мене, контакти)',
        inputSchema: {
          type: 'object',
          properties: {
            section: {
              type: 'string',
              description: 'ID секції',
              enum: ['top', 'services', 'why', 'projects', 'opensource', 'about', 'contact'],
            },
          },
          required: ['section'],
        },
        execute({ section }) {
          const el = document.querySelector('app-root')?.shadowRoot?.getElementById(section)
            || document.getElementById(section);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            return {
              content: [{ type: 'text', text: `Перейдено до секції: ${section}` }],
            };
          }
          return {
            content: [{ type: 'text', text: `Секцію "${section}" не знайдено.` }],
          };
        },
      },
    ],
  });
}

initWebMCP();
