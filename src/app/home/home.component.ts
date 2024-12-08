import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isMenuOpen = false;
  activeDropdown: number | null = null;

  navItems: any[] = [
    {
      title: "Who we are",
      content: "Learnity is a comprehensive Learning Management System (LMS) designed to streamline and enhance the educational experience within organizations. Our platform is built to facilitate seamless course creation, user management, and progress tracking, empowering both administrators and learners alike."
    },
    {
      title: "What we do",
      content: [
        "Tech Team Training",
        "Leadership Development", 
        "Gen AI Skilling",
        "Certifications"
      ]
    },
    {
      title: "Contact us",
      content: [
        "customercare.com",
        "123456789"
      ]
    }
  ];

  constructor(private router: Router) {}

  toggleDropdown(index: number | null): void {
    this.activeDropdown = this.activeDropdown === index ? null : index;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
