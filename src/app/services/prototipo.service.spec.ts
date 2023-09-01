import { TestBed } from '@angular/core/testing';

import { PrototipoService } from './prototipo.service';

describe('PrototipoService', () => {
  let service: PrototipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrototipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
