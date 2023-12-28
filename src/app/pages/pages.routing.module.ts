import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationCrudComponent } from './admin/education-crud/education-crud.component';

const routes: Routes = [
    {path:"", component:EducationCrudComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class PagesRoutingModule { }