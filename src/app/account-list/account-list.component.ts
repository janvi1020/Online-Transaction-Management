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
  showToast: boolean = false; // Property to control the visibility of the toast

  constructor(private accountService: AccountService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  addAccount() {
    this.router.navigate(['/create-account']); // Navigate to create account page
  }

  // This method should be called when a new account is successfully created
  accountCreated(newAccount: Account) {
    this.accounts.push(newAccount); // Add new account to the list
    this.showToast = true; // Show toast notification

    // Reset toast visibility after a few seconds
    setTimeout(() => this.showToast = false, 3000);
  }
  deposit(id:number ){
    this.router.navigate(['/deposit',id])
  }
}
