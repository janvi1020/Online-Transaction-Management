import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Account } from '../account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AccountListComponent {
  accounts: Account[] = [];
  showToast: boolean = false; // Property to control the visibility of the toast

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  addAccount() {
    // Logic to add an account (you can replace this with your actual logic)
    const newAccount: Account = {
      id: this.accounts.length + 1, // Just an example, should be generated appropriately
      accountHolderName: 'New Account Holder',
      balance: 1000 // Example balance
    };

    this.accounts.push(newAccount); // Add new account to the list
    this.showToast = true; // Show toast notification

    // Reset toast visibility after a few seconds
    setTimeout(() => this.showToast = false, 3000);
  }
}
