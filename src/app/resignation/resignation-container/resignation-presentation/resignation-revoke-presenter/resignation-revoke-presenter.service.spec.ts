import { TestBed } from '@angular/core/testing';

import { ResignationRevokePresenter } from './resignation-revoke-presenter.service';

describe('ResignationRevokePresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResignationRevokePresenter = TestBed.get(ResignationRevokePresenter);
    expect(service).toBeTruthy();
  });
});
