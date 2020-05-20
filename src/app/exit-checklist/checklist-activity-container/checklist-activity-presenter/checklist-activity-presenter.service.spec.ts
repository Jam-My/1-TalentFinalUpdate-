import { TestBed } from '@angular/core/testing';

import { ChecklistActivityPresenter } from './checklist-activity-presenter.service';

describe('ChecklistActivityPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistActivityPresenter = TestBed.get(ChecklistActivityPresenter);
    expect(service).toBeTruthy();
  });
});
