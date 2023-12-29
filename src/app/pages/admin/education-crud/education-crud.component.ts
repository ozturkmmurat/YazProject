import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewChild, effect } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { SelectEducationDto } from 'src/app/models/dtos/education/select/selectEducation';
import { Education } from 'src/app/models/education/education';
import { EducationService } from 'src/app/services/education/education.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-education-crud',
  templateUrl: './education-crud.component.html',
  styleUrls: ['./education-crud.component.scss'],
  changeDetection : ChangeDetectionStrategy.Default

})
export class EducationCrudComponent {
  educations : SelectEducationDto[] = []
  education:Education
  educationId : number
  modalStatus : boolean = false

  constructor(
    private educationService : EducationService,
    private modalService : ModalService,
    private errorService : ErrorService,
    private toastrService : ToastrService) {
      this.loadingEducation()
  }

  ngOnInit(){
    this.getAllEducation()
  }

  getAllEducation(){
    this.educationService.getAll().subscribe(response => {
      this.educations = response.data
    })
  }

  @ViewChild('educationModal') educationModal: any;
  selectedEducation:Education
  private openModal(): void {
    this.modalService
      .openXl(this.educationModal)
      .dismissed
      .subscribe(() => {
        if (this.modalStatus == true) {
          this.modalStatus = false
        }
       });
  }

  openContentModal(content : any, educationId : number){
    this.educationId = educationId
    this.modalService.openXl(content).dismissed.subscribe(() => {{}})
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

  edit(selectEducationDto: SelectEducationDto): void {
    console.log("Çalıştı")
    this.writeEducation(selectEducationDto)
    this.modalStatus = true
    this.openModal()
  }

  delete(selectedEducation : SelectEducationDto){
    this.educationService.delete(this.writeEducation(selectedEducation)).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.getAllEducation()
        this.toastrService.success(response.message, "Başarılı")
      })
  }

  writeEducation(selectEducationDto : SelectEducationDto){
    console.log("Editlenen", selectEducationDto)
    this.education = {
      id : selectEducationDto.educationId, educatorId : selectEducationDto.educatorId, title : selectEducationDto.educationTitle, description : selectEducationDto.educationDescription,
      quota : selectEducationDto.quota, dailyPrice : selectEducationDto.dailyPrice, type : selectEducationDto.type, startDate : selectEducationDto.startDate, endDate : selectEducationDto.endDate
    }
    return this.education
  }
}
