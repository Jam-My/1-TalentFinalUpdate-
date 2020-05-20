import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ProjectMasterPresenter } from '../project-master-presenter/project-master-presenter';
import { FormGroup } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';
import { ProjectName } from 'src/app/project-staffing/models/project-name.model';
import { PROJECT_NAME } from 'src/app/project-staffing/token';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'project-master-presentation-ui',
  templateUrl: './project-master.presentation.html',
  viewProviders: [ProjectMasterPresenter]
})
export class ProjectMasterPresentation implements OnInit {
  // event for addProject
  @Output() public addProject: EventEmitter<ProjectName>;
  // event for update project
  @Output() public updateProject: EventEmitter<ProjectName>;
  // projectMasterForm instance
  public projectMasterForm: FormGroup;
  // name add edit
  public changeName: string;
  public changeButton: string;
  constructor(
    @Inject(PROJECT_NAME) public addProjectName: ProjectName,
    private projectFormPresenter: ProjectMasterPresenter,
    public overlayRef: OverlayRef,
    private loader: NgxUiLoaderService
  ) {
    this.changeName = 'Add';
    this.changeButton = 'Add';
    this.addProject = new EventEmitter<ProjectName>();
    this.updateProject = new EventEmitter<ProjectName>();
    this.projectMasterForm = this.projectFormPresenter.buildProjectMasterForm();
  }

  public ngOnInit(): void {
    if (this.addProjectName !== null) {
      this.changeName = 'Edit';
      this.changeButton = 'Update';
      this.projectMasterForm.patchValue(this.addProjectName);
    }
  }

  public get masterProject(): any { return this.projectMasterForm.controls; }

  public onSubmit(): void {
    if (this.projectMasterForm.valid) {
      // this.loader.start();
      this.overlayRef.dispose();
      if (this.projectMasterForm.controls.projectId.value !== null) {
        this.updateProject.emit(this.projectMasterForm.value);
      }
      else {
        this.addProject.emit(this.projectMasterForm.value);
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
  }

}
