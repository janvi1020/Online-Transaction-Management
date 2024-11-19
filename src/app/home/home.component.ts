import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  accounts: any;
  userRole: string='';

  ngOnInit(): void {
    // Retrieve the userRole from sessionStorage
    this.userRole = sessionStorage.getItem('userRole') || ''; // Ensure default to empty string if null
  }
}