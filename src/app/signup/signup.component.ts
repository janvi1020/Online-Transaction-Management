import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      this.http.post('http://localhost:8080/api/accounts/signup', signupData).subscribe(
        response => {
          this.message = 'Signup successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login page
          }, 2000);
        },
        error => {
          this.message = error.error.message || 'Signup failed. Please try again.';
        }
      );
    }
  }
}
