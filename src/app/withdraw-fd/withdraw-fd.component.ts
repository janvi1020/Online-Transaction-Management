import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-withdraw-fd',
  templateUrl: './withdraw-fd.component.html',
  styleUrls: ['./withdraw-fd.component.css'],
})
export class WithdrawFdComponent {
  fdId: number = 0;
  withdrawMessage: string = '';

  constructor(private http: HttpClient) {}

  onWithdraw() {
    const url = `http://localhost:8080/api/fd/withdraw/${this.fdId}`;
    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        
        this.withdrawMessage = `FD with ID ${this.fdId} has been successfully withdrawn.`;
      },
      error: (error) => {
        console.error(error);
        this.withdrawMessage = 'Error occurred while withdrawing FD.';
      },
    });
  }
}
