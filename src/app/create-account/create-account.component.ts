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
    if (!this.account.accountHolderName || this.account.balance === null || this.account.balance === undefined) {
      // Show alert if fields are empty
      this.errorMessage = 'Please fill in both Account Holder Name and Balance.';
      return; // Stop further execution
    }

    this.saveAccount();
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe(data => {
      console.log('Account created successfully:', data);
      this.successMessage = 'Account created successfully!'; // Set success message
      this.resetAccount(); // Reset the account after successful submission

      // Show alert and navigate after 2 seconds
      setTimeout(() => {
        this.goToAccountList(); // Navigate to the account list after 2 seconds
      }, 2000);
      
      // Clear the success message after 2 seconds
      setTimeout(() => {
        this.successMessage = ''; // Clear success message after 2 seconds
      }, 2000);
      
    }, error => {
      console.error('Error creating account:', error);
      this.errorMessage = 'There was an error creating the account. Please try again.'; // Alert on error
    });
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }

  resetAccount() {
    this.account = new Account(); // Reset account to a new instance
  }
}
