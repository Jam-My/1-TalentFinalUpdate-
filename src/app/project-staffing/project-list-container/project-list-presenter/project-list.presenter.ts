import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, ViewContainerRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { EMPLOYEE_DETAILS, PROJECT_DETAILS, PROJECT_NAME, CLIENT_NAME } from '../../token';
import { Employee } from '../../models/employee.model';
import { Observable, Subject } from 'rxjs';
import { ProjectFormPresentation } from '../project-list-presentation/project-form-presentation/project-form.presentation';
import { ProjectList } from '../../models/project-list.model';
import { ProjectName } from '../../models/project-name.model';
import { ClientName } from '../../models/client-name.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';


/**
 * Injectable
 */
@Injectable()
export class ProjectListPresenter implements OnDestroy{

  // addFormDetails subject of type ProjectList model
  public addFormDetails: Subject<ProjectList>;
  // addDetails subject of type ProjectList model
  public updateFormDetails: Subject<ProjectList>;
  // addFormDetails subject of type ProjectList model
  public addProjectName: Subject<ProjectName>;
  // updateProjectName subject of type ProjectList model
  public updateProjectName: Subject<ProjectName>;
  // addClientName subject of type ClientName model
  public addClientName: Subject<ClientName>;
  // update client name
  public updateClientName: Subject<ClientName>;
  // to pass updated data to form
  public newProjectName: Subject<ProjectName[]>;
  // to pass updated data to form
  public newClientName: Subject<ClientName[]>;
  // store data for filter
  private obj: object;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private loader: NgxUiLoaderService
  ) {
    this.obj = {};
    this.newProjectName = new Subject<ProjectName[]>();
    this.newClientName = new Subject<ClientName[]>();
  }

  /**
   * selectFilterField
   * @param field filter field
   * @param projectList list of suggestion
   * @description select filed and set suggetion array
   */
  public selectFilterField(field: string, projectList: ProjectList[]): string[] {
    if (field === 'projectName') {
      return projectList.map((data: ProjectList) => data.projectName);
    } else if (field === 'subProjectName') {
      return projectList.map((data: ProjectList) => data.subProjectName);
    } else if (field === 'clientName') {
      return projectList.map((data: ProjectList) => data.clientName);
    } else if (field === 'projectManager') {
      return projectList.map((data: ProjectList) => data.projectManager);
    }
  }

  /**
   * filter
   * @param projectList list of suggestion
   * @param field filter field
   * @param filterQuery filter string
   * @description get field name, list and search string the apply filter
   */
  public filter(projectList: ProjectList[], field: string, filterQuery: string): ProjectList[] {
    if (filterQuery === '') {
      this.obj = {};
    } else {
      if (field === 'projectName') {
        this.obj = { projectName: filterQuery };
      } else if (field === 'subProjectName') {
        this.obj = { subProjectName: filterQuery }
      } else if (field === 'clientName') {
        this.obj = { clientName: filterQuery }
      } else if (field === 'projectManager') {
        this.obj = { projectManager: filterQuery }
      }
    }

    const keys = Object.keys(this.obj);
    const filterList = list => {
      let result = keys.map(key => {
        if (list[key]) {
          return String(list[key]).toLowerCase().startsWith(String(this.obj[key]).toLowerCase());
        } else {
          return false;
        }

      });
      result = result.filter(it => it !== undefined);

      return result.reduce((acc: number, cur: any) => {
        // tslint:disable-next-line: no-bitwise
        return acc & cur;
      }, 1);
    };
    return projectList.filter(filterList);

  }

  /**
   * to open overlay and pass project data
   * @param projectDetails projectDetails
   */
  public createProjectForm(projectDetails: ProjectList, employee: Employee[], projectName: ProjectName[], clientName: ClientName[]): void {
    this.viewContainerRef.clear();

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
    let ref = overlayRef.attach(new ComponentPortal(
      ProjectFormPresentation, this.viewContainerRef, this.createInjector(projectDetails, employee, projectName, clientName, overlayRef)));

    ref.instance.updateProject.subscribe((formData: ProjectList) => {
      if (formData) {
        this.updateFormDetails.next(formData);
      }
    });

    ref.instance.addProject.subscribe((formData: ProjectList) => {
      if (formData) {
        this.addFormDetails.next(formData);
      }
    });

    ref.instance.addProjectName.subscribe((addProjectName: ProjectName) => {
      if (addProjectName) {
        this.addProjectName.next(addProjectName);
      }
    });
    ref.instance.updateProjectName.subscribe((updateProjectName: ProjectName) => {
      if (updateProjectName) {
        this.updateProjectName.next(updateProjectName);
      }
    });
    ref.instance.addClientName.subscribe((addClientName: ClientName) => {
      if (addClientName) {
        this.addClientName.next(addClientName);
      }
    });
    ref.instance.updateClientName.subscribe((updateClientName: ClientName) => {
      if (updateClientName) {
        this.updateClientName.next(updateClientName);
      }
    });

    this.newProjectName.subscribe((val: ProjectName[]) => {
      ref.instance.projectName = val;
      ref.instance.checkProjectChange();
      this.loader.stop();
    });
    this.newClientName.subscribe((val: ClientName[]) => {
      ref.instance.clientName = val;
      this.loader.stop();
    });

  }

  /**
   * updateInjector
   * @param projectName
   * @param clientName
   */
  public updateInjector(projectName: ProjectName[], clientName: ClientName[]): void {

  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy(): void {
    // this.addFormDetails.unsubscribe();
    // this.updateFormDetails.unsubscribe();
  }

  /**
   * createInjector() method
   * @param projectDetails projectDetails of type ProjectForm
   * @param overlayRef overlayRef which returns PortalInjector
   */
  private createInjector(projectDetails: ProjectList, employee: Employee[], projectName: ProjectName[], clientName: ClientName[], overlayRef: OverlayRef): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(OverlayRef, overlayRef);
    injectorTokens.set(PROJECT_DETAILS, projectDetails);
    injectorTokens.set(EMPLOYEE_DETAILS, employee);
    injectorTokens.set(PROJECT_NAME, projectName);
    injectorTokens.set(CLIENT_NAME, clientName);
    return new PortalInjector(this.injector, injectorTokens);
  }


}
