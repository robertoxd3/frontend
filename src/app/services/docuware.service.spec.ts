import { TestBed } from '@angular/core/testing';

import { DocuwareService } from './docuware.service';

describe('DocuwareService', () => {
  let service: DocuwareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocuwareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
