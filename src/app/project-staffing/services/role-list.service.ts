import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../models/employee.model';
import { Location } from '../models/location.model';
import { Observable } from 'rxjs';
import { PayCycle } from '../models/pay-cycle.model';
import { Role } from '../models/role.model';
import { Staffing } from '../models/staffing.model';
import { Technology } from '../models/technology.model';
import { StaffingSheet } from '../models/staffing-sheet.model';
import { environment } from 'src/environments/environment';
import { ProjectList } from 'src/app/hours-submission/models/project-list.model';

/**
 * Injectable
 */
@Injectable()
export class RoleListService {

  private _baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this._baseUrl = environment.baseUrl_projectlist;
    }

  /**
   * getRoleList
   * @description to get all role list
   */
  public getRoleList(subProjectId: number): Observable<Staffing[]> {
    const url: string = `${this._baseUrl}/Staffing/${subProjectId}`;
    return this.httpClient.get<Staffing[]>(url);
  }

  /**
   * getRole
   * @description to get single role
   */
  public getRole(id:number): Observable<Staffing> {
     
    const url: string = `${this._baseUrl}/Staffing/${id}`;
    return this.httpClient.get<Staffing>(url);
  }

  /**
   * addProject
   * @param projectDetail project detail
   * @description to add new project detail
   */
  public addRole(projectDetail: Staffing): Observable<Staffing> {
    
    const url: string = `${this._baseUrl}/Staffing`;
    return this.httpClient.post<Staffing>(url, projectDetail);
  }

  /**
   * updateStaff
   * @param id role id for update
   * @param roleDetail role detail
   * @description to update existing role detail
   */
  public updateStaff(id: number, roleDetail: Staffing): Observable<Staffing> {
    const url: string = `${this._baseUrl}/Staffing`;
    return this.httpClient.put<Staffing>(`${url}/${id}`, roleDetail);
  }

  /**
   * deleteStaff
   * @param id staff id for delete
   * @description to delete staff detail
   */
  public deleteStaff(id: number): Observable<Staffing> {
    const url: string = `${this._baseUrl}/Staffing`;
    return this.httpClient.delete<Staffing>(`${url}/${id}`);
  }

  /**
   * getTechnology
   * @description to get all technologies
   */
  public getTechnology() : Observable<Technology[]> {
    const url: string = `${this._baseUrl}/technology`;
    return this.httpClient.get<Technology[]>(url);
  }

  /**
   * getPayCycle
   * @description to get all pay cycle
   */
  public getPayCycle() : Observable<PayCycle[]> {
    const url: string = `${this._baseUrl}/payCycle`;
    return this.httpClient.get<PayCycle[]>(url);
  }

  /**
   * getLocation
   * @description to get all locations
   */
  public getLocation() : Observable<Location[]> {
    const url: string = `${this._baseUrl}/location`;
    return this.httpClient.get<Location[]>(url);
  }

  /**
   * getLocation
   * @description to get all locations
   */
  public getRoles() : Observable<Role[]> {
    const url: string = `${this._baseUrl}/role`;
    return this.httpClient.get<Role[]>(url);
  }

  /**
   * getEmployee
   * @description to get all Employees by Id
   * @id employee id
   */
  public getEmployee(id: number) : Observable<Employee[]> {
    const url: string = `${this._baseUrl}/employee/${id}`;
    return this.httpClient.get<Employee[]>(url);
  }
  /**
   * getEmployees
   * @description to get all Employees
   */
  public getEmployees() : Observable<Employee[]> {
    const url: string = `${this._baseUrl}/employee`;
    return this.httpClient.get<Employee[]>(url);
  }

  /**
   * get staffing-sheet List
   * @description to get all staffing sheet list by subProjectId
   */
  public getStaffingSheetList(subProjectId: number): Observable<StaffingSheet[]> {
    const url: string = `${this._baseUrl}/staffingSheet/${subProjectId}`;
    return this.httpClient.get<StaffingSheet[]>(url);
  }

  /**
   * getProjectList
   * @description to get all project list
   */
  public getProjectList(): Observable<ProjectList[]> {
    const url: string = `${this._baseUrl}/project`;
    return this.httpClient.get<ProjectList[]>(url);
  }

}
