import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})
export class AllAccountsComponent implements OnInit {
  accounts: Account[] = [];
  filteredAccounts: Account[] = []; // Used for filtering the account list

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
      this.filteredAccounts = data; // Initialize filtered accounts
    });
  }

  // Method to filter accounts based on search input
  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.filteredAccounts = this.accounts; // Reset to all accounts if search term is empty
    } else {
      this.filteredAccounts = this.accounts.filter(account =>
        account.id.toString().includes(searchTerm) ||
        account.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
