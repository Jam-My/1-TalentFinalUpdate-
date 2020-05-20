import { TestBed } from '@angular/core/testing';

import { ResignationApprovalPresenterService } from './resignation-approval-presenter.service';

describe('ResignationApprovalPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResignationApprovalPresenterService = TestBed.get(ResignationApprovalPresenterService);
    expect(service).toBeTruthy();
  });
});
