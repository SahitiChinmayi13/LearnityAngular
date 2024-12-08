import { Component } from '@angular/core';
import { CourseService } from '../course.service';
import { UserService } from '../user.service';
import { Course } from '../Course';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-enrolled',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './courses-enrolled.component.html',
  styleUrl: './courses-enrolled.component.css'
})
export class CoursesEnrolledComponent {

  courses:Course[] = []
  constructor(private courseService:CourseService,private userService:UserService,private router:Router){}
  
  ngOnInit():void{
    this.enrolledCourses()
  }
  fetch(){
    this.courseService.fetchAll().subscribe((data:Course[])=>{
      console.log(data)
      this.courses=data;
      
    })
  }
  navigateTo(route:string){
    this.router.navigate([`${route}`])
  }
  
  enrolledCourses(){
    this.userService.getUserByUserName("").subscribe({
      next:(data:any)=>{
        this.courseService.enrolledCourses(data.id).subscribe({
          next:(response:any)=>{
           this.courses=response
          },
          error:(error:any)=>{
            console.log(error)
          }
        })
      }
    })
  }

}
