/**
 * @author Nurali K
 * @description Container Component for Displaying Activity Details
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OidcFacade } from 'ng-oidc-client';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, from } from 'rxjs';
import { filter, switchMap, pluck, tap, flatMap } from 'rxjs/operators';

import { ROLES } from 'src/app/resignation/role.constants';
import { ExitChecklist } from '../exit-checklist.service';
import { ActivityDetails } from '../models/activity-detail.model';
import { StatusResponse } from '../models/update-status-resonse.model';

@Component({
  selector: 'checklist-activity-form-container',
  templateUrl: './checklist-activity-form-container.component.html'
})
export class ChecklistActivityFormContainer implements OnInit {

  public activityDetails$: Observable<ActivityDetails>;
  public roles$: Observable<string[]>;

  constructor(
    private queryRoute: ActivatedRoute,
    private exitCheckListService: ExitChecklist,
    private oidc: OidcFacade,
    private toasterService: ToastrService) { }

  public ngOnInit(): void {
    this.activityDetails$ = this.getActivityDetails();

    //TODO uncomment in production
    this.roles$ = from(this.oidc.getUserManager().getUser()).pipe(
       pluck('profile', 'role')
     );
  }

  /**
   * updateStatus
   * @param updateStatus 
   */
  public updateStatus(updateStatus: StatusResponse): void {
    this.exitCheckListService.updateStatus(updateStatus).subscribe((response: Response) => {
      this.toasterService.success('Activity Status Updated Successfully');
      this.activityDetails$ = this.getActivityDetails();
    });
  }

  /**
   * getActivityDetails
   * @description fetch activity based on id in query param
   */
  private getActivityDetails(): Observable<ActivityDetails> {
    return this.queryRoute.paramMap.pipe(
      filter((queryParams: ParamMap) => queryParams.has('activityId')),
      switchMap((queryParams: ParamMap) => {
        const activityId: string = queryParams.get('activityId');
        return this.exitCheckListService.getActivityDetails(activityId);
      }));
  }




}
