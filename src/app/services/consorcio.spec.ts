import { TestBed } from '@angular/core/testing';

import { Consorcio } from './consorcio';

describe('Consorcio', () => {
  let service: Consorcio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Consorcio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
