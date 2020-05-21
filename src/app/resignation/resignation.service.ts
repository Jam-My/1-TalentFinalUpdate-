import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ConcernPerson } from './models/resignation-model/concern-person.model';
import { EmployeeResignation } from './models/employee-resignation-model/employee-resignation.model';
import { FilterFormData } from 'src/app/resignation/models/filter-options-model/filter-options.model';
import { ResignationRevoke } from 'src/app/resignation/models/resignation-model/resignation-revoke.model';
import { ResignationDetails } from 'src/app/resignation/models/resignation-model/resignationDetail.model';
import { ResignationResponse } from './models/resignation-response-model/resignation-response.model';
import { ResignationDetails as ApprovalResignationDetails } from './models/resignation-request-model/resignation-request.model';
import { ApprovalListAdapter, ResingationApprovalAdapter } from './resignation-adapter/resignation-adapter';
import { map } from 'rxjs/operators';
import { ResignationAdapter } from './resignation-container/resignation-Adapter/resignation.adapter';

@Injectable()
export class ResignationService {

  private _baseUrl: string;

  constructor(private http: HttpClient,
    private approvalListAdapter: ApprovalListAdapter,
    private resingationApprovalAdapter: ResingationApprovalAdapter,
    private resignationAdapter: ResignationAdapter
  ) {
    this._baseUrl = environment.baseUrl;
  }

  /**
   * getEmployeeResignationDetails
   * @param resignationId 
   * @description fetch user details based on resignation id for approvals
   */
  public getEmployeeResignationDetails(resignationId: string): Observable<EmployeeResignation> {
    return this.http.get<EmployeeResignation>(`${this._baseUrl}/${resignationId}`).pipe(
      map((employeeResignation: EmployeeResignation) => this.resingationApprovalAdapter.toResponse(employeeResignation))
    );
  }

  /**
   * saveApplicationResponse
   * @param applicationResponse 
   * @description post response for approval or rejection of resignation
   */
  public saveApplicationResponse(applicationResponse: ResignationResponse) {
    return this.http.post(`${this._baseUrl}/approve`, applicationResponse);
  }
  public editApplicationResponse(applicationResponse: ResignationResponse) {
    console.log(applicationResponse);

    return this.http.put(`${this._baseUrl}/edit`, applicationResponse);
  }


  /**
   * getResignationList
   * @param filterFormData 
   */
  public getResignationList(filterFormData: FilterFormData): Observable<ApprovalResignationDetails[]> {
    /*  const testUrl: string = 'http://192.168.0.109:8033/api/resignations'; */
    return this.http.post(`${this._baseUrl}`, filterFormData).pipe(
      map((resignationDetails: ResignationDetails[]) => this.approvalListAdapter.toResponse(resignationDetails))
    );
  }

  /**
   * getFilterOptionDomain
   * @description get list of Domains from Database
   */
  public getFilterOptionDomain(): Observable<any> {
    return this.http.get(`${this._baseUrl}/domain`)
  }

  /**
   * getFilterOptionTechnology
   * @description get list of Technology from Database
   */
  public getFilterOptionTechnology(): Observable<any> {
    return this.http.get(`${this._baseUrl}/technology`)
  }

  /**
   * getFilterOptionDomain
   * @description get list of Domains from Database
   */
  public getFilterOptionDesignation(): Observable<any> {
    return this.http.get(`${this._baseUrl}/designation`)
  }

  /**
   * getFilterOptionStatus
   * @description get list of Statuses from Database
   */
  public getFilterOptionStatus(): Observable<any> {
    return this.http.get(`${this._baseUrl}/status`)
  }

  /**
   * getResignationDetails
   */
  public getResignationDetails(): Observable<ResignationDetails[]> {
    const url: string = this._baseUrl + '/details';
    return this.http.get<ResignationDetails[]>(url).pipe(map((resignationDetails: ResignationDetails[]) => this.resignationAdapter.toResponse(resignationDetails)));
  }

  /**
   * addResignation
   * @param resignation 
   */
  public addResignation(resignation: ResignationDetails): Observable<ResignationDetails> {
    const url: string = this._baseUrl + '/apply';

    return this.http.post<ResignationDetails>(url, resignation);
  }

  /**
   * getCcPerson
   * @description It will fetch all the concern Persons From the db
   */
  public getCcPerson(): Observable<ConcernPerson[]> {
    const url: string = this._baseUrl + '/ccpersons';
    return this.http.get<ConcernPerson[]>(url);
  }

  /**
   * revokeResignation
   * @param revoke 
   */
  public revokeResignation(revoke: ResignationRevoke): Observable<ResignationRevoke> {
    const url = this._baseUrl + '/revoke';
    return this.http.put<ResignationRevoke>(url, revoke)
  }
}
