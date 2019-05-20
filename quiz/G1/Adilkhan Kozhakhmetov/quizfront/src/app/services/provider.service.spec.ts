import {inject, TestBed} from '@angular/core/testing';

import { ProviderService } from './provider.service';

describe('ProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderService]
    });
  });

  it('should be created', inject([ProviderService], (service: ProviderService) => {
    expect(service).toBeTruthy();
  }));
});
