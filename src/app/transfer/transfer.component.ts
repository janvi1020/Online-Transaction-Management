import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  fromId: number = 0;
  toId: number = 0;
  amount: number = 0;
  fromBalance: string = '';
  message: string = '';
  isSubmitting: boolean = false;
  accounts: any[] = [];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts: any[]) => {
        this.accounts = accounts;
      },
      error: (err: any) => {
        console.error('Error fetching accounts:', err);
        this.message = 'Failed to load accounts.';
      }
    });
  }

  fetchFromAccountBalance(): void {
    if (!this.fromId) {
      this.fromBalance = '';
      return;
    }

    this.accountService.getAccountById(this.fromId).subscribe({
      next: (fromAccount: any) => {
        this.fromBalance = `₹ ${fromAccount.balance.toFixed(2)}`;
      },
      error: (err: any) => {
        console.error('Error fetching account balance:', err);
        this.fromBalance = 'Unable to fetch balance';
      }
    });
  }

  onTransfer(): void {
    if (!this.fromId || !this.toId || this.amount <= 0) {
      this.message = 'Please provide valid input for all fields.';
      return;
    }

    this.isSubmitting = true;

    this.accountService.getAccountById(this.fromId).subscribe({
      next: (fromAccount: any) => {
        if (fromAccount.balance < this.amount) {
          this.message = 'Insufficient balance in the source account.';
          this.isSubmitting = false;
        } else {
          this.accountService.transfer(this.fromId, this.toId, this.amount).subscribe({
            next: (response: any) => {
              this.message = `Transfer successful! Amount transferred: ${this.amount}`;
              setTimeout(() => {
                this.router.navigate(['/accounts']);
              }, 3000);
            },
            error: (err: any) => {
              console.error('Transfer error:', err);
              this.message = `Transfer failed: ${err.error}`;
            },
            complete: () => {
              this.isSubmitting = false;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error fetching account details:', err);
        this.message = 'Failed to fetch account details. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
