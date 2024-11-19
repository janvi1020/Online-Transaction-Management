import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account'; // Adjust the import based on your file structure
import { Transaction } from './transaction';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/accounts'; // Base URL for your API
  private apiUrl='http://localhost:8080/api/v1/auth'
  loggedIn: boolean = false; // Track login status
  constructor(private httpClient: HttpClient) { }

  // Method to create a new account
  createAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${this.baseUrl}`, account);
  }
  // Method to get account by ID
  getAccountById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.baseUrl}/${id}`);
  }
  // Method to deposit amount to an account
deposit(id: number, amount: number, method: string): Observable<Account> {
  const depositData = { amount, depositMethod: method };  // Send deposit method along with amount
  return this.httpClient.put<Account>(`${this.baseUrl}/${id}/deposit`, depositData);
}
  getTransactionsByUserId(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/${userId}/transactions`);
  }
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`${this.baseUrl}`, transaction);
  }
  // Method to withdraw amount from an account
withdraw(id: number, amount: number, method: string): Observable<Account> {
  const withdrawalData = { amount, withdrawMethod: method };  // Make sure the backend field is correctly named
  return this.httpClient.put<Account>(`${this.baseUrl}/${id}/withdraw`, withdrawalData);
}



  // Method to get all accounts
  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.baseUrl);
  }

  // Method to delete an account
  deleteAccount(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${id}`);
  }
  createUser(userData: any): Observable<any> {
    return this.httpClient.post('/api/users', userData); // Adjust API path as needed
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
  

