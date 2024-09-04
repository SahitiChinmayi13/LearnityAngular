import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  userDetails: any = null;
  error: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserDetails(this.userService.getUsername()); 
  }

  loadUserDetails(userId: string): void {
    this.userService.getUserDetails(userId).subscribe(
      data => {
        this.userDetails = data;
      },
      error => {
        this.error = 'Failed to load user details';
        console.error('Error:', error);
      }
    );
  }
  logout(){
    
  }
}
