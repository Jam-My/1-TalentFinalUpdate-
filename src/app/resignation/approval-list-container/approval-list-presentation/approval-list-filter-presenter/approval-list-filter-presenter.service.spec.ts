import { TestBed } from '@angular/core/testing';

import { ApprovalListFilterPresenterService } from './approval-list-filter-presenter.service';

describe('ApprovalListFilterPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalListFilterPresenterService = TestBed.get(ApprovalListFilterPresenterService);
    expect(service).toBeTruthy();
  });
});
