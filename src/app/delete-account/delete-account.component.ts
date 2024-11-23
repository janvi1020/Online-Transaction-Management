import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  accountId: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accountId = +id; 
      console.log("Account ID to delete:", this.accountId); // Log account ID
    } else {
      this.errorMessage = 'Account ID is missing.';
    }
  }

  deleteAccount() {
    if (!this.accountId) {
      this.errorMessage = 'Invalid Account ID.';
      return;
    }

    console.log("Attempting to delete account with ID:", this.accountId); // Log before delete call
    this.accountService.deleteAccount(this.accountId).subscribe(
      () => {
        this.successMessage = 'Account deleted successfully! Redirecting...';
        console.log("Redirecting to accounts list...");
        setTimeout(() => {
          this.router.navigate(['/accounts']); 
        }, 1000);
      },
      (error) => {
        console.error('Delete account failed:', error); // Log the error
        this.errorMessage = 'Failed to delete account. Please try again.';
      }
    );
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }
}
