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
  showToast: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  addAccount() {
    this.router.navigate(['/create-account']);
  }

  accountCreated(newAccount: Account) {
    this.accounts.push(newAccount);
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  deposit(id: number) {
    this.router.navigate(['/deposit', id]);
  }

  // New method for withdrawing funds
  withdraw(id: number) {
    this.router.navigate(['/withdraw', id]); // Navigate to withdraw page
  }
  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.router.navigate(['/delete', id]);
    }
  }
  
}
