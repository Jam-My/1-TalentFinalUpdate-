import { TestBed } from '@angular/core/testing';

import { ApprovalListPresenterService } from './approval-list-presenter.service';

describe('ApprovalListPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalListPresenterService = TestBed.get(ApprovalListPresenterService);
    expect(service).toBeTruthy();
  });
});
