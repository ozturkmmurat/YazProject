import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { SharedRoutingModule } from "./shared.routing.module";
import { SharedComponent } from "./shared.component";
import { EducationComponent } from "./education/education.component";

@NgModule({
    declarations: [
      HomeComponent,
      SharedComponent,
      EducationComponent
    ],
    imports: [
      SharedRoutingModule,
      NgbCollapseModule,
      CommonModule,
      NgbNavModule,
      NgbModule,
      NgbDropdownModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class SharedModule { }