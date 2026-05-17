import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactApiService } from '../../core/contact-api.service';

@Component({
  selector: 'app-lead-intake',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lead-intake.component.html',
  styleUrl: './lead-intake.component.scss',
})
export class LeadIntakeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactApi = inject(ContactApiService);

  isSubmitting = false;
  isSent = false;
  error = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    contact: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(140)]],
    service: ['Frontend / Full-stack development', [Validators.required]],
    budget: ['Not sure yet', [Validators.required]],
    timeline: ['Flexible', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(2000)]],
  });

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.isSent = false;
    this.error = '';

    this.contactApi.createLead(this.form.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isSent = true;
        this.form.reset({
          name: '',
          contact: '',
          service: 'Frontend / Full-stack development',
          budget: 'Not sure yet',
          timeline: 'Flexible',
          message: '',
        });
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Could not send the request. Please message me directly on Telegram: @copcoopallie';
      },
    });
  }
}
