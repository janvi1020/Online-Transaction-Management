import { Component } from '@angular/core';
import { AccountService } from '../account.service'; // Update this path based on your service location
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  fromId: number=0;
  toId: number=0;
  amount: number=0;
  message: string = '';

  constructor(private accountService: AccountService, private router: Router) { }

  onTransfer(): void {
    if (this.fromId && this.toId && this.amount > 0) {
      this.accountService.transfer(this.fromId, this.toId, this.amount).subscribe({
        next: (response: any) => {
          console.warn("res", response);
          
          this.message = 'Transfer successful: ' + response;
          this.router.navigate(['/accounts']); // Redirect to the accounts list page after transfer
        },
        error: (err: any) => {
          console.warn("erorr", err);
          
          this.message = 'Transfer failed: ' + err.error; // Assuming `err.error` contains the error message
        }
      });
    } else {
      this.message = 'Please provide valid input for all fields';
    }
  }
}
