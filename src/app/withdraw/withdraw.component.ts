import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  account: Account = new Account(); // To store account details
  withdrawAmount: number = 0; // Amount to withdraw
  withdrawMethod: string = '';  // Method selected (optional)
  isWithdrawSuccessful: boolean = false;
  errorMessage: string = '';

  constructor(
    private accountService: AccountService,  // Service to interact with backend
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch the account ID from URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.account.id = +id;  // Set account ID
      this.fetchAccountDetails();  // Fetch account details
    }
  }

  // Fetch account details from the backend by ID
  fetchAccountDetails() {
    if (this.account.id) {
      this.accountService.getAccountById(this.account.id).subscribe(
        (data: Account) => {
          this.account = data;
          this.errorMessage = ''; // Clear any previous error messages
        },
        (error) => {
          this.errorMessage = 'Invalid Account ID. Please check and enter again.';
          console.error('Error fetching account details', error);
        }
      );
    }
  }

  // Form submit handler for withdrawal
  onSubmit(form: NgForm) {
    console.log('Withdrawal Method:', this.withdrawMethod);
    console.log('Withdrawal Amount:', this.withdrawAmount);

    // Validation checks
    if (!this.account.id || !this.withdrawAmount || !this.withdrawMethod) {
      this.errorMessage = 'Please fill in all required fields (Account ID, Withdrawal Amount, and Method)!';
      return;
    }

    if (this.withdrawAmount <= 0) {
      this.errorMessage = 'Withdrawal amount must be greater than zero!';
      return;
    }

    if (this.withdrawAmount > this.account.balance) {
      this.errorMessage = 'Withdrawal amount cannot exceed current balance!';
      return;
    }

    // Call the withdraw method from the service
    this.accountService.withdraw(this.account.id, this.withdrawAmount, this.withdrawMethod).subscribe(
      () => {
        this.isWithdrawSuccessful = true; 
        this.errorMessage = ''; // Clear error messages
        form.resetForm(); // Reset the form

        // Redirect after a brief delay
        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 1000); 
      },
      (error) => {
        this.errorMessage = 'Withdrawal failed. Please try again.';
        console.error('Withdrawal failed', error);
      }
    );
  }
}
