import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FDService } from '../create-fd/fd.service'; // Correct path to FDService
import { FD } from '../create-fd/fd'; // Correct path to FD model
import Swal from 'sweetalert2';
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

  withdrawFD(fdId: number, maturityDate: string) {
    if (!this.isWithdrawAllowed(maturityDate)) {
      Swal.fire({
        title: 'Error!',
        text: 'Cannot withdraw FD before maturity date.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to withdraw FD with ID ${fdId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, withdraw it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onWithdraw(fdId);  // Proceed with withdrawal if confirmed
      }
    });
  }
  

  // Check if FD can be withdrawn based on maturity date
  isWithdrawAllowed(maturityDate: string): boolean {
    const currentDate = new Date();
    const maturityDateObj = new Date(maturityDate);
    return currentDate >= maturityDateObj;  // Return true if FD is matured
  }

  onWithdraw(fdId: number) {
    const url = `http://localhost:8080/api/fds/withdraw/${fdId}`;
    this.http.get(url, {}).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: 'Success!',
          text: `FD with ID ${fdId} has been successfully withdrawn.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.getFDs();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: this.getErrorMessage(error),
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  

  breakFD(fdId: number) {
    const url = `http://localhost:8080/api/fds/check/${fdId}`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        const maturityAmount = response.maturityAmount;
        const message = response.message;
  
        Swal.fire({
          title: 'Are you sure?',
          text: `${message}\n\nDo you want to break this FD now?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, break it!',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            this.onBreakFD(fdId); // Proceed with breaking the FD
          }
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: this.getErrorMessage(error),
          icon: 'error',
          confirmButtonText: 'OK',
        });
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
  onBreakFD(fdId: number) {
    const url = `http://localhost:8080/api/fds/break/${fdId}`;
    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: 'Success!',
          text: `FD with ID ${fdId} has been successfully broken.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.getFDs();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: this.getErrorMessage(error),
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  
  private getErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  }
  
}
