import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorAddComponent } from './educator-add.component';

describe('EducatorAddComponent', () => {
  let component: EducatorAddComponent;
  let fixture: ComponentFixture<EducatorAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorAddComponent]
    });
    fixture = TestBed.createComponent(EducatorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
