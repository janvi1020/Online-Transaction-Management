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
  otp: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isOtpStage: boolean = false; // To toggle between login and OTP forms
  email: string = '';
  storedOtp: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(): void {
    this.errorMessage = ''; // Clear previous error messages
    this.successMessage = ''; // Clear previous success messages

    const credentials = {
      userId: 1, 
      userName: this.username, 
      password: this.password, 
    };

    this.accountService.login(credentials).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.successMessage = response.message;
          this.isOtpStage = true; 
          this.email = response.user.email;
          this.storedOtp = response.otp;
          // Store user role in sessionStorage
          sessionStorage.setItem('userRole', response.user.identity);  

          this.accountService.loggedIn = true;
          this.authService.loggedIn = true;
      }
    },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
      }
    });
  }
  verifyOtp(): void {
    this.errorMessage = ''; // Clear previous error messages
    this.successMessage = ''; // Clear previous success messages
    console.log(this.otp);
    console.log(typeof(this.storedOtp));
    
    
    if (this.otp == this.storedOtp) {
      this.successMessage = 'User verified successfully!';
      // Navigate based on user role
      const userRole = sessionStorage.getItem('userRole');
      if (userRole === 'Super Admin') {
        this.router.navigate(['/home-admin']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.errorMessage = 'OTP verification failed. Please try again.';
    }
  }
}