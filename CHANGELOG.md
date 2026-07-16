# Чейнджлог

## v2.0.0 (2026-07-16)

Повний редизайн сайту. Ребрендинг з особистого портфоліо на бренд **ua-pages**.

### Додано
- 8 нових секцій: Hero, Послуги (7), Чому ua-pages (4 принципи), Проєкти (4), Open Source (4), Принципи (5), Про мене, Контакти
- Мобільне hamburger меню на <768px
- 404.html сторінка для GitHub Pages
- Favicon (SVG) з логотипом UP
- site.webmanifest для PWA підтримки
- IT Терміносфера як флагманський open-source проєкт (featured card)
- Scroll-to-top для всіх навігаційних посилань
- focus-visible стилі для accessibility
- Адаптація під 320px екрани

### Змінено
- **index.html** — новий SEO: title, description, JSON-LD, OG/Twitter tags, preconnect+preload шрифтів, manifest, favicon
- **tokens.css** — нова дизайн-система: кольори (accent blue #3b82f6), surface/border прозорості, радіуси, тіні
- **styles.css** — anti-aliasing, focus-visible, оновлений шрифт Inter
- **portfolio-content.js** — повністю переписано під ua-pages: brand, profile, services (7), whyUaPages (4), projects (problem/solution/result), openSource, approach (5 принципів + емодзі)
- **app-root.js** — повністю переписано (~1500 рядків): новий шаблон, CSS, рендеринг всіх секцій, inline форма заявки
- **lead-intake.js** — оновлено під нові послуги та дизайн-систему
- **robots.txt** — виправлено URL sitemap
- **sitemap.xml** — оновлено дату
- **package.json** — v2.0.0, новий description

### Виправлено
- Контрастність кольорів (WCAG AA) — оновлено surface/border/text-tertiary
- Від'ємний margin section-subtitle, який міг наїжджати на заголовки
- Навігація на мобільних — замість приховування тепер hamburger меню
- Старий URL в robots.txt (вів на Vercel замість GitHub Pages)

### Технічні покращення
- Zero-dependency підхід (vanilla JS Web Components, Shadow DOM)
- CSS custom properties дизайн-система
- preconnect + preload для Google Fonts
- Lazy loading для скріншотів
- Семантичний HTML
- form validation та status feedback
- Image preview overlay
- Clipboard API з fallback
