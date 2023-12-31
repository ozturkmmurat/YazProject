import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages.routing.module";
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { EducationApplicantsComponent } from "./admin/education-applicants/education-applicants.component";
import { EducationCrudComponent } from "./admin/education-crud/education-crud.component";
import { EducationAddComponent } from "./admin/education-crud/education-add/education-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EducationUpdateComponent } from "./admin/education-crud/education-update/education-update.component";
import { EducationContentCrudComponent } from "./admin/education-content-crud/education-content-crud.component";
import { PagesComponent } from "./pages.componen";
import { EducatorCrudComponent } from "./admin/educator-crud/educator-crud.component";
import { EducatorAddComponent } from "./admin/educator-crud/educator-add/educator-add.component";
import { EducatorUpdateComponent } from "./admin/educator-crud/educator-update/educator-update.component";

@NgModule({
  declarations: [
    EducationApplicantsComponent,
    PagesComponent,
    EducationCrudComponent,
    EducationAddComponent,
    EducationUpdateComponent,
    EducationContentCrudComponent,
    EducatorCrudComponent,
    EducatorAddComponent,
    EducatorUpdateComponent
  ],
  imports: [
    PagesRoutingModule,
    NgbCollapseModule,
    CommonModule,
    NgbNavModule,
    NgbModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }