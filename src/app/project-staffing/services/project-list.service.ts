import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { ProjectList } from '../models/project-list.model';
import { environment } from 'src/environments/environment';
import { ProjectName } from '../models/project-name.model';
import { ClientName } from '../models/client-name.model';

/**
 * Injectable
 */
@Injectable()
export class ProjectListService {
  private _baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this._baseUrl = environment.baseUrl_projectlist;
  }

  /**
   * getProjectList
   * @description to get all project list
   */
  public getProjectList(): Observable<ProjectList[]> {
    const url: string = `${this._baseUrl}/project`;
    return this.httpClient.get<ProjectList[]>(url);
  }

  /**
   * getProject
   * @description to get single project
   */
  public getProject(id: number): Observable<ProjectList> {

    const url: string = `${this._baseUrl}/project/${id}`;
    return this.httpClient.get<ProjectList>(url);
  }

  /**
   * getProjectList
   * @description to get all project list
   */
  public getEmployees(): Observable<Employee[]> {
    const url: string = `${this._baseUrl}/employee`;
    return this.httpClient.get<Employee[]>(url);
    // return;
  }

  /**
   * addProject
   * @param projectDetail project detail
   * @description to add new project detail
   */
  public addProject(projectDetail: ProjectList): Observable<ProjectList> {
    const url: string = `${this._baseUrl}/project`;
    return this.httpClient.post<ProjectList>(url, projectDetail);
  }

  /**
   * updateProject
   * @param id project id for update
   * @param projectDetail project detail
   * @description to update existing project detail
   */
  public updateProject(id: number, projectDetail: ProjectList): Observable<ProjectList> {
    const url: string = `${this._baseUrl}/project`;
    return this.httpClient.put<ProjectList>(`${url}/${id}`, projectDetail);
  }

  /**
   * getProjectName
   * @description to get all project names
   */
  public getProjectName(): Observable<ProjectName[]> {
    const url: string = `${this._baseUrl}/parentProject`;
    return this.httpClient.get<ProjectName[]>(url);
  }

  /**
   * getClientName
   * @description to get all client names
   */
  public getClientName(): Observable<ClientName[]> {
    const url: string = `${this._baseUrl}/client`;
    return this.httpClient.get<ClientName[]>(url);
  }

  /**
   * addProjectName
   * @param projectName project name to add
   */
  public addProjectName(projectName: ProjectName): Observable<ProjectName> {
    const url: string = `${this._baseUrl}/parentProject`;
    return this.httpClient.post<ProjectName>(`${url}`, projectName);
  }

  /**
   * addProjectName
   * @param projectName project name to add
   */
  public updateProjectName(projectId: number, projectName: ProjectName): Observable<ProjectName> {
    const url: string = `${this._baseUrl}/parentProject`;
    return this.httpClient.put<ProjectName>(`${url}/${projectId}`, projectName);
  }

  /**
   * addClientName
   * @param clientName Client name to add
   */
  public addClientName(clientName: ClientName): Observable<ClientName> {
    const url: string = `${this._baseUrl}/client`;
    return this.httpClient.post<ClientName>(`${url}`, clientName);
  }
  /**
   * updateClientName
   * @param clientName Client name to update
   */
  public updateClientName(clientId:number, clientName: ClientName): Observable<ClientName> {
    const url: string = `${this._baseUrl}/client`;
    return this.httpClient.put<ClientName>(`${url}/${clientId}`, clientName);
  }
}
