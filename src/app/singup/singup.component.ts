import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// signup.component.ts
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})


export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  roles = Object.values(Role);
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      ]],
      designation: [''],
      role: ['USER', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    // TODO: Implement signup logic
    console.log('Signup Data:', this.signupForm.value);

    // Example of how you might call a signup service
    this.userService.saveUser(this.signupForm.value)
      .subscribe(
        {
          next: (response: any) => {
            this.router.navigate(['/login']);
          },
          error: (error: any) => {

            console.error('Signup error', error);
          }
        }
      );
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(field: string): any {
    const formField = this.signupForm.get(field);
    return formField?.invalid && (formField.dirty || formField.touched || this.submitted);
  }
}
