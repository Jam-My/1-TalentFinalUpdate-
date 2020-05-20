/**
 * @author Shiv Desai
 */

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectList } from '../models/project-list.model';
import { TimeCard } from '../models/time-card.model';
import { ProjectType } from '../models/hours-type.model';
import { TimeCardStatus } from '../models/timecard-status';
import { Approval } from '../models/approval.model';
import { ApprovalPut } from '../models/approval-put.model';

/**
 * Injectable
 */
@Injectable()
export class TimeCardService {
  private _baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this._baseUrl = environment.baseUrl_projectlist;
  }

  /**
   * To get all projects 
   */
  public getProjectList(id: number): Observable<ProjectList[]> {
    // Local run
    // const url: string = `${this._baseUrl}/staffedProject`;
    // server run
    const url: string = `${this._baseUrl}/staffedProject/${id}`;
    return this.httpClient.get<ProjectList[]>(url);
  }

  /**
   * To get all projects 
   */
  public getProjectByApprover(id: number): Observable<ProjectList[]> {
    // Local run
    // const url: string = `${this._baseUrl}/staffedProject`;
    // server run
    const url: string = `${this._baseUrl}/approverProject/${id}`;
    return this.httpClient.get<ProjectList[]>(url);
  }

  /**
   * To get all time-cards
   */
  public getTimeCardList(employee: number): Observable<TimeCard[]> {
    // Local run
    // const url: string = `${this._baseUrl}/timecard`;
    // server run
    const url: string = `${this._baseUrl}/timecard/${employee}`;
    return this.httpClient.get<TimeCard[]>(url);
  }

  /**
   * To get all time-cards report
   * @param id sub project ID
   */
  public getReportList(id: number): Observable<TimeCard[]> {
    // Local run
    // const url: string = `${this._baseUrl}/approveHours?subProjectId=${id}`;
    // server run
    const url: string = `${this._baseUrl}/approveHours/${id}`;
    return this.httpClient.get<TimeCard[]>(url);
  }

  /**
   * To get get status 
   */
  public getStatus(): Observable<TimeCardStatus[]> {
    // server run
    const url: string = `${this._baseUrl}/approvalStatus`;
    return this.httpClient.get<TimeCardStatus[]>(url);
  }

  /**
   * To get all Project Type
   */
  public getProjectType(): Observable<ProjectType[]> {
    // server run
    const url: string = `${this._baseUrl}/hours`;
    return this.httpClient.get<ProjectType[]>(url);
  }

  /**
   * To get all Project Type
   */
  public getApproval(subProjectId: number): Observable<Approval[]> {
    // Local run
    // const url: string = `${this._baseUrl}/approveHours?subProjectId=${subProjectId}`;
    // server run
    const url: string = `${this._baseUrl}/approveHours/${subProjectId}`;
    return this.httpClient.get<Approval[]>(url);
  }

  /**
   * addTimeCard
   * @param timeCardDetail time-card detail
   * @description to add new time-card detail
   */
  public addTimeCard(timeCardDetail: TimeCard): Observable<TimeCard> {
    // server run
    const url: string = `${this._baseUrl}/timecard`;
    return this.httpClient.post<TimeCard>(url, timeCardDetail);
  }

  /**
   * updateTimeCard
   * @param employeeId employee Id
   * @param timeCardDetail time-card detail
   * @description to update new time-card detail
   */
  public updateTimeCard(employeeId: number, timeCardDetail: TimeCard): Observable<TimeCard> {
    // server run
    const url: string = `${this._baseUrl}/timecard/${employeeId}`;
    return this.httpClient.put<TimeCard>(url, timeCardDetail);
  }

  /**
   * deleteTimeCard
   * @param timeCardId time-card Id
   * @description to delete time-card detail
   */
  public deleteTimeCard(timeCardId: number): Observable<TimeCard> {
    // server run
    const url: string = `${this._baseUrl}/timecard/${timeCardId}`;
    return this.httpClient.delete<TimeCard>(url);
  }

  /**
   * saveApproval
   * @param timeCardId time-card Id
   * @description to save approve/reject detail
   */
  public saveApproval(rmId: number, timeCardDetail: ApprovalPut[]): Observable<Approval> {
    // server run
    const url: string = `${this._baseUrl}/approveHours/${rmId}`;
    return this.httpClient.put<Approval>(url, timeCardDetail);
  }
}
