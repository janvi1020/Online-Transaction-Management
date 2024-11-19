import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
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
  isOtpStage: boolean = false;
  email: string = '';
  storedOtp: string = '';
  isLoading: boolean = false;
  isOtpSuccess: boolean = false; // New state for OTP success
  constructor(
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    sessionStorage.clear();
  }

  onLogin(): void {
    this.clearMessages();
    this.isLoading = true;

    const credentials = {
      userId: 1,
      userName: this.username,
      password: this.password,
    };

    this.accountService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 200) {
          this.successMessage = response.message;
          this.isOtpStage = true;
          this.email = response.user.email;
          this.storedOtp = response.otp;
          sessionStorage.setItem('userRole', response.user.identity);
          this.accountService.loggedIn = true;
          this.authService.loggedIn = true;
          this.authService.loggedInSubject.next(true);

        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
      }
    });
  }

  verifyOtp(): void {
    this.clearMessages();
    this.isLoading = true;

    this.accountService.verifyOtp(this.email, this.otp).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isOtpSuccess = true; // Indicate success

        // Display success message briefly before navigation
        setTimeout(() => {
          this.isOtpSuccess = false; // Reset success state
          const userRole = sessionStorage.getItem('userRole');
          if (userRole === 'Super Admin') {
            this.router.navigate(['/home-admin']);
          } else {
            this.router.navigate(['/home']);
          }
        }, 1000); // 2 seconds delay
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'OTP verification failed. Please try again.';
      }
    });
  }
  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isOtpSuccess = false;
  }
}
