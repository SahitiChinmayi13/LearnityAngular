import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from '../course.service';
import { Course } from '../Course';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-addcourse',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './admin-addcourse.component.html',
  styleUrls: ['./admin-addcourse.component.css'] // Fixing the typo here
})
export class AdminAddcourseComponent {
  course: any = { title: "", description: "", duration: "", module: 0 };

  constructor(private courseService: CourseService, private router: Router) {}

  onSubmit() {
    console.log("Button clicked"); // Check if this logs on button click
    console.log("Course data:", this.course); // Check if course data is captured
    this.courseService.createCourse(this.course).subscribe({
      next: (response) => {
        console.log("Course added:", response);
        this.router.navigate(['/admindashboard/coursemanagement']);
      },
      error: (error) => {
        console.error("Error adding course:", error);
      }
    });
  }  
  
}
