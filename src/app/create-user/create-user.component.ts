import { Component } from '@angular/core';
import { UserService } from './user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  newUser = { userName: '', email: '', password: '', identity: '', phone: '' };

  constructor(private userService: UserService) { }

  onSubmit(): void {
    if (!this.validateEmail(this.newUser.email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.validatePassword(this.newUser.password)) {
      Swal.fire({
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.validatePhone(this.newUser.phone)) {
      Swal.fire({
        title: 'Invalid Phone Number',
        text: 'Phone number must be exactly 10 digits.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.resetForm(); 
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.message || 'Failed to create user. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  public validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  public validatePhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  private resetForm(): void {
    this.newUser = { userName: '', email: '', password: '', identity: '', phone: '' };
  }
}
