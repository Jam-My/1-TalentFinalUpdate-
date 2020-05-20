import { Component, EventEmitter, Inject, OnInit, Output, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EMPLOYEE_DETAILS, PROJECT_DETAILS, PROJECT_NAME, CLIENT_NAME } from 'src/app/project-staffing/token';
import { Employee } from 'src/app/project-staffing/models/employee.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProjectFormPresenter } from '../project-form-presenter/project-form.presenter';
import { ProjectList } from 'src/app/project-staffing/models/project-list.model';
import { ProjectName } from 'src/app/project-staffing/models/project-name.model';
import { ClientName } from 'src/app/project-staffing/models/client-name.model';
import { Subject } from 'rxjs';

/**
 * Component
 */
@Component({
  selector: 'project-form-presentation-ui',
  templateUrl: './project-form.presentation.html',
  viewProviders: [ProjectFormPresenter]
})
export class ProjectFormPresentation implements OnInit {

  // event for addProject
  @Output() public addProject: EventEmitter<ProjectList>;
  // event for update project
  @Output() public updateProject: EventEmitter<ProjectList>;
  // event for add project name
  @Output() public addProjectName: EventEmitter<ProjectName>;
  // event for update project name
  @Output() public updateProjectName: EventEmitter<ProjectName>;
  // event for add Client name
  @Output() public addClientName: EventEmitter<ClientName>;
  // event for update Client name
  @Output() public updateClientName: EventEmitter<ClientName>;

  // projectForm instance
  public projectForm: FormGroup;
  // datepicker cnfigration
  public datePickerConfig: Partial<BsDatepickerConfig>;
  // date instance
  public today: Date;
  // check form valid or not
  public submitted: boolean;
  // set Add/Edit lable on form
  public actionLable: string;
  // project name changed or not
  public checkProject: string;
  // projectId flag
  public projectIdFlag: boolean;
  // Project name
  public projectNameDetail: ProjectName;
  // Client name
  public clientNameDetail: ClientName;

  constructor(
    @Inject(PROJECT_DETAILS) public project: ProjectList,
    @Inject(EMPLOYEE_DETAILS) public employee: Employee[],
    @Inject(PROJECT_NAME) public projectName: ProjectName[],
    @Inject(CLIENT_NAME) public clientName: ClientName[],
    public overlayRef: OverlayRef,
    private projectFormPresenter: ProjectFormPresenter,
    private loader: NgxUiLoaderService
  ) {
    this.actionLable = 'Add';
    this.submitted = false;
    this.today = new Date();
    this.addProject = new EventEmitter<ProjectList>();
    this.updateProject = new EventEmitter<ProjectList>();
    this.addProjectName = new EventEmitter<ProjectName>();
    this.updateProjectName = new EventEmitter<ProjectName>();
    this.addClientName = new EventEmitter<ClientName>();
    this.updateClientName = new EventEmitter<ClientName>();
    this.projectIdFlag = false;
    /** Date Picker Configuration */
    this.datePickerConfig = {
      dateInputFormat: 'DD/MM/YYYY',
      showWeekNumbers: false,
      // minDate: new Date((this.today).setDate(this.today.getDate() + 1))
    };

    this.projectForm = this.projectFormPresenter.buildProjectForm();
    if (this.project != null) {
      this.actionLable = 'Edit';
      this.projectForm.patchValue(this.project);
      this.projectForm.patchValue({ projectStartDate: new Date(this.project.projectStartDate), projectEndDate: new Date(this.project.projectEndDate) })
    }
  }

  //creates a project form
  public ngOnInit(): void {
    this.loader.stop();
    if (this.project !== null) {
      for (const val of this.projectName) {
        if (val.projectId === this.project.projectId) {
          this.checkProject = val.projectName;
          break;
        }
      }
    }
  }

  // getter for project form controls
  public get projectFormControls(): any {
    return this.projectForm.controls;
  }

  /**
   * method to dispose overlay and emit form details for add and update
   */
  public onSubmit(): void {
    this.submitted = true;
    if (this.projectForm.valid) {
      // this.loader.start();
      this.overlayRef.dispose();
      if (this.projectForm.controls.subProjectId.value !== null) {
        this.updateProject.emit(this.projectForm.value);
      }
      else {
        this.addProject.emit(this.projectForm.value);
      }
    }
    else {
      return;
    }

  }

  /**
   * close overlay
   */
  public closeOverlay(): void {
    this.overlayRef.dispose();
    this.projectFormPresenter.addProjectDetails.unsubscribe();
    this.projectFormPresenter.addClientDetails.unsubscribe();
  }

  /**
   * setSubProject
   * @description to set subproject name as project name
   */
  public setSubProject(): void {
    for (const val of this.projectName) {
      if (val.projectId === this.projectForm.controls['projectId'].value) {
        this.projectForm.controls['subProjectName'].patchValue(val.projectName);
      }
    }

  }

  /**
   * checkProjectChange
   * @description to check project name change
   */
  public checkProjectChange(): void {
    for (const val of this.projectName) {
      if (val.projectId === this.projectForm.controls['projectId'].value) {
        if (this.checkProject === val.projectName) {
          this.projectIdFlag = false;
          break;
        } else {
          this.projectIdFlag = true;
        }
      } else {
        this.projectIdFlag = true;
      }
    }
  }

  /**
   * loadMasterProjectForm
   */
  public loadMasterProjectForm(projectId: number): void {
    let projectData: ProjectName;
    for (const val of this.projectName) {
      if (val.projectId === projectId) {
        projectData = val;
        break;
      } else {
        projectData = null;
      }
    }
    this.projectFormPresenter.createProjectForm(projectData);
    this.projectFormPresenter.addProjectDetails.subscribe((projectName: ProjectName) => {
      if (projectName) {
        this.projectNameDetail = projectName;
        this.addProjectName.emit(this.projectNameDetail);
        this.projectFormPresenter.addProjectDetails = new Subject<ProjectName>();
      }
    });
    this.projectFormPresenter.updateProjectDetails.subscribe((projectName: ProjectName) => {
      if (projectName) {
        this.projectNameDetail = projectName;
        this.updateProjectName.emit(this.projectNameDetail);
        this.projectFormPresenter.updateProjectDetails = new Subject<ProjectName>();
      }
    });
  }

  /**
   * loadClientForm
   */
  public loadClientForm(clientId: number): void {
    let clientData: ClientName;
    for (const val of this.clientName) {
      if (val.clientId === clientId) {
        clientData = val;
        break;
      } else {
        clientData = null;
      }
    }
    this.projectFormPresenter.createClientForm(clientData);
    this.projectFormPresenter.addClientDetails.subscribe((clientName: ClientName) => {
      if (clientName) {
        this.clientNameDetail = clientName;
        this.addClientName.emit(this.clientNameDetail);
        this.projectFormPresenter.addClientDetails = new Subject<ClientName>();
      }
    });
    this.projectFormPresenter.updateClientDetails.subscribe((clientName: ClientName) => {
      if (clientName) {
        this.clientNameDetail = clientName;
        this.updateClientName.emit(this.clientNameDetail);
        this.projectFormPresenter.updateClientDetails = new Subject<ClientName>();
      }
    });
  }
}
