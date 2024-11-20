import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Account } from '../account';
import { Router } from '@angular/router';
import { FD } from '../create-fd/fd'; // Assuming FD is defined and imported correctly
import { FDService } from '../create-fd/fd.service';

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
  fds: FD[] = []; // FD list to manage FDs
  filteredAccounts: Account[] = [];
  userRole: string | null = null;
  showToast: boolean = false;
  FD: any;

  constructor(private accountService: AccountService, private router: Router,private fdService:FDService) {}

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

  // Fetch the list of FDs
  getFDs(accountId: number) {
    this.fdService.getFDsByAccountId(accountId).subscribe(data => {
      this.fds = data;
    });
  }

  viewTransactionHistory(accountId: number) {
    this.router.navigate(['/transaction-history', accountId]);
  }

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
    this.filteredAccounts.push(newAccount); // Update filtered accounts
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

  // Use FD ID for withdrawing FD
  withdrawFD(fdId: number) {
    this.router.navigate(['/withdraw-fd', fdId]);
  }

  // Use FD ID for breaking FD
  breakFD(fdId: number) {
    this.router.navigate(['/break-fd', fdId]);
  }
}
