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
  account: Account = new Account();  // Initialize a new Account object

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
    if (!this.account.accountHolderName || !this.account.balance) {
      // Show alert if fields are empty
      window.alert('Please fill in both Account Holder Name and Balance.');
      return; // Stop further execution
    }
    this.saveAccount();
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe(data => {
      console.log('Account created successfully:', data);
      this.resetAccount(); // Reset the account after successful submission
      this.goToAccountList(); // Navigate to the account list
    }, error => {
      console.error('Error creating account:', error);
      window.alert('There was an error creating the account. Please try again.'); // Alert on error
    });
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }

  resetAccount() {
    this.account = new Account(); // Reset account to a new instance
  }
}
