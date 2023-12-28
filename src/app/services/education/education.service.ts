import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/responseModel/listResponseModel';
import { Education } from 'src/app/models/education/education';
import { environment } from 'src/environments/environment';
import { SelectEducationDto } from 'src/app/models/dtos/education/select/selectEducation';
import { ResponseModel } from 'src/app/core/models/responseModel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private httpClient : HttpClient) { }

  selectEducationDto = signal(null);

  getAll():Observable<ListResponseModel<SelectEducationDto>>{
    let newPath = environment.apiUrl + "educations/getAllSelectEducationDto"
    return this.httpClient.get<ListResponseModel<SelectEducationDto>>(newPath)
  }

  add(education : Education):Observable<ResponseModel>{
    console.log("Service gelen", education)
    let newPath = environment.apiUrl + "educations/add"
    return this.httpClient.post<ResponseModel>(newPath, education)
  }

  update(education : Education):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educations/update"
    return this.httpClient.post<ResponseModel>(newPath, education)
  }

  delete(education : Education):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educations/delete"
    return this.httpClient.post<ResponseModel>(newPath, education)
  }
}
