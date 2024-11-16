import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-wd',
  templateUrl: './home-wd.component.html',
  styleUrls: ['./home-wd.component.css'], // Corrected property name
})
export class HomeWdComponent implements OnInit {
  role: string | null = null; // Match the variable name in HTML

  constructor() {}

  ngOnInit(): void {
    // Fetch the user role from sessionStorage
    this.role = sessionStorage.getItem('userRole');
  }
}
