import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressService } from '../progress.service';
import { Progress } from '../Progress';
import { CourseService } from '../course.service';
import { Course } from '../Course';

@Component({
  selector: 'app-user-progress',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.css']
})
export class UserProgressComponent implements OnInit {
  constructor (private progressService:ProgressService,
    private courseService:CourseService
  ){}
  progress:Progress=new Progress();
  course:Course=new Course();
  courseName: string = 'Introduction to Angular';
  courseDescription: string = 'Learn the basics of Angular with hands-on projects.';
  courseDuration: number = 40; // hours
  completedModules: number = 5;
  totalModules: number = 10;
  hoursLeft: number = 15; // hours
  completionPercentage: number = (this.completedModules / this.totalModules) * 100;

  ngOnInit(): void {
    this.getProgress();
    this.updateProgressChart();
    this.getCourse();
    this.getCurrentModule();
  }
getProgress(){
  this.progress=this.progressService.getProgress()
  console.log(this.progress)
}
getCurrentModule(){
  this.completedModules=this.progressService.getCurrentMofule()
}
getCourse(){
  
   this.courseService.getSelectedCourse().subscribe((data:Course)=>{
    this.course=data
    console.log(this.course)
   })
  }

  updateProgressChart(): void {
    const radius = 45; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const progressCircle = document.querySelector('.progress') as SVGCircleElement;
    const percentageText = document.querySelector('.percentage') as SVGTextElement;

    if (progressCircle && percentageText) {
      const offset = circumference - (Number(this.progress.status) / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset.toString();
      percentageText.textContent = `${Math.round(Number(this.progress.status) )}%`;
    }
  }
}
