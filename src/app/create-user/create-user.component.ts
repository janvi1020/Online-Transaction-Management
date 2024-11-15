// create-user.component.ts
import { Component } from '@angular/core';
import { UserService } from './user.service';  // Ensure to import your service

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  newUser = { userName: '',email: '', password: '', identity: '' }; // identity holds the role
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  onSubmit(): void {
    this.userService.createUser(this.newUser).subscribe({
      next: (response) => {
        this.successMessage = 'User created successfully!';
        this.errorMessage = '';
        this.newUser = { userName: '',email: '',  password: '', identity: '' }; // Reset form
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error.message || 'Failed to create user. Please try again.';
      }
    });
  }
}
