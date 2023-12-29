import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastrService : ToastrService
  ) { }

  checkError(err: HttpErrorResponse) {
    if (err.error.Errors != undefined) {
      if (err.error.Errors.length > 0) {
        for (let i = 0; i < err.error.Errors.length; i++) {
          console.log("Giriş yapıldı 1")
          this.toastrService.error(err.error.Errors[i].ErrorMessage, "Doğrulama hatası")
        }
      } else if (err.error.Errors != undefined && err.error.Errors.length <= 0) {
        console.log("Giriş yapıldı2 ")
        this.toastrService.error(err.error.message, "Hata")
      }
    }
    else if (err.error.Errors == undefined) {
      if (err.error != undefined) {
        this.toastrService.error(err.error, "Hata")
        if(err.error.message){
          this.toastrService.error(err.error.message, "Hata")
        }
      }
    }
  }

}
