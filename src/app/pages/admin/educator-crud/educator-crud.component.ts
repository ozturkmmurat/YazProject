import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { Educator } from 'src/app/models/educator/educator';
import { EducatorService } from 'src/app/services/educator/educator.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-educator-crud',
  templateUrl: './educator-crud.component.html',
  styleUrls: ['./educator-crud.component.scss']
})
export class EducatorCrudComponent {

  educators : Educator[] = []
  educator : Educator
  modalStatus : boolean = false


  constructor(
    private educatorService : EducatorService,
    private modalService : ModalService,
    private toastrService : ToastrService,
    private errorService : ErrorService
  ) {
  }

  ngOnInit(){
    this.getAll()
    this.educatorService.refresh$.subscribe(() => this.getAll());
  }


  getAll(){
    this.educatorService.getAll().subscribe(response => {
      this.educators = response.data
    })
  }

  @ViewChild('educatorModal') educatorModal: any;
  selectedEducator:Educator
  private openModal(): void {
    this.modalService
      .openXl(this.educatorModal)
      .dismissed
      .subscribe(() => {
        if (this.modalStatus == true) {
          this.modalStatus = false
        }
       });
  }

  add(): void {
    this.selectedEducator = {} as Educator;
    this.openModal()
  }

  edit(educator : Educator): void {
    console.log("Çalıştı")
    this.modalStatus = true
    this.educator = educator
    this.openModal()
  }

  delete(educator : Educator){
    this.educatorService.delete(educator).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.getAll()
        this.toastrService.success(response.message, "Başarılı")
      })
  }

}
