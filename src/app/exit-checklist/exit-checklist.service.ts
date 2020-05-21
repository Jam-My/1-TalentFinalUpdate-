import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivityDetailsAdapter, EmployeeFeedBackAdapter, MyActivityAdpater } from './exit-checklist-adapter/exit-checklist.adapter';
import { ActivityDetails } from './models/activity-detail.model';
import { EmployeeActivity } from './models/employee-activity.model';
import { EmployeeActivityDetailModel, EmployeeActivityDetailViewModel } from './models/EmployeeActivityDetailViewModel';
import { EmployeeListFilterViewModel } from './models/employeeListFilterViewModel';
import { EmployeeListViewModel } from './models/employeeListViewModel';
import { ExitProcessStatus } from './models/exitProcessStatus';
import { FeedBackResponse } from './models/feedback-response.model';
import { FilterViewModel } from './models/filterViewModel';
import { InitiateResponse } from './models/initiate-response.model';
import { MyActivity } from './models/my-activity.model';
import { Params } from './models/params.model';
import { TableProperty } from './models/table-property.model';
import { StatusResponse } from './models/update-status-resonse.model';


@Injectable()
export class ExitChecklist {

  private _baseUrl: string;
  private _baseUrl_checklist: string;
  private _baseUrl_activities: string;

  constructor(
    private http: HttpClient,
    private myActivityAdapter: MyActivityAdpater,
    private activityDetailsAdapter: ActivityDetailsAdapter,
    private employeeFeedBackAdapter: EmployeeFeedBackAdapter) {
    // this._baseUrl = 'http://192.168.0.109:8033/api/';
    this._baseUrl = 'https://1talent-service.1rivet.com/api/';
    this._baseUrl_checklist = environment.baseUrl_checklist;
    this._baseUrl_activities = environment.baseUrl_activities;
  }

  //  Checklist Activity Container calls
  /**
   * getAssignedActivities
   */
  public getMyActivities(resignationId: string): Observable<MyActivity[]> {
    const url: string = `${this._baseUrl}ExitActivities/domainowner/${resignationId}`;
    const localurl: string = `http://localhost:3000/api/ExitActivities/domainowner/${resignationId}`;
    return this.http.get<MyActivity[]>(`${url}`).pipe(
      map((myActivities: MyActivity[]) => this.myActivityAdapter.toResponse(myActivities)),
    );
  }

  //


  // Checklist Activity Form Container Calls

  /**
   * getActivityDetails
   * @param id 
   */
  public getActivityDetails(id: string): Observable<ActivityDetails> {
    const url: string = `${this._baseUrl}exitActivityDetails/${id}`;
    const localurl: string = 'http://localhost:3000/api/exitCheckList/myActivity/';
    return this.http.get<ActivityDetails>(url).pipe(
      map((activityDetails: ActivityDetails) => this.activityDetailsAdapter.toResponse(activityDetails))
    );
  }

  /**
   * updateStatus
   * @param updateStatus 
   */
  public updateStatus(updateStatus: StatusResponse): Observable<Response> {
    return this.http.put<Response>(`${this._baseUrl}ExitActivityDetails`, updateStatus);
  }

  //



  // Employee FeedBack Container Calls

  /**
   * getEmployeeActivitiesList
   */
  public getEmployeeActivitiesList(): Observable<EmployeeActivity[]> {
    const url: string = `${this._baseUrl}exitActivities`;
    const localurl: string = 'http://localhost:3000/api/ExitActivites';
    return this.http.get<EmployeeActivity[]>(url).pipe(
      map((employeeActivity: EmployeeActivity[]) => this.employeeFeedBackAdapter.toResponse(employeeActivity))
    );
  }

  /**
   * submitFeedBack
   * @param feedbackResponse 
   */
  public submitFeedBack(feedbackResponse: FeedBackResponse): Observable<Response> {
    const url: string = `${this._baseUrl}resignations/feedback`;
    return this.http.put<Response>(url, feedbackResponse);
  }

  // 


