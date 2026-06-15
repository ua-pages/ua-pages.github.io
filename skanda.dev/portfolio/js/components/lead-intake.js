import { stvorytyLider } from '../services/contact-api.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .lead-form {
      display: grid;
      gap: 1rem;
      padding: 1.1rem;
      border: 1px solid var(--line, rgba(148,163,184,0.22));
      border-radius: 1.4rem;
      background: rgba(15, 23, 42, 0.72);
      box-shadow: 0 24px 80px rgba(2, 6, 23, 0.35);
    }

    .field-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    label {
      display: grid;
      gap: 0.45rem;
      color: #cbd5e1;
      font-size: 0.86rem;
    }

    input, select, textarea {
      width: 100%;
      border: 1px solid rgba(148, 163, 184, 0.26);
      border-radius: 0.9rem;
      background: rgba(2, 6, 23, 0.52);
      color: #f8fafc;
      font: inherit;
      padding: 0.82rem 0.9rem;
      outline: none;
      transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
    }

    textarea {
      resize: vertical;
    }

    input:focus, select:focus, textarea:focus {
      border-color: rgba(56, 189, 248, 0.72);
      box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.12);
      background: rgba(2, 6, 23, 0.76);
    }

    button {
      border: 0;
      border-radius: 999px;
      padding: 0.95rem 1.2rem;
      color: #020617;
      background: linear-gradient(135deg, #67e8f9, #a78bfa 55%, #f0abfc);
      font-weight: 800;
      cursor: pointer;
      transition: transform 160ms ease, opacity 160ms ease;
    }

    button:hover {
      transform: translateY(-1px);
    }

    button:disabled {
      cursor: wait;
      opacity: 0.7;
    }

    .success, .error {
      margin: 0;
      padding: 0.8rem 0.95rem;
      border-radius: 0.9rem;
    }

    .success {
      color: #bbf7d0;
      background: rgba(34, 197, 94, 0.1);
    }

    .error {
      color: #fecaca;
      background: rgba(239, 68, 68, 0.1);
    }

    @media (max-width: 720px) {
      .field-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <form class="lead-form">
    <div class="field-grid">
      <label>
        Імʼя
        <input type="text" name="name" placeholder="Імʼя / компанія" required minlength="2" maxlength="80" />
      </label>
      <label>
        Контакт
        <input type="text" name="contact" placeholder="Telegram, email або LinkedIn" required minlength="3" maxlength="140" />
      </label>
    </div>

    <div class="field-grid">
      <label>
        Послуга
        <select name="service">
          <option>Frontend / Full-stack розробка</option>
          <option>Angular архітектура</option>
          <option>Міграція legacy</option>
          <option>Performance audit</option>
          <option>Підсилення команди / code review</option>
          <option>Технічна консультація</option>
        </select>
      </label>
      <label>
        Бюджет
        <select name="budget">
          <option>Поки не визначено</option>
          <option>До $500</option>
          <option>$500 — $1500</option>
          <option>$1500 — $3000</option>
          <option>$3000+</option>
        </select>
      </label>
    </div>

    <label>
      Терміни
      <select name="timeline">
        <option>Гнучко</option>
        <option>Цього тижня</option>
        <option>1—2 тижні</option>
        <option>Цього місяця</option>
        <option>Довгострокова співпраця</option>
      </select>
    </label>

    <label>
      Контекст проєкту
      <textarea name="message" rows="5" placeholder="Розкажіть, що потрібно створити, виправити або покращити" required minlength="12" maxlength="2000"></textarea>
    </label>

    <div class="status"></div>

    <button type="submit">Надіслати заявку</button>
  </form>
`;

export class LeadIntake extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector('form');
    this.status = this.shadowRoot.querySelector('.status');
    this.submitBtn = this.shadowRoot.querySelector('button');
    this.isSubmitting = false;

    this.form.addEventListener('submit', (e) => this.#submit(e));
  }

  async #submit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    this.isSubmitting = true;
    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Надсилаю...';
    this.status.innerHTML = '';

    const data = new FormData(this.form);
    const payload = {
      name: data.get('name'),
      contact: data.get('contact'),
      service: data.get('service'),
      budget: data.get('budget'),
      timeline: data.get('timeline'),
      message: data.get('message'),
    };

    try {
      await stvorytyLider(payload);
      this.form.reset();
      this.status.innerHTML = '<p class="success">Заявку надіслано. Я відповім найближчим часом.</p>';
    } catch {
      this.status.innerHTML = '<p class="error">Не вдалося надіслати заявку. Напишіть мені напряму в Telegram: @copcoopallie</p>';
    } finally {
      this.isSubmitting = false;
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Надіслати заявку';
    }
  }
}

customElements.define('lead-intake', LeadIntake);
