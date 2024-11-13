import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  account: Account = new Account(); // Initialize a new Account object
  successMessage: string = ''; // Message to show success
  errorMessage: string = ''; // Message to show error

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
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
      this.errorMessage = 'Please fill in all required fields.';
      return; // Stop further execution
    }

    this.saveAccount();
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe({
      next: (data) => {
        console.log('Account created successfully:', data);
        this.successMessage = 'Account created successfully!';
        this.resetAccount(); // Reset the account after successful submission

        setTimeout(() => {
          this.successMessage = ''; // Clear success message
          this.goToAccountList(); // Navigate to the account list
        }, 2000); // Timeout set to 2 seconds
      },
      error: (error) => {
        console.error('Error creating account:', error);
        this.errorMessage = 'There was an error creating the account. Please try again.';
        setTimeout(() => {
          this.errorMessage = ''; // Clear error message after a delay
        }, 3000); // Clear error message after 3 seconds
      }
    });
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }

  resetAccount() {
    this.account = new Account(); // Reset account to a new instance
  }
}