  /**
   * 
   * @param tableProperty 
   */
  public getResignedEmployees(tableProperty: TableProperty<EmployeeListFilterViewModel>): Observable<EmployeeListViewModel[]> {
    const url: string = this._baseUrl_checklist;
    const params: Params = this.paramProcess(tableProperty);
    return this.http.get<EmployeeListViewModel[]>(
      url, { params: { ...params } });
  }



  /**
   * getResignationList
   * @param filterFormData 
   */
  public getResignationList(filterFormData: EmployeeListFilterViewModel): Observable<EmployeeListFilterViewModel> {
    return this.http.post(`${this._baseUrl_checklist}/filter`, filterFormData);
  }

  /**
   * saveApplicationResponse
   * @param applicationResponse 
   */
  public saveApplicationResponse(applicationResponse: EmployeeActivityDetailModel) {
    return this.http.post(`${this._baseUrl_checklist}/filter`, applicationResponse);
  }

  /**
   * filterResignedEmployees
   * @param tableProperty 
   */
  public filterResignedEmployees(tableProperty: TableProperty<EmployeeListFilterViewModel>): Observable<EmployeeListViewModel[]> {
    const url: string = this._baseUrl_checklist + '/filter';
    const body: EmployeeListFilterViewModel = tableProperty.filter;
    const params: Params = this.paramProcess(tableProperty);
    return this.http.post<EmployeeListViewModel[]>(
      url, body, { params: { ...params } })
  }

  /**
   * getEmployeeActivityDetails
   * @param resignationId 
   */
  public getEmployeeActivityDetails(resignationId: string): Observable<EmployeeActivityDetailViewModel> {
    return this.http.get<EmployeeActivityDetailViewModel>(`${this._baseUrl_activities}/GetAll/${resignationId}`);
  }

  /**
   * getFilterOptionDomain
   */
  public getFilterOptionDomain() {
    return this.http.get(`${this._baseUrl_activities}/domain`)
  }

  /**
   * getFilterOptionActivity
   */
  public getFilterOptionActivity() {
    return this.http.get(`${this._baseUrl_activities}/getActivity`)
  }

  /**
   * getFilterOptionAssigned
   */
  public getFilterOptionAssigned() {
    return this.http.get(`${this._baseUrl_activities}/getAssignedTo`)
  }
  /*  public getFilterOptionstatus() {
     return this.http.get(`${this._baseUrl}/status`)
   } */


  /**
   * filterActivites
   * @param tableProperty 
   */
  public filterActivites(tableProperty: FilterViewModel): Observable<EmployeeListFilterViewModel> {
    const url: string = `${this._baseUrl_activities}/Filter`;
    const body: EmployeeListFilterViewModel = tableProperty;
    return this.http.post<EmployeeListFilterViewModel>(url, body);
  }

  /**
   * submitActivity
   * @param activity 
   */
  public submitActivity(activity: InitiateResponse[]): Observable<EmployeeActivityDetailModel[]> {
    const url: string = `${this._baseUrl_activities}`;
    const body: InitiateResponse[] = activity;
    return this.http.post<EmployeeActivityDetailModel[]>(url, body)
  }

  /**
   * completeActivity
   * @param completeActivity 
   * @param resignationId 
   */
  public completeActivity(completeActivity: ExitProcessStatus, resignationId: string): Observable<ExitProcessStatus[]> {
    const url: string = `${this._baseUrl_checklist}/${resignationId}`;
    const body: ExitProcessStatus = completeActivity;
    return this.http.put<ExitProcessStatus[]>(url, body)
  }

  /**
   * paramProcess
   * @param tableProperty 
   */
  private paramProcess(tableProperty: TableProperty<EmployeeListFilterViewModel>): Params {
    const params: Params = new Params();
    (tableProperty.pageNumber || (tableProperty.pageNumber === 1)) ? params.pageNumber = tableProperty.pageNumber.toString() : '';
    /* params.limit = (tableProperty.pageLimit) ? params.limit = tableProperty.pageLimit.toString() : '';
 */
    return params;
  }

}

/**
 * End
 */
