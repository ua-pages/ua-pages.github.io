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
        name: 'get-services',
        description: 'Отримати список послуг, які пропонує розробник',
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
              description: 'Назва проєкту (наприклад: "Tarot UA", "Color Adapt UA", "CodeHealth UA", "Leaf Viewer UA")',
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
        name: 'get-stack',
        description: 'Отримати технологічний стек розробника',
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
        description: 'Отримати список open-source проєктів та внесків у спільноту',
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
        name: 'submit-contact',
        description: 'Надіслати заявку на співпруцю через форму контактів',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Ім\'я або назва компанії',
            },
            contact: {
              type: 'string',
              description: 'Email, Telegram або LinkedIn для зв\'язку',
            },
            service: {
              type: 'string',
              description: 'Тип послуги',
              enum: [
                'Бізнес-система / внутрішній портал',
                'CRM / ERP рішення',
                'Автоматизація бізнес-процесів',
                'Корпоративний веб-додаток',
                'MVP для стартапу',
                'AI-інтеграція',
                'Технічний аудит',
                'Інше',
              ],
            },
            message: {
              type: 'string',
              description: 'Опис задачі або проєкту',
            },
          },
          required: ['name', 'contact', 'message'],
        },
        async execute({ name, contact, service, message }, agent) {
          const confirmed = await agent.requestUserInteraction(async () => {
            return new Promise(resolve => {
              const ok = confirm(
                `Надіслати заявку?\n\nІм\'я: ${name}\nКонтакт: ${contact}\nПослуга: ${service || 'Не вказано'}\nПовідомлення: ${message}`,
              );
              resolve(ok);
            });
          });

          if (!confirmed) {
            return {
              content: [{ type: 'text', text: 'Надсилання заявки скасовано користувачем.' }],
            };
          }

          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, contact, service, message }),
            });
            if (!res.ok) throw new Error('Failed');
            return {
              content: [{ type: 'text', text: 'Заявку надіслано успішно. Олександр відповість найближчим часом.' }],
            };
          } catch {
            return {
              content: [{ type: 'text', text: `Не вдалося надіслати заявку. Напишіть на email: ${profile.email}` }],
            };
          }
        },
      },
      {
        name: 'navigate-to-section',
        description: 'Перейти до секції на сторінці (hero, services, why, projects, opensource, about, contact)',
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
          const el = document.getElementById(section);
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
