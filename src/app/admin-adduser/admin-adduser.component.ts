import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../user.service';
import { RouterModule, Router } from '@angular/router';
import { EnrolmentService } from '../enrolment.service';
import { Enrolment } from '../Enrolment';
import { DatePipe } from '@angular/common';
import { ProgressService } from '../progress.service';
import { Progress } from '../Progress';

@Component({
  selector: 'app-admin-adduser',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './admin-adduser.component.html',
  styleUrls: ['./admin-adduser.component.css'] // Corrected to 'styleUrls'
})
export class AdminAdduserComponent {
  user: any = {id:0, fullName: "", username: "", password:"", email:"", designation:"", role:"USER"};
  enroll: Enrolment = new Enrolment();
  progress:Progress = new Progress();
  constructor(
    private userService: UserService,
    private router: Router,
    private enrolmentService: EnrolmentService,
    private progressService:ProgressService
  ) {}

  onSubmit() {
    this.userService.saveUser(this.user).subscribe(response => {
      // this.user = savedUser; // User object is now fully saved and includes the ID
      
     // console.log('User ID:', this.user.username, this.user.id); // Now the user ID should be correctly logged
      this.router.navigate(['/admindashboard/usermanagement']);
      // // Assign the userId to the enrollment
      
      //console.log('id: ', response.id)

      this.enroll.userId = response.id;
      this.progress.userId=response.id
      this.progress.status="0"

      // Set the courseId based on the user's role
      if (this.user.designation === '.Net C#') {
        this.enroll.courseId = 2;
        this.progress.courseId=2;
      } else if (this.user.designation === 'Java Developer') {
        this.enroll.courseId = 1;
        this.progress.courseId=1;
      } else if (this.user.designation === 'Python Data Engineer') {
        this.enroll.courseId = 3;
        this.progress.courseId=3;
      }

      // Set the start date for the enrollment
      this.enroll.startDate = new Date();

      // Now save the enrollment
      this.enrolmentService.create(this.enroll).subscribe(response => {
        console.log('Enrollment saved:', this.enroll);
      });
      this.progressService.createProgress(this.progress).subscribe(response =>{
        console.log(this.progress);
      })
    });
  }
}
