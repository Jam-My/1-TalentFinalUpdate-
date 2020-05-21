import { Component, OnInit } from '@angular/core';
import { ExitChecklist } from '../exit-checklist.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeActivityDetailModel, EmployeeActivityDetailViewModel } from '../models/employeeActivityDetailViewModel';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { FilterViewModel } from '../models/filterViewModel';
import { HttpResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { of, BehaviorSubject } from 'rxjs';
import { ExitProcessStatus } from '../models/exitProcessStatus';
import { ExitActivities } from '../models/ActivityFilterDropdown.model';

@Component({
  selector: 'initiate-checklist-container',
  templateUrl: './initiate-checklist-container.component.html',
})
export class InitiateChecklistContainer implements OnInit {
  public activities$: Observable<EmployeeActivityDetailModel>;
  public filterDropwdownOptions$: Observable<FilterViewModel>;
  constructor(
    private exitChecklist: ExitChecklist,
    private queryRoute: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    this.activities$ = this.getActivityDetails();
  }
  /**
   * saveApplicationResponse
   * @param applicationResponse 
   */
  public saveApplicationResponse(applicationResponse: EmployeeActivityDetailModel): void {
    this.exitChecklist.saveApplicationResponse(applicationResponse).subscribe((response: HttpResponse<any>) => {
      this.activities$ = this.getActivityDetails();
    });
  }



  /**
   * getfilterDropwdownOptions
   */
  public getfilterDropwdownOptions(): void {
    forkJoin(
      this.exitChecklist.getFilterOptionActivity(),
      this.exitChecklist.getFilterOptionAssigned(),
      this.exitChecklist.getFilterOptionDomain(),
    ).subscribe(([Activities, Assigned, Domains]) => {
      let filterDropwdownOptions: FilterViewModel = new FilterViewModel();
      filterDropwdownOptions.activity = Activities;
      filterDropwdownOptions.assigned = Assigned;
      filterDropwdownOptions.domain = Domains;
      this.filterDropwdownOptions$ = of(filterDropwdownOptions)
    })
  }

  /**
   * applyfilterData
   * @param filterdata 
   */
  public applyfilterData(filterdata: FilterViewModel) {
    this.activities$ = this.exitChecklist.filterActivites(filterdata)
  }
  public submitActivity(activity) {
    this.exitChecklist.submitActivity(activity).subscribe();

  }

  /**
   * completeActivity
   * @param exitActivity 
   */
  public completeActivity(exitActivity: ExitProcessStatus) {
    return this.queryRoute.paramMap.pipe(
      filter((queryParams: ParamMap) => queryParams.has('resignationId')),
      switchMap((queryParams: ParamMap) => {
        const resignationId: string = queryParams.get('resignationId');
        return this.exitChecklist.completeActivity(exitActivity, resignationId);
      })).subscribe();
  }

  /**
   * getActivityDetails
   */
  public getActivityDetails(): Observable<EmployeeActivityDetailViewModel> {
    return this.queryRoute.paramMap.pipe(
      filter((queryParams: ParamMap) => queryParams.has('resignationId')),
      switchMap((queryParams: ParamMap) => {
        const resignationId: string = queryParams.get('resignationId');
        return this.exitChecklist.getEmployeeActivityDetails(resignationId);
      }));
  }
}
