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
    return this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout(); 
    confirm("Are you sure you want to logout?");
    sessionStorage.removeItem('userRole'); 
    this.router.navigate(['/login']); 
  }

  showNavItems(): boolean {
    if (this.currentRoute === '/login') {
      return false; 
    }
    if (this.userRole === 'Super Admin') {
      return true;
    }
    if (this.userRole === 'withdrawer' || this.userRole === 'depositor' || this.userRole === 'normalUser') {
      return true;
    }
    return false;
  }
  
  
}
