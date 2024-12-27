import { TestBed } from '@angular/core/testing';

import { GrupalService } from './grupal.service';

describe('GrupalService', () => {
  let service: GrupalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
