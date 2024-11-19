import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';  // Import your user service
import { User } from './user';  // Import your User model

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];  // Used for filtering the user list

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  // Fetch all users from the service
  getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;  // Initialize filtered users
    });
  }

  // Method to filter users based on search input
  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = this.users;  // Reset to all users if search term is empty
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
