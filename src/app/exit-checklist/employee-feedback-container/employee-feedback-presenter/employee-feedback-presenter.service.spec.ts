import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmployeeFeedbackPresenter } from './employee-feedback-presenter.service';
import { Subscription } from 'rxjs';
import { EmployeeFeedbackFormPresentation } from '../employee-feedback-presentation/employee-feedback-form-presentation/employee-feedback-form-presentation.component';
import { EmployeeFeedbackFormPresenter } from '../employee-feedback-presentation/employee-feedback-form-presenter/employee-feedback-form-presenter.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe(EmployeeFeedbackPresenter.name, () => {
  let presenter: EmployeeFeedbackPresenter;
  beforeEach(() => TestBed.configureTestingModule({

  }));
  beforeEach(() => {
    presenter = new EmployeeFeedbackPresenter(null);
  });

  it('should clear sanity test', () => {
    expect(1 + 1).toEqual(2);
  });

  describe('Emit Feedback Recieved From Form', () => {
    let feedBackSpy: jasmine.Spy;
    let feedbackSubscription: Subscription;

    beforeEach(() => {
      feedBackSpy = jasmine.createSpy('feedBackSpy');
      feedbackSubscription = presenter.submitFeedBack$.subscribe(feedBackSpy);
    });

    afterEach(() => {
      feedbackSubscription.unsubscribe();
    });


    it('when a feedback is recieved', fakeAsync(() => {
      const feedback: string = 'gamora';
      const presenter = new EmployeeFeedbackFormPresenter(null);
      const presentation = new EmployeeFeedbackFormPresentation(presenter);
      presentation.feedBackForm.patchValue({ feedback: 'this is a valid feedback to submit by employee' });
      presentation.sendFeedBack();
      tick();
      expect(feedBackSpy).toHaveBeenCalledTimes(1);
    }));
  })
});
