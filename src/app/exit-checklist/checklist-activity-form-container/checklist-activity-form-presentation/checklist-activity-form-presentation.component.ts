/**
 * @author Nurali K
 * @description Presentation Component for Displaying Activity Details
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ROLES } from 'src/app/resignation/role.constants';
import { ActivityDetails } from '../../models/activity-detail.model';
import { StatusResponse } from '../../models/update-status-resonse.model';
import { STATUS, STATUSSHOW } from '../../status.constants';
import { ChecklistActivityFormPresenter } from '../checklist-activity-form-presenter/checklist-activity-form-presenter.service';
import { Location } from '@angular/common';

@Component({
  selector: 'checklist-activity-form-presentation-ui',
  templateUrl: './checklist-activity-form-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ChecklistActivityFormPresenter]
})
export class ChecklistActivityFormPresentation implements OnInit {

  @Input() public set activityDetails(value: ActivityDetails) {
    if (value) {
      this._activityDetails = value;
      this.initalizeStatus();
    }
  }

  public get activityDetails(): ActivityDetails {
    return this._activityDetails;
  }

  @Input() public set roles(value: string[]) {
    if (value) {
      this._roles = value;
    }
  }

  public get roles(): string[] {
    return this._roles;
  }

  @Output() public updateStatus: EventEmitter<StatusResponse>;

  public activityForm: FormGroup;
  public ROLES: typeof ROLES = ROLES;
  public STATUS: typeof STATUS = STATUS;
  public STATUSSHOW: typeof STATUSSHOW = STATUSSHOW;

  private _activityDetails: ActivityDetails;
  private _roles: string[];

  constructor(private checklistActivityPresenter: ChecklistActivityFormPresenter,
              private cdr: ChangeDetectorRef,
              private location:Location) {
    this.updateStatus = new EventEmitter<StatusResponse>();
  }

  public ngOnInit(): void {
    this.activityForm = this.checklistActivityPresenter.buildForm();

    this.checklistActivityPresenter.updateStatus$.subscribe((updateStatus: StatusResponse) => {
      updateStatus.exitActivityId = this.resp.exitActivityId;
      updateStatus.resignationId = this.resp.resignationId;
      this.updateStatus.emit(updateStatus);
    });
  }

  /**
   * Shortened Getter Name  to be used in template which return myActivity
   */
  public get resp(): ActivityDetails {
    return this._activityDetails;
  }


  public get remarks(): FormControl {
    return this.activityForm.get('remarks') as FormControl;
  }

  /**
   * saveStatus
   */
  public saveStatus(): void {
    //TODO check for bugs / testing required
    this.checklistActivityPresenter.saveStatus(this.activityForm, this.activityDetails.status);
  }

  /**
   * reset
   */
  public reset(): void {
    this.activityForm.reset();
  }

  /**
   * goBack
   */
  public goBack():void{
    this.location.back();

  }

  /**
   * initalizeStatus
   * @description populate the dropdown with the status recieved from api
   */
  private initalizeStatus(): void {
    //TODO move to presenter
    this.activityForm.patchValue({ activityStatus: this.resp.status });
    this.cdr.detectChanges();
  }





}
