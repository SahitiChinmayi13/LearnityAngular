import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  username: string = '';
  name: String = '';
  user: User = new User();
  sideMenuOpen: boolean = false;
  showWelcomeMessage: boolean = true;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.username = this.userService.getUsername();
    this.findUser(this.username);
  }

  ngOnInit(): void {
    // Subscribe to router events and check the current URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Show welcome message only on the main dashboard
        this.showWelcomeMessage = event.urlAfterRedirects === '/admindashboard';
      }
    });
  }

  findUser(username: string) {
    // Fetch user data based on the username
    this.adminService.getUserByUserName(username).subscribe(data => {
      this.user = data;
      this.name = data.fullName;
      this.adminService.setUser(this.user);
    });
  }

  toggleSideMenu(): void {
    this.sideMenuOpen = !this.sideMenuOpen;
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