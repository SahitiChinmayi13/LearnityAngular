import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course } from '../Course';
import { CourseService } from '../course.service';
import { Progress } from '../Progress';
import { ProgressService } from '../progress.service';
import { UserService } from '../user.service';
import { User } from '../User';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-course-content',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './user-course-content.component.html',
  styleUrls: ['./user-course-content.component.css']
})
export class UserCourseContentComponent {
  course: Course = new Course();
  progress1: Progress = new Progress();
  progress2: Progress = new Progress();
  user: User = new User();
  statusPercentage: number = 0;
  currentModule: number = 1;
  totalModules: number = 0;
  update: number = 0;

  constructor(
    private courseService: CourseService,
    private progressService: ProgressService,
    private userService: AdminService
  ) {
    this.getUser();
    this.getCourseEnrolled();
    this.getUserProgress();
  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      this.user = data;
      console.log("user_id course:", data.id)
      this.progress2.userId = this.user.id;
    });
  }

  getUserProgress() {
    this.userService.getUserProgress(this.user.id).subscribe(data => {
      this.progress1 = data;
      this.progress2.progressId = this.progress1.progressId;
      
      // Ensure status is valid
      this.statusPercentage = Number(this.progress1.status);
      if (isNaN(this.statusPercentage) || this.statusPercentage < 0) {
        this.statusPercentage = 0;
      }

      // Calculate current module based on statusPercentage
      this.update = this.totalModules > 0 ? 100 / this.totalModules : 0;
      this.currentModule = Math.ceil((this.statusPercentage / 100) * this.totalModules);
    });
  }

  getCourseEnrolled() {
    this.courseService.getSelectedCourse().subscribe(data => {
      this.course = data;
      this.totalModules = this.course.module;

      // Ensure update is calculated properly
      this.update = this.totalModules > 0 ? 100 / this.totalModules : 0;

      // Set progress2 course ID
      this.progress2.courseId = this.course.course_id;
    });
  }

  goToPreviousModule(): void {
    if (this.currentModule > 1) {
      this.currentModule--;
      this.updateProgress();
    }
  }

  goToNextModule(): void {
    if (this.currentModule < this.totalModules) {
      this.currentModule++;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.statusPercentage = (this.currentModule / this.totalModules) * 100;
    this.progress2.status = this.statusPercentage.toString();
    this.progressService.setProgress(this.progress2)
    this.progressService.setCurrentModule(this.currentModule)
    // Update progress in the backend
    this.progressService.updateProgress(this.progress2.progressId, this.progress2).subscribe((data) => {
      console.log(data);
    });
  }
}