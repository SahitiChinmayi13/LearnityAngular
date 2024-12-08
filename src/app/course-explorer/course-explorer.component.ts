import { Component } from '@angular/core';
import { Course } from '../Course';
import { CourseService } from '../course.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-course-explorer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './course-explorer.component.html',
  styleUrl: './course-explorer.component.css'
})
export class CourseExplorerComponent {

  courses:Course[] = []
  constructor(private courseService:CourseService,private userService:UserService){}
  
  ngOnInit():void{
    this.fetch()
  }
  fetch(){
    this.courseService.fetchAll().subscribe((data:Course[])=>{
      console.log(data)
      this.courses=data;
      
    })
  }
  
  enrollCourse(courseId:number){
    this.userService.getUserByUserName("").subscribe({
      next:(data)=>{
        this.courseService.enrollCourse(courseId,data.id).subscribe({
          next:(response)=>{
            console.log("Course Enrollment Successfull")
            
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }
    })
  }

}
