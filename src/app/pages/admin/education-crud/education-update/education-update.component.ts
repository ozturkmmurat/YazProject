import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectEducationDto } from 'src/app/models/dtos/education/select/selectEducation';
import { Educator } from 'src/app/models/educator/educator';
import { EducatorService } from 'src/app/services/educator/educator.service';

@Component({
  selector: 'app-education-update',
  templateUrl: './education-update.component.html',
  styleUrls: ['./education-update.component.scss']
})
export class EducationUpdateComponent {

  @Input() educations : SelectEducationDto
  _updateForm : FormBuilder
  educators: Educator[] = []

  constructor(
    private educatorService : EducatorService
  ) {
  }

  ngOnInit(){
    this.getAllEducator()
  }

  getAllEducator(){
    this.educatorService.getAll().subscribe(response => {
      this.educators = response.data
    })
  }
}
