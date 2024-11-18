import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../Feedback';

@Component({
  selector: 'app-edit-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.css']
})
export class EditFeedbackComponent implements OnInit {
  feedback: Feedback = {
    feedbackId: 0,
    userId: 0,
    courseId: 0,
    rating: 0,
    description: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFeedback(parseInt(id));
    }
  }

  loadFeedback(id: number) {
    this.feedbackService.getFeedbackById(id).subscribe({
      next: (feedback) => {
        this.feedback = feedback;
      },
      error: (error) => {
        this.errorMessage = 'Error loading feedback: ' + error.message;
      }
    });
  }

  updateFeedback() {
    if (!this.feedback.feedbackId) {
      this.errorMessage = 'Invalid feedback ID';
      return;
    }

    this.feedbackService.updateFeedback(this.feedback.feedbackId, this.feedback)
      .subscribe({
        next: () => {
          this.successMessage = 'Feedback updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/admindashboard/feedback-management']);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = 'Error updating feedback: ' + error.message;
        }
      });
  }

  cancelEdit() {
    this.router.navigate(['/admindashboard/feedbackmanagement']);
  }
}