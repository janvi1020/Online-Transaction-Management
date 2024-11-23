import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../Services/account.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

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
  isOtpSuccess: boolean = false;
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
          this.isOtpStage = true;
          this.email = response.user.email;
          this.storedOtp = response.otp;
          sessionStorage.setItem('userRole', response.user.identity);
          this.accountService.loggedIn = true;
          this.authService.loggedIn = true;
          this.authService.loggedInSubject.next(true);
          console.log(this.isOtpStage);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: response.message,
            timer: 1500,
            showConfirmButton: false
          });
          
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error.message || 'Login failed. Please try again.',
        });
      }
    });
  }
  
  verifyOtp(): void {
    this.clearMessages();
    this.isLoading = true;
  
    this.accountService.verifyOtp(this.email, this.otp).subscribe({
      next: (response) => {
        this.isLoading = false;
  
        Swal.fire({
          icon: 'success',
          title: 'OTP Verified',
          text: 'Verification successful! Redirecting...',
          timer: 1500,
          showConfirmButton: false
        });
        const username = this.username;
      const userRole = sessionStorage.getItem('userRole');
      Swal.fire({
        title: `Hi ${username}!`,
        text: `You are logged in as ${userRole}.`,
        icon: 'success',
        confirmButtonText: "Let's Begin",
        confirmButtonColor: '#3085d6',
        background: '#f2f2f2',
        color: '#333',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect based on the role
          if (userRole === 'Super Admin') {
            this.router.navigate(['/home-admin']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      });
    },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'OTP Verification Failed',
          text: err.error.message || 'OTP verification failed. Please try again.',
        });
      }
    });
  }
  
  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isOtpSuccess = false;
  }
}
