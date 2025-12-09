import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Console } from '../models/console.model';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private apiUrl = '/api/GameConsole';

  constructor(private http: HttpClient) { }

  getConsoles(): Observable<Console[]> {
    return this.http.get<Console[]>(this.apiUrl);
  }

  getConsole(id: number): Observable<Console> {
    return this.http.get<Console>(`${this.apiUrl}/${id}`);
  }

  createConsole(console: Console): Observable<Console> {
    return this.http.post<Console>(this.apiUrl, console);
  }

  updateConsole(id: number, console: Console): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, console);
  }

  deleteConsole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

