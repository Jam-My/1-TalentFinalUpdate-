import { TestBed } from '@angular/core/testing';

import { InitiateChecklistFilterPresenterService } from './initiate-checklist-filter-presenter.service';

describe('InitiateChecklistFilterPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitiateChecklistFilterPresenterService = TestBed.get(InitiateChecklistFilterPresenterService);
    expect(service).toBeTruthy();
  });
});
