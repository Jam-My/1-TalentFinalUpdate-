import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Injectable
 */
@Injectable()

export class MemberListPresenter {
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
  public createDateForm(): FormGroup {
    return this.fb.group({
      weekRange: [[this.firstDate, this.lastDate]]
    });
  }
}
