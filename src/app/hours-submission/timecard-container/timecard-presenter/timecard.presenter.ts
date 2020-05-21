import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Injectable
 */
@Injectable()

export class TimecardPresenter {

  // current date
  private currentDate: Date;
  // day from date
  private day: number;
  // first Date
  private firstDate: Date;
  // last Date
  private lastDate: Date;

  constructor(
    private fb: FormBuilder
  ) {
    this.day = 0;
    this.currentDate = new Date();
    this.day = this.currentDate.getDay();
    this.firstDate = new Date(this.currentDate.getTime() - 60 * 60 * 24 * (this.day - 1) * 1000);
    this.lastDate = new Date(this.firstDate.getTime() + 60 * 60 * 24 * 6 * 1000);
  }

  /**
   * createTimecardForm
   * @description create timecard form
   */
  public createTimecardForm(): FormGroup {
    return this.fb.group({
      // id: [],
      employeeId: [],
      weekRange: [[this.firstDate, this.lastDate]],
      timeCard: this.fb.array([
        this.initTimecard()
      ])
    });
  }

  /**
   * initTimecard
   * @description Initiate Timecard form group
   */
  public initTimecard(): FormGroup {
    return this.fb.group({
      timeCardId: [],
      subProjectId: [null, [Validators.required]],
      monday: [null],
      tuesday: [null],
      wednesday: [null],
      thursday: [null],
      friday: [null],
      saturday: [null],
      sunday: [null],
      hoursTypeId: [null, [Validators.required]],
      remark: [''],
      approvalStatusId: [1],
      totalHours: [0]
    });
  }
}
