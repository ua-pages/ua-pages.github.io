import { Component } from '@angular/core';
import { LeadIntakeComponent } from './components/lead-intake/lead-intake.component';
import { experience, highlights, profile, services, stack } from './portfolio-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeadIntakeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly profile = profile;
  readonly highlights = highlights;
  readonly services = services;
  readonly experience = experience;
  readonly stack = stack;
}
