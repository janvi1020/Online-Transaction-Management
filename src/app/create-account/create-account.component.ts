import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  account: Account = new Account();
  successMessage: string = '';
  errorMessage: string = '';
  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 
    'Puducherry'
  ];

  constructor(private accountService: AccountService, private router: Router) {
    this.account.country = 'India';
  }

  onSubmit() {
    if (!this.validateEmail(this.account.email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (
      !this.account.accountHolderName || 
      this.account.balance === null || 
      this.account.balance === undefined ||
      !this.account.accountType ||
      !this.account.email ||
      !this.account.addressLine1 ||
      !this.account.pinCode ||
      !this.account.state ||
      !this.account.country
    ) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.saveAccount();
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Account created successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.resetAccount();

        setTimeout(() => {
          this.goToAccountList();
        }, 2000);
      },
      error: (error) => {
        console.error('Error creating account:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error creating the account. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }

  resetAccount() {
    this.account = new Account();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
