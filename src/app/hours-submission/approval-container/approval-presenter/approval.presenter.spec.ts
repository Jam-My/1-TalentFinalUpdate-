import { TestBed } from '@angular/core/testing';

import { ApprovalPresenter } from './approval.presenter';

describe('ApprovalPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalPresenter = TestBed.get(ApprovalPresenter);
    expect(service).toBeTruthy();
  });
});
