import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';  

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8080/api/v1/auth/users'; // Base URL for your API
    constructor(private http: HttpClient) { }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
