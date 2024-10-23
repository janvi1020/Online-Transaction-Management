// LoginComponent (login.component.ts)

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service'; // Adjust the import based on your file structure
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private accountService: AccountService, private router: Router,private authService: AuthService) { }

  onLogin(): void {
    this.errorMessage = ''; // Clear previous error messages
    this.successMessage = ''; // Clear previous success messages


    const credentials = { userId: 1, userName: this.username, password: this.password };
    this.accountService.login(credentials).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.successMessage = response.message;
          this.accountService.loggedIn=true;
          this.authService.loggedIn=true;
          // Redirect to another page, e.g., accounts page
          this.router.navigate(['/accounts']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
      }
    });
  }
}
