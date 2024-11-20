import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FDService } from '../create-fd/fd.service'; // Correct path to FDService
import { FD } from '../create-fd/fd'; // Correct path to FD model

@Component({
  selector: 'app-fd-list',
  templateUrl: './fd-list.component.html',
  styleUrls: ['./fd-list.component.css']
})
export class FDListComponent implements OnInit {
  fds: FD[] = [];
  withdrawMessage: string = '';
  breakMessage: string = '';
  isError: boolean = false;
  warningBreak:boolean=false;
  displayMessage: any;
  constructor(
    private fdService: FDService, 
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getFDs();  // Fetch all FDs on component initialization
  }

  // Fetch all FDs from the backend
  getFDs() {
    this.fdService.getAllFDs().subscribe({
      next: (data) => {
        this.fds = data;  // Store the FDs in the local array
      },
      error: (error) => {
        console.error('Error fetching FDs:', error);  // Handle any errors
      }
    });
  }

  // Withdraw FD after confirming the action
  withdrawFD(fdId: number, maturityDate: string) {
    if (!this.isWithdrawAllowed(maturityDate)) {
      this.withdrawMessage = 'Cannot withdraw FD before maturity date';
      this.isError = true;
      return;
    }

    if (confirm('Are you sure you want to withdraw this FD?')) {
      this.onWithdraw(fdId);  // Proceed with withdrawal if confirmed
    }
  }

  // Check if FD can be withdrawn based on maturity date
  isWithdrawAllowed(maturityDate: string): boolean {
    const currentDate = new Date();
    const maturityDateObj = new Date(maturityDate);
    return currentDate >= maturityDateObj;  // Return true if FD is matured
  }

  // Handle the withdrawal request
  onWithdraw(fdId: number) {
    const url = `http://localhost:8080/api/fds/withdraw/${fdId}`;
    this.http.get(url, {}).subscribe({
      next: (response: any) => {
        this.withdrawMessage = `FD with ID ${fdId} has been successfully withdrawn.`;
        this.isError = false;
        this.getFDs();
      },
      error: (error) => {
        this.isError = true;
        this.withdrawMessage = this.getErrorMessage(error);
      },
    });
  }

  // Break FD after confirming the action
breakFD(fdId: number) {
  const url = `http://localhost:8080/api/fds/check/${fdId}`;
  this.http.get(url).subscribe({
    next: (response: any) => {
      const maturityAmount = response.maturityAmount;
      const message = response.message;

      // Show a custom confirmation dialog
      const confirmAction = window.confirm(
        `${message}\n\nDo you want to break this FD now?`
      );

      if (confirmAction) {
        this.onBreakFD(fdId); // Proceed with breaking the FD
      }
    },
    error: (error) => {
      this.displayMessage(this.getErrorMessage(error), 'danger');
    },
  });
}

  check(fdId:number){
    const url = `http://localhost:8080/api/fds/check/${fdId}`;
    this.http.get(url, {}).subscribe({
      next: (response: any) => {

      }
    })
  }

  // Handle the break FD request
  onBreakFD(fdId: number) {
    const url = `http://localhost:8080/api/fds/break/${fdId}`;
    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        this.breakMessage = `FD with ID ${fdId} has been successfully broken.`;
        this.getFDs();
        this.isError = false;
      },
      error: (error) => {
        this.isError = true; // Mark as error
        this.breakMessage = this.getErrorMessage(error);
      },
    });
  }

  // Utility to extract error message
  private getErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  }
}
