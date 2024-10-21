import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccountId: number | null = null; // Track the selected account
  depositAmount: number | null = null;
  withdrawAmount: number | null = null;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAllAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  openDepositModal(accountId: number): void {
    this.selectedAccountId = accountId;
    const depositModalElement = document.getElementById('depositModal');
    if (depositModalElement) {
      const depositModal = new bootstrap.Modal(depositModalElement);
      depositModal.show();
    }
  }

  deposit(accountId: number | null, amount: number | null): void {
    if (accountId !== null && amount !== null) {
      this.accountService.deposit(accountId, amount).subscribe(() => {
        this.loadAccounts();
        this.closeDepositModal();
      });
    }
  }

  closeDepositModal(): void {
    const depositModalElement = document.getElementById('depositModal');
    if (depositModalElement) {
      const depositModal = bootstrap.Modal.getInstance(depositModalElement);
      if (depositModal) {
        depositModal.hide();
      }
    }
  }

  openWithdrawModal(accountId: number): void {
    this.selectedAccountId = accountId;
    const withdrawModalElement = document.getElementById('withdrawModal');
    if (withdrawModalElement) {
      const withdrawModal = new bootstrap.Modal(withdrawModalElement);
      withdrawModal.show();
    }
  }

  withdraw(accountId: number | null, amount: number | null): void {
    if (accountId !== null && amount !== null) {
      this.accountService.withdraw(accountId, amount).subscribe(() => {
        this.loadAccounts();
        this.closeWithdrawModal();
      });
    }
  }

  closeWithdrawModal(): void {
    const withdrawModalElement = document.getElementById('withdrawModal');
    if (withdrawModalElement) {
      const withdrawModal = bootstrap.Modal.getInstance(withdrawModalElement);
      if (withdrawModal) {
        withdrawModal.hide();
      }
    }
  }

  openDeleteModal(accountId: number): void {
    this.selectedAccountId = accountId;
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    }
  }

  delete(accountId: number | null): void {
    if (accountId !== null) {
      this.accountService.deleteAccount(accountId).subscribe(() => {
        this.loadAccounts();
        this.closeDeleteModal();
      });
    }
  }

  closeDeleteModal(): void {
    const deleteModalElement = document.getElementById('deleteModal');
    if (deleteModalElement) {
      const deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
      if (deleteModal) {
        deleteModal.hide();
      }
    }
  }
}
