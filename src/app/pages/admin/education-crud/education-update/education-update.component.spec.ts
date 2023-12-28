import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationUpdateComponent } from './education-update.component';

describe('EducationUpdateComponent', () => {
  let component: EducationUpdateComponent;
  let fixture: ComponentFixture<EducationUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationUpdateComponent]
    });
    fixture = TestBed.createComponent(EducationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
