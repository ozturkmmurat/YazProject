import { TestBed } from '@angular/core/testing';

import { EducationContentService } from './education-content.service';

describe('EducationContentService', () => {
  let service: EducationContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
