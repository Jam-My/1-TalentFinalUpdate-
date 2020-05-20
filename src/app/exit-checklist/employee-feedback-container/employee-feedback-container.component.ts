import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeActivity } from '../models/employee-activity.model';
import { ExitChecklist } from '../exit-checklist.service';
import { FeedBackResponse } from '../models/feedback-response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'employee-feedback-container',
  templateUrl: './employee-feedback-container.component.html'
})
export class EmployeeFeedbackContainer implements OnInit {

  public employeeActivitiesList$: Observable<EmployeeActivity[]>;

  constructor(private exitCheckListService: ExitChecklist,
              private toasterService: ToastrService) { }

  public ngOnInit(): void {
    this.employeeActivitiesList$ = this.exitCheckListService.getEmployeeActivitiesList();
  }

  /**
   * submitFeedBack
   * @param feedback 
   */
  public submitFeedBack(feedBackResponse: FeedBackResponse): void {
    this.exitCheckListService.submitFeedBack(feedBackResponse).subscribe((response: Response) => {
      this.toasterService.success('FeedBack Submitted SuccessFully');
    });
  }

}
