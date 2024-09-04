import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../User';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';
import { Course } from '../Course';
import { Feedback } from '../Feedback';
import { FeedbackService } from '../feedback.service';
import { ProgressService } from '../progress.service';
import { Progress } from '../Progress';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-progresstracking',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-progresstracking.component.html',
  styleUrl: './admin-progresstracking.component.css'
})
export class AdminProgresstrackingComponent {
  constructor(private userService:UserService,
    private courseService:CourseService,
    private feedbackService:FeedbackService,
    private progressService:ProgressService)
    {this.fetchUsers();
      this.fetchCourses();
      this.fetchFeedbackLength();}
  users:User[]=[]
  user:User=new User();
  courses:Course[]=[]
  progress:Progress=new Progress();
  course:Course=new Course();
  feedbacklength=0
  totalUsers = 0;
  id=0
  totalCourses=0;
  enrolledStudents = 1178;
  avgWatchingTime = '120 mins';
  completedStudents = 937;
  name=""
  boo:boolean=true;

  ngOnInit(): void {
    
  }
  fetchUsers(){
    this.userService.getUsers().subscribe((data:User[])=>{
      console.log(data);
      this.users=data;
      this.totalUsers=this.users.length;
    })
  }
  fetchFeedbackLength(){
    this.feedbacklength=this.feedbackService.getFeedbackLength()
  }
  fetchCourses(){
    this.courseService.fetchAll().subscribe((data)=>{
      this.courses=data;
      this.totalCourses=this.courses.length;
    })
  }
  search(id:number){

    this.userService.getUserById(id).subscribe((data)=>{
      this.user=data;
      console.log(this.user)
    })
    this.userService.getCourseByUserId(id).subscribe((data)=>{
      this.course=data;
      console.log(this.course)
    })
    this.userService.getUserProgress(id).subscribe((data)=>{
      this.progress=data;
      console.log(this.progress)
    })
  }


}
