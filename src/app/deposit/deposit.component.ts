import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service'; 
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  account: Account = new Account();
  depositAmount: number = 0;
  isDepositSuccessful: boolean = false;
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
    // Check for required fields and valid deposit amount
    if (!this.account.id || !this.depositAmount) {
      this.errorMessage = 'Please fill in all required fields (Account ID and Deposit Amount)!';
      return; 
    }

    if (this.depositAmount <= 0) {
      this.errorMessage = 'Deposit amount must be greater than zero!';
      return; 
    }

    // Proceed with the deposit
    this.accountService.deposit(this.account.id, this.depositAmount).subscribe(
      () => {
        this.isDepositSuccessful = true; 
        this.errorMessage = ''; // Clear any previous error messages
        form.resetForm(); // Reset the form

        // Redirect to account list after a brief delay
        setTimeout(() => {
          this.router.navigate(['/accounts']); 
        }, 2000); // 2-second delay before redirecting
      },
      (error) => {
        this.errorMessage = 'Deposit failed. Please try again.';
        console.error('Deposit failed', error);
      }
    );
  }
}
