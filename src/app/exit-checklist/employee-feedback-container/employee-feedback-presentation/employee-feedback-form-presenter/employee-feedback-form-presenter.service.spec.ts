import { TestBed } from '@angular/core/testing';

import { EmployeeFeedbackFormPresenter } from './employee-feedback-form-presenter.service';

describe('EmployeeFeedbackFormPresenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeFeedbackFormPresenter = TestBed.get(EmployeeFeedbackFormPresenter);
    expect(service).toBeTruthy();
  });
});
