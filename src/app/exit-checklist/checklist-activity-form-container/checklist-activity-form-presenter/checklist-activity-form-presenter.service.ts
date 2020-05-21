import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { STATUS } from '../../status.constants';
import { StatusResponse } from '../../models/update-status-resonse.model';


@Injectable()
export class ChecklistActivityFormPresenter {

  public updateStatus$: Observable<StatusResponse>;
  private updateStatus: Subject<StatusResponse>;

  constructor(private fb: FormBuilder) {
    this.updateStatus = new Subject<StatusResponse>();
    this.updateStatus$ = this.updateStatus.asObservable();
  }

  /**
   * buildForm
   * @description return a reactive form group to take user input
   */
  public buildForm(): FormGroup {
    return this.fb.group({
      remarks: ['', [Validators.minLength(25), Validators.maxLength(250)]],
      activityStatus: []
    });
  }

  /**
   * saveStatus
   * @param activityForm 
   */
  public saveStatus(activityForm: FormGroup, status: number): void {
    if (status !== activityForm.get('activityStatus').value) {
      //TODO check for whitespaces
      if (activityForm.valid) {
        const activityFormValue: StatusResponse = activityForm.value;
        const statusResponse: StatusResponse = new StatusResponse();
        statusResponse.remarks = activityFormValue.remarks.trim();
        statusResponse.activityStatus = activityFormValue.activityStatus;
        this.updateStatus.next(statusResponse);
      } else {
        //how to handle invalid input
      }
    }else{
      console.log('Status not changed');
    }

  }
}
