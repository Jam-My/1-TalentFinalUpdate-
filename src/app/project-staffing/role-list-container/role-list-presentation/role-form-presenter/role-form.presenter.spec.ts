import { TestBed } from '@angular/core/testing';

import { RoleFormPresenter } from './role-form.presenter';

describe('RoleFormPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleFormPresenter = TestBed.get(RoleFormPresenter);
    expect(service).toBeTruthy();
  });
});
