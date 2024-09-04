import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router, private us : UserService){}
  

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(success => {
      this.us.setUsername(this.username);
      if (success) {
        
        if(this.authService.getRole()=="ADMIN"){
          this.router.navigate(['/admindashboard'])
          }
        else{
          console.log(this.authService.getRole())
            this.router.navigate(['/userdashboard'])
        }
        
      } else {
        this.loginError = 'Login failed. Write correct Username or Password...';
      }
    });
  }
}
