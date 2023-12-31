import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { SharedRoutingModule } from "./shared.routing.module";
import { SharedComponent } from "./shared.component";
import { EducationComponent } from "./education/education.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "../account/login/login.component";
import { RegisterComponent } from "../account/register/register.component";
import { EducationContentComponent } from "./education-content/education-content.component";
import { UserEducationComponent } from "./user-education/user-education.component";

@NgModule({
  declarations: [
    HomeComponent,
    SharedComponent,
    EducationComponent,
    LoginComponent,
    RegisterComponent,
    EducationContentComponent,
    UserEducationComponent
  ],
  imports: [
    SharedRoutingModule,
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
export class SharedModule { }