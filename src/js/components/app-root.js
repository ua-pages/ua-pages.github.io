import {
  brand,
  profile,
  services,
  whyUaPages,
  projects,
  openSource,
  approach,
  stack,
} from '../data/portfolio-content.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      --page: min(1240px, calc(100vw - 48px));
      --rail: 176px;
      --line: rgba(240, 240, 232, 0.16);
      --line-strong: rgba(240, 240, 232, 0.34);
      --paper: #efefe7;
      --muted: #989b91;
      --signal: #f3d34a;
      --signal-soft: rgba(243, 211, 74, 0.12);
      --ink: #0b0c0a;
      display: block;
      min-height: 100vh;
      color: var(--paper);
      background:
        linear-gradient(rgba(240, 240, 232, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(240, 240, 232, 0.025) 1px, transparent 1px),
        var(--bg);
      background-size: 48px 48px;
    }

    * {
      box-sizing: border-box;
    }

    a {
      color: inherit;
    }

    button {
      font: inherit;
    }

    .skip-link {
      position: fixed;
      z-index: 1000;
      top: 12px;
      left: 12px;
      padding: 10px 14px;
      color: var(--ink);
      background: var(--signal);
      translate: 0 -160%;
      transition: translate 150ms ease;
    }

    .skip-link:focus {
      translate: 0;
    }

    .site-header {
      position: sticky;
      z-index: 100;
      top: 0;
      display: grid;
      grid-template-columns: var(--rail) 1fr auto;
      align-items: center;
      width: var(--page);
      min-height: 72px;
      margin: 0 auto;
      border-bottom: 1px solid var(--line-strong);
      background: rgba(11, 12, 10, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .wordmark {
      width: fit-content;
      text-decoration: none;
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .wordmark-mark {
      color: var(--signal);
    }

    .main-nav {
      display: flex;
      align-items: center;
      gap: 26px;
    }

    .main-nav a,
    .header-contact {
      color: var(--muted);
      text-decoration: none;
      font-family: var(--font-mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: color 150ms ease;
    }

    .main-nav a:hover,
    .main-nav a[aria-current="true"],
    .header-contact:hover {
      color: var(--paper);
    }

    .nav-index {
      margin-right: 6px;
      color: var(--signal);
    }

    .header-contact {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .header-contact::before {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--signal);
      content: "";
    }

    main {
      width: var(--page);
      margin: 0 auto;
    }

    .hero {
      position: relative;
      display: grid;
      grid-template-columns: var(--rail) 1fr;
      min-height: min(820px, calc(100vh - 72px));
      border-bottom: 1px solid var(--line-strong);
    }

    .hero-rail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 42px 28px 42px 0;
      border-right: 1px solid var(--line);
    }

    .eyebrow,
    .rail-note,
    .section-label,
    .project-number,
    .project-state,
    .field-label,
    .micro-label,
    .footer-note {
      font-family: var(--font-mono);
      font-size: 11px;
      line-height: 1.5;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .eyebrow,
    .section-label,
    .project-number,
    .micro-label {
      color: var(--signal);
    }

    .rail-note {
      color: var(--muted);
      writing-mode: vertical-rl;
      rotate: 180deg;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      padding: 88px 0 72px 72px;
    }

    .hero h1 {
      max-width: 920px;
      margin: 28px 0 32px;
      font-size: clamp(58px, 8.4vw, 126px);
      font-weight: 600;
      line-height: 0.88;
      letter-spacing: -0.075em;
    }

    .hero h1 span {
      display: block;
      color: var(--muted);
      font-weight: 450;
    }

    .hero-intro {
      max-width: 720px;
      margin: 0;
      color: #c7c9c0;
      font-size: clamp(17px, 2vw, 23px);
      line-height: 1.55;
      letter-spacing: -0.02em;
    }

    .hero-meta {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
      max-width: 780px;
      margin-top: 72px;
      padding-top: 18px;
      border-top: 1px solid var(--line);
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .meta-value {
      color: var(--paper);
      font-size: 13px;
    }

    .signal-strip {
      display: flex;
      gap: 0;
      overflow: hidden;
      border-bottom: 1px solid var(--line-strong);
    }

    .signal-strip span {
      flex: 1;
      padding: 14px 18px;
      border-right: 1px solid var(--line);
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.06em;
      text-align: center;
      text-transform: uppercase;
    }

    .signal-strip span:last-child {
      border-right: 0;
    }

    .section {
      display: grid;
      grid-template-columns: var(--rail) 1fr;
      border-bottom: 1px solid var(--line-strong);
      scroll-margin-top: 72px;
    }

    .section-rail {
      padding: 64px 28px 64px 0;
      border-right: 1px solid var(--line);
    }

    .section-content {
      min-width: 0;
      padding: 64px 0 96px 72px;
    }

    .section-heading {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(240px, 0.55fr);
      gap: 56px;
      align-items: end;
      margin-bottom: 64px;
    }

    .section-heading h2 {
      margin: 0;
      font-size: clamp(38px, 5vw, 72px);
      font-weight: 560;
      line-height: 0.98;
      letter-spacing: -0.055em;
    }

    .section-heading p {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
      line-height: 1.7;
    }

    .projects {
      border-top: 1px solid var(--line-strong);
    }

    .project {
      border-bottom: 1px solid var(--line-strong);
    }

    .project-header {
      display: grid;
      grid-template-columns: 52px minmax(180px, 0.55fr) minmax(260px, 1fr) auto;
      gap: 24px;
      align-items: baseline;
      padding: 28px 0;
    }

    .project h3 {
      margin: 0;
      font-size: clamp(23px, 3vw, 36px);
      font-weight: 560;
      line-height: 1;
      letter-spacing: -0.04em;
    }

    .project-summary {
      margin: 0;
      color: #b7bab0;
      font-size: 14px;
      line-height: 1.65;
    }

    .project-state {
      color: var(--muted);
      white-space: nowrap;
    }

    .project-state::before {
      content: "[";
    }

    .project-state::after {
      content: "]";
    }

    .project details {
      border-top: 1px solid var(--line);
    }

    .project summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0;
      color: var(--muted);
      cursor: pointer;
      list-style: none;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .project summary::-webkit-details-marker {
      display: none;
    }

    .project summary::after {
      color: var(--signal);
      content: "+ розгорнути";
    }

    .project details[open] summary::after {
      content: "− згорнути";
    }

    .case-study {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      margin-bottom: 24px;
      border: 1px solid var(--line);
      background: var(--line);
    }

    .case-field {
      min-width: 0;
      padding: 24px;
      background: var(--bg);
    }

    .field-label {
      display: block;
      margin-bottom: 14px;
      color: var(--muted);
    }

    .case-field p {
      margin: 0;
      color: #c4c6bd;
      font-size: 13px;
      line-height: 1.72;
    }

    .project-footer {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
      padding: 0 0 28px;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 18px;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .project-tags span::before {
      margin-right: 7px;
      color: var(--signal);
      content: "↳";
    }

    .text-link {
      flex: none;
      color: var(--paper);
      text-decoration-color: var(--signal);
      text-decoration-thickness: 1px;
      text-underline-offset: 5px;
      font-size: 12px;
    }

    .text-link:hover {
      color: var(--signal);
    }

    .practice-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 72px;
    }

    .practice-column h3,
    .principles-title {
      margin: 0 0 28px;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .practice-list,
    .principles,
    .oss-list {
      margin: 0;
      padding: 0;
      list-style: none;
      border-top: 1px solid var(--line-strong);
    }

    .practice-item {
      display: grid;
      grid-template-columns: 28px 1fr;
      gap: 18px;
      padding: 22px 0;
      border-bottom: 1px solid var(--line);
    }

    .practice-symbol {
      color: var(--signal);
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .practice-item h4 {
      margin: 0 0 8px;
      font-size: 17px;
      font-weight: 560;
      letter-spacing: -0.025em;
    }

    .practice-item p {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.72;
    }

    .principles-wrap {
      margin-top: 80px;
    }

    .principle {
      display: grid;
      grid-template-columns: 52px minmax(220px, 0.65fr) 1fr;
      gap: 24px;
      align-items: baseline;
      padding: 23px 0;
      border-bottom: 1px solid var(--line);
    }

    .principle-number {
      color: var(--signal);
      font-family: var(--font-mono);
      font-size: 10px;
    }

    .principle strong {
      font-size: 15px;
      font-weight: 560;
    }

    .principle p {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.7;
    }

    .oss-item {
      border-bottom: 1px solid var(--line);
    }

    .oss-item a {
      display: grid;
      grid-template-columns: 52px minmax(180px, 0.5fr) 1fr auto;
      gap: 24px;
      align-items: baseline;
      padding: 24px 0;
      text-decoration: none;
    }

    .oss-item h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 560;
      letter-spacing: -0.025em;
    }

    .oss-item p {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.65;
    }

    .oss-arrow {
      color: var(--signal);
      font-family: var(--font-mono);
      transition: translate 150ms ease;
    }

    .oss-item a:hover .oss-arrow {
      translate: 5px 0;
    }

    .about-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(220px, 0.5fr);
      gap: 88px;
    }

    .about-copy p {
      margin: 0 0 24px;
      color: #c4c6bd;
      font-size: clamp(16px, 1.65vw, 20px);
      line-height: 1.7;
      letter-spacing: -0.015em;
    }

    .about-copy p:first-child {
      color: var(--paper);
      font-size: clamp(22px, 2.8vw, 34px);
      line-height: 1.38;
      letter-spacing: -0.035em;
    }

    .about-aside {
      align-self: start;
      padding-top: 10px;
    }

    .about-aside dl {
      margin: 16px 0 0;
      border-top: 1px solid var(--line-strong);
    }

    .about-aside div {
      padding: 16px 0;
      border-bottom: 1px solid var(--line);
    }

    .about-aside dt {
      margin-bottom: 5px;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .about-aside dd {
      margin: 0;
      font-size: 13px;
    }

    .contact {
      min-height: 560px;
    }

    .contact .section-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .contact-title {
      max-width: 900px;
      margin: 0 0 80px;
      font-size: clamp(46px, 7.5vw, 108px);
      font-weight: 560;
      line-height: 0.92;
      letter-spacing: -0.07em;
    }

    .contact-title span {
      color: var(--muted);
    }

    .contact-actions {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .email-link {
      color: var(--paper);
      text-decoration-color: var(--signal);
      text-decoration-thickness: 2px;
      text-underline-offset: 8px;
      font-size: clamp(17px, 2.2vw, 27px);
      letter-spacing: -0.025em;
    }

    .copy-button {
      padding: 9px 13px;
      border: 1px solid var(--line-strong);
      border-radius: 0;
      color: var(--muted);
      background: transparent;
      cursor: pointer;
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .copy-button:hover {
      border-color: var(--signal);
      color: var(--signal);
    }

    footer {
      display: grid;
      grid-template-columns: var(--rail) 1fr auto;
      align-items: center;
      width: var(--page);
      min-height: 88px;
      margin: 0 auto;
    }

    .footer-mark {
      color: var(--signal);
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
    }

    .footer-note {
      color: var(--muted);
    }

    .footer-top {
      color: var(--muted);
      text-decoration: none;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .footer-top:hover {
      color: var(--signal);
    }

    @media (max-width: 960px) {
      :host {
        --page: min(100% - 32px, 920px);
        --rail: 112px;
      }

      .site-header {
        grid-template-columns: var(--rail) 1fr;
      }

      .header-contact {
        display: none;
      }

      .main-nav {
        justify-content: flex-end;
        gap: 18px;
      }

      .hero-content,
      .section-content {
        padding-left: 40px;
      }

      .section-heading {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .project-header {
        grid-template-columns: 40px minmax(150px, 0.5fr) 1fr;
      }

      .project-state {
        display: none;
      }

      .practice-grid {
        gap: 40px;
      }

      .about-layout {
        gap: 48px;
      }

      footer {
        grid-template-columns: var(--rail) 1fr auto;
      }
    }

    @media (max-width: 720px) {
      :host {
        --page: calc(100% - 24px);
      }

      .site-header {
        display: flex;
        min-height: 60px;
        gap: 24px;
        overflow-x: auto;
      }

      .wordmark {
        position: sticky;
        left: 0;
        flex: none;
        padding-right: 14px;
        background: rgba(11, 12, 10, 0.96);
      }

      .main-nav {
        justify-content: flex-start;
        gap: 18px;
      }

      .main-nav a {
        flex: none;
      }

      .hero,
      .section {
        display: block;
      }

      .hero {
        min-height: auto;
      }

      .hero-rail {
        display: block;
        padding: 28px 0 0;
        border-right: 0;
      }

      .rail-note {
        display: none;
      }

      .hero-content {
        padding: 44px 0 56px;
      }

      .hero h1 {
        margin-top: 22px;
        font-size: clamp(52px, 17vw, 82px);
      }

      .hero-meta {
        grid-template-columns: 1fr;
        gap: 14px;
        margin-top: 48px;
      }

      .meta-item {
        display: grid;
        grid-template-columns: 110px 1fr;
      }

      .signal-strip {
        overflow-x: auto;
      }

      .signal-strip span {
        flex: none;
        min-width: 190px;
      }

      .section-rail {
        padding: 44px 0 0;
        border-right: 0;
      }

      .section-content {
        padding: 28px 0 64px;
      }

      .section-heading {
        margin-bottom: 42px;
      }

      .project-header {
        grid-template-columns: 34px 1fr;
        gap: 16px;
      }

      .project-summary {
        grid-column: 2;
      }

      .case-study {
        grid-template-columns: 1fr;
      }

      .project-footer {
        display: block;
      }

      .text-link {
        display: inline-block;
        margin-top: 20px;
      }

      .practice-grid,
      .about-layout {
        grid-template-columns: 1fr;
      }

      .practice-grid {
        gap: 56px;
      }

      .principle {
        grid-template-columns: 34px 1fr;
        gap: 16px;
      }

      .principle p {
        grid-column: 2;
      }

      .oss-item a {
        grid-template-columns: 34px 1fr auto;
        gap: 16px;
      }

      .oss-item p {
        grid-column: 2 / -1;
      }

      .contact {
        min-height: 460px;
      }

      .contact-title {
        margin-bottom: 56px;
      }

      footer {
        grid-template-columns: 1fr auto;
      }

      .footer-mark {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>

  <a class="skip-link" href="#work" data-scroll>До проєктів</a>

  <header class="site-header">
    <a class="wordmark" href="#top" data-scroll>
      <span class="wordmark-mark">ua</span>/pages
    </a>
    <nav class="main-nav" aria-label="Основна навігація">
      <a href="#work" data-scroll><span class="nav-index">01</span>Проєкти</a>
      <a href="#practice" data-scroll><span class="nav-index">02</span>Підхід</a>
      <a href="#open-source" data-scroll><span class="nav-index">03</span>Open source</a>
      <a href="#about" data-scroll><span class="nav-index">04</span>Про мене</a>
    </nav>
    <a class="header-contact" href="#contact" data-scroll>Контакт</a>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-rail">
        <span class="eyebrow">Software Engineer</span>
        <span class="rail-note">Lviv · Ukraine · 2026</span>
      </div>
      <div class="hero-content">
        <span class="eyebrow">Олександр Васильєв / ua-pages</span>
        <h1 id="hero-title">Будую основу,<span>на якій працюють інші.</span></h1>
        <p class="hero-intro">${brand.headline}</p>
        <div class="hero-meta" aria-label="Коротка інформація">
          <div class="meta-item">
            <span class="micro-label">Локація</span>
            <span class="meta-value">${profile.location.replace('🇺🇦 ', '')}</span>
          </div>
          <div class="meta-item">
            <span class="micro-label">Досвід</span>
            <span class="meta-value">10+ років у веброзробці</span>
          </div>
          <div class="meta-item">
            <span class="micro-label">Фокус</span>
            <span class="meta-value">Основа продукту й DX</span>
          </div>
        </div>
      </div>
    </section>

    <div class="signal-strip" id="signalStrip" aria-label="Інженерні напрями"></div>

    <section class="section" id="work" aria-labelledby="work-title">
      <div class="section-rail">
        <span class="section-label">01 / Work</span>
      </div>
      <div class="section-content">
        <div class="section-heading">
          <h2 id="work-title">Вибрані<br>системи</h2>
          <p>Не галерея технологій, а проєкти з конкретною проблемою, інженерним рішенням і результатом.</p>
        </div>
        <div class="projects" id="projectsList"></div>
      </div>
    </section>

    <section class="section" id="practice" aria-labelledby="practice-title">
      <div class="section-rail">
        <span class="section-label">02 / Practice</span>
      </div>
      <div class="section-content">
        <div class="section-heading">
          <h2 id="practice-title">Спосіб<br>роботи</h2>
          <p>Мене цікавить не складність сама по собі, а система, яку команда може зрозуміти, підтримати й розвивати.</p>
        </div>
        <div class="practice-grid">
          <div class="practice-column">
            <h3>Напрями</h3>
            <ul class="practice-list" id="servicesList"></ul>
          </div>
          <div class="practice-column">
            <h3>Що привношу в систему</h3>
            <ul class="practice-list" id="judgementList"></ul>
          </div>
        </div>
        <div class="principles-wrap">
          <h3 class="principles-title">Принципи прийняття рішень</h3>
          <ol class="principles" id="principlesList"></ol>
        </div>
      </div>
    </section>

    <section class="section" id="open-source" aria-labelledby="oss-title">
      <div class="section-rail">
        <span class="section-label">03 / Open</span>
      </div>
      <div class="section-content">
        <div class="section-heading">
          <h2 id="oss-title">Відкриті<br>артефакти</h2>
          <p>Інструменти, експерименти й стандарти, які можна відкрити, прочитати та перевірити.</p>
        </div>
        <ol class="oss-list" id="ossList"></ol>
      </div>
    </section>

    <section class="section" id="about" aria-labelledby="about-title">
      <div class="section-rail">
        <span class="section-label">04 / About</span>
      </div>
      <div class="section-content">
        <div class="section-heading">
          <h2 id="about-title">Контекст,<br>не тайтл</h2>
          <p>${profile.persona}</p>
        </div>
        <div class="about-layout">
          <div class="about-copy" id="aboutCopy"></div>
          <aside class="about-aside">
            <span class="micro-label">Робочі координати</span>
            <dl id="aboutMeta"></dl>
          </aside>
        </div>
      </div>
    </section>

    <section class="section contact" id="contact" aria-labelledby="contact-title">
      <div class="section-rail">
        <span class="section-label">05 / Contact</span>
      </div>
      <div class="section-content">
        <h2 class="contact-title" id="contact-title">Є система,<br><span>яку варто спростити?</span></h2>
        <div class="contact-actions">
          <a class="email-link" href="mailto:${profile.email}">${profile.email}</a>
          <button class="copy-button" id="copyEmail" type="button">Копіювати email</button>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <span class="footer-mark">UP</span>
    <span class="footer-note">Спроєктовано й зібрано без build step</span>
    <a class="footer-top" href="#top" data-scroll>Нагору ↑</a>
  </footer>
`;

export class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.renderSignalStrip();
    this.renderProjects();
    this.renderPractice();
    this.renderOpenSource();
    this.renderAbout();
    this.setupInteractions();
  }

  renderSignalStrip() {
    const strip = this.shadowRoot.getElementById('signalStrip');
    stack.forEach(item => {
      const label = document.createElement('span');
      label.textContent = item;
      strip.appendChild(label);
    });
  }

  renderProjects() {
    const list = this.shadowRoot.getElementById('projectsList');

    projects.forEach((project, index) => {
      const article = document.createElement('article');
      const tags = project.tech
        .split(' · ')
        .map(tag => `<span>${tag}</span>`)
        .join('');
      const projectLink = project.url
        ? `<a class="text-link" href="${project.url}" target="_blank" rel="noreferrer">Відкрити проєкт ↗</a>`
        : '<span class="project-state">приватний репозиторій</span>';

      article.className = 'project';
      article.innerHTML = `
        <div class="project-header">
          <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
          <h3>${project.title}</h3>
          <p class="project-summary">${project.problem}</p>
          <span class="project-state">${project.private ? 'private' : 'public'}</span>
        </div>
        <details>
          <summary>Інженерний розбір</summary>
          <div class="case-study">
            <div class="case-field">
              <span class="field-label">Проблема</span>
              <p>${project.problem}</p>
            </div>
            <div class="case-field">
              <span class="field-label">Рішення</span>
              <p>${project.solution}</p>
            </div>
            <div class="case-field">
              <span class="field-label">Результат</span>
              <p>${project.result}</p>
            </div>
          </div>
          <div class="project-footer">
            <div class="project-tags">${tags}</div>
            ${projectLink}
          </div>
        </details>
      `;
      list.appendChild(article);
    });
  }

  renderPractice() {
    const directions = this.shadowRoot.getElementById('servicesList');
    const judgement = this.shadowRoot.getElementById('judgementList');
    const principles = this.shadowRoot.getElementById('principlesList');

    services.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'practice-item';
      li.innerHTML = `
        <span class="practice-symbol">${String(index + 1).padStart(2, '0')}</span>
        <div>
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
      directions.appendChild(li);
    });

    whyUaPages.forEach(item => {
      const li = document.createElement('li');
      li.className = 'practice-item';
      li.innerHTML = `
        <span class="practice-symbol">${item.icon}</span>
        <div>
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
      judgement.appendChild(li);
    });

    approach.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'principle';
      li.innerHTML = `
        <span class="principle-number">${String(index + 1).padStart(2, '0')}</span>
        <strong>${item.text}</strong>
        <p>${item.description}</p>
      `;
      principles.appendChild(li);
    });
  }

  renderOpenSource() {
    const list = this.shadowRoot.getElementById('ossList');

    openSource.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'oss-item';
      li.innerHTML = `
        <a href="${item.url}" target="_blank" rel="noreferrer">
          <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="oss-arrow" aria-hidden="true">↗</span>
        </a>
      `;
      list.appendChild(li);
    });
  }

  renderAbout() {
    const copy = this.shadowRoot.getElementById('aboutCopy');
    const meta = this.shadowRoot.getElementById('aboutMeta');

    profile.about.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      copy.appendChild(p);
    });

    const facts = [
      ['Роль', profile.role],
      ['Локація', profile.location.replace('🇺🇦 ', '')],
      ['GitHub', 'github.com/ua-pages'],
      ['Мова', 'Українська / English'],
      ['Середовище', profile.titles.join(' · ')],
    ];

    facts.forEach(([term, value]) => {
      const row = document.createElement('div');
      row.innerHTML = `<dt>${term}</dt><dd>${value}</dd>`;
      meta.appendChild(row);
    });
  }

  setupInteractions() {
    this.shadowRoot.querySelectorAll('[data-scroll]').forEach(link => {
      link.addEventListener('click', event => {
        const id = link.getAttribute('href');
        const target = this.shadowRoot.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const copyButton = this.shadowRoot.getElementById('copyEmail');
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        copyButton.textContent = 'Email скопійовано';
      } catch {
        copyButton.textContent = profile.email;
      }

      window.setTimeout(() => {
        copyButton.textContent = 'Копіювати email';
      }, 2200);
    });

    const sections = [...this.shadowRoot.querySelectorAll('main > section[id]')];
    const navLinks = [...this.shadowRoot.querySelectorAll('.main-nav a')];
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.toggleAttribute('aria-current', active);
      });
    }, {
      rootMargin: '-20% 0px -65%',
      threshold: [0, 0.25, 0.5],
    });

    sections.forEach(section => observer.observe(section));
  }
}

customElements.define('app-root', AppRoot);
