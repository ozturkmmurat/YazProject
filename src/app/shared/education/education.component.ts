import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { SelectEducationDto } from 'src/app/models/dtos/education/select/selectEducation';
import { Education } from 'src/app/models/education/education';
import { UserEducation } from 'src/app/models/userEducation/userEducation';
import { EducationService } from 'src/app/services/education/education.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserEducationService } from 'src/app/services/userEducation/user-education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  educations : SelectEducationDto[] = []
  userEducation : UserEducation = {
    id:0,
    userId:0,
    educationId:0,
    status:0
  }

  constructor(
    private educationService : EducationService,
    private userEducationService : UserEducationService,
    private userService : UserService,
    private errorService : ErrorService,
    private toastrService : ToastrService) {
      this.userEducation.userId = Number(userService.getUserId("nameidentifier"))
  }

  ngOnInit(){
    this.getAllEducation()
  }

  getAllEducation(){
    this.educationService.getAll().subscribe(response => {
      this.educations = response.data
      console.log("Data", response.data)
    })
  }

  attendTraining(education : SelectEducationDto){
    if (this.userEducation.userId > 0) {
      this.userEducation.educationId = education.educationId
      if(education.educationId > 0 ){
        this.userEducation.status = 1
        this.userEducationService.add(this.userEducation).pipe(
          catchError((err : HttpErrorResponse) => {
            this.errorService.checkError(err)
            return EMPTY;
          }))
          .subscribe(response => {
            this.toastrService.success("Eğitim başarıyla katıldınız.")
          })
      }
    }else{
      this.toastrService.info("Lütfen kullanıcı girişi yapınız.")
    }
  }

}
