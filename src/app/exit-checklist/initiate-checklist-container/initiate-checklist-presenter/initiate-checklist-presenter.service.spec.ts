import { TestBed } from '@angular/core/testing';

import { InitiateChecklistPresenter } from './initiate-checklist-presenter.service';

describe('InitiateChecklistPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitiateChecklistPresenter = TestBed.get(InitiateChecklistPresenter);
    expect(service).toBeTruthy();
  });
});
