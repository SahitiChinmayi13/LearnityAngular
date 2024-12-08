import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../User';
@Component({
  selector: 'app-admin-searchuser',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './admin-searchuser.component.html',
  styleUrl: './admin-searchuser.component.css'
})
export class AdminSearchuserComponent {
  searchTerm: string = '';
  user: any = null; // You can define a proper user type or interface based on your data structure
  error: string | null = null;
  notFound: boolean = false;
  constructor(private userService: UserService) { }

  id = 0
  found = false
  username:string=""
  // Simulated search function (replace this with actual service call)
  onSearch(id: Number) {

    this.userService.getUserById(id).subscribe(data => {
      this.user = data
      this.found = true
    },
      error => {
        this.error = 'Failed to load user details';
        console.error('Error:', error);
      })
  }

  searchUserByUsername(username: string) {
    this.userService.searchUserByUsername(username).subscribe({
      next: (data) => {
        console.log(data)
        this.user = data
        this.found = true
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}

