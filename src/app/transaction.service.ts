// src/app/transaction/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/api/accounts'; // Adjust to your API base URL

  constructor(private http: HttpClient) {}

  getTransactionHistory(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/${accountId}/transactions`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/transactions`, transaction);
  }
  getTransactionHistoryByAccountId(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${accountId}/transactions`);
  }
}
