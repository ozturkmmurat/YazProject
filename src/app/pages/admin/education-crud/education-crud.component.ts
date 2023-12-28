import { Component, ViewChild, effect } from '@angular/core';
import { SelectEducationDto } from 'src/app/models/dtos/education/select/selectEducation';
import { Education } from 'src/app/models/education/education';
import { EducationService } from 'src/app/services/education/education.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-education-crud',
  templateUrl: './education-crud.component.html',
  styleUrls: ['./education-crud.component.scss']
})
export class EducationCrudComponent {
  educations : SelectEducationDto[] = []
  education:Education

  constructor(
    private educationService : EducationService,
    private modalService : ModalService) {
      this.loadingEducation()
  }

  ngOnInit(){
    this.getAllEducation()
  }

  getAllEducation(){
    this.educationService.getAll().subscribe(response => {
      this.educationService.selectEducationDto.set(response.data)
      this.educations = this.educationService.selectEducationDto()
    })
  }

  @ViewChild('educationModal') educationModal: any;
  selectedEducation:Education
  private openModal(): void {
    this.modalService
      .openXl(this.educationModal)
      .dismissed
      .subscribe(() => { });
  }

  loadingEducation(){
    effect(() => {
      if (this.educationService.selectEducationDto() !== null) {
        this.getAllEducation();
      }
    });
  }

  add(): void {
    this.selectedEducation = {} as Education;
    this.openModal()
  }

  edit(education: Education): void {
    this.selectedEducation = education;
    this.openModal()
  }

  writeEducation(selectEducationDto : SelectEducationDto){
    this.education = {
      id : selectEducationDto.educationId, educatorId : selectEducationDto.educationId, title : selectEducationDto.educationTitle, description : selectEducationDto.educationDescription,
      quota : selectEducationDto.quota, dailyPrice : selectEducationDto.dailyPrice, type : selectEducationDto.type, startDate : selectEducationDto.startDate, endDate : selectEducationDto.endDate
    }
  }
}
