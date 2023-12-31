import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationCrudComponent } from './admin/education-crud/education-crud.component';
import { EducationContentCrudComponent } from './admin/education-content-crud/education-content-crud.component';
import { EducationApplicantsComponent } from './admin/education-applicants/education-applicants.component';
import { EducatorCrudComponent } from './admin/educator-crud/educator-crud.component';

const routes: Routes = [
    {path:"", component:EducationCrudComponent},
    {path:"educators", component:EducatorCrudComponent},
    {path:"educationapplicants/:educationId", component:EducationApplicantsComponent}

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { 
  }