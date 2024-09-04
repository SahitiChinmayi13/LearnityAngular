import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../course.service';
import { Course } from '../Course';
import { Feedback } from '../Feedback';
import { FeedbackService } from '../feedback.service';
import { User } from '../User';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-feedback.component.html',
  styleUrl: './user-feedback.component.css'
})
export class UserFeedbackComponent {
  rating:number=0
  user:User=new User();
  course:Course=new Course()
  feedback:Feedback=new Feedback()
  constructor(private courseService:CourseService,
    private feedbackService:FeedbackService,
    private userService:UserService){ 
    this.getCourseEnrolled();
    this.getUserId();
  }
  
    getCourseEnrolled(){
      this.courseService.getSelectedCourse().subscribe((course: Course) => {
        this.course = course;
        this.feedback.courseId = this.course.course_id;
        console.log(this.course);
      });
    }
    getUserId(){
      this.userService.getUser().subscribe((user: User) => {
        this.user = user;
        this.feedback.userId = this.user.id;
      });
    }
    setRating(value: number): void {
      this.rating = value;
      this.feedback.rating=this.rating;
    }

    submitFeedback(feedback:Feedback) {
      this.feedbackService.createFeedback(feedback).subscribe((data)=>{
        console.log(data)
      })
    }
  };

  

  

