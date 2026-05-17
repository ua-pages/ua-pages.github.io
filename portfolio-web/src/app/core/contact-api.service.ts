import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LeadRequest {
  name: string;
  contact: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3333/api/contact';

  createLead(payload: LeadRequest): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(this.apiUrl, payload);
  }
}
