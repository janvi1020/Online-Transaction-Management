import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FD } from '../create-fd/fd';
@Injectable({
  providedIn: 'root',
})
export class FDService {
  private apiUrl = 'http://localhost:8080/api/fds'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Create a new FD
  createFD(fdData: FD): Observable<FD> {
    return this.http.post<FD>(`${this.apiUrl}/create`, fdData);
  }

  // Get FDs by Account ID
  getFDsByAccountId(accountId: number): Observable<FD[]> {
    return this.http.get<FD[]>(`${this.apiUrl}/${accountId}`);
  }

  getAllFDs(): Observable<FD[]> {
    return this.http.get<FD[]>(`${this.apiUrl}/`);
  }
}
