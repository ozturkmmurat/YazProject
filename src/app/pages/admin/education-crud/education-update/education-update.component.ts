import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { SelectEducationDto } from 'src/app/models/dtos/education/select/selectEducation';
import { Education } from 'src/app/models/education/education';
import { Educator } from 'src/app/models/educator/educator';
import { EducationService } from 'src/app/services/education/education.service';
import { EducatorService } from 'src/app/services/educator/educator.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-education-update',
  templateUrl: './education-update.component.html',
  styleUrls: ['./education-update.component.scss']
})
export class EducationUpdateComponent {

  @Input() education : Education
  _updateForm : FormGroup
  educators: Educator[] = []

  constructor(
    private educatorService : EducatorService,
    private educationService : EducationService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private errorService : ErrorService
  ) {
  }

  ngOnInit(){
    this.getAllEducator()
    this.updateForm()
  }

  getAllEducator(){
    this.educatorService.getAll().subscribe(response => {
      this.educators = response.data
    })
  }

  updateForm(){
    console.log("İnputa gelen", this.education)
    this._updateForm = this.formBuilder.group({
      id:[this.education.id, Validators.required],
      educatorId:[this.education.educatorId, Validators.required],
      title:[this.education.title, Validators.required],
      description:[this.education.description, Validators.required],
      type:[this.education.type, Validators.required],
      quota:[this.education.quota, Validators.required],
      dailyPrice:[this.education.dailyPrice,Validators.required],
      startDate:[this.education.startDate, Validators.required],
      endDate:[this.education.endDate ,Validators.required]
    })
  }

  update(){
    if(this._updateForm.valid){
      let educationModel = Object.assign({}, this._updateForm.value)
      this.educationService.update(educationModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.educationService._refresh.next();
        this.toastrService.success(response.message,"Başarılı")
      })
    }
  }
}
