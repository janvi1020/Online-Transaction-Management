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
  account: Account = new Account();
  withdrawAmount: number = 0;
  isWithdrawSuccessful: boolean = false;
  errorMessage: string = '';

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.account.id = +id; 
      this.fetchAccountDetails();
    }
  }

  fetchAccountDetails() {
    if (this.account.id) {
      this.accountService.getAccountById(this.account.id).subscribe(
        (data: Account) => {
          this.account = data; 
          this.errorMessage = ''; 
        },
        (error) => {
          this.errorMessage = 'Invalid Account ID. Please check and enter again.';
          console.error('Error fetching account details', error);
        }
      );
    } else {
      this.errorMessage = ''; 
    }
  }

  onSubmit(form: NgForm) {
    // Check for required fields and valid withdrawal amount
    if (!this.account.id || !this.withdrawAmount) {
      this.errorMessage = 'Please fill in all required fields (Account ID and Withdrawal Amount)!';
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

    // Proceed with the withdrawal
    this.accountService.withdraw(this.account.id, this.withdrawAmount).subscribe(
      () => {
        this.isWithdrawSuccessful = true; 
        this.errorMessage = ''; // Clear any previous error messages
        form.resetForm(); // Reset the form

        // Redirect to account list after a brief delay
        setTimeout(() => {
          this.router.navigate(['/accounts']); 
        }, 1000); // 2-second delay before redirecting
      },
      (error) => {
        this.errorMessage = 'Withdrawal failed. Please try again.';
        console.error('Withdrawal failed', error);
      }
    );
  }
}
