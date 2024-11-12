import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngFor

@Component({
  selector: 'app-admin-introduction',
  standalone: true,
  imports: [CommonModule],  // Include CommonModule to use *ngFor
  templateUrl: './admin-introduction.component.html',
  styleUrls: ['./admin-introduction.component.css']
})
export class AdminIntroductionComponent {

  // Hardcoded list of courses the user has started
  coursesInProgress = [
    { id: 1, title: 'Angular Fundamentals', description: 'Learn the basics of Angular framework.', progress: 50 },
    { id: 2, title: 'Advanced TypeScript', description: 'Deep dive into TypeScript and its advanced features.', progress: 30 },
    { id: 3, title: 'Web Development with Node.js', description: 'Build scalable applications with Node.js.', progress: 75 }
  ];

  constructor(private router: Router) { }  // Inject Router

  // Method to navigate to different pages
  navigateTo(page: string): void {
    this.router.navigate([page]);  // Navigate based on the page parameter
  }

  continueCourse(courseId: number): void {
    // console.log('Navigating to course with ID:', courseId);
    this.router.navigate([`/course/${courseId}`]);  // Navigate to course detail page, passing the course ID
  }
}
