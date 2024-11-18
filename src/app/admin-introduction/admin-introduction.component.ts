import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
}

@Component({
  selector: 'app-admin-introduction',
  templateUrl: './admin-introduction.component.html',
  styleUrls: ['./admin-introduction.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminIntroductionComponent implements OnInit {
  coursesInProgress: Course[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeCourses();
  }

  initializeCourses() {
    this.coursesInProgress = [
      {
        id: 'SLM001',
        title: 'Strategic Leadership & Management',
        description: 'Advanced leadership strategies and organizational management techniques',
        progress: 75
      },
      {
        id: 'BAE002',
        title: 'Business Analytics for Executives',
        description: 'Data-driven decision making and business intelligence for leadership',
        progress: 60
      },
      {
        id: 'CFM003',
        title: 'Corporate Finance Management',
        description: 'Financial strategy, risk management, and investment decision making',
        progress: 45
      }
    ];
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Update this method to use the correct nested route
  navigateToCourse(courseId: string) {
    this.router.navigate(['/admindashboard/course', courseId]);  // Changed this line
  }

  checkCourses() {
    alert('Number of courses: ' + this.coursesInProgress.length + 
          '\nFirst course: ' + (this.coursesInProgress[0]?.title || 'No courses'));
  }
}