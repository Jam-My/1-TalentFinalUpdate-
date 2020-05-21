import { TestBed } from '@angular/core/testing';

import { RoleListPresenter } from './role-list.presenter';

describe('RoleListPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleListPresenter = TestBed.get(RoleListPresenter);
    expect(service).toBeTruthy();
  });
});
