/**
 * @author Nurali K
 * @description Container Component for Resignation Approval
 */
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { Observable } from 'rxjs';

import { ResignationApprovalPresenterService } from '../resignation-approval-presenter/resignation-approval-presenter.service';
import { ResignationResponse } from '../../models/resignation-response-model/resignation-response.model';
import { EmployeeResignation } from '../../models/employee-resignation-model/employee-resignation.model';
import { ROLES } from '../../role.constants';
import { STATUS, STATUSSHOW } from '../../status.constants';

@Component({
  selector: 'resignation-approval-presentation-ui',
  templateUrl: './resignation-approval-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ResignationApprovalPresenterService]
})
export class ResignationApprovalPresentationComponent implements OnInit {

  public datePickerConfig: Partial<BsDatepickerConfig>;

  @Input() public set employeeResignationDetails(value: EmployeeResignation) {
    if (value) {
      console.log(value);

      this._employeeResignationDetails = value;
      this.resignationApprovalForm = this.resignationApprovalPresenter.updateApprovedDate(value.approvedRelievingDate, this.resignationApprovalForm);
    }
  }

  public get employeeResignationDetails(): EmployeeResignation {
    return this._employeeResignationDetails;
  }

  @Input() public set roles(value: string[]) {
    if (value) {
      this._roles = value;
      this.resignationApprovalPresenter.initializeRoles(value);
    }
  }

  public get roles(): string[] {
    return this._roles;
  }

  public get resignationDetails(): EmployeeResignation {
    return this._employeeResignationDetails;
  }

  public get approvedRelievingDate(): Date {
    if (this.employeeResignationDetails) {
      return this.employeeResignationDetails.approvedRelievingDate;
    }
    return new Date();
  }

  public get employeeResignationStatus(): number {
    return this.employeeResignationDetails.statusId;
  }

  @Output() public saveApplicationResponse: EventEmitter<ResignationResponse>;
  @Output() public editApplicationResponse: EventEmitter<ResignationResponse>;

  public ROLES: typeof ROLES = ROLES;
  public STATUS: typeof STATUS = STATUS;
  public STATUSHOW: typeof STATUSSHOW = STATUSSHOW;

  public resignationApprovalForm: FormGroup;
  public currentRoles$: Observable<string[]>;
  public editMode: Boolean = false;

  private _employeeResignationDetails: EmployeeResignation;
  private _roles: string[];
  constructor(private resignationApprovalPresenter: ResignationApprovalPresenterService) {
    const today: Date = new Date();

    this.saveApplicationResponse = new EventEmitter<ResignationResponse>();
    this.editApplicationResponse = new EventEmitter<ResignationResponse>();
    this.datePickerConfig = {
      showWeekNumbers: false,
      // minDate: new Date((today).setDate(today.getDate() + 1)),
      dateInputFormat: 'DD/MM/YYYY'
    };
  }

  public ngOnInit(): void {
    this.ROLES = ROLES;

    this.resignationApprovalForm = this.resignationApprovalPresenter.buildForm();

    this.resignationApprovalPresenter.acceptResignation$.subscribe((resignationApproval: ResignationResponse) => {
      resignationApproval.resignationId = this.resignationDetails.resignationId;
      if (this.editMode) {
        this.editApplicationResponse.emit(resignationApproval);
      } else {
        this.saveApplicationResponse.emit(resignationApproval);
      }
    });

    this.resignationApprovalPresenter.rejectResignation$.subscribe((resignationRejection: ResignationResponse) => {
      resignationRejection.resignationId = this.resignationDetails.resignationId;
      this.saveApplicationResponse.emit(resignationRejection);
    });

    this.resignationApprovalPresenter.setUserRoles$.subscribe((roles: string[]) => {
      this.resignationApprovalForm = this.resignationApprovalPresenter.setValidatorsRoleBased(roles, this.resignationApprovalForm);
    });

    this.currentRoles$ = this.resignationApprovalPresenter.setUserRoles$;
  }

  /**
   * approveResignation
   */
  public approveResignation(): void {
    this.resignationApprovalPresenter.approveResignationRequest(this.resignationApprovalForm);
  }

  /**
   * rejectResignation
   */
  public rejectResignation(): void {
    this.resignationApprovalForm = this.resignationApprovalPresenter.rejectResignationRequest(this.resignationApprovalForm);
  }

  public edit(): void {
    const data = this.resignationDetails;
    this.editMode = true;
    this.resignationApprovalForm.patchValue({
      remark: data.hrRemark,
      isRehired: data.isRehiredByHR ? 'yes' : 'no',
      ResignationApprovalDate: data.resignationApprovedDate,
      exitInterviewDate: new Date(data.exitInterviewDate)
    });
  }

}