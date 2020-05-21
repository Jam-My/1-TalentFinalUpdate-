import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedBackResponse } from 'src/app/exit-checklist/models/feedback-response.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class EmployeeFeedbackFormPresenter {

  public submitFeedBack$: Observable<FeedBackResponse>;
  private submitFeedBack: Subject<FeedBackResponse>;

  constructor(private fb: FormBuilder) {
    this.submitFeedBack = new Subject<FeedBackResponse>();
    this.submitFeedBack$ = this.submitFeedBack.asObservable();
  }

  /**
   * buildForm
   */
  public buildForm(): FormGroup {
    return this.fb.group({
      feedback: ['', [Validators.minLength(25), Validators.maxLength(250)]]
    });
  }

  /**
   * submitFeedBack
   * @param feedbackForm 
   */
  public sendFeedBack(feedbackForm: FormGroup): void {
    if (feedbackForm.valid) {
      const feedbackResponse: FeedBackResponse = feedbackForm.getRawValue();
      this.submitFeedBack.next(feedbackResponse);
    } else {
    }
  }
}
