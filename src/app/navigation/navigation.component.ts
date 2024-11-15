import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentRoute: string = '';
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
    this.userRole = sessionStorage.getItem('userRole');
      });
  }
  


  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Assuming you have a method to check login status
  }

  onLogout(): void {
    this.authService.logout(); // Call logout method from AuthService
    confirm("Are you sure you want to logout?");
    sessionStorage.removeItem('userRole'); // Remove role on logout
    this.router.navigate(['/login']); // Redirect to login page
  }

  showNavItems(): boolean {
    // Hide nav items on the login page
    if (this.currentRoute === '/login') {
      return false; 
    }
  
    // Always show nav items for "super Admin" role
    if (this.userRole === 'Super Admin') {
      return true;
    }
  
    // For other roles, only show certain items
    if (this.userRole === 'withdrawer' || this.userRole === 'depositor' || this.userRole === 'normalUser') {
      return true;
    }
  
    // Default case (no role matches)
    return false;
  }
  
}
