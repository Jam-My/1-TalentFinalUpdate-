import { TestBed } from '@angular/core/testing';

import { ExitChecklistPresenter } from './exit-checklist-presenter.service';

describe('ExitChecklistPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExitChecklistPresenter = TestBed.get(ExitChecklistPresenter);
    expect(service).toBeTruthy();
  });
});
