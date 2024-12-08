import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER'
}

interface UserProfile {
  id: number;
  fullName: string;
  username: string;
  email: string;
  designation: string;
  role: Role;
}
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent implements OnInit {
  userProfile: any;
  profileForm: FormGroup=new FormGroup({});
  isEditMode = false;
  roleOptions = Object.values(Role);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService:UserService
  ) {
    // Sample user data - in real app, this would come from a service
    this.userProfile = {
      id: 1,
      fullName: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@learnity.com',
      designation: 'Software Engineer',
      role: Role.USER
    };
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getUserInformation();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      fullName: [{ value: this.userProfile.fullName, disabled: !this.isEditMode }, [Validators.required]],
      username: [{ value: this.userProfile.username, disabled: true }],
      email: [{ value: this.userProfile.email, disabled: !this.isEditMode }, [Validators.required, Validators.email]],
      designation: [{ value: this.userProfile.designation, disabled: !this.isEditMode }],
      role: [{ value: this.userProfile.role, disabled: true }]
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    
    if (this.isEditMode) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  getUserInformation(){
    this.userService.getUserByUserName("").subscribe({
      next:(data)=>{
        console.log(data)
        this.userProfile=data;
        this.profileForm.patchValue(data)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // In a real application, you would call a service to update the user profile
      console.log('Profile updated:', this.profileForm.value);
      this.isEditMode = false;
      this.profileForm.disable();
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.initializeForm();
    this.profileForm.disable();
  }

  logout(): void {
    // Clear any authentication tokens
    localStorage.removeItem('authToken');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  navigateTo(route:string){
    this.router.navigate([`${route}`])
  }
}
