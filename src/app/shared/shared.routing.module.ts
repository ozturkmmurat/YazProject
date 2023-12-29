import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/home/home.component';
import { RegisterComponent } from '../account/register/register.component';
import { LoginComponent } from '../account/login/login.component';
import { AuthGuard } from '../core/guards/auth/auth.guard';

const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"login", component:LoginComponent, canActivate:[AuthGuard]},
    {path:"register", component:RegisterComponent, canActivate:[AuthGuard]}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SharedRoutingModule { }