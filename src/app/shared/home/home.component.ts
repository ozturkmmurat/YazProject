import { Component } from '@angular/core';
import { SelectEducationDto } from 'src/app/models/dtos/education/select/selectEducation';
import { Education } from 'src/app/models/education/education';
import { EducationService } from 'src/app/services/education/education.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  educations : SelectEducationDto[] = []

  constructor(private educationService : EducationService) {
  }

  ngOnInit(){
    this.getAllEducation()
  }

  getAllEducation(){
    this.educationService.getAll().subscribe(response => {
      this.educations = response.data
      console.log("Data", response.data)
    })
  }

}
