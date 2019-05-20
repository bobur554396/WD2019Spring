import { TestBed } from '@angular/core/testing';

import { ExService } from './ex.service';

describe('ExService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExService = TestBed.get(ExService);
    expect(service).toBeTruthy();
  });
});
