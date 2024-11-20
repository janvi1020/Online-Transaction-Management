import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Online Transaction Management';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {

  }

  config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true  // Example config to suppress horizontal scrolling
  };
  ngOnInit() {
    this.authService
      .$loggedInSubject
      .subscribe({
        next: (d: boolean): void => {
          console.log(d);
          this.isLoggedIn = d;
        }
      })
  }
}
