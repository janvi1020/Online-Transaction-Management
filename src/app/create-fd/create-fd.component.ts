import { Component } from '@angular/core';
import { FDService } from './fd.service';
import { FD } from './fd';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-fd',
  templateUrl: './create-fd.component.html',
  styleUrls: ['./create-fd.component.css'],
})
export class CreateFdComponent {
  fdData = new FD;
  message: string = '';
  messageClass: string = '';
  accounts: any[] = [];
  interestRate: number | null = null;

  constructor(private fdService: FDService , private accountService:AccountService) {}

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data; // Store the accounts in the array
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
          this.message = 'FD created successfully!';
          this.messageClass = 'alert alert-success';
          fdForm.resetForm();
        },
        error: (error) => {
          this.message = error?.error?.message || 'An error occurred!';
          this.messageClass = 'alert alert-danger';
        },
      });
    }
  }
}
