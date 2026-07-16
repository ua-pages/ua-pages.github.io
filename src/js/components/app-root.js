import { brand, profile, services, whyUaPages, projects, openSource, approach, stack } from '../data/portfolio-content.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      min-height: 100vh;
      background: var(--bg);
    }

    .shell {
      width: min(var(--max-width), calc(100% - 40px));
      margin: 0 auto;
    }

    .section {
      padding: 100px 0;
    }

    .section-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .section-title {
      margin: 0 0 16px;
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 600;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: var(--text);
    }

    .section-subtitle {
      margin: 0 0 48px;
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 560px;
    }

    /* NAVBAR */
    nav {
      position: sticky;
      top: 12px;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      height: var(--nav-height);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: rgba(10, 10, 11, 0.78);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      margin-top: 12px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text);
      font-weight: 600;
      font-size: 14px;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: var(--radius-sm);
      background: var(--accent);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .nav-links a {
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: color 0.15s, background 0.15s;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--text);
      background: var(--surface);
    }

    .nav-links a:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .nav-toggle {
      display: none;
      padding: 8px;
      border: none;
      background: transparent;
      color: var(--text);
      cursor: pointer;
    }

    .nav-toggle svg {
      width: 24px;
      height: 24px;
    }

    /* HERO */
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 60px 0 40px;
      min-height: calc(100vh - var(--nav-height) - 40px);
      justify-content: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      padding: 6px 16px 6px 8px;
      border-radius: var(--radius-full);
      background: var(--surface);
      border: 1px solid var(--border);
      font-size: 13px;
      color: var(--text-secondary);
    }

    .hero-badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
    }

    .hero h1 {
      margin: 0 0 16px;
      font-size: clamp(32px, 5.5vw, 64px);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.04em;
      color: var(--text);
      max-width: 820px;
    }

    .hero h1 .highlight {
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero p {
      margin: 0 0 32px;
      font-size: clamp(16px, 1.8vw, 19px);
      color: var(--text-secondary);
      line-height: 1.7;
      max-width: 600px;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 44px;
      padding: 0 24px;
      border-radius: var(--radius-full);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: opacity 0.15s, transform 0.15s;
      border: none;
      font-family: inherit;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .btn-primary {
      background: var(--text);
      color: var(--bg);
    }

    .btn-secondary {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: var(--surface-hover);
      border-color: var(--border-hover);
    }

    .hero-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid var(--border);
      max-width: 600px;
      width: 100%;
    }

    .hero-stack span {
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-tertiary);
      font-size: 12px;
      font-weight: 500;
    }

    /* SERVICES */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .service-card {
      padding: 32px;
      background: var(--bg);
      transition: background 0.2s;
    }

    .service-card:hover {
      background: var(--surface);
    }

    .service-card h3 {
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
    }

    .service-card p {
      margin: 0;
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-secondary);
    }

    /* WHY UA-PAGES */
    .why-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .why-card {
      padding: 28px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      background: var(--surface);
      transition: border-color 0.2s, background 0.2s;
    }

    .why-card:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
    }

    .why-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 16px;
      margin-bottom: 16px;
      font-family: var(--font-mono);
    }

    .why-card h3 {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
      color: var(--text);
    }

    .why-card p {
      margin: 0;
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-secondary);
    }

    /* PROJECTS */
    .projects-list {
      display: grid;
      gap: 16px;
    }

    .project-card {
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: border-color 0.2s;
    }

    .project-card:hover {
      border-color: var(--border-hover);
    }

    .project-main {
      padding: 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px 40px;
    }

    .project-col {
      min-width: 0;
    }

    .project-card h3 {
      grid-column: 1 / -1;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text);
    }

    .project-field-label {
      display: block;
      margin-bottom: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-tertiary);
    }

    .project-field-text {
      margin: 0;
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-secondary);
    }

    .project-tech {
      grid-column: 1 / -1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .project-tech span {
      padding: 3px 10px;
      border-radius: var(--radius-full);
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-tertiary);
      font-size: 11px;
      font-weight: 500;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      font-size: 13px;
      font-weight: 500;
      color: var(--accent);
      text-decoration: none;
      transition: opacity 0.15s;
    }

    .project-link:hover {
      opacity: 0.8;
    }

    .project-screenshots {
      grid-column: 1 / -1;
      overflow: hidden;
    }

    .screenshot-strip {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding-bottom: 4px;
    }

    .screenshot-strip::-webkit-scrollbar {
      display: none;
    }

    .screenshot-strip img {
      flex-shrink: 0;
      width: 280px;
      height: 170px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      object-fit: cover;
      scroll-snap-align: start;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .screenshot-strip img:hover {
      opacity: 0.85;
    }

    .preview-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: zoom-out;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .preview-overlay.open {
      opacity: 1;
    }

    .preview-overlay img {
      max-width: 90vw;
      max-height: 90vh;
      border-radius: var(--radius-sm);
      object-fit: contain;
      transform: scale(0.95);
      transition: transform 0.2s;
    }

    .preview-overlay.open img {
      transform: scale(1);
    }

    /* OPEN SOURCE */
    .oss-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .oss-card {
      padding: 28px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      background: var(--surface);
      transition: border-color 0.2s, background 0.2s;
    }

    .oss-card:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
    }

    .oss-card-featured {
      border-color: rgba(59, 130, 246, 0.3);
      background: var(--accent-soft);
      grid-column: 1 / -1;
    }

    .oss-card-featured:hover {
      border-color: rgba(59, 130, 246, 0.5);
      background: rgba(59, 130, 246, 0.15);
    }

    .oss-card h3 {
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
    }

    .oss-card p {
      margin: 0 0 12px;
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-secondary);
    }

    .oss-link {
      font-size: 13px;
      font-weight: 500;
      color: var(--accent);
      text-decoration: none;
    }

    .oss-link:hover {
      opacity: 0.8;
    }

    /* APPROACH */
    .approach-list {
      display: grid;
      gap: 12px;
    }

    .approach-item {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 16px;
      padding: 20px 24px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--surface);
      transition: border-color 0.2s;
    }

    .approach-item:hover {
      border-color: var(--border-hover);
    }

    .approach-check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      background: var(--green-soft);
      color: var(--green);
      font-size: 14px;
      font-weight: 700;
    }

    .approach-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .approach-text strong {
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
    }

    .approach-text span {
      font-size: 14px;
      line-height: 1.7;
      color: var(--text-secondary);
    }

    /* ABOUT */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .about-main {
      padding: 32px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      background: var(--surface);
    }

    .about-main p {
      margin: 0 0 16px;
      font-size: 14px;
      line-height: 1.8;
      color: var(--text-secondary);
    }

    .about-main p:last-child {
      margin-bottom: 0;
    }

    .about-titles {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .about-title-card {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--surface);
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
      transition: border-color 0.2s, background 0.2s;
    }

    .about-title-card:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
    }

    /* CONTACTS */
    .contacts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .contact-card {
      padding: 20px 24px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--surface);
      transition: border-color 0.2s;
    }

    .contact-card:hover {
      border-color: var(--border-hover);
    }

    .contact-card-label {
      display: block;
      margin-bottom: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-tertiary);
    }

    .contact-card-value {
      font-size: 15px;
      font-weight: 500;
      color: var(--text);
      text-decoration: none;
    }

    .contact-card-value:hover {
      color: var(--accent);
    }

    /* FOOTER */
    footer {
      padding: 48px 0 32px;
      border-top: 1px solid var(--border);
      margin-top: 40px;
    }

    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color: var(--text-tertiary);
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      color: var(--text-secondary);
    }

    /* FORM */
    .form-card {
      padding: 28px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border);
      background: var(--surface);
    }

    .form-card h3 {
      margin: 0 0 20px;
      font-size: 16px;
      font-weight: 600;
      color: var(--text);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }

    .form-group label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--text);
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: border-color 0.15s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: var(--accent);
    }

    .form-group input:focus-visible,
    .form-group select:focus-visible,
    .form-group textarea:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .form-group textarea {
      resize: vertical;
      min-height: 90px;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: var(--text-tertiary);
    }

    .form-status {
      margin-top: 12px;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 500;
    }

    .form-status.success {
      background: var(--green-soft);
      color: var(--green);
    }

    .form-status.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .submit-btn {
      width: 100%;
    }

    /* EMPTY STATE */
    .empty-screenshots {
      grid-column: 1 / -1;
      padding: 20px;
      text-align: center;
      border-radius: var(--radius-sm);
      background: var(--surface);
      color: var(--text-tertiary);
      font-size: 13px;
    }

    /* CLIPBOARD TOAST */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      translate: -50%;
      padding: 10px 20px;
      border-radius: var(--radius-full);
      background: var(--text);
      color: var(--bg);
      font-size: 13px;
      font-weight: 600;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 10000;
    }

    .toast.show {
      opacity: 1;
    }

    @media (max-width: 768px) {
      .shell {
        width: calc(100% - 24px);
      }

      .section {
        padding: 60px 0;
      }

      .hero {
        padding: 60px 0 40px;
        min-height: auto;
      }

      .nav-links {
        position: fixed;
        top: calc(var(--nav-height) + 12px);
        left: var(--shell-padding, 12px);
        right: var(--shell-padding, 12px);
        background: rgba(10, 10, 11, 0.98);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        flex-direction: column;
        padding: 16px;
        gap: 8px;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        display: none;
        z-index: 99;
      }

      .nav-links.open {
        display: flex;
      }

      .nav-links a {
        width: 100%;
        text-align: center;
        padding: 12px 16px;
      }

      .nav-toggle {
        display: flex;
      }

      .shell {
        --shell-padding: 12px;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .service-card {
        padding: 24px;
      }

      .why-grid {
        grid-template-columns: 1fr;
      }

      .project-main {
        grid-template-columns: 1fr;
        padding: 24px;
      }

      .oss-grid {
        grid-template-columns: 1fr;
      }

      .about-grid {
        grid-template-columns: 1fr;
      }

      .contacts-grid {
        grid-template-columns: 1fr;
      }

      .section-title {
        margin-bottom: 28px;
      }

      .hero-actions {
        flex-direction: column;
        width: 100%;
      }

      .hero-actions .btn {
        width: 100%;
      }

      .footer-inner {
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .hero-stack span {
        font-size: 11px;
        padding: 3px 10px;
      }

      .screenshot-strip img {
        width: 220px;
        height: 135px;
      }
    }

    @media (max-width: 320px) {
      .shell {
        width: calc(100% - 16px);
      }

      .section {
        padding: 40px 0;
      }

      .hero {
        padding: 40px 0 24px;
      }

      .hero-badge {
        font-size: 11px;
        padding: 4px 10px 4px 6px;
      }

      h1 {
        font-size: clamp(24px, 7vw, 32px);
      }

      .hero p {
        font-size: 14px;
      }

      .btn {
        height: 40px;
        padding: 0 18px;
        font-size: 13px;
      }

      .section-title {
        font-size: clamp(22px, 6vw, 28px);
        margin-bottom: 32px;
      }

      .section-subtitle {
        font-size: 13px;
        margin: 0 0 32px;
      }

      .service-card,
      .why-card,
      .oss-card,
      .approach-item {
        padding: 20px;
      }

      .project-main {
        padding: 20px;
      }

      .project-field-text {
        font-size: 13px;
      }

      .project-tech span {
        font-size: 10px;
        padding: 2px 8px;
      }

      .about-main {
        padding: 20px;
      }

      .about-title-card {
        font-size: 13px;
        padding: 12px 16px;
      }

      .form-group input,
      .form-group select,
      .form-group textarea {
        padding: 10px 12px;
        font-size: 14px;
      }

      .nav-logo {
        width: 24px;
        height: 24px;
        font-size: 10px;
      }
    }
  </style>

  <div class="shell">
    <nav aria-label="Основна навігація">
      <a class="nav-brand" href="#top">
        <span class="nav-logo">UP</span>
        <span>ua-pages</span>
      </a>
      <div class="nav-links" id="navLinks">
        <a href="#services">Послуги</a>
        <a href="#why">Чому ua-pages</a>
        <a href="#projects">Проєкти</a>
        <a href="#opensource">Open Source</a>
        <a href="#about">Про мене</a>
        <a href="#contact" class="nav-cta" style="color:var(--accent)">Контакти</a>
      </div>
      <button class="nav-toggle" id="navToggle" aria-label="Відкрити меню" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </nav>

    <section id="top" class="hero">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        <span>Відкритий до співпраці</span>
      </div>
      <h1><span class="highlight">Сучасна веб-розробка</span><br>для українського бізнесу</h1>
      <p>Допомагаю українському бізнесу створювати веб-системи швидше та ефективніше завдяки сучасним AI-інструментам розробки.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" id="contactBtn">Обговорити проєкт</a>
        <a class="btn btn-secondary" href="#projects">Переглянути роботи</a>
      </div>
      <div class="hero-stack" id="heroStack"></div>
    </section>

    <section id="services" class="section">
      <span class="section-label">Послуги</span>
      <h2 class="section-title">Чим можу допомогти</h2>
      <p class="section-subtitle">Не просто код — рішення для вашого бізнесу. Від ідеї до готового продукту.</p>
      <div class="services-grid" id="servicesGrid"></div>
    </section>

    <section id="why" class="section">
      <span class="section-label">Чому ua-pages</span>
      <h2 class="section-title">Мій підхід до розробки</h2>
      <p class="section-subtitle">Чотири принципи, які відрізняють мою роботу та приносять реальну цінність бізнесу.</p>
      <div class="why-grid" id="whyGrid"></div>
    </section>

    <section id="projects" class="section">
      <span class="section-label">Портфоліо</span>
      <h2 class="section-title">Проєкти, які я створив</h2>
      <p class="section-subtitle">Кожен проєкт — це історія: проблема, рішення, результат. Не просто список технологій.</p>
      <div class="projects-list" id="projectsList"></div>
    </section>

    <section id="opensource" class="section">
      <span class="section-label">Open Source</span>
      <h2 class="section-title">Внесок у спільноту</h2>
      <p class="section-subtitle">Створюю україномовні інструменти, перекладаю документацію та ділюсь знаннями з українською IT-спільнотою.</p>
      <div class="oss-grid" id="ossGrid"></div>
    </section>

    <section id="approach" class="section">
      <span class="section-label">Принципи</span>
      <h2 class="section-title">Принципи ua-pages</h2>
      <p class="section-subtitle">П'ять принципів, якими я керуюсь у кожному проєкті — від ідеї до релізу.</p>
      <div class="approach-list" id="approachList"></div>
    </section>

    <section id="about" class="section">
      <span class="section-label">Про мене</span>
      <h2 class="section-title">Хто стоїть за ua-pages</h2>
      <div class="about-grid">
        <div class="about-main" id="aboutText"></div>
        <div class="about-titles" id="aboutTitles"></div>
      </div>
    </section>

    <section id="contact" class="section">
      <span class="section-label">Контакти</span>
      <h2 class="section-title">Потрібна веб-система, автоматизація або MVP?</h2>
      <p class="section-subtitle">Давайте обговоримо ваш проєкт. Напишіть мені, і я відповім найближчим часом.</p>
      <div class="contacts-grid">
        <div class="contact-info">
          <div class="contact-card">
            <span class="contact-card-label">Email</span>
            <a class="contact-card-value" id="emailDisplay" href="mailto:oleksandr.morlock@gmail.com">oleksandr.morlock@gmail.com</a>
            <button class="btn btn-secondary" id="copyEmailBtn" style="margin-top:10px;height:34px;padding:0 14px;font-size:12px;width:auto">Копіювати</button>
          </div>
          <div class="contact-card">
            <span class="contact-card-label">GitHub</span>
            <a class="contact-card-value" id="githubDisplay" href="https://github.com/ua-pages" target="_blank" rel="noreferrer">github.com/ua-pages</a>
          </div>
          <div class="contact-card" style="background:var(--accent-soft);border-color:rgba(59,130,246,0.2)">
            <span class="contact-card-label" style="color:var(--accent)">Написати напряму</span>
            <p style="margin:4px 0 0;font-size:13px;color:var(--text-secondary);line-height:1.6">Надсилайте email на вказану адресу — я завжди на зв'язку.</p>
          </div>
        </div>
        <div class="form-card" id="formContainer"></div>
      </div>
    </section>

    <footer>
      <div class="footer-inner">
        <span class="footer-brand">ua-pages</span>
        <span>&copy; 2026 Олександр Васильєв</span>
      </div>
    </footer>
  </div>

  <div class="toast" id="toast"></div>
`;

export class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.renderHeroStack();
    this.renderServices();
    this.renderWhy();
    this.renderProjects();
    this.renderOpenSource();
    this.renderApproach();
    this.renderAbout();
    this.renderForm();
    this.setupInteractions();
  }

  renderHeroStack() {
    const container = this.shadowRoot.getElementById('heroStack');
    stack.forEach(s => {
      const span = document.createElement('span');
      span.textContent = s;
      container.appendChild(span);
    });
  }

  renderServices() {
    const grid = this.shadowRoot.getElementById('servicesGrid');
    services.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `<h3>${s.title}</h3><p>${s.description}</p>`;
      grid.appendChild(card);
    });
  }

  renderWhy() {
    const grid = this.shadowRoot.getElementById('whyGrid');
    whyUaPages.forEach(w => {
      const card = document.createElement('div');
      card.className = 'why-card';
      card.innerHTML = `
        <div class="why-icon">${w.icon}</div>
        <h3>${w.title}</h3>
        <p>${w.description}</p>
      `;
      grid.appendChild(card);
    });
  }

  renderProjects() {
    const list = this.shadowRoot.getElementById('projectsList');
    projects.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.idx = idx;

      let screenshotsHtml = '';
      if (p.screenshots && p.screenshots.length) {
        const imgs = p.screenshots.map(s => `<img src="${s}" alt="${p.title}" loading="lazy" />`).join('');
        screenshotsHtml = `<div class="project-screenshots"><div class="screenshot-strip" data-track="${idx}">${imgs}</div></div>`;
      } else {
        screenshotsHtml = '<div class="empty-screenshots">Скріншоти недоступні</div>';
      }

      card.innerHTML = `
        <div class="project-main">
          <h3>${p.title}</h3>
          <div class="project-col">
            <span class="project-field-label">Проблема</span>
            <p class="project-field-text">${p.problem}</p>
          </div>
          <div class="project-col">
            <span class="project-field-label">Рішення</span>
            <p class="project-field-text">${p.solution}</p>
          </div>
          <div class="project-col">
            <span class="project-field-label">Результат</span>
            <p class="project-field-text">${p.result}</p>
          </div>
          <div class="project-col">
            <span class="project-field-label">Посилання</span>
            <a class="project-link" href="${p.url}" target="_blank" rel="noreferrer">
              Відкрити проєкт →
            </a>
          </div>
          <div class="project-tech">
            ${p.tech.split(' · ').map(t => `<span>${t}</span>`).join('')}
          </div>
          ${screenshotsHtml}
        </div>
      `;
      list.appendChild(card);
    });
  }

  renderOpenSource() {
    const grid = this.shadowRoot.getElementById('ossGrid');
    openSource.forEach(o => {
      const card = document.createElement('div');
      const classes = ['oss-card'];
      if (o.featured) classes.push('oss-card-featured');
      card.className = classes.join(' ');
      card.innerHTML = `
        <h3>${o.title}</h3>
        <p>${o.description}</p>
        <a class="oss-link" href="${o.url}" target="_blank" rel="noreferrer">Дізнатись більше →</a>
      `;
      grid.appendChild(card);
    });
  }

  renderApproach() {
    const list = this.shadowRoot.getElementById('approachList');
    approach.forEach(a => {
      const item = document.createElement('div');
      item.className = 'approach-item';
      item.innerHTML = `
        <div class="approach-check">${a.icon}</div>
        <div class="approach-text">
          <strong>${a.text}</strong>
          <span>${a.description}</span>
        </div>
      `;
      list.appendChild(item);
    });
  }

  renderAbout() {
    const container = this.shadowRoot.getElementById('aboutText');
    profile.about.forEach(p => {
      const pEl = document.createElement('p');
      pEl.textContent = p;
      container.appendChild(pEl);
    });

    const titlesContainer = this.shadowRoot.getElementById('aboutTitles');
    profile.titles.forEach(t => {
      const card = document.createElement('div');
      card.className = 'about-title-card';
      card.textContent = t;
      titlesContainer.appendChild(card);
    });
  }

  renderForm() {
    const container = this.shadowRoot.getElementById('formContainer');
    container.innerHTML = `
      <h3>Надіслати заявку</h3>
      <form id="leadForm">
        <div class="form-group">
          <label for="name">Ім'я / компанія</label>
          <input type="text" id="name" name="name" placeholder="Як до вас звертатись?" required minlength="2" maxlength="80" />
        </div>
        <div class="form-group">
          <label for="contact">Контакт</label>
          <input type="text" id="contact" name="contact" placeholder="Email, Telegram або LinkedIn" required minlength="3" maxlength="140" />
        </div>
        <div class="form-group">
          <label for="service">Що потрібно?</label>
          <select id="service" name="service">
            <option>Бізнес-система / внутрішній портал</option>
            <option>CRM / ERP рішення</option>
            <option>Автоматизація бізнес-процесів</option>
            <option>Корпоративний веб-додаток</option>
            <option>MVP для стартапу</option>
            <option>AI-інтеграція</option>
            <option>Технічний аудит</option>
            <option>Інше</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Опишіть задачу</label>
          <textarea id="message" name="message" rows="4" placeholder="Розкажіть, що потрібно створити, виправити або покращити" required minlength="12" maxlength="2000"></textarea>
        </div>
        <button class="btn btn-primary submit-btn" type="submit">Надіслати заявку</button>
        <div class="form-status" id="formStatus"></div>
      </form>
    `;

    const form = this.shadowRoot.getElementById('leadForm');
    const status = this.shadowRoot.getElementById('formStatus');
    const submitBtn = form.querySelector('.submit-btn');
    let isSubmitting = false;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }

      isSubmitting = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Надсилаю...';
      status.className = 'form-status';
      status.textContent = '';

      const data = new FormData(form);
      const payload = {
        name: data.get('name'),
        contact: data.get('contact'),
        service: data.get('service'),
        message: data.get('message'),
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed');
        form.reset();
        status.className = 'form-status success';
        status.textContent = 'Заявку надіслано. Я відповім найближчим часом.';
      } catch {
        status.className = 'form-status error';
        status.textContent = 'Не вдалося надіслати. Напишіть на email: oleksandr.morlock@gmail.com';
      } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Надіслати заявку';
      }
    });
  }

  setupInteractions() {
    const root = this.shadowRoot;
    const sections = ['services', 'why', 'projects', 'opensource', 'about', 'contact'];
    const navLinks = root.querySelectorAll('.nav-links a');
    const navToggle = root.getElementById('navToggle');
    const navLinksContainer = root.getElementById('navLinks');

    function smoothScrollTo(el) {
      const start = window.scrollY;
      const target = el.getBoundingClientRect().top + start - 24;
      const dist = target - start;
      const dur = 700;
      const startTime = performance.now();
      requestAnimationFrame(function scroll(now) {
        const t = Math.min((now - startTime) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        window.scrollTo(0, start + dist * ease);
        if (t < 1) requestAnimationFrame(scroll);
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        const id = link.getAttribute('href').slice(1);
        const el = root.getElementById(id) || document.getElementById(id);
        if (el) smoothScrollTo(el);
      });
    });

    navToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (navLinksContainer.classList.contains('open') && !e.composedPath().includes(root.querySelector('nav'))) {
        navLinksContainer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    root.getElementById('contactBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const el = root.getElementById('contact');
      if (el) smoothScrollTo(el);
    });

    root.querySelector('a[href="#projects"]').addEventListener('click', (e) => {
      e.preventDefault();
      const el = root.getElementById('projects');
      if (el) smoothScrollTo(el);
    });

    const copyBtn = root.getElementById('copyEmailBtn');
    const toast = root.getElementById('toast');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(profile.email).then(() => {
        toast.textContent = 'Email скопійовано';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = profile.email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        toast.textContent = 'Email скопійовано';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      });
    });

    root.addEventListener('click', (e) => {
      const img = e.target.closest('.screenshot-strip img');
      if (img) {
        if (this._previewOverlay) return;
        const overlay = document.createElement('div');
        overlay.className = 'preview-overlay';
        const full = document.createElement('img');
        full.src = img.src;
        full.alt = img.alt;
        overlay.appendChild(full);
        overlay.addEventListener('click', () => {
          if (overlay.dataset.closing) return;
          overlay.dataset.closing = '1';
          overlay.classList.remove('open');
          overlay.addEventListener('transitionend', () => {
            overlay.remove();
            this._previewOverlay = null;
          }, { once: true });
        });
        root.appendChild(overlay);
        this._previewOverlay = overlay;
        requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('open')));
      }
    });
  }
}

customElements.define('app-root', AppRoot);
