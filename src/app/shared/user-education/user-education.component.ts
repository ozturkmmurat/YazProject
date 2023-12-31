import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { SelectUserEducationDto } from 'src/app/models/dtos/userEducation/select/selectUserEducationDto';
import { ErrorService } from 'src/app/services/error/error.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserEducationService } from 'src/app/services/userEducation/user-education.service';

@Component({
  selector: 'app-user-education',
  templateUrl: './user-education.component.html',
  styleUrls: ['./user-education.component.scss']
})
export class UserEducationComponent {
  userEducations: SelectUserEducationDto[] = []

  constructor(
    private userEducationService : UserEducationService,
    private userService : UserService,
    private errorService : ErrorService,
    private toastrService : ToastrService) {
  }

  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this.userEducationService.getAll(this.userService.getUserId("nameidentifier")).subscribe(response=> {
      this.userEducations = response.data
    })
  }

  update(userEducation : SelectUserEducationDto, status : number){
    userEducation.status = status
    const input = {
      id: userEducation.userEducationId, userId:Number(this.userService.getUserId("nameidentifier")),
      educationId:userEducation.educationId, status: status
    }
    this.userEducationService.update(input).pipe(
      catchError((err : HttpErrorResponse)  => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.getAll()
      })
  }
}
