import { TestBed } from '@angular/core/testing';

import { TimecardPresenter } from './timecard.presenter';

describe('TimecardPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimecardPresenter = TestBed.get(TimecardPresenter);
    expect(service).toBeTruthy();
  });
});
