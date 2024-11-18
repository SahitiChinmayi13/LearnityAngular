import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../Feedback';
import { UserService } from '../user.service';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-feedbackmanagement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-feedbackmanagement.component.html',
  styleUrls: ['./admin-feedbackmanagement.component.css']
})
export class AdminFeedbackmanagementComponent {
  feedbacks: Feedback[] = [];
  users: User[] = [];
  totalUsers = 0;
  totalFeedbacks = 0;
  currentPage: number = 0;
  pageSize: number = 6;

  constructor(
    private feedbackService: FeedbackService,
    private userService: UserService,
    private router: Router
  ) {
    this.getAllFeedbacks();
    this.fetchUsers();
  }

  // Add these new methods
  navigateToAddFeedback() {
    this.router.navigate(['/admindashboard/addfeedback']);
  }


  fetchUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.totalUsers = this.users.length;
    });
  }

  getAllFeedbacks() {
    this.feedbackService.getAllFeedback().subscribe((data) => {
      this.feedbacks = data;
      this.totalFeedbacks = this.feedbacks.length;
    });
  }

  editFeedback(feedback: Feedback) {
    this.router.navigate(['/admindashboard/edit-feedback', feedback.feedbackId]);
  }

  addFeedbackForUser(user: User) {
    // Navigate to add feedback page with user ID
    this.router.navigate(['/admindashboard/addfeedback'], {
      queryParams: { userId: user.id }
    });
  }

  deleteFeedback(feedbackId: number) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.feedbackService.deleteFeedback(feedbackId).subscribe({
        next: () => {
          // Refresh the feedback list after deletion
          this.getAllFeedbacks();
        },
        error: (error) => {
          console.error('Error deleting feedback:', error);
        }
      });
    }
  }

  get paginatedFeedbacks(): Feedback[] {
    const start = this.currentPage * this.pageSize;
    return this.feedbacks.slice(start, start + this.pageSize);
  }

  scrollRight(): void {
    if ((this.currentPage + 1) * this.pageSize < this.feedbacks.length) {
      this.currentPage++;
    }
  }

  scrollLeft(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}