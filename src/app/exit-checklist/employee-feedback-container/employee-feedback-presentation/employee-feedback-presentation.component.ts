import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { EmployeeFeedbackPresenter } from '../employee-feedback-presenter/employee-feedback-presenter.service';
import { EmployeeActivity } from '../../models/employee-activity.model';
import { STATUS, STATUSSHOW } from '../../status.constants';
import { FeedBackResponse } from '../../models/feedback-response.model';

@Component({
  selector: 'employee-feedback-presentation-ui',
  templateUrl: './employee-feedback-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [EmployeeFeedbackPresenter]
})
export class EmployeeFeedbackPresentation implements OnInit {

  @Input()
  public set employeeActivitiesList(value: EmployeeActivity[]) {
    if (value) {
      this._employeeActivitiesList = value;
    }
  }

  public get employeeActivitiesList(): EmployeeActivity[] {
    return this._employeeActivitiesList;
  }

  @Output() public submitFeedBack: EventEmitter<FeedBackResponse>;

  public STATUS: typeof STATUS = STATUS;
  public STATUSSHOW: typeof STATUSSHOW = STATUSSHOW;

  private _employeeActivitiesList: EmployeeActivity[];

  constructor(private employeeFeedbackPresenter: EmployeeFeedbackPresenter) {
    this.submitFeedBack = new EventEmitter<FeedBackResponse>();
  }

  public ngOnInit(): void {

    this.employeeFeedbackPresenter.submitFeedBack$.subscribe((feedBackResponse: FeedBackResponse) => {
      this.submitFeedBack.next(feedBackResponse);
    });
  }

  public get resp(): EmployeeActivity[] {
    return this._employeeActivitiesList;
  }

  public get employeeDetail(): EmployeeActivity {
    if (this.employeeActivitiesList) {
      return this.employeeActivitiesList[0];
    }
  }

  /**
   * openFeedBackForm
   */
  public openFeedBackForm(): void {
    this.employeeFeedbackPresenter.openFeedBackForm();
  }

}
