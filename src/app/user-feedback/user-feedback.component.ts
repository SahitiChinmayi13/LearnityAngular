import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../Course';
import { Feedback } from '../Feedback';
import { FeedbackService } from '../feedback.service';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {
  rating: number = 0;
  user: User = new User();
  course: Course = new Course();
  feedback: Feedback = new Feedback();

  // Temporary hardcoded courses for demonstration
  enrolledCourses: Course[] = [
    {
      course_id: 1, title: 'Introduction to Programming', description: 'Learn basics of programming',
      duration: "2 hours",
      module: 5
    },
    {
      course_id: 2, title: 'Web Development', description: 'Learn web development fundamentals',
      duration: "3 hours",
      module: 2
    },
    {
      course_id: 3, title: 'Database Management', description: 'Learn database concepts',
      duration: "8",
      module: 3
    }
  ];

  selectedCourseId: number = 0;

  constructor(
    private courseService: CourseService,
    private feedbackService: FeedbackService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    this.userService.getUser().subscribe((user: User) => {
      this.user = user;
      this.feedback.userId = this.user.id;
    });
  }

  onCourseSelect() {
    // Find selected course from the hardcoded array
    const selectedCourse = this.enrolledCourses.find(
      course => course.course_id === Number(this.selectedCourseId)
    );
    if (selectedCourse) {
      this.course = selectedCourse;
      this.feedback.courseId = selectedCourse.course_id;
    }
  }

  setRating(value: number): void {
    this.rating = value;
    this.feedback.rating = this.rating;
  }

  isValidFeedback(): boolean {
    return this.feedback.courseId > 0 && 
           this.feedback.rating > 0 && 
           this.feedback.description?.trim().length > 0;
  }

  submitFeedback(feedback: Feedback) {
    if (this.isValidFeedback()) {
      this.feedbackService.createFeedback(feedback).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully', response);
          this.router.navigate(['/user-dashboard']);
        },
        error: (error) => {
          console.error('Error submitting feedback', error);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/user-dashboard']);
  }
}