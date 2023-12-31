import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { EducatorService } from 'src/app/services/educator/educator.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-educator-add',
  templateUrl: './educator-add.component.html',
  styleUrls: ['./educator-add.component.scss']
})
export class EducatorAddComponent {

  _addForm : FormGroup

  constructor(
    private educatorService : EducatorService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private formBuilder : FormBuilder
  ) {
  }

  ngOnInit(){
    this.addForm()
  }

  addForm(){
    this._addForm = this.formBuilder.group({
      firstName : ["", Validators.required],
      lastName : ["", Validators.required],
      type : ["Dış Eğitmen", Validators.required],
      title : ["", Validators.required]
    })
  }

  add(){
    if(this._addForm.valid){
      let educatorModel = Object.assign({}, this._addForm.value)
      this.educatorService.add(educatorModel).pipe(
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
