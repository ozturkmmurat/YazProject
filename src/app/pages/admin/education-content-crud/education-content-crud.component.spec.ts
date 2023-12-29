import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationContentCrudComponent } from './education-content-crud.component';

describe('EducationContentComponent', () => {
  let component: EducationContentCrudComponent;
  let fixture: ComponentFixture<EducationContentCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationContentCrudComponent]
    });
    fixture = TestBed.createComponent(EducationContentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
