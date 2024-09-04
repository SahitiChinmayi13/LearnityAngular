import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../Feedback';
import { UserService } from '../user.service';
import { User } from '../User';


@Component({
  selector: 'app-admin-feedbackmanagement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-feedbackmanagement.component.html',
  styleUrls: ['./admin-feedbackmanagement.component.css']
})
export class AdminFeedbackmanagementComponent {
  feedbacks: Feedback[] = []
  users:User[]=[]
  totalUsers=0
  totalFeedbacks=0
  feedBacksPending=this.totalUsers-this.totalFeedbacks
  constructor(private feedbackService:FeedbackService,private userService:UserService){
    this.getAllFeedbacks();
    this.fetchUsers();
  }
  fetchUsers(){
    this.userService.getUsers().subscribe((data:User[])=>{
      console.log(data);
      this.users=data;
      this.totalUsers=this.users.length;
      this.feedBacksPending=this.totalUsers-this.totalFeedbacks

    })
  }

  getAllFeedbacks(){
    this.feedbackService.getAllFeedback().subscribe((data)=>{
      this.feedbacks=data;
      console.log(data)
      this.totalFeedbacks=this.feedbacks.length;
      this.feedbackService.setFeedbackLenght(this.totalFeedbacks)
    })
  }
  currentPage: number = 0;
  pageSize: number = 6;

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
