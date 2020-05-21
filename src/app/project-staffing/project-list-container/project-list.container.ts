import { Component, OnInit } from '@angular/core';

import { Employee } from '../models/employee.model';
import { OidcFacade } from 'ng-oidc-client';
import { ProjectList } from '../models/project-list.model';
import { ProjectListService } from '../services/project-list.service';
import { ToastrService } from 'ngx-toastr';
import { from, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ProjectName } from '../models/project-name.model';
import { ClientName } from '../models/client-name.model';

/**
 * Component
 */
@Component({
  selector: 'project-list-container',
  templateUrl: './project-list.container.html',
  styles: []
})
export class ProjectListContainer implements OnInit {

  // observable to store project detail
  public projectList$: Observable<ProjectList[]>;
  // All employee Persons from the api call 
  public employee$: Observable<Employee[]>;
  // get single project
  public getProject$: Observable<ProjectList>;
  // observable to store project names
  public projectName$: Observable<ProjectName[]>;
  // observable to store client names
  public clientName$: Observable<ClientName[]>;

  constructor(
    private projectListService: ProjectListService,
    private toastrService: ToastrService
  ) { }

  public ngOnInit(): void {
    this.employee$ = this.projectListService.getEmployees();
    //Gets all document details list
    this.getProjectList();
    this.getProjectName();
    this.getClientName();
    
  }

  /**
   * getProject
   * @param id id of project
   */
  public getSingleProject(id: number): void {

    this.getProject$ = this.projectListService.getProject(id);
  }

  /**
   * to add project
   * @param projectdetail project detail
   */
  public addProject(projectDetails: ProjectList): void {
    delete projectDetails.subProjectId;
    this.projectListService.addProject(projectDetails).subscribe((data: ProjectList) => {
      if (data) {
        this.toastrService.success('New Sub-Project Added Successfully !');
        this.getProjectList();
      }
    });
  }

  /**
   * to update project detail
   * @param projectDetails project detail
   */
  public updateProject(projectDetails: ProjectList): void {
    let subProjectId: number = projectDetails.subProjectId;
    delete projectDetails.subProjectId;
    this.projectListService.updateProject(subProjectId, projectDetails).subscribe((data: ProjectList) => {
      if (data) {
        this.toastrService.success('Sub-Project Updated Successfully !');
        this.getProjectList();
      }
    });
  }

  /**
   * Gets the details of project names
   */
  public getProjectName(): void {
    //Gets project names from the database server
    this.projectName$ = this.projectListService.getProjectName();
  }

  /**
   * Gets the details of client names
   */
  public getClientName(): void {
    //Gets client names from the database server
    this.clientName$ = this.projectListService.getClientName();
  }

  /**
   * addProjectName
   * @param projectName
   */
  public addProjectName(projectName: ProjectName): void {
    delete projectName.projectId;
    this.projectListService.addProjectName(projectName).subscribe(() => {
      this.toastrService.success('New Project Name Added Successfully !');
      this.getProjectName();
    })
  }

  /**
   * updateProjectName
   * @param projectName
   */
  public updateProjectName(projectName: ProjectName): void {
    let projectNameId: number= projectName.projectId;
    delete projectName.projectId;
    this.projectListService.updateProjectName(projectNameId,projectName).subscribe(() => {
      this.toastrService.success('Project Name Updated Successfully !');
      this.getProjectName();
    })
  }

  /**
   * addClientName
   * @param clientName 
   */
  public addClientName(clientName: ClientName): void {
    delete clientName.clientId;
    this.projectListService.addClientName(clientName).subscribe(() => {
      this.toastrService.success('New Client Name Added Successfully !');
      this.getClientName();
    })
  }
  /**
   * updateClientName
   * @param clientName 
   */
  public updateClientName(clientName: ClientName): void {
    let clientId: number = clientName.clientId;
    delete clientName.clientId;
    this.projectListService.updateClientName(clientId,clientName).subscribe(()=>{
      this.toastrService.success('Client Name Updated Successfully !');
      this.getClientName();
    })
  }

  /**
   * Gets the details of project list
   */
  private getProjectList(): void {
    //Gets project list from the database server
    this.projectList$ = this.projectListService.getProjectList();
  }

}
