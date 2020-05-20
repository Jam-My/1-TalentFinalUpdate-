import { TestBed } from '@angular/core/testing';

import { ClientMasterPresenter } from './client-master.presenter';

describe('ClientMasterPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientMasterPresenter = TestBed.get(ClientMasterPresenter);
    expect(service).toBeTruthy();
  });
});
