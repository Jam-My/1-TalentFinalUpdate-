import { TestBed } from '@angular/core/testing';

import { CompleteChecklistPresenter } from './complete-checklist-presenter.service';

describe('CompleteChecklistPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompleteChecklistPresenter = TestBed.get(CompleteChecklistPresenter);
    expect(service).toBeTruthy();
  });
});
