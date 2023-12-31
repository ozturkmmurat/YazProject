import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { Educator } from 'src/app/models/educator/educator';
import { EducatorService } from 'src/app/services/educator/educator.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-educator-update',
  templateUrl: './educator-update.component.html',
  styleUrls: ['./educator-update.component.scss']
})
export class EducatorUpdateComponent {

  @Input() educator : Educator
  _updateForm : FormGroup

  constructor(
    private educatorService : EducatorService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private errorService : ErrorService
  ) {
  }

  ngOnInit(){
    this.updateForm()
  }

  updateForm(){
    this._updateForm = this.formBuilder.group({
      id : [this.educator.id, Validators.required],
      firstName : [this.educator.firstName, Validators.required],
      lastName : [this.educator.lastName, Validators.required],
      type : [this.educator.type, Validators.required],
      title : [this.educator.title, Validators.required]
    })
  }

  update(){
    if(this._updateForm.valid){
      let educatorModel = Object.assign({}, this._updateForm.value)
      this.educatorService.update(educatorModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.educatorService._refresh.next();
        this.toastrService.success(response.message,"Başarılı")
      })
    }
  }

}
