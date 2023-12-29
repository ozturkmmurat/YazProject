import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HomeComponent } from "../shared/home/home.component";
import { PagesRoutingModule } from "./pages.routing.module";
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { EducationComponent } from "../shared/education/education.component";
import { EducationCrudComponent } from "./admin/education-crud/education-crud.component";
import { EducationAddComponent } from "./admin/education-crud/education-add/education-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EducationUpdateComponent } from "./admin/education-crud/education-update/education-update.component";
import { EducationContentCrudComponent } from "./admin/education-content-crud/education-content-crud.component";

@NgModule({
  declarations: [
    EducationCrudComponent,
    EducationAddComponent,
    EducationUpdateComponent,
    EducationContentCrudComponent
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