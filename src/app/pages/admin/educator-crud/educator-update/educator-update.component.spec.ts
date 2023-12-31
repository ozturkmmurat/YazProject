import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorUpdateComponent } from './educator-update.component';

describe('EducatorUpdateComponent', () => {
  let component: EducatorUpdateComponent;
  let fixture: ComponentFixture<EducatorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducatorUpdateComponent]
    });
    fixture = TestBed.createComponent(EducatorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
