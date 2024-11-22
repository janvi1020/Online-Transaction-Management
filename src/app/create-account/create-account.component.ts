import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  account: Account = new Account(); // Initialize a new Account object
  successMessage: string = ''; // Message to show success
  errorMessage: string = ''; // Message to show error
  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 
    'Puducherry'
  ];

  constructor(private accountService: AccountService, private router: Router) {
    // Set the default country to India
    this.account.country = 'India';
  }

  onSubmit() {
    // Validate email
    if (!this.validateEmail(this.account.email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Check if required fields are filled
    if (
      !this.account.accountHolderName || 
      this.account.balance === null || 
      this.account.balance === undefined ||
      !this.account.accountType ||
      !this.account.email ||
      !this.account.addressLine1 ||
      !this.account.pinCode ||
      !this.account.state ||
      !this.account.country
    ) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return; // Stop further execution
    }

    this.saveAccount();
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Account created successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.resetAccount(); // Reset the account after successful submission

        setTimeout(() => {
          this.goToAccountList(); // Navigate to the account list
        }, 2000); // Timeout set to 2 seconds
      },
      error: (error) => {
        console.error('Error creating account:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error creating the account. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }

  resetAccount() {
    this.account = new Account(); // Reset account to a new instance
  }

  // Helper method to validate email
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation
    return emailRegex.test(email);
  }
}
