import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorCrudComponent } from './educator-crud.component';

describe('EducatorCrudComponent', () => {
  let component: EducatorCrudComponent;
  let fixture: ComponentFixture<EducatorCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorCrudComponent]
    });
    fixture = TestBed.createComponent(EducatorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
