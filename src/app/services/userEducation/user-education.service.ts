import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/core/models/responseModel/responseModel';
import { SelectUserEdApplicantDto } from 'src/app/models/dtos/userEducation/select/selectUserEdApplicantDto';
import { SelectUserEducationDto } from 'src/app/models/dtos/userEducation/select/selectUserEducationDto';
import { UserEducation } from 'src/app/models/userEducation/userEducation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserEducationService {

  constructor(private httpClient : HttpClient) { }

  getAll(userId : number):Observable<ListResponseModel<SelectUserEducationDto>>{
    let newPath = environment.apiUrl + "userEducations/getAllSelectUserEducation?userId=" + userId
    return this.httpClient.get<ListResponseModel<SelectUserEducationDto>>(newPath)
  }

  getAllUserApplicant(educationId : number):Observable<ListResponseModel<SelectUserEdApplicantDto>>
  {
    let newPath = environment.apiUrl + "userEducations/selectUserEdApplicantDto?educationId=" + educationId
    return this.httpClient.get<ListResponseModel<SelectUserEdApplicantDto>>(newPath);
  }

  add(userEducation : UserEducation):Observable<ResponseModel>{
    console.log("Service gelen USER EDUCATİON", userEducation)
    let newPath = environment.apiUrl + "userEducations/add"
    return this.httpClient.post<ResponseModel>(newPath, userEducation)
  }

  update(userEducation : UserEducation):Observable<ResponseModel>{
    console.log("Servise gelen", userEducation)
    let newPath = environment.apiUrl + "userEducations/update"
    return this.httpClient.post<ResponseModel>(newPath, userEducation)
  }

  delete(userEducation : UserEducation):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educations/delete"
    return this.httpClient.post<ResponseModel>(newPath, userEducation)
  }
}
