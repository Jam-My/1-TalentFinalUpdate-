import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { EmployeeFeedbackFormPresenter } from '../employee-feedback-form-presenter/employee-feedback-form-presenter.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FeedBackResponse } from 'src/app/exit-checklist/models/feedback-response.model';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'employee-feedback-form-presentation',
  templateUrl: './employee-feedback-form-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [EmployeeFeedbackFormPresenter]
})
export class EmployeeFeedbackFormPresentation implements OnInit {

  public submitFeedBack$: Observable<FeedBackResponse>;
  public feedBackForm: FormGroup;
  public closeFilter: Subject<boolean>;

  private submitFeedBack: Subject<FeedBackResponse>;

  constructor(private employeeFeedbackFormPresenter: EmployeeFeedbackFormPresenter) {
    this.submitFeedBack = new Subject<FeedBackResponse>();
    this.submitFeedBack$ = this.submitFeedBack.asObservable();
    this.closeFilter = new Subject<boolean>();
  }

  public ngOnInit(): void {
    this.feedBackForm = this.employeeFeedbackFormPresenter.buildForm();

    this.employeeFeedbackFormPresenter.submitFeedBack$.subscribe((feedBackResponse: FeedBackResponse) => {
      this.submitFeedBack.next(feedBackResponse);
      this.dismiss();
    });
  }

  public get feedBack(): FormControl {
    return this.feedBackForm.get('feedback') as FormControl;
  }

  /**
   * submitFeedBack
   */
  public sendFeedBack(): void {
    this.employeeFeedbackFormPresenter.sendFeedBack(this.feedBackForm);
  }


  /**
   * dismiss
   *  @description to be called by using the component instance return by overlay reference to dismiss upon successfull submission of form data
   */
  public dismiss(): void {
    this.closeFilter.next(true);
    this.closeFilter.complete();
  }

}
