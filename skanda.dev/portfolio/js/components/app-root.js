import { profile, highlights, skills, experience, stack } from '../data/portfolio-content.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      min-height: 100vh;
      background:
        radial-gradient(circle at 20% 10%, rgba(56, 189, 248, 0.22), transparent 28rem),
        radial-gradient(circle at 78% 4%, rgba(168, 85, 247, 0.2), transparent 26rem),
        linear-gradient(180deg, #020617 0%, #0f172a 46%, #111827 100%);
    }

    .page-shell {
      width: min(1160px, calc(100% - 32px));
      margin: 0 auto;
      padding: 1rem 0 4rem;
    }

    .topbar {
      position: sticky;
      top: 1rem;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.8rem 1rem;
      border: 1px solid var(--line, rgba(148, 163, 184, 0.18));
      border-radius: 999px;
      background: rgba(2, 6, 23, 0.72);
      backdrop-filter: blur(18px);
    }

    .brand, .nav-links, .hero-actions, .meta-row, .stack-strip, .bot-flow {
      display: flex;
      align-items: center;
    }

    .brand {
      gap: 0.7rem;
      color: var(--text, #f8fafc);
      text-decoration: none;
    }

    .brand .logo {
      display: grid;
      width: 2.2rem;
      height: 2.2rem;
      place-items: center;
      border-radius: 50%;
      color: #020617;
      font-weight: 900;
      background: linear-gradient(135deg, #67e8f9, #a78bfa 55%, #f0abfc);
    }

    .nav-links {
      gap: 0.2rem;
    }

    .nav-links a {
      padding: 0.62rem 0.82rem;
      border-radius: 999px;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.92rem;
    }

    .nav-links a:hover {
      color: #fff;
      background: rgba(148, 163, 184, 0.11);
    }

    .section {
      margin-top: 5rem;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
      gap: 2rem;
      align-items: center;
      min-height: calc(100vh - 7rem);
    }

    .eyebrow {
      margin: 0 0 1rem;
      color: var(--cyan, #67e8f9);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    h1, h2, h3, p {
      margin-top: 0;
    }

    h1 {
      max-width: 820px;
      margin-bottom: 1.2rem;
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1.1;
      letter-spacing: -0.04em;
    }

    h2 {
      margin-bottom: 1rem;
      font-size: clamp(2rem, 4vw, 4.2rem);
      line-height: 0.98;
      letter-spacing: -0.055em;
    }

    h3 {
      margin-bottom: 0.7rem;
      font-size: 1.15rem;
    }

    .lead {
      max-width: 760px;
      margin-bottom: 1rem;
      color: #dbeafe;
      font-size: clamp(1.25rem, 2vw, 1.65rem);
      line-height: 1.5;
    }

    .summary, .section-heading p, .glass-card p, .timeline p, .leadflow p {
      color: var(--muted, #94a3b8);
      line-height: 1.72;
    }

    .summary {
      max-width: 700px;
    }

    .hero-actions {
      gap: 0.8rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 3rem;
      padding: 0 1.1rem;
      border-radius: 999px;
      font-weight: 800;
      text-decoration: none;
      cursor: pointer;
    }

    .button.primary {
      color: #020617;
      background: linear-gradient(135deg, #67e8f9, #a78bfa 55%, #f0abfc);
    }

    .button.ghost {
      color: var(--text, #f8fafc);
      border: 1px solid rgba(148, 163, 184, 0.24);
      background: rgba(15, 23, 42, 0.64);
    }

    .meta-row {
      gap: 0.7rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
      color: #cbd5e1;
    }

    .meta-row span, .meta-row a {
      color: inherit;
      text-decoration: none;
      padding: 0.45rem 0.7rem;
      border: 1px solid rgba(148, 163, 184, 0.16);
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.48);
    }

    .signal-card, .glass-card, .leadflow, .timeline article, .contact-section {
      border: 1px solid var(--line, rgba(148, 163, 184, 0.18));
      background: var(--surface, rgba(15, 23, 42, 0.62));
      box-shadow: 0 24px 80px rgba(2, 6, 23, 0.24);
      backdrop-filter: blur(18px);
    }

    .signal-card {
      padding: 1.3rem;
      border-radius: 1.7rem;
    }

    .signal-card .availability {
      margin-bottom: 1rem;
      color: #bbf7d0;
      font-weight: 800;
    }

    .signal-card ul {
      display: grid;
      gap: 0.8rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .signal-card li {
      padding: 0.9rem;
      border-radius: 1rem;
      color: #dbeafe;
      background: rgba(2, 6, 23, 0.48);
    }

    .stack-strip {
      flex-wrap: wrap;
      gap: 0.55rem;
    }

    .stack-strip span {
      padding: 0.55rem 0.75rem;
      border: 1px solid var(--line, rgba(148, 163, 184, 0.18));
      border-radius: 999px;
      color: #dbeafe;
      background: rgba(15, 23, 42, 0.54);
    }

    .section-grid {
      display: grid;
      grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
      gap: 2rem;
    }

    .section-heading {
      position: sticky;
      top: 6rem;
      align-self: start;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .glass-card {
      min-height: 100px;
      padding: 1.2rem;
      border-radius: 1.4rem;
      display: flex;
      align-items: center;
    }

    .glass-card h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.4;
      color: #dbeafe;
    }

    .leadflow {
      display: grid;
      grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
      gap: 2rem;
      align-items: center;
      padding: clamp(1.25rem, 4vw, 2.4rem);
      border-radius: 1.8rem;
    }

    .bot-flow {
      justify-content: flex-end;
      gap: 0.65rem;
      flex-wrap: wrap;
    }

    .bot-flow span {
      padding: 0.72rem 0.9rem;
      border-radius: 999px;
      color: #e0f2fe;
      background: rgba(2, 6, 23, 0.52);
    }

    .bot-flow strong {
      color: var(--cyan, #67e8f9);
    }

    .timeline {
      display: grid;
      gap: 1rem;
    }

    .timeline article {
      display: grid;
      grid-template-columns: minmax(210px, 0.6fr) minmax(0, 1fr);
      gap: 1rem;
      padding: 1.2rem;
      border-radius: 1.4rem;
    }

    .timeline span {
      display: block;
      margin-bottom: 0.7rem;
      color: var(--cyan, #67e8f9);
      font-size: 0.86rem;
      font-weight: 800;
    }

    .timeline strong {
      color: #cbd5e1;
    }

    .contact-section {
      display: grid;
      grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
      gap: 2rem;
      padding: clamp(1.25rem, 4vw, 2.4rem);
      border-radius: 1.8rem;
    }

    .contact-actions {
      display: grid;
      gap: 1rem;
    }

    .telegram-qr-card {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 1.25rem;
      align-items: center;
      padding: 1.1rem;
      border: 1px solid rgba(148, 163, 184, 0.22);
      border-radius: 1.4rem;
      background:
        radial-gradient(circle at top right, rgba(56, 189, 248, 0.16), transparent 38%),
        rgba(15, 23, 42, 0.72);
      box-shadow: 0 24px 80px rgba(2, 6, 23, 0.22);
    }

    .telegram-qr-content {
      display: grid;
      gap: 0.55rem;
    }

    .telegram-qr-content .eyebrow {
      margin-bottom: 0.15rem;
    }

    .telegram-qr-content h3 {
      margin: 0;
    }

    .telegram-qr-content p {
      margin: 0;
      color: var(--muted, #94a3b8);
      line-height: 1.7;
    }

    .telegram-link {
      width: fit-content;
      color: #bfdbfe;
      font-weight: 800;
      text-decoration: none;
    }

    .telegram-link:hover {
      text-decoration: underline;
    }

      .telegram-qr-image {
        width: 8.25rem;
        height: 8.25rem;
        padding: 0.55rem;
        border-radius: 1rem;
        background: #fff;
        object-fit: contain;
      }

      #copyTip {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        translate: -50%;
        padding: 0.7rem 1.2rem;
        border-radius: 999px;
        background: #166534;
        color: #bbf7d0;
        font-size: 0.9rem;
        font-weight: 700;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.25s;
      }
      #copyTip.show-tip {
        opacity: 1;
      }

    @media (max-width: 900px) {
      .topbar, .hero, .section-grid, .leadflow, .contact-section, .timeline article {
        grid-template-columns: 1fr;
      }

      .topbar {
        display: grid;
        border-radius: 1.4rem;
      }

      .nav-links {
        flex-wrap: wrap;
      }

      .hero {
        min-height: auto;
        padding-top: 3rem;
      }

      .section-heading {
        position: static;
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }

      .bot-flow {
        justify-content: flex-start;
      }

      .telegram-qr-card {
        grid-template-columns: 1fr;
        justify-items: start;
      }

      .telegram-qr-image {
        width: 9.25rem;
        height: 9.25rem;
      }
    }
  </style>

  <main class="page-shell">
    <nav class="topbar" aria-label="Основна навігація">
      <a class="brand" href="#top">
        <span class="logo">OV</span>
        <strong>Олександр Васильєв</strong>
      </a>
      <div class="nav-links">
        <a href="#skills">Навички</a>
        <a href="#leadflow">Telegram flow</a>
        <a href="#experience">Досвід</a>
        <a href="#contact">Контакти</a>
      </div>
    </nav>

    <section id="top" class="hero section">
      <div class="hero-copy">
        <p class="eyebrow">Веб-розробка · Full-stack · Інженерний підхід до продукту</p>
        <h1 id="role"></h1>
        <p class="lead" id="headline"></p>
        <p class="summary" id="summary"></p>

        <div class="hero-actions">
          <a class="button primary" id="contactBtn">Обговорити проєкт</a>
          <a class="button ghost" id="emailLink" role="button" tabindex="0">Копіювати email</a>
        </div>

        <div class="meta-row">
          <span id="location"></span>
          <span id="phone"></span>
          <span id="telegram"></span>
          <a id="githubLink" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>

      <aside class="signal-card" aria-label="Професійні акценти">
        <div class="availability">Відкритий до Senior / Tech Lead ролей</div>
        <ul id="highlights"></ul>
      </aside>
    </section>

    <section class="section stack-strip" id="stackStrip" aria-label="Технологічний стек"></section>

    <section id="skills" class="section section-grid">
      <div class="section-heading">
        <p class="eyebrow">Технічні навички</p>
        <h2>Сучасна веб-розробка від клієнта до сервера.</h2>
        <p>Комплексний підхід: проєктування архітектури, інтеграції, оптимізація та супровід продуктів будь-якої складності.</p>
      </div>
      <div class="cards-grid" id="skillsGrid"></div>
    </section>

    <section id="leadflow" class="section leadflow">
      <div>
        <p class="eyebrow">Функція портфоліо</p>
        <h2>Telegram Lead Flow</h2>
        <p>Це портфоліо працює не лише як сайт-візитка, а як невеликий full-stack продукт: форма контакту надсилає структуровані заявки в Telegram через API.</p>
      </div>
      <div class="bot-flow" aria-label="Процес обробки заявки">
        <span>Відвідувач</span>
        <strong>→</strong>
        <span>Форма</span>
        <strong>→</strong>
        <span>API</span>
        <strong>→</strong>
        <span>Telegram-заявка</span>
      </div>
    </section>

    <section id="experience" class="section section-grid">
      <div class="section-heading">
        <p class="eyebrow">Досвід</p>
        <h2>Багаторічний досвід у веб-розробці.</h2>
        <p>10+ років у продуктових, enterprise та freelance середовищах з відповідальністю за архітектуру, якість коду й delivery.</p>
      </div>
      <div class="timeline" id="experienceList"></div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="section-heading">
        <p class="eyebrow">Контакти</p>
        <h2>Є продукт, команда або застосунок, якому потрібна допомога?</h2>
        <p>Залиште коротку заявку. Backend передасть її в Telegram, щоб я міг швидко побачити контекст і відповісти.</p>
      </div>
      <div class="contact-actions">
        <div class="telegram-qr-card">
          <div class="telegram-qr-content">
            <p class="eyebrow">Telegram</p>
            <h3>Швидкий контакт</h3>
            <p>Скануйте QR-код або перейдіть за посиланням, щоб написати мені напряму в Telegram.</p>
            <a class="telegram-link" href="https://t.me/copcoopallie" target="_blank" rel="noreferrer">@copcoopallie</a>
          </div>
          <img class="telegram-qr-image" src="./assets/images/telegram-contact-qr.png" alt="QR-код для переходу в Telegram" />
        </div>
        <lead-intake></lead-intake>
      </div>
    </section>
  </main>
`;

export class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById('role').textContent = profile.role;
    this.shadowRoot.getElementById('headline').textContent = profile.headline;
    this.shadowRoot.getElementById('summary').textContent = profile.summary;
    const emailLink = this.shadowRoot.getElementById('emailLink');
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(profile.email).then(() => {
        const tip = this.shadowRoot.getElementById('copyTip') || (() => {
          const el = document.createElement('span');
          el.id = 'copyTip';
          el.textContent = 'Email скопійовано';
          emailLink.parentNode.appendChild(el);
          return el;
        })();
        tip.classList.add('show-tip');
        setTimeout(() => tip.classList.remove('show-tip'), 2000);
      }).catch(() => {
        // fallback — виділити текст
        const ta = document.createElement('textarea');
        ta.value = profile.email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      });
    });
    this.shadowRoot.getElementById('contactBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const el = this.shadowRoot.getElementById('contact');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
    this.shadowRoot.getElementById('location').textContent = profile.location;
    this.shadowRoot.getElementById('phone').textContent = profile.phone;
    this.shadowRoot.getElementById('telegram').textContent = profile.telegram;
    this.shadowRoot.getElementById('githubLink').href = profile.github;

    const highlightsList = this.shadowRoot.getElementById('highlights');
    highlights.forEach(h => {
      const li = document.createElement('li');
      li.textContent = h;
      highlightsList.appendChild(li);
    });

    const strip = this.shadowRoot.getElementById('stackStrip');
    stack.forEach(s => {
      const span = document.createElement('span');
      span.textContent = s;
      strip.appendChild(span);
    });

    const grid = this.shadowRoot.getElementById('skillsGrid');
    skills.forEach(s => {
      const article = document.createElement('article');
      article.className = 'glass-card';
      article.innerHTML = `<h3>${s}</h3>`;
      grid.appendChild(article);
    });

    const list = this.shadowRoot.getElementById('experienceList');
    experience.forEach(e => {
      const article = document.createElement('article');
      const company = e.company ? `<strong>${e.company}</strong>` : '';
      article.innerHTML = `
        <div>
          <span>${e.period}</span>
          <h3>${e.role}</h3>
          ${company}
        </div>
        <p>${e.text}</p>
      `;
      list.appendChild(article);
    });
  }
}

customElements.define('app-root', AppRoot);
