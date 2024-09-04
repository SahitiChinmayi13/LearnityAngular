import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../User';
import { CourseService } from '../course.service';
import { AdminService } from '../admin.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  title = 'Cap_project';
  username: string = '';
  name: String =''
  user:User=new User()
  constructor(private adminService: AdminService,private courseService:CourseService, private logins:UserService) {
    // Get the username from the service
    this.username = this.logins.getUsername();
    //console.log(this.username)
    this.findUser(this.username)
    
  }
 
 
  findUser(username:string){
    //console.log("username: ", username)
    this.adminService.getUserByUserName(username).subscribe(data=>{
      this.user=data
      this.name = data.fullName;
      console.log(this.user)
      this.adminService.setUser(this.user);
      this.findCourseById(this.user.id)
    })
  }
  findCourseById(id:Number){
    this.adminService.getCourseByUserId(id).subscribe((data)=>{
      console.log(data)
    })
  }
  logout(){

  }

}
