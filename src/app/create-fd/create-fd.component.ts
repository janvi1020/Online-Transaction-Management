import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FDService } from './fd.service';
import { AccountService } from '../Services/account.service';
import { FD } from './fd';
import { Account } from '../account'; // Assuming you have an Account interface

@Component({
  selector: 'app-create-fd',
  templateUrl: './create-fd.component.html',
  styleUrls: ['./create-fd.component.css'],
})
export class CreateFdComponent implements OnInit {
  fdData = new FD();
  accounts: Account[] = []; // This will store the list of accounts
  message: string = '';
  messageClass: string = '';
  interestRate: number | null = null;

  constructor(
    private fdService: FDService,
    private accountService: AccountService // Inject AccountService
  ) {}

  ngOnInit(): void {
    // Fetch accounts when the component is initialized
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts; // Store the accounts list
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      },
    });
  }

  createFD(fdForm: any) {
    if (fdForm.valid) {
      this.fdService.createFD(this.fdData).subscribe({
        next: () => {
          // Show success alert with SweetAlert
          Swal.fire({
            title: 'Success!',
            text: 'FD created successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000,
          });

          fdForm.resetForm();
        },
        error: (error) => {
          // Show error alert with SweetAlert
          Swal.fire({
            title: 'Error!',
            text: error?.error?.message || 'An error occurred!',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000,
          });
        },
      });
    }
  }
}
