import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
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
  selector: 'app-education-add',
  templateUrl: './education-add.component.html',
  styleUrls: ['./education-add.component.scss']
})
export class EducationAddComponent {

  educators:Educator[] = []
  educations:SelectEducationDto[] = []
  _addForm : FormGroup

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
    this.addForm()
  }

  getAllEducator(){
    this.educatorService.getAll().subscribe(response => {
      this.educators = response.data
      console.log("Gelen eğitmenler", response.data)
    })
  }

  getAllEducation(){
    this.educationService.getAll().subscribe(response =>{
      this.educations = response.data
    })
  }

  addForm(){
    this._addForm = this.formBuilder.group({
      educatorId:[0, Validators.required],
      title:["", Validators.required],
      description:["", Validators.required],
      type:["", Validators.required],
      quota:[0, Validators.required],
      dailyPrice:[0,Validators.required],
      startDate:[Validators.required],
      endDate:[Validators.required]
    })
  }

  add(){
    if(this._addForm.valid){
      let educationModel = Object.assign({}, this._addForm.value)
      this.educationService.add(educationModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.getAllEducation()
        this.educationService.selectEducationDto.set(null);
        this.toastrService.success(response.message,"Başarılı")
      })
    }
  }

}
