import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-break-fd',
  templateUrl: './break-fd.component.html',
  styleUrls: ['./break-fd.component.css'],
})
export class BreakFdComponent {
  fdId: number = 0; // Input from the user
  breakMessage: string = ''; // Success or error message
  isError: boolean = false; // Flag to track success or error

  constructor(private http: HttpClient) {}

  onBreakFD() {
    const url = `http://localhost:8080/api/fds/break/${this.fdId}`;
    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        this.breakMessage = `FD with ID ${this.fdId} has been successfully broken.`;
        this.isError = false;
      },
      error: (error) => {
        this.isError = true; // Mark as error
        this.breakMessage = this.getErrorMessage(error);
      },
    });
  }

  /**
   * Get appropriate error messages based on backend response
   * @param error Backend error response
   * @returns User-friendly error message
   */
  private getErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message; // Use custom message from backend if available
    }

    // Default error message
    return 'An unexpected error occurred. Please try again.';
  }
}
