import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean = false; // Track login status
  public loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  // Simulated login method
  login(credentials: { username: string, password: string }): boolean {
    // Replace with your actual login logic (e.g., API call)
    // if (credentials.username === 'Janvi' && credentials.password === '1234') {
    //   console.log("true now");
      
    //   return true;
    // }

      this.loggedIn = true;
      this.loggedInSubject.next(true);
    this.loggedInSubject.next(false);
    return false;
  }
  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }
  // Method to log out
  logout(): void {
    this.loggedIn = false;
  }

  get $loggedInSubject() {
    return this.loggedInSubject.asObservable();
  }

}
