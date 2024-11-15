import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Account } from '../account';
import { Router } from '@angular/router';

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
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  userRole: string | null = null;
  filteredAccounts: Account[] = [];
  showToast: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.getAccounts();
    this.userRole = sessionStorage.getItem('userRole');
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
      this.filteredAccounts = data; // Initialize filtered accounts
    });
  }
  viewTransactionHistory(accountId: number) {
    this.router.navigate(['/transaction-history', accountId]);
  }
  // New method to handle search input
  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.filteredAccounts = this.accounts; // Show all accounts if search term is empty
    } else {
      this.filteredAccounts = this.accounts.filter(account =>
        account.id.toString().includes(searchTerm) || 
        account.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  addAccount() {
    this.router.navigate(['/create-account']);
  }

  accountCreated(newAccount: Account) {
    this.accounts.push(newAccount);
    this.filteredAccounts.push(newAccount); // Update filtered accounts as well
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  deposit(id: number) {
    this.router.navigate(['/deposit', id]);
  }

  withdraw(id: number) {
    this.router.navigate(['/withdraw', id]); // Navigate to withdraw page
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.router.navigate(['/delete', id]);
    }
  }
}
