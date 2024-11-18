import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../Feedback';

@Component({
  selector: 'app-admin-add-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-add-feedback.component.html',
  styleUrls: ['./admin-add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  feedback: Feedback = {
    feedbackId: 0,
    userId: 0,
    courseId: 0,
    rating: 0,
    description: ''
  };

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.feedback.userId = Number(params['userId']);
      }
    });
  }

  submitFeedback() {
    console.log('Submitting feedback:', this.feedback);
    
    if (this.feedback.userId && this.feedback.courseId && this.feedback.rating && this.feedback.description) {
      this.feedbackService.createFeedback(this.feedback).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully:', response);
          this.router.navigate(['/admindashboard/feedbackmanagement']);
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
          // Handle error (you might want to show an error message to the user)
        }
      });
    } else {
      console.error('Please fill in all required fields');
      // You might want to show a validation message to the user
    }
  }

  // Add this method
  goBack() {
    this.router.navigate(['/admindashboard/feedbackmanagement']);
  }
}