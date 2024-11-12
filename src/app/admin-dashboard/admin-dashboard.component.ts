import { Component, HostListener,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']  // Make sure it's styleUrls (plural)
})
export class AdminDashboardComponent implements OnInit {
  userDetails: any = null;
  error: string | null = null;
  sideMenuOpen: boolean = false;  // Declare a variable to control side menu visibility
  username: string = '';
  user: User = new User();
  name: String = ''; // Name of the user

  constructor(private userService: UserService,
    private adminService: AdminService
  ) { 

  }

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

  // Method to toggle the side menu visibility
  toggleSideMenu(): void {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  findUser(username: string) {
    // Fetch user data based on the username
    this.adminService.getUserByUserName(username).subscribe(data => {
      this.user = data;
      this.name = data.fullName;
      this.adminService.setUser(this.user);
    });
  }

  logout(): void {
    // Implement logout logic here if needed
  }

  // Detect clicks outside the side menu to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.side-menu') && !target.closest('.hamburger-menu')) {
      this.sideMenuOpen = false;
    }
  }
}
