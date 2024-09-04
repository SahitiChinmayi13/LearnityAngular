import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';
import { User } from '../User';
import { Course } from '../Course';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-user-course',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-course.component.html',
  styleUrl: './user-course.component.css'
})
export class UserCourseComponent {
user:User=new User()
course:Course=new Course()
username=""

  courses = [
    {  title: 'Introduction to Angular', description: 'Learn the basics of Angular.' ,modules:10,timeNeeded:'7 hours'},
    {  title: 'Advanced Angular', description: 'Deep dive into Angular features and best practices.' ,modules:5,timeNeeded:'5 hours'},
    // Add more courses as needed
  
  ];
  constructor(private adminService:UserService,private courseService:CourseService, private userService:AdminService){
    this.username = this.adminService.getUsername();
    console.log("username kya ha",this.username)
    this.findUser(this.username)
  }
  findUser(username:string){
    this.userService.getUserByUserName(username).subscribe(data=>{
      this.user=data
      console.log(this.user)
      this.findCourseById(this.user.id)
    })
  }
  findCourseById(id:Number){
    this.userService.getCourseByUserId(id).subscribe((savedUser:Course)=>{
      console.log(savedUser)
      this.course=savedUser;
      this.courseService.setSelectedCourse(this.course);
    })
  }

}
