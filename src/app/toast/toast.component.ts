import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() message: string = '';  // Message input to show in the toast
  showToast: boolean = false;  // Flag to toggle toast visibility

  constructor() {}

  ngOnInit(): void {
    if (this.message) {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;  // Hide toast after 3 seconds
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    // Clean up the timeout to prevent issues with component destruction
    this.showToast = false;
  }
}
