import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { AddFeedbackComponent } from './admin-add-feedback/admin-add-feedback.component';
import { UserProgressComponent } from './user-progress/user-progress.component';
import { CourseVideoComponent } from './course-video/course-video.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { UserCourseContentComponent } from './user-course-content/user-course-content.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsermanagementComponent } from './admin-usermanagement/admin-usermanagement.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminIntroductionComponent } from './admin-introduction/admin-introduction.component';
import { AdminProgresstrackingComponent } from './admin-progresstracking/admin-progresstracking.component';
import { AdminFeedbackmanagementComponent } from './admin-feedbackmanagement/admin-feedbackmanagement.component';
import { AdminAdduserComponent } from './admin-adduser/admin-adduser.component';
import { AdminAddcourseComponent } from './admin-addcourse/admin-addcourse.component';
import { AdminSearchuserComponent } from './admin-searchuser/admin-searchuser.component';
import { SignupComponent } from './singup/singup.component';
import { CourseExplorerComponent } from './course-explorer/course-explorer.component';
import { CoursesEnrolledComponent } from './courses-enrolled/courses-enrolled.component';
import { CourseLandingComponent } from './course-landing/course-landing.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    { path: 'login', component: LoginComponent },
    {path:'signup',component:SignupComponent},
    {path:'user-profile',component:UserProfileComponent},
    {path:'course-explorer',component:CourseExplorerComponent},
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        children: [
          // Remove the recursive route that had UserDashboardComponent
          { path: 'courses', component: UserCourseComponent },
          { path: 'progress', component: UserProgressComponent },
          { path: 'feedback', component: UserFeedbackComponent },
          { path: 'usercoursecontent', component: UserCourseContentComponent },
          { path: 'course-content/:id', component: CourseVideoComponent },
          
        ]
    },
    {path: 'course-landing', component:CourseLandingComponent},
    {path:'courses-enrolled',component:CoursesEnrolledComponent},
    {path:'admindashboard',component:AdminDashboardComponent,
        children:[
            {path:"",component:AdminIntroductionComponent},
            {path:"usermanagement",component:AdminUsermanagementComponent},
            {path:"coursemanagement",component:AdminManagementComponent},
            {path:"progressmanagement",component:AdminProgresstrackingComponent},
            {path:"feedbackmanagement",component:AdminFeedbackmanagementComponent},
            {path:"addfeedback",component:AddFeedbackComponent},
            {path:"adduser",component:AdminAdduserComponent},
            {path:"addcourse",component:AdminAddcourseComponent},
            {path:"finduser",component:AdminSearchuserComponent},
            {path:"edit-feedback/:id", component: EditFeedbackComponent},
            { path: 'course/:id', component: CourseVideoComponent}
        ]
    },
    { path: 'course/:id', component: CourseDetailComponent }
    
    
];
