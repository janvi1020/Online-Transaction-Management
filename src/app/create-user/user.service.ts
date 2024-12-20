// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8080/api/v1/auth/register'; 
  constructor(private http: HttpClient) { }

  createUser(user: { userName: string,email:string,  password: string, identity: string,phone:string}): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }
  
}
