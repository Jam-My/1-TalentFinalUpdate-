/**
 * @author Kalrav Shah
 */
import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ResignationPresenter } from '../resignation-presenter/resignation-presenter.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResignationDetails } from '../../models/resignation-model/resignationDetail.model';
import { ConcernPerson } from '../../models/resignation-model/concern-person.model';
import { ResignationRevoke } from '../../models/resignation-model/resignation-revoke.model';
import { STATUS } from '../../status.constants';
import { ROLES } from '../../role.constants';
import { STATUSSHOW } from 'src/app/exit-checklist/status.constant';

@Component({
  selector: 'resignation-ui',
  templateUrl: './resignation-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ResignationPresenter]
})
export class ResignationPresentation implements OnInit {
  public statuses = STATUSSHOW

  @Input() public set resignationDetails(value: ResignationDetails[]) {
    if (value && value.length) {
      this._resignationDetails = value;
      this.lastResignationApplied = value[value.length - 1];
      this.status = this.lastResignationApplied.status;
    }
  }
  public get resignationDetails(): ResignationDetails[] {
    return this._resignationDetails;
  }

  @Input() public set roles(value: string[]) {
    if (value) {
      this._roles = value;
      this.resignationPresenter.initializeRoles(value);
    }
  }

  public get roles(): string[] {
    return this._roles;
  }

  @Input() public set concernPersons(value: ConcernPerson[]) {
    if (value) {
      this._ccPersons = value;
    }
  }

  public get concernPersons(): ConcernPerson[] {
    return this._ccPersons;
  }

  @Output() public saveResignationDetails: EventEmitter<ResignationDetails>;
  @Output() public saveRevokeDetails: EventEmitter<ResignationRevoke>;

  public ROLES: typeof ROLES = ROLES;
  public STATUS: typeof STATUS = STATUS;
  // It is the status of the last resignation application applied
  public status: string;
  // Its the data of the last resignation applied
  public lastResignationApplied: ResignationDetails;
  // Role of Current User logged Into the System
  public currentRole$: Observable<string[]>;
  // All the resignations that the user has applied  
  private _resignationDetails: ResignationDetails[];
  // The Concern Persons
  private _ccPersons: ConcernPerson[];
  // Role of the user
  private _roles: string[];

  constructor(
    private resignationPresenter: ResignationPresenter,
    private loader: NgxUiLoaderService
  ) {

    this.saveRevokeDetails = new EventEmitter<ResignationRevoke>()
    this.saveResignationDetails = new EventEmitter<ResignationDetails>();
  }
  ngOnInit(): void {
    this.ROLES = ROLES;
    this.resignationPresenter.resignationFormData$.subscribe((resignationData: ResignationDetails) => {
      this.saveResignationDetails.emit(resignationData);
    });

    this.resignationPresenter.revokeFormData$.subscribe((revokeData: ResignationRevoke) => {
      this.saveRevokeDetails.emit(revokeData);
    });

    this.currentRole$ = this.resignationPresenter.setUserRole$;
  }

  /** Method to open Resignation Form Bind Concern Persons in the form */
  public applyForResignation(): void {
    this.loader.start();
    this.resignationPresenter.openResignationForm(this.concernPersons);
  }

  /** To open The revoke Form */
  public openRevokeResignationForm(): void {
    this.loader.start();
    this.resignationPresenter.openRevokeForm(this.resignationDetails);
  }
}
