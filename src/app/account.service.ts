import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account'; // Adjust the import based on your file structure

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:8080/api/accounts'; // Base URL for your API

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
  deposit(id: number, amount: number): Observable<Account> {
    return this.httpClient.put<Account>(`${this.baseUrl}/${id}/deposit`, { amount });
  }

  // Method to withdraw amount from an account
  withdraw(id: number, amount: number): Observable<Account> {
    return this.httpClient.put<Account>(`${this.baseUrl}/${id}/withdraw`, { amount });
  }

  // Method to get all accounts
  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.baseUrl);
  }

  // Method to delete an account
  deleteAccount(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${id}`);
  }

  // Method to transfer funds between accounts
  transfer(fromId: number, toId: number, amount: number): Observable<string> {
    return this.httpClient.put<any>(`${this.baseUrl}/${fromId}/transfer/${toId}`, { amount });
  } 
  login(credentials: { userId:number ;userName: string; password: string }): Observable<{ message: string; status: number }>{
    return this.httpClient.post<{ message: string; status: number }>(`${this.baseUrl}/login`, credentials);
  }
  }
  

