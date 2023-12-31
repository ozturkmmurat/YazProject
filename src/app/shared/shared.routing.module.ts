import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/home/home.component';
import { RegisterComponent } from '../account/register/register.component';
import { LoginComponent } from '../account/login/login.component';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { EducationContentComponent } from './education-content/education-content.component';
import { LoginGuard } from '../core/guards/login/login.guard';
import { UserEducationComponent } from './user-education/user-education.component';

const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"educationContent/:educationId", component:EducationContentComponent},
    {path:"usereducation", component:UserEducationComponent, canActivate:[LoginGuard], data: { roles: ['admin','user']}},
    {path:"login", component:LoginComponent, canActivate:[AuthGuard]},
    {path:"register", component:RegisterComponent, canActivate:[AuthGuard]}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SharedRoutingModule { 
  }