import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: number | null = null;
  userDetails: any = {};
  transactions: any[] = []; // All transactions
  filteredTransactions: any[] = []; // Transactions filtered by type
  showFullInfo: boolean = false; // Controls visibility of extra details

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : null;

    if (this.userId !== null) {
      this.fetchUserDetails();
      this.fetchTransactions();
    }
  }

  fetchUserDetails(): void {
    if (this.userId !== null) {
      this.accountService.getAccountById(this.userId).subscribe(
        (data) => {
          this.userDetails = data;
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    }
  }

  fetchTransactions(): void {
    if (this.userId !== null) {
      this.accountService.getTransactionsByUserId(this.userId).subscribe(
        (data) => {
          this.transactions = data;
          this.filteredTransactions = data; // Initially show all transactions
        },
        (error) => {
          console.error('Error fetching transactions', error);
        }
      );
    }
  }

  toggleFullInfo(): void {
    this.showFullInfo = !this.showFullInfo;
  }
}
