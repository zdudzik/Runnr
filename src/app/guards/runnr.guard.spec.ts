import { TestBed } from '@angular/core/testing';

import { RunnrGuard } from './runnr.guard';

describe('RunnrGuard', () => {
  let guard: RunnrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RunnrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
