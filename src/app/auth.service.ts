import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean = false; // Track login status

  // Simulated login method
  login(credentials: { username: string, password: string }): boolean {
    // Replace with your actual login logic (e.g., API call)
    if (credentials.username === 'Janvi' && credentials.password === '1234') {
      console.log("true now");
      
      this.loggedIn = true;
      return true;
    }
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
}
