import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../account'; 
import { Transaction } from './transaction';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/accounts'; 
  private apiUrl='http://localhost:8080/api/v1/auth'
  loggedIn: boolean = false; // Track login status
  constructor(private httpClient: HttpClient) { }
  createAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${this.baseUrl}`, account);
  }
  getAccountById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.baseUrl}/${id}`);
  }
deposit(id: number, amount: number, method: string): Observable<Account> {
  const depositData = { amount, depositMethod: method };  
  return this.httpClient.put<Account>(`${this.baseUrl}/${id}/deposit`, depositData);
}
  getTransactionsByUserId(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/${userId}/transactions`);
  }
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`${this.baseUrl}`, transaction);
  }
withdraw(id: number, amount: number, method: string): Observable<Account> {
  const withdrawalData = { amount, withdrawMethod: method };  
  return this.httpClient.put<Account>(`${this.baseUrl}/${id}/withdraw`, withdrawalData);
}
  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.baseUrl);
  }
  deleteAccount(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${id}`);
  }
  createUser(userData: any): Observable<any> {
    return this.httpClient.post('/api/users', userData);
  }
  
  transfer(fromId: number, toId: number, amount: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${fromId}/transfer/${toId}`, {amount});
  }
login(credentials: { userId: number; userName: string; password: string }): Observable<{ message: string; status: number; user: any ; otp:string}> {
  return this.httpClient.post<{ message: string; status: number; user: any; otp:string }>(`${this.apiUrl}/login`, credentials);
}

verifyOtp(email: string, otp: string) {
  const params = new HttpParams()
  .set('email', email)
  .set('otp', otp);
  return this.httpClient.post<any>(`${this.apiUrl}/verify`, null, { params });
}
  }
  

