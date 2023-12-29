import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/core/models/responseModel/responseModel';
import { SelectEducationContentFile } from 'src/app/models/dtos/educationContent/select/selectEducationContentFile';
import { EducationContent } from 'src/app/models/educationContent/educationContent';
import { EducationContentFile } from 'src/app/models/modelParameter/educationContent/educationContentFile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationContentService {

  constructor(private httpClient : HttpClient) { }

  selectEducationContentDto = signal(null);

  getAllEdContentByEdId(educationId : number):Observable<ListResponseModel<SelectEducationContentFile>>{
    let newPath = environment.apiUrl + "educationContents/GetAllEdContentByEdId?educationId=" + educationId
    return this.httpClient.get<ListResponseModel<SelectEducationContentFile>>(newPath)
  }

  tsaAdd(educationContentFile : FormData):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educationContents/tsaAdd"
    return this.httpClient.post<ResponseModel>(newPath, educationContentFile)
  }

  tsaUpdate(educationContentFile : FormData):Observable<ResponseModel>{
    console.log("Servise gelen", educationContentFile)
    let newPath = environment.apiUrl + "educationContents/tsaUpdate"
    return this.httpClient.post<ResponseModel>(newPath, educationContentFile)
  }

  delete(educationContent : EducationContent):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "educationContents/delete"
    return this.httpClient.post<ResponseModel>(newPath, educationContent)
  }
}
