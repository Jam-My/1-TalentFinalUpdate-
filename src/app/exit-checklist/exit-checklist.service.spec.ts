import { TestBed } from '@angular/core/testing';

import { ExitChecklist } from './exit-checklist.service';

describe('ExitChecklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExitChecklist = TestBed.get(ExitChecklist);
    expect(service).toBeTruthy();
  });
});
