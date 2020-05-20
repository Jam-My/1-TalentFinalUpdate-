import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable, ViewContainerRef, Injector } from '@angular/core';

import { DateValidators } from 'src/app/shared/validators/dateCompareValidator';
import { ProjectList } from 'src/app/project-staffing/models/project-list.model';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ProjectMasterPresentation } from '../project-form-presentation/project-master-presentation/project-master.presentation';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ClientMasterPresentation } from '../project-form-presentation/client-master-presentation/client-master.presentation';
import { CLIENT_NAME, PROJECT_NAME } from 'src/app/project-staffing/token';
import { ProjectName } from 'src/app/project-staffing/models/project-name.model';
import { ClientName } from 'src/app/project-staffing/models/client-name.model';
import { Subject } from 'rxjs';

/**
 * Injectable
 */
@Injectable()
export class ProjectFormPresenter {
  
  // addProjectDetails subject of type ProjectName model
  public addProjectDetails: Subject<ProjectName>;
  // addDetails subject of type ProjectName model
  public updateProjectDetails: Subject<ProjectName>
  // addFormDetails subject of type ClientName model
  public addClientDetails: Subject<ClientName>;
  // addDetails subject of type ClientName model
  public updateClientDetails: Subject<ClientName>

  public projectForm: FormGroup;  // form group instance

  // Add Project name
  public addProjectName: ProjectName;
  // Add Client name
  public addClientName: ClientName;

  constructor(
    public formBuilder: FormBuilder,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {
    this.addProjectDetails = new Subject<ProjectName>();
    this.updateProjectDetails = new Subject<ProjectName>();
    this.addClientDetails = new Subject<ClientName>();
    this.updateClientDetails = new Subject<ClientName>();
  }

  /**
   * buildProjectForm
   */
  public buildProjectForm(): FormGroup {
    return this.projectForm = this.formBuilder.group(
      {
        subProjectId: [],
        projectId: [, [Validators.required]],
        subProjectName: ['', [Validators.required]],
        clientId: [, [Validators.required]],
        projectStartDate: ['', [Validators.required]],
        projectEndDate: ['', [Validators.required]],
        totalHours: [{ value: '', disabled: true }],
        projectValue: [{ value: '', disabled: true }],
        hoursApproverId: [[],[Validators.required]]
      },
      {
        validator: DateValidators.validate('projectStartDate', 'projectEndDate', { 'toIsGreater': true }),
      });
  }

  /**
   * createProjectForm
   */
  public createProjectForm(projectData : ProjectName): void {
    // this.viewContainerRef.clear();    
    let config = new OverlayConfig();

    // To set position of overlay
    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Used to close overlay on Backdrop
    config.hasBackdrop = true;

    // Used in creating overlay
    let overlayRef: OverlayRef = this.overlay.create(config);

    // Used to close overlay on Backdrop
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    // Create overlay
    let ref = overlayRef.attach(new ComponentPortal(ProjectMasterPresentation, this.viewContainerRef, this.createInjectorProject(projectData, overlayRef)));
    ref.instance.updateProject.subscribe((formData: ProjectName) => {
      if (formData) {
        this.updateProjectDetails.next(formData);
      }
    });

    ref.instance.addProject.subscribe((formData: ProjectName) => {
      this.addProjectName = formData;
      if (this.addProjectName) {
        this.addProjectDetails.next(this.addProjectName);
      }
    });
  }

  /**
   * createClientForm
   */
  public createClientForm(clientData: ClientName): void {
    // this.viewContainerRef.clear();
    let config = new OverlayConfig();

    // To set position of overlay
    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Used to close overlay on Backdrop
    config.hasBackdrop = true;

    // Used in creating overlay
    let overlayRef = this.overlay.create(config);

    // Used to close overlay on Backdrop
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    // Create overlay
    let ref = overlayRef.attach(new ComponentPortal(ClientMasterPresentation, this.viewContainerRef, this.createInjectorClient(clientData, overlayRef)));
    ref.instance.updateClient.subscribe((formData: ClientName) => {
      if (formData) {
        this.updateClientDetails.next(formData);
      }
    });

    ref.instance.addClient.subscribe((formData: ClientName) => {
      this.addClientName = formData;
      if (this.addClientName) {
        this.addClientDetails.next(this.addClientName);
      }
    });
  }

  /**
   * createInjectorProject() method
   * @param projectDetails projectDetails of type ProjectForm
   * @param overlayRef overlayRef which returns PortalInjector
   */
  private createInjectorProject(addProjectName: ProjectName, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(PROJECT_NAME, addProjectName);
    return new PortalInjector(this.injector, injectorTokens);
  }

  /**
   * createInjectorClient() method
   * @param projectDetails projectDetails of type ProjectForm
   * @param overlayRef overlayRef which returns PortalInjector
   */
  private createInjectorClient(addClientName: ClientName, overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(CLIENT_NAME, addClientName);
    return new PortalInjector(this.injector, injectorTokens);
  }

}
