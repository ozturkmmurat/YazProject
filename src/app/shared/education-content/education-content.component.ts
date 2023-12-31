import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectEducationContentFile } from 'src/app/models/dtos/educationContent/select/selectEducationContentFile';
import { EducationContentService } from 'src/app/services/educationContent/education-content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-education-content',
  templateUrl: './education-content.component.html',
  styleUrls: ['./education-content.component.scss']
})
export class EducationContentComponent {

  educationContents : SelectEducationContentFile[] = []
  filePath : string
  constructor(
    private route : ActivatedRoute,
    private educationContentService : EducationContentService,
    private renderer : Renderer2,
    private http: HttpClient) {
      this.filePath = environment.imageFolderUrl
  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      if(params['educationId']){
        this.getAllEducationContent(params['educationId'])
      }
    })

  }

  getAllEducationContent(educationId : number){
    this.educationContentService.getAllEdContentByEdId(educationId).subscribe(response => {
      this.educationContents = response.data
    })
  }

  downloadFile(path: string): void {
    this.http.get(path, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = path.split('/').pop() || 'dosya';
      link.click();
      window.URL.revokeObjectURL(url);
    });
}
}
