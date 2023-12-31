import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { SelectUserEdApplicantDto } from 'src/app/models/dtos/userEducation/select/selectUserEdApplicantDto';
import { UserEducation } from 'src/app/models/userEducation/userEducation';
import { ErrorService } from 'src/app/services/error/error.service';
import { UserEducationService } from 'src/app/services/userEducation/user-education.service';

@Component({
  selector: 'app-education-applicants',
  templateUrl: './education-applicants.component.html',
  styleUrls: ['./education-applicants.component.scss'],
  changeDetection : ChangeDetectionStrategy.Default

})
export class EducationApplicantsComponent {

  educationApplicants: SelectUserEdApplicantDto[] = []
  educationId: number
  _updateForm: FormGroup
  hide: true;

  constructor(
    private userEducationService: UserEducationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private toastrService: ToastrService
  ) {
    this.route.params.subscribe(params => {
      if (params['educationId']) {
        this.educationId = params['educationId']
        this.getAllEducationApplicant(params[this.educationId])
        this.updateForm()
      }
    })
  }

  ngOnInit() {
   this.getAllEducationApplicant(this.educationId)
  }

  updateForm() {
    this._updateForm = this.formBuilder.group({
      educationApplicants : this.formBuilder.array([])
    })
  }

  getAllEducationApplicant(educationId: number) {
    this.userEducationService.getAllUserApplicant(educationId).subscribe(({ data }) => {
      console.log("Map gelen data", data)
      data.map(item => {
        const group = this.formBuilder.group({
          userEducationId: new FormControl(item.userEducationId),
          userId: new FormControl(item.userId),
          firstName: new FormControl(item.firstName),
          lastName: new FormControl(item.lastName),
          email : new FormControl(item.email),
          status: new FormControl(item.status)
        })
        this.educationApplicantArray.push(group)
      })
    })
  }

  get educationApplicantArray() {
    return this._updateForm.controls['educationApplicants'] as FormArray
  }

  update(contact: any) {


    if (this._updateForm.invalid) {//Validate form
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata")
      return;
    }

  const input : UserEducation = {
      id : contact.controls.userEducationId.value,
      userId: contact.controls.userId.value,
      educationId : Number(this.educationId),
      status: Number(contact.controls.status.value)
    }

    this.userEducationService.update(input).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      })
  }
}
