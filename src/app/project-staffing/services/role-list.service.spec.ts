import { TestBed } from '@angular/core/testing';

import { RoleListService } from './role-list.service';

describe('RoleListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleListService = TestBed.get(RoleListService);
    expect(service).toBeTruthy();
  });
});
