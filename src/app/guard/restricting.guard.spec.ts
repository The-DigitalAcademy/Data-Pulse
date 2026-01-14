import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { restrictingGuard } from './restricting.guard';

describe('restrictingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => restrictingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
