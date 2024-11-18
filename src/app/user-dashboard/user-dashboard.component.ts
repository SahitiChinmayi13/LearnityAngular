import { Component, HostListener,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserService } from '../user.service';
import { User } from '../User';
import { AdminService } from '../admin.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule], // Add RouterModule and RouterOutlet here
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  title = 'Cap_project';
  username: string = '';
  name: String = ''; // Name of the user
  user: User = new User();
  sideMenuOpen: boolean = false;
  showWelcomeMessage: boolean = true; // Controls the visibility of the Welcome message

  constructor(
    private adminService: AdminService,
    private courseService: CourseService,
    private logins: UserService,
    private router: Router
  ) {
    this.username = this.logins.getUsername();
    this.findUser(this.username);
  }

  ngOnInit(): void {
    // Show welcome message only on the main dashboard path
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showWelcomeMessage = event.urlAfterRedirects === '/user-dashboard' || 
                                 event.urlAfterRedirects === '/user-dashboard/';
      }
    });
  }

  toggleSideMenu() {
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

  logout() {
    // Add logic for logout if needed
  }

  // Detect clicks outside the side menu to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.side-menu') && !target.closest('.hamburger-menu')) {
      this.sideMenuOpen = false;
    }
  }

  // Add method to handle navigation
  navigateTo(route: string) {
    this.router.navigate([`/user-dashboard/${route}`]);
    this.sideMenuOpen = false; // Close side menu after navigation on mobile
    console.log(`Navigating to: /user-dashboard/${route}`); // Add this for debugging
  }

  // Add click handlers for cards
  onCardClick(route: string) {
    this.navigateTo(route);
  }
}
