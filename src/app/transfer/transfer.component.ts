import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
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
  message: string = '';
  isSubmitting: boolean = false;
  accounts: any[] = []; // Store the list of accounts

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    // Fetch all accounts to populate the dropdowns
    this.accountService.getAllAccounts().subscribe({
      next: (accounts: any[]) => {
        this.accounts = accounts; // Store the fetched accounts
      },
      error: (err: any) => {
        console.error("Error fetching accounts:", err);
        this.message = 'Failed to load accounts.';
      }
    });
  }

  onTransfer(): void {
    // Ensure all fields are provided
    if (!this.fromId || !this.toId || this.amount <= 0) {
      this.message = 'Please provide valid input for all fields.';
      return;
    }


    this.isSubmitting = true;  // Show a loading state

    // Fetch the "From" account balance before proceeding with transfer
    this.accountService.getAccountById(this.fromId).subscribe({
      next: (fromAccount: any) => {
        if (fromAccount.balance < this.amount) {
          // Insufficient balance
          this.message = 'Insufficient balance in the source account.';
          this.isSubmitting = false;
        } else {
          // Proceed with transfer
          this.accountService.transfer(this.fromId, this.toId, this.amount).subscribe({
            next: (response: any) => {
              this.message = `Transfer successful! Amount transferred: ${this.amount}`;
              setTimeout(() => {
                this.router.navigate(['/accounts']);
              }, 3000);
            },
            error: (err: any) => {
              console.error("Transfer error:", err);
              this.message = `Transfer failed: ${err.error}`;
            },
            complete: () => {
              this.isSubmitting = false;  // Reset the loading state
            }
          });
        }
      },
      error: (err: any) => {
        console.error("Error fetching account details:", err);
        this.message = 'Failed to fetch account details. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
