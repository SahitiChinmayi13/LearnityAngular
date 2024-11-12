import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { UserIntroComponent } from './user-intro/user-intro.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserProgressComponent } from './user-progress/user-progress.component';
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

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'userdashboard',component:UserDashboardComponent,
        children:[
            // {path:"",component:UserIntroComponent},
            {path:"courses",component:UserCourseComponent},
            {path:"progress",component:UserProgressComponent},
            {path:"usercoursecontent",component:UserCourseContentComponent},
            {path:"userfeedback",component:UserFeedbackComponent}
        ]},
    {path:'admindashboard',component:AdminDashboardComponent,
        children:[
            {path:"",component:AdminIntroductionComponent},
            {path:"usermanagement",component:AdminUsermanagementComponent},
            {path:"coursemanagement",component:AdminManagementComponent},
            {path:"progressmanagement",component:AdminProgresstrackingComponent},
            {path:"feedbackmanagement",component:AdminFeedbackmanagementComponent},
            {path:"adduser",component:AdminAdduserComponent},
            {path:"addcourse",component:AdminAddcourseComponent},
            {path:"finduser",component:AdminSearchuserComponent}
        ]
    }
    
    
];
