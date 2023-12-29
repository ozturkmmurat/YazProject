import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log("Hata", err)
          this.errorService.checkError(err);
          return of();
        })
      ).subscribe(response => {
        this.localStorageService.setToken(response.data.token);
        this.localStorageService.setTokenExpiration(response.data.expiration);
        this.localStorageService.setRefreshToken(response.data.refreshToken);
        this.userService.setCurrentUser();
        this.router.navigate(['']);
      });
    } else {
      this.toastrService.warning('Lütfen gerekli alanları doldurun.');
    }
  }
}
