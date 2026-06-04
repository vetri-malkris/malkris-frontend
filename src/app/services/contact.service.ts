import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/contact`;

  submitForm(data: any) {
    return this.http.post(this.api, data);
  }
}