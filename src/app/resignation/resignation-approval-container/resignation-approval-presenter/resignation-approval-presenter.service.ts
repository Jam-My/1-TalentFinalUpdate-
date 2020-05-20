import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { ResignationResponse } from '../../models/resignation-response-model/resignation-response.model';
import { ROLES } from '../../role.constants';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Injectable()
export class ResignationApprovalPresenterService {
  public roles: string[];

  public acceptResignation$: Observable<ResignationResponse>;
  public rejectResignation$: Observable<ResignationResponse>;
  public setUserRoles$: Observable<string[]>;

  private acceptResignation: Subject<ResignationResponse>;
  private rejectResignation: Subject<ResignationResponse>;
  private setUserRoles: BehaviorSubject<string[]>;

  constructor(private fb: FormBuilder) {
    this.acceptResignation = new Subject<ResignationResponse>();
    this.acceptResignation$ = this.acceptResignation.asObservable();

    this.rejectResignation = new Subject<ResignationResponse>();
    this.rejectResignation$ = this.rejectResignation.asObservable();

    this.setUserRoles = new BehaviorSubject<string[]>([]);
    this.setUserRoles$ = this.setUserRoles.asObservable();
  }

  /**
   * buildForm
   */
  public buildForm(): FormGroup {
    return this.fb.group({
      ResignationApprovalDate: [''],
      exitInterviewDate: [''],
      remark: ['', [Validators.minLength(25), Validators.maxLength(250)]],
      isRehired: ['yes', Validators.required],
    });
  }

  /**
   * initializeRoles
   * @param role user role eg.HR
   */
  public initializeRoles(roles: string[]): void {
    this.roles = roles;
    this.setUserRoles.next(roles);
  }

  /**
   * approveResignationRequest
   * @param resignationApprovalForm 
   * @description approve resignation and check for validations based on role and clear them if not required
   */
  public approveResignationRequest(resignationApprovalForm: FormGroup): void {
    const isRehired: boolean = resignationApprovalForm.get('isRehired').value === 'yes' ? true : false;
    if (this.roles.includes(ROLES.RM)) {
      this.removeValidators(resignationApprovalForm, ['ResignationApprovalDate', 'exitInterviewDate', 'remark']);
    }

    if (this.roles.includes(ROLES.HR)) {
      this.setRequiredValidator(resignationApprovalForm, ['ResignationApprovalDate', 'exitInterviewDate']);
      this.removeValidators(resignationApprovalForm, ['remark']);
    }

    if (resignationApprovalForm.valid) {
      let formData: ResignationResponse = resignationApprovalForm.getRawValue();
      formData.status = true;
      formData.resignationStatus = 'Accepted';
      formData.isRehired = isRehired ? true : false;
      this.acceptResignation.next(formData);
    } else {
      resignationApprovalForm.markAsTouched();
    }
  }

  /**
   * rejectResignationRequest
   * @param resignationApprovalForm 
   * @description reject resignation and check for validations based on role and clear them if not required
   */
  public rejectResignationRequest(resignationApprovalForm: FormGroup): FormGroup {
    const isRehired: boolean = resignationApprovalForm.get('isRehired').value === 'yes' ? true : false;
    const remarksFormControl: AbstractControl = resignationApprovalForm.get('remark');
    const remarks: string = remarksFormControl.value;

    this.removeValidators(resignationApprovalForm, ['ResignationApprovalDate', 'exitInterviewDate']);
    // ;
    this.setRemarkValidator(resignationApprovalForm, 'remark');
    //this.setLengthValidator(resignationApprovalForm, 'remark');

    if (resignationApprovalForm.valid) {
      let formData: ResignationResponse = resignationApprovalForm.getRawValue();
      formData.status = false;
      formData.resignationStatus = 'Rejected';
      formData.isRehired = isRehired ? true : false;
      this.rejectResignation.next(formData);
    } else {
      resignationApprovalForm.markAsTouched();
    }

    return resignationApprovalForm;
  }

  /**
   * setValidatorsRoleBased
   * @param roles
   * @param resignationApprovalForm 
   */
  public setValidatorsRoleBased(roles: string[], resignationApprovalForm: FormGroup): FormGroup {
    const form: FormGroup = resignationApprovalForm;
    //check functionality
    if (roles.includes(ROLES.HR)) {
      const resignationApprovalDate: AbstractControl = form.get('ResignationApprovalDate');
      const exitInterviewDate: AbstractControl = form.get('exitInterviewDate');

      resignationApprovalDate.setValidators(Validators.required);
      exitInterviewDate.setValidators(Validators.required);
    }
    return form;
  }

  //todo do not clear all validators
  /**
   * removeValidators
   * @param form 
   * @description clear validators from form
   */
  public removeValidators(form: FormGroup, controls: string[]): void {
    for (const key in form.controls) {
      if (controls.includes(key)) {
        form.get(key).clearValidators();
        form.get(key).updateValueAndValidity();
      }
    }
  }

  /**
   * removeValidators
   * @param form 
   * @description clear validators from form
   */
  public setRequiredValidator(form: FormGroup, controls: string[]): void {
    for (const key in form.controls) {
      if (controls.includes(key)) {
        form.get(key).setValidators([Validators.required]);
        form.get(key).updateValueAndValidity();
      }
    }
  }

  public setRemarkValidator(form: FormGroup, control: string): void {
    form.get(control).setValidators([Validators.required, Validators.minLength(25), Validators.maxLength(250)]);
    form.get(control).updateValueAndValidity();
  }

  /**
   * updateApprovedDate
   * @param date 
   * @param form 
   * @description bsDatePicker does not initialize date in form model on binding
   */
  public updateApprovedDate(date: Date, form: FormGroup): FormGroup {
    form.patchValue({ ResignationApprovalDate: new Date(date) });
    return form;
  }


}
