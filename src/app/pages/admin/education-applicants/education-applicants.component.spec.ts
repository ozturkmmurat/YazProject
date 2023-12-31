import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationApplicantsComponent } from './education-applicants.component';

describe('EducationApplicantsComponent', () => {
  let component: EducationApplicantsComponent;
  let fixture: ComponentFixture<EducationApplicantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationApplicantsComponent]
    });
    fixture = TestBed.createComponent(EducationApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
