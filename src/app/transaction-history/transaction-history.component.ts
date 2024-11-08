import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: Transaction[] = [];
  accountId: number = 0;

  constructor(private transactionService: TransactionService, private route: ActivatedRoute) {}

  ngOnInit() {
    const accountIdParam = this.route.snapshot.paramMap.get('id'); // Get account ID from the route
    if (accountIdParam) {
      this.accountId = +accountIdParam; // Convert to number
      this.getTransactionHistory(); // Call to fetch transaction history only if accountId is valid
    } else {
      console.error('Account ID not found in parameters');
      // Handle the error: you might want to navigate away or show a message to the user
    }
  }

  getTransactionHistory() {
    this.transactionService.getTransactionHistory(this.accountId).subscribe(data => {
      this.transactions = data;
    });
  }
}
