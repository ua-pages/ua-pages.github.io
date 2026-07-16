const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    .form-card {
      padding: 28px;
      border-radius: var(--radius-lg, 14px);
      border: 1px solid var(--border, rgba(255,255,255,0.08));
      background: var(--surface, rgba(255,255,255,0.04));
    }
    .form-card h3 {
      margin: 0 0 20px;
      font-size: 16px;
      font-weight: 600;
      color: var(--text, #fafafa);
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
      color: var(--text-secondary, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 10px 14px;
      border-radius: var(--radius-sm, 6px);
      border: 1px solid var(--border, rgba(255,255,255,0.08));
      background: var(--bg, #0a0a0b);
      color: var(--text, #fafafa);
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: border-color 0.15s;
    }
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: var(--accent, #3b82f6);
    }
    .form-group textarea {
      resize: vertical;
      min-height: 90px;
    }
    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: var(--text-tertiary, #71717a);
    }
    .form-status {
      margin-top: 12px;
      padding: 10px 14px;
      border-radius: var(--radius-sm, 6px);
      font-size: 13px;
      font-weight: 500;
    }
    .form-status.success {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }
    .form-status.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
    .submit-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 44px;
      padding: 0 24px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: opacity 0.15s;
      border: none;
      font-family: inherit;
      width: 100%;
      background: #fafafa;
      color: #0a0a0b;
    }
    .submit-btn:hover { opacity: 0.9; }
    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>
  <div class="form-card">
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
      <button class="submit-btn" type="submit">Надіслати заявку</button>
      <div class="form-status" id="formStatus"></div>
    </form>
  </div>
`;

export class LeadIntake extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.form = this.shadowRoot.getElementById('leadForm');
    this.status = this.shadowRoot.getElementById('formStatus');
    this.submitBtn = this.form.querySelector('.submit-btn');
    this.isSubmitting = false;
    this.form.addEventListener('submit', (e) => this.#submit(e));
  }

  async #submit(e) {
    e.preventDefault();
    if (this.isSubmitting) return;
    if (!this.form.checkValidity()) { this.form.reportValidity(); return; }

    this.isSubmitting = true;
    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Надсилаю...';
    this.status.className = 'form-status';
    this.status.textContent = '';

    const data = new FormData(this.form);
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
      this.form.reset();
      this.status.className = 'form-status success';
      this.status.textContent = 'Заявку надіслано. Я відповім найближчим часом.';
    } catch {
      this.status.className = 'form-status error';
      this.status.textContent = 'Не вдалося надіслати. Напишіть на email: oleksandr.morlock@gmail.com';
    } finally {
      this.isSubmitting = false;
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Надіслати заявку';
    }
  }
}

customElements.define('lead-intake', LeadIntake);
