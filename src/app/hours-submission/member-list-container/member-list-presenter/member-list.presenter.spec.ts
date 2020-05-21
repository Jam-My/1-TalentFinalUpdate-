import { TestBed } from '@angular/core/testing';

import { MemberListPresenter } from './member-list.presenter';

describe('MemberListPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberListPresenter = TestBed.get(MemberListPresenter);
    expect(service).toBeTruthy();
  });
});
