import { TestBed } from '@angular/core/testing';

import { ExitChecklistFilterPresenter } from './exit-checklist-filter-presenter.service';

describe('ExitChecklistFilterPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExitChecklistFilterPresenter = TestBed.get(ExitChecklistFilterPresenter);
    expect(service).toBeTruthy();
  });
});
