import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import { Employee } from '../../models/employee.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProjectList } from '../../models/project-list.model';
import { ProjectListPresenter } from '../project-list-presenter/project-list.presenter';
import { ProjectName } from '../../models/project-name.model';
import { ClientName } from '../../models/client-name.model';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

/**
 * Component
 */
@Component({
  selector: 'project-list-presentation-ui',
  templateUrl: './project-list.presentation.html',
  viewProviders: [ProjectListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListPresentation implements OnInit {

  // Get all project detail getter setter
  @Input() public set projectList(projectList: ProjectList[]) {
    if (projectList) {
      this.project = projectList;
      this.filterList = this.projectList.map((data: ProjectList) => data.projectName);
      this.filterList = this.filterList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
      this.filteredProjectList = projectList;
      this.filteredProjectList = this.filteredProjectList.length > 0 ? this.filteredProjectList : projectList;
      this.filteredProjectList.sort((a: ProjectList, b: ProjectList) => a > b ? 1 : -1);
      this.totalRecords = this.filteredProjectList.length;
      this.loader.stop();
    }
  }
  public get projectList(): ProjectList[] {
    return this.project;
  }

  // Get employee list getter setter
  @Input() public set employee(value: Employee[]) {
    if (value) {
      this._employee = value;
    }
  }
  public get employee(): Employee[] {
    return this._employee;
  }

  // Get project by id getter setter
  @Input() public set getProject(project: ProjectList) {
    if (project) {
      this._getSingleProject = project;
      this.loadProjectForm(this._getSingleProject)
    }
  }
  public get getProject(): ProjectList {
    return this._getSingleProject;
  }

  // Get project name getter setter
  @Input() public set projectName(project: ProjectName[]) {
    if (project) {
      this._getProjectName = project;
      this.projectListPresenter.newProjectName.next(this._getProjectName);
    }
  }
  public get projectName(): ProjectName[] {
    return this._getProjectName;
  }
  // Get client name getter setter
  @Input() public set clientName(client: ClientName[]) {
    if (client) {
      this._getClientName = client;
      this.projectListPresenter.newClientName.next(this._getClientName);
    }
  }
  public get clientName(): ClientName[] {
    return this._getClientName;
  }
  // output event to add project details 
  @Output() public addProject: EventEmitter<ProjectList>;
  // output event to update project details 
  @Output() public updateProject: EventEmitter<ProjectList>;
  // output event to add project details 
  @Output() public addProjectNameEvent: EventEmitter<ProjectName>;
  // output event to update project details 
  @Output() public updateProjectNameEvent: EventEmitter<ProjectName>;
  // output event to add Client details 
  @Output() public addClientNameEvent: EventEmitter<ClientName>;
  // output event to update Client details 
  @Output() public updateClientNameEvent: EventEmitter<ClientName>;
  // send project id for get project
  @Output() public sendId: EventEmitter<number>;
  // list after filter
  public filteredProjectList: ProjectList[];
  //search string
  public filterQuery: string;
  // suggetion list
  public filterList: string[];
  // filter filed
  public field: string;
  // Check Condition in HTML.
  public checkCondition: number;
  //Stores the name of field as per the model
  public fieldName: string;
  //For reversing the project list
  public reverse: boolean;
  //For accordion view list show hide
  public showHideAaccordion: number;
  //For check filter value 
  public filterFlag: boolean;
  //For storing current page number
  public currentPage: number;
  //For storing size of page
  public pageSize: number;
  //For storing total records
  public totalRecords: number;
  // Add Project Name
  public addProjectName: ProjectName;
  // Update Project Name
  public updateProjectName: ProjectName;
  // Add Client Name
  public addClientName: ClientName;
  // Update Client Name
  public updateClientName: ClientName;
  // private property prpject of type array
  private project: ProjectList[];
  // private property updatedDetails
  private updatedDetails: ProjectList;
  // Employee data
  private _employee: Employee[];
  // single project
  private _getSingleProject: ProjectList;
  // project name
  private _getProjectName: ProjectName[];
  // client name
  private _getClientName: ClientName[];


  constructor(
    private route: Router,
    private projectListPresenter: ProjectListPresenter,
    private loader: NgxUiLoaderService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public datePipe: DatePipe
  ) {
    this.reverse = true;
    this.fieldName = 'subProjectId';
    this.addProject = new EventEmitter();
    this.addProjectNameEvent = new EventEmitter();
    this.updateProjectNameEvent = new EventEmitter();
    this.addClientNameEvent = new EventEmitter();
    this.updateClientNameEvent = new EventEmitter();
    this.updateProject = new EventEmitter();
    this.sendId = new EventEmitter<number>();
    this.filterQuery = 'Search...';
    this.field = 'projectName';
    this.filterFlag = false;
    this.currentPage = 1;
    this.pageSize = 10;

  }

  /**
   * On init
   */
  public ngOnInit(): void {
  }

  /**
   * selectFilterField
   * @description select filed and set suggestion array 
   */
  public selectFilterField(): void {
    this.filterList = this.projectListPresenter.selectFilterField(this.field, this.projectList);
    this.filterList = this.filterList.map((item: string) => {
      if (item === null) {
        return '';
      } else {
        return item;
      }
    });
    this.filterList = this.filterList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    this.checkValidFilter();
  }

  /**
   * clearFilter
   */
  public clearFilter(): void {
    this.reverse = true;
    this.filterFlag = false;
    this.fieldName = 'subProjectId';
    this.filterQuery = '';
    this.filter();
  }
  /**
   * filter
   */
  public filter(): void {
    this.currentPage = 1;
    this.filteredProjectList = this.projectListPresenter.filter(this.projectList, this.field, this.filterQuery);
    this.totalRecords = this.filteredProjectList.length;
  }

  /**
   * filterResultSelected
   * @param result search string
   */
  public filterResultSelected(result: string): void {
    this.filterQuery = result;
    this.checkValidFilter();
  }

  /**
   * Redirects to role list of particular project
   */
  public RoleList(): void {
    this.route.navigate(['']);
  }

  /**
   * Function for sorting project list
   * @param fieldName Contains the name of field to sort with
   */
  public sorting(fieldName: string): void {
    //Gets the name of the field to which sorting should be applied
    this.fieldName = fieldName;
    //Sets reverse  to sort in ascending or descending order
    this.reverse = !this.reverse;
  }

  /**
   * create function which will be called on add project button
   * @param projectForm projectForm of type model ProjectList
   */
  public loadProjectForm(projectForm: ProjectList): void {
    this.loader.start();
    this.projectListPresenter.addFormDetails = new Subject<ProjectList>();
    this.projectListPresenter.updateFormDetails = new Subject<ProjectList>();

    this.projectListPresenter.addProjectName = new Subject<ProjectName>();
    this.projectListPresenter.updateProjectName = new Subject<ProjectName>();
    this.projectListPresenter.addClientName = new Subject<ClientName>();
    this.projectListPresenter.updateClientName = new Subject<ClientName>();
    let flag: number = 0;
    this.projectListPresenter.createProjectForm(projectForm, this.employee, this.projectName, this.clientName)

    this.projectListPresenter.addFormDetails.subscribe((projectData: ProjectList) => {
      if (flag === 0) {
        flag = 1;
        let startDate: Date | string;
        let endDate: Date | string;
        this.currentPage = 1;
        this.updatedDetails = projectData;
        startDate = this.updatedDetails.projectStartDate;
        startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
        this.updatedDetails.projectStartDate = new Date(startDate);
        endDate = this.updatedDetails.projectEndDate;
        endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
        this.updatedDetails.projectEndDate = new Date(endDate);
        this.addProject.emit(this.updatedDetails);
      }
    });

    this.projectListPresenter.updateFormDetails.subscribe((projectData: ProjectList) => {
      if (flag === 0) {
        flag = 1;
        let startDate: Date | string;
        let endDate: Date | string;
        this.updatedDetails = projectData;
        startDate = this.updatedDetails.projectStartDate;
        startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
        this.updatedDetails.projectStartDate = new Date(startDate);
        endDate = this.updatedDetails.projectEndDate;
        endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
        this.updatedDetails.projectEndDate = new Date(endDate);
        this.updateProject.emit(this.updatedDetails);
      }
    });
    this.projectListPresenter.addProjectName.subscribe((addProjectName: ProjectName) => {
      this.addProjectName = addProjectName;
      this.addProjectNameEvent.emit(this.addProjectName);
    });
    this.projectListPresenter.updateProjectName.subscribe((updateProjectName: ProjectName) => {
      this.updateProjectName = updateProjectName;
      this.updateProjectNameEvent.emit(this.updateProjectName);
    });
    this.projectListPresenter.addClientName.subscribe((addClientName: ClientName) => {
      this.addClientName = addClientName;
      this.addClientNameEvent.emit(this.addClientName);
    });
    this.projectListPresenter.updateClientName.subscribe((updateClientName: ClientName) => {
      this.updateClientName = updateClientName;
      this.updateClientNameEvent.emit(this.updateClientName);
    });
  }

  /**
   * create function which will be called on add project button
   * @param projectForm projectForm of type model ProjectList
   */
  public getProjectById(id: number): void {
    this.sendId.emit(id);
  }

  /**
   * showData
   * @param index record index
   * @description show/hide accordion view fields
   */
  public showHideData(index: number): void {
    if (this.showHideAaccordion === index) {
      this.showHideAaccordion = -1;
    } else {
      this.showHideAaccordion = index;
    }
  }

  /**
   * checkValidFilter
   * @description allow only if filter value is right for filter
   */
  public checkValidFilter(): void {
    if (this.filterQuery && this.filterQuery !== 'Search...') {
      this.filterFlag = true;
    } else {
      this.filterFlag = false;
      this.filterQuery = '';
      this.filter();
      this.filterQuery= 'Search...';
    }
  }

  /**
   * Number of pages
   */
  public numberOfPages(): number {
    if (Math.ceil(this.totalRecords / this.pageSize) >= 1) {
      return Math.ceil(this.totalRecords / this.pageSize);
    } else {
      return 1;
    }
  }

  /**
   * Sets the current page on page changes
   * @param pageNumber Current page number
   */
  public onPageChanges(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
