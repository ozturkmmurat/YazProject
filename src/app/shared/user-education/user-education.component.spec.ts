import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEducationComponent } from './user-education.component';

describe('UserEducationComponent', () => {
  let component: UserEducationComponent;
  let fixture: ComponentFixture<UserEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEducationComponent]
    });
    fixture = TestBed.createComponent(UserEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
