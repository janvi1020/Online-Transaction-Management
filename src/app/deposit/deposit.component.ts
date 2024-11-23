import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../Services/account.service';
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
  depositMethod: string = '';
  isDepositSuccessful: boolean = false;
  errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    // Log values for debugging
    console.log('Deposit Method:', this.depositMethod);
    console.log('Deposit Amount:', this.depositAmount);

    // Validation
    if (!this.account.id || !this.depositAmount || !this.depositMethod) {
      this.errorMessage = 'Please fill in all required fields (Account ID, Deposit Amount, and Method)!';
      return;
    }

    if (this.depositAmount <= 0) {
      this.errorMessage = 'Deposit amount must be greater than zero!';
      return;
    }

    this.accountService.deposit(this.account.id, this.depositAmount, this.depositMethod).subscribe(
      () => {
        this.isDepositSuccessful = true; 
        this.errorMessage = ''; 
        form.resetForm();
        setTimeout(() => {
          this.router.navigate(['/accounts']);
        }, 1000); 
      },
      (error) => {
        this.errorMessage = 'Deposit failed. Please try again.';
        console.error('Deposit failed', error);
      }
    );
  }
}
