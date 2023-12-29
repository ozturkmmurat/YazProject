import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    //Service Start
    private authService: AuthService,
    private toastrService: ToastrService,
    private errorService : ErrorService,
    //Service End

    private formBuilder: FormBuilder,
    private localStorageService : LocalStorageService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.localStorageService.setToken(response.data.token)
          this.localStorageService.setTokenExpiration(response.data.expiration)
          this.toastrService.success(response.message)
        })
    }else{
      this.toastrService.error("Formu eksiksiz doldurun.")
    }
  }

}
