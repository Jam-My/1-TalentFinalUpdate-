import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ClientMasterPresenter } from '../client-master-presenter/client-master.presenter';
import { ClientName } from 'src/app/project-staffing/models/client-name.model';
import { OverlayRef } from '@angular/cdk/overlay';
import { CLIENT_NAME, PROJECT_NAME } from 'src/app/project-staffing/token';
import { ProjectName } from 'src/app/project-staffing/models/project-name.model';
import { FormGroup } from '@angular/forms';
import { ProjectMasterPresenter } from '../project-master-presenter/project-master-presenter';
import { NgxUiLoaderService } from 'ngx-ui-loader';

/**
 * Component
 */
@Component({
  selector: 'client-master-presentation-ui',
  templateUrl: './client-master.presentation.html',
  viewProviders: [ClientMasterPresenter]
})
export class ClientMasterPresentation implements OnInit {
  // event for addClient
  @Output() public addClient: EventEmitter<ClientName>;
  // event for update Client
  @Output() public updateClient: EventEmitter<ClientName>;
  // ClientMasterForm instance
  public clientMasterForm: FormGroup;
  // form lable name
  public actionLable: string;
  // form lable name
  public buttonLable: string;
  // form submit flag
  public submitted: boolean;

  constructor(
    @Inject(CLIENT_NAME) public addClientName: ClientName,
    private clientFormPresenter: ClientMasterPresenter,
    public overlayRef: OverlayRef,
    private loader: NgxUiLoaderService
  ) {
    this.actionLable = 'Add';
    this.buttonLable = 'Add';
    this.submitted = false;
    this.addClient = new EventEmitter<ClientName>();
    this.updateClient = new EventEmitter<ClientName>();
    this.clientMasterForm = this.clientFormPresenter.buildClientMasterForm();
    if (this.addClientName != null) {
      this.actionLable = 'Edit';
      this.buttonLable = 'Update';
      this.clientMasterForm.patchValue(this.addClientName);
    }
  }

  public ngOnInit(): void {

  }

  // getter for project form controls
  public get clientMasterFormControls(): any {
    return this.clientMasterForm.controls;
  }
  /**
   * onSubmit
   */
  public onSubmit(): void {
    this.submitted = true;
    if (this.clientMasterForm.valid) {
      // this.loader.start();
      this.overlayRef.dispose();
      if (this.clientMasterForm.controls.clientId.value !== null) {
        this.updateClient.emit(this.clientMasterForm.value);
      }
      else {
        this.addClient.emit(this.clientMasterForm.value);
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
