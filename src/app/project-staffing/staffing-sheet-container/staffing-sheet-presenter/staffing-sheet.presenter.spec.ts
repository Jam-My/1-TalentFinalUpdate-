import { TestBed } from '@angular/core/testing';

import { StaffingSheetPresenter } from './staffing-sheet.presenter';

describe('StaffingSheetPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffingSheetPresenter = TestBed.get(StaffingSheetPresenter);
    expect(service).toBeTruthy();
  });
});
