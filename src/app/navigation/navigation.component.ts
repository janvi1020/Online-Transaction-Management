import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router'; // Import Router to navigate after logout
import { NavigationEnd } from '@angular/router'; // Import NavigationEnd to track route changes
import { filter } from 'rxjs/operators'; // Import filter for observable filtering
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})export class NavigationComponent {
  currentRoute: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Subscribe to router events to get the current route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url; // Set currentRoute to the active URL
      });
  }

  isLoggedIn(): boolean {
    console.log("is logged in: ", this.authService.isLoggedIn());
    return this.authService.loggedIn; // Call the method to check login status
  }

  onLogout(): void {
    this.authService.logout(); // Call logout method from AuthService
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }

  // Check if the current route is not the login page
  showNavItems(): boolean {

    console.log("this is ",this.currentRoute);
    return this.currentRoute !== '/login'; // Change '/login' to match your login route if different
  }
}