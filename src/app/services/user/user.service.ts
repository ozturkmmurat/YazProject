import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError } from 'rxjs';
import { UserForUpdateDto } from 'src/app/models/dtos/user/userForUpdateDto';
import { User } from 'src/app/models/user/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { ListResponseModel } from 'src/app/core/models/responseModel/listResponseModel';
import { environment } from 'src/environments/environment';
import { SelectUserDto } from 'src/app/models/dtos/user/select/selectUserDto';
import { SingleResponseModel } from 'src/app/core/models/responseModel/singleResponseModel';
import { ResponseModel } from 'src/app/core/models/responseModel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private httpclient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  user : User = null
  
  _user = signal(this.user)
   jwtUrl = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/"

  getAllUserDto(){
    let newPath = environment.apiUrl + "users/getAllUserDto"
    return this.httpclient.get<ListResponseModel<SelectUserDto>>(newPath)
  }

  getByUserId(id:number):Observable<SingleResponseModel<UserForUpdateDto>>{
      let newPath = environment.apiUrl  + "users/getById?id=" + id;
      return this.httpclient.get<SingleResponseModel<UserForUpdateDto>>(newPath)
  }

  
  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    return this.httpclient.post<ResponseModel>(environment.apiUrl + "users/update", userForUpdateDto)
  }

  updateUser(userDto : SelectUserDto):Observable<ResponseModel>{
    return this.httpclient.post<ResponseModel>(environment.apiUrl + "users/updateUser", userDto)
  }

   setCurrentUser(): void {
    var token = this.localStorageService.getToken()
    if(token != null){
      this.getByUserId(this.getUserId("nameidentifier")).pipe(
        catchError((err:HttpErrorResponse) => {
          return EMPTY
        }))
        .subscribe(response => {
          console.log("Service gelen user datası", response.data)
           this.user = {
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber : response.data.phoneNumber
          }
          this._user.set(this.user)
          console.log("Login den sonra check user", this._user())
        })
    } 
  }

  getUserId(data : string) {
    if(this.localStorageService.getToken() != null)
    return this.jwtHelper.decodeToken(this.localStorageService.getToken())[this.jwtUrl+data];
  }

}