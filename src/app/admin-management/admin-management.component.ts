import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../Course';
@Component({
  selector: 'app-admin-management',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-management.component.html',
  styleUrl: './admin-management.component.css'
})
export class AdminManagementComponent {
  courses:Course[] = []
  constructor(private courseService:CourseService){}
  
  ngOnInit():void{
    this.fetch()
  }
  fetch(){
    this.courseService.fetchAll().subscribe((data:Course[])=>{
      console.log(data)
      this.courses=data;
      
    })
  }
  
  delete(courseId: Number) {
    this.courseService.deleteById(courseId).subscribe(
      () => {
        // Even if there's no response, remove the course from the array
        this.courses = this.courses.filter(course => course.course_id !== courseId);
      },
    )
  }
}
