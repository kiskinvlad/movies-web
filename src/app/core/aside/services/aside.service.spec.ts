import { TestBed, inject } from '@angular/core/testing';

import { AsideService } from './aside.service';

describe('AsideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsideService]
    });
  });

  it('should be created', inject([AsideService], (service: AsideService) => {
    expect(service).toBeTruthy();
  }));
});
