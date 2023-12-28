import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/core/models/responseModel/responseModel';
import { Educator } from 'src/app/models/educator/educator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducatorService {

  constructor(private httpClient : HttpClient) { }

  getAll():Observable<ListResponseModel<Educator>>{
    let newPath = environment.apiUrl + "educators/getAll"
    return this.httpClient.get<ListResponseModel<Educator>>(newPath)
  }

  add(education : Educator):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educators/add"
    return this.httpClient.post<ResponseModel>(newPath, education)
  }

  update(education : Educator):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educators/update"
    return this.httpClient.post<ResponseModel>(newPath, education)
  }

  delete(education : Educator):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educators/delete"
    return this.httpClient.post<ResponseModel>(newPath, education)
  }
}
