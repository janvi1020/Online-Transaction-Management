import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../Services/account.service';
import { FDHistoryService } from '../Services/fd-history.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: number | null = null;
  userDetails: any = {};
  fdHistory: any[] = [];
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  showFullInfo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private fdService: FDHistoryService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : null;

    if (this.userId !== null) {
      this.fetchUserDetails();
      this.fetchTransactions();
      this.fetchFDHistory();
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

  fetchFDHistory(): void {
    if (this.userId !== null) {
      this.fdService.getFDHistory(this.userId).subscribe(
        (data: any[]) => {
          this.fdHistory = data;
        },
        (error: any) => {
          console.error('Error fetching FD history', error);
        }
      );
    }
  }

  fetchTransactions(): void {
    if (this.userId !== null) {
      this.accountService.getTransactionsByUserId(this.userId).subscribe(
        (data) => {
          this.transactions = data;
          this.filteredTransactions = data;
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