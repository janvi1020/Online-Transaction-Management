import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FDHistoryService {

  private apiUrl = 'http://localhost:8080/api/fd';  

  constructor(private http: HttpClient) { }
  getFDHistory(accountId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${accountId}/fdHistory`);
  }
  createFDHistory(accountId: number, fdHistory: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${accountId}/fdHistory`, fdHistory);
  }
}
