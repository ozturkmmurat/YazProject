import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, effect } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ListResponseModel } from 'src/app/core/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/core/models/responseModel/responseModel';
import { SelectEducationContentFile } from 'src/app/models/dtos/educationContent/select/selectEducationContentFile';
import { EducationContent } from 'src/app/models/educationContent/educationContent';
import { Educator } from 'src/app/models/educator/educator';
import { EducationContentService } from 'src/app/services/educationContent/education-content.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-education-content-crud',
  templateUrl: './education-content-crud.component.html',
  styleUrls: ['./education-content-crud.component.scss']
})
export class EducationContentCrudComponent {

  @Input() educationId: number
  _educationForm: FormGroup
  _addForm: FormGroup
  formData: FormData = new FormData();

  constructor(
    private educationContentService: EducationContentService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder
  ) {
    this.loadingEducationContent()
  }

  ngOnInit() {
    this.addForm()
    this.educationForm()
    this.getAll(this.educationId)
  }

  educationForm() {
    this._educationForm = this.formBuilder.group({
      educationContents: this.formBuilder.array([])
    })
  }

  addForm() {
    this._addForm = this.formBuilder.group({
      educationId: [this.educationId, Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      file: [null, Validators.required]
    })
  }

  getAll(educationId: number) {
    this.educationContentService.getAllEdContentByEdId(educationId).subscribe(({ data }) => {
      console.log("Gelen data", data)
      data.map(item => {
        const group = this.formBuilder.group({
          educationContentId: new FormControl(item.educationContentId),
          educationId: new FormControl(item.educationId),
          fileId: new FormControl(item.fileId),
          title: new FormControl(item.title),
          description: new FormControl(item.description),
          file: new FormControl(),
        })
        this.educationContentArray.push(group)
      });
    })
  }

  get educationContentArray() {
    return this._educationForm.controls['educationContents'] as FormArray
  }

  loadingEducationContent() {
    effect(() => {
      if (this.educationContentService.selectEducationContentDto() !== null) {
        this.getAll(this.educationId);
      }
    });
  }

  add() {
    if (this._addForm.valid) {
      const formData = new FormData();
  
      // Form verilerini FormData'ya ekleme
      formData.append('educationId', this._addForm.get('educationId').value);
      formData.append('title', this._addForm.get('title').value);
      formData.append('description', this._addForm.get('description').value);

      if (this.files && this.files.length > 0) {
        formData.append('file', this.files[0]);
      }
      this.educationContentService.tsaAdd(formData).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      ).subscribe(response => {
        this.educationContentArray.clear()
        this.educationContentService.selectEducationContentDto.set("");
        this.toastrService.success(response.message, "Başarılı");
      });
    }
  }
  
  files: File[] = [];
  fileChange(event: any) {
    // Dosyayı seçme işlemi
    this.files = []
    this.files = event.target.files || event.srcElement.files;
  }

  updateFile: File[] = [];
  updateFileChange(event: any) {
    // Dosyayı seçme işlemi
    this.updateFile = []
    this.updateFile = event.target.files || event.srcElement.files;
  }


  update(contact: any, index: number): void {
    console.log("Contact", contact)
    if (this._educationForm.invalid) {
      this.toastrService.error("Formu eksiksiz doldurun.", "Hata");
      return;
    }
  
    const formData = new FormData();
  
    // Form verilerini FormData'ya ekleme
    formData.append('educationContentId', contact.get('educationContentId').value);
    formData.append('educationId', contact.get('educationId').value);
    formData.append('fileId', contact.get('fileId').value);
    formData.append('title', contact.get('title').value);
    formData.append('description', contact.get('description').value);

  
    // Dosya ekleme
    if (this.updateFile && this.updateFile.length > 0) {
      formData.append('file', this.updateFile[0]);
    }
  
    this.educationContentService.tsaUpdate(formData).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err);
        return EMPTY;
      })
    ).subscribe(response => {
      this.toastrService.success(response.message, "Başarılı");
    });
  }

  remove(contact : any, index:number){
    this.educationContentService.delete(this.editEducationContent(contact)).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
        this.educationContentArray.controls.splice(index, 1);
      })
  }

  editEducationContent(contact: any): EducationContent {
    const input: EducationContent = {
      id: contact.controls.educationContentId.value,
      educationId: contact.controls.educationId.value,
      title: contact.controls.title.value,
      description: contact.controls.description.value
    };
    return input;
  }


}
