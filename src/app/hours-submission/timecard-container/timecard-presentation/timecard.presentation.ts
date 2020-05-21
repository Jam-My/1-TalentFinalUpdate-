/**
 * @author Shiv Desai
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormGroup } from '@angular/forms';

import { BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ConfirmationDialogService } from 'src/app/core/confirmation-dialog/confirmation-dialog.service';
import { ProjectList } from '../../models/project-list.model';
import { ProjectType } from '../../models/hours-type.model';
import { TimeCard, Week } from '../../models/time-card.model';
import { TimeCardStatus } from '../../models/timecard-status';
import { TimecardPresenter } from '../timecard-presenter/timecard.presenter';
import { ToastrService } from 'ngx-toastr';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';

defineLocale('en-gb', enGbLocale);

// For using Employee login Id...
const employeeID: number = Number(localStorage.getItem('RM'));

/**
 * Component
 */
@Component({
  selector: 'timecard-presentation-ui',
  templateUrl: './timecard.presentation.html',
  viewProviders: [TimecardPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimecardPresentation implements OnInit {

  // gets project list 
  @Input() public set project(projectDetail: ProjectList) {
    if (projectDetail) {
      this.projectDetail = projectDetail;
    }
  }
  public get project(): ProjectList {
    return this.projectDetail;
  }

  //get time-card list
  @Input() public set timeCard(timeCardDetail: TimeCard[]) {
    if (timeCardDetail) {
      this.timeCardDetail = timeCardDetail;
      if (this.timeCardDetail) {
        // this.addNewTimecard();
        this.getTimecardByWeek();
      }
    }
  }
  public get timeCard(): TimeCard[] {
    return this.timeCardDetail;
  }

  //get time-card Status
  @Input() public set timeCardStatus(timeCardStatusDetail: TimeCardStatus[]) {
    if (timeCardStatusDetail) {
      this.timeCardStatusDetail = timeCardStatusDetail;
    }
  }
  public get timeCardStatus(): TimeCardStatus[] {
    return this.timeCardStatusDetail;
  }

  //get project tupe list
  @Input() public set projectType(projectTypeDetail: ProjectType[]) {
    if (projectTypeDetail) {
      this.projectTypeDetail = projectTypeDetail;
    }
  }
  public get projectType(): ProjectType[] {
    return this.projectTypeDetail;
  }

  // For validation form of timecard getter
  public get hours(): FormArray { return this.timecardForm.get('timeCard') as FormArray; }

  // event for add time-card
  @Output() public addTimeCard: EventEmitter<TimeCard>;
  // event for update time-card
  @Output() public updateTimeCard: EventEmitter<TimeCard>;
  // event for delte time-card
  @Output() public deleteTimeCardEvent: EventEmitter<number>;

  // All weekly hours count
  public allWeeklyHours: number;
  // Total Monday;
  public totalMon: number;
  // Total Tuesday;
  public totalTue: number;
  // Total Wednesday;
  public totalWed: number;
  // Total Thrusday;
  public totalThu: number;
  // Total Friday;
  public totalFri: number;
  // Total Saturday;
  public totalSat: number;
  // Total Sunday;
  public totalSun: number;

  // project object  
  public projectDetail: ProjectList;
  // timecard form
  public timecardForm: FormGroup;
  // daterangepicker cnfigration
  public dateRangePickerConfig: Partial<BsDaterangepickerConfig>;
  // date ranges [first,last]
  public ranges: Date[];
  // start date
  public startDate: Date;
  // end date
  public endDate: Date;
  // monday date
  public monDate: Date;
  // tuesday date
  public tueDate: Date;
  // wednesday date
  public wedDate: Date;
  // thursday date
  public thuDate: Date;
  // friday date
  public friDate: Date;
  // saturday date
  public satDate: Date;
  // sunday date
  public sunDate: Date;
  // add/remove card
  public cardCounter: number;
  // Submit Button 
  public submitButton: string;
  // changeStatus
  public changeStatus: string;
  // flag for get timecard data after click in date picker
  public flag: boolean;
  // monday check
  public mondayCheck: boolean;
  // sunday check
  public sundayCheck: boolean;
  // week check
  public weekCheck: boolean;
  // day number
  public daysDifference: number;
  // time-card detail  
  private timeCardDetail: TimeCard[];
  // Project Type Detail  
  private projectTypeDetail: ProjectType[];
  // Status Type Detail  
  private timeCardStatusDetail: TimeCardStatus[];
  // Old date store 
  private oldDate: Date[] | string[];


  constructor(
    private timecardPresenter: TimecardPresenter,
    private localeService: BsLocaleService,
    private confirmationDialogService: ConfirmationDialogService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.daysDifference = 6;
    this.timecardForm = this.timecardPresenter.createTimecardForm();

    this.dateRangePickerConfig = {
      rangeInputFormat: 'MMM DD, YYYY',
      showWeekNumbers: true,
      displayMonths: 1,
      // selectWeekDateRange: true,
      selectFromOtherMonth: true
    };
    this.ranges = [];
    this.addTimeCard = new EventEmitter<TimeCard>();
    this.updateTimeCard = new EventEmitter<TimeCard>();
    this.deleteTimeCardEvent = new EventEmitter<number>();

    this.monDate = new Date();
    this.tueDate = new Date();
    this.wedDate = new Date();
    this.thuDate = new Date();
    this.friDate = new Date();
    this.satDate = new Date();
    this.sunDate = new Date();
    this.cardCounter = 0;

    this.flag = false;
    this.mondayCheck = false;
    this.sundayCheck = false;
  }

  /**
   * OnInit
   */
  public ngOnInit(): void {
    this.localeService.use('en-gb');
    // First time load Week total method...
    this.weekTotal();
    this.monDate = this.ranges[0];
    this.sunDate = this.ranges[1];

    // set employee id in form
    this.timecardForm.patchValue({ employeeId: employeeID });
    this.timecardForm.patchValue({ timeCard: [{ approvalStatusId: 1 }] });
    this.submitButton = 'Submit';
    // this.checkDay();
    this.weekCheck = true;

  }

  /**
   * check day monday|sunday
   */
  public checkDay(): void {
    let date1: Date = this.ranges[0];
    let date2: Date = this.ranges[1];
    let diffTime: number = date2.getTime() - date1.getTime();
    this.daysDifference = diffTime / (1000 * 3600 * 24);
    if (this.ranges[0].getDay() === 1 && this.ranges[1].getDay() === 0 && this.daysDifference === 6) {
      this.mondayCheck = true;
      this.sundayCheck = true;
      this.weekCheck = true;
    }
    else {
      this.mondayCheck = false;
      this.sundayCheck = false;
      this.weekCheck = false;
    }
  }

  /**
   * get monday date
   */
  public getMonDate(): Date {
    return this.monDate = this.ranges[0];
  }

  /**
   * get tuesday date
   */
  public getTueDate(): Date {
    var startDatetemp: Date = new Date(this.ranges[0].toString());
    this.startDate = new Date(this.ranges[0].toString());
    startDatetemp.setDate(startDatetemp.getDate() + 1);
    this.tueDate = startDatetemp;
    return this.tueDate;
  }

  /**
   * get wednesday date
   */
  public getWedDate(): Date {
    var startDatetemp: Date = new Date(this.ranges[0].toString());
    this.startDate = new Date(this.ranges[0].toString());
    startDatetemp.setDate(startDatetemp.getDate() + 2);
    this.wedDate = startDatetemp;
    return this.wedDate;
  }

  /**
   * get thursday date
   */
  public getThuDate(): Date {
    var startDatetemp: Date = new Date(this.ranges[0].toString());
    this.startDate = new Date(this.ranges[0].toString());
    startDatetemp.setDate(startDatetemp.getDate() + 3);
    this.thuDate = startDatetemp;
    return this.thuDate;
  }

  /**
   * get friday date
   */
  public getFriDate(): Date {
    var startDatetemp: Date = new Date(this.ranges[0].toString());
    this.startDate = new Date(this.ranges[0].toString());
    startDatetemp.setDate(startDatetemp.getDate() + 4);
    this.friDate = startDatetemp;
    return this.friDate;
  }

  /**
   * get saturday date
   */
  public getSatDate(): Date {
    var startDatetemp: Date = new Date(this.ranges[0].toString());
    this.startDate = new Date(this.ranges[0].toString());
    startDatetemp.setDate(startDatetemp.getDate() + 5);
    this.satDate = startDatetemp;
    return this.satDate;
  }

  /**
   * get sunday date
   */
  public getSunDate(): Date {
    return this.sunDate = this.ranges[1];
  }

  /**
   * Do totalWeeklyHours
   */
  public weekTotal(): void {
    let i: number = 0;
    // Set Deafult Zero.....
    this.allWeeklyHours = 0;
    this.totalMon = 0;
    this.totalTue = 0;
    this.totalWed = 0;
    this.totalThu = 0;
    this.totalFri = 0;
    this.totalSat = 0;
    this.totalSun = 0;

    for (const timecard of this.timecardForm.getRawValue().timeCard) {
      timecard.totalHours = Number(timecard.monday) +
        Number(timecard.tuesday) +
        Number(timecard.wednesday) +
        Number(timecard.thursday) +
        Number(timecard.friday) +
        Number(timecard.saturday) +
        Number(timecard.sunday);

      this.timecardForm.get(`timeCard.${i}`).patchValue({
        totalHours: timecard.totalHours
      });

      // Column wise Total
      this.totalMon = this.totalMon + Number(timecard.monday);
      this.totalTue = this.totalTue + Number(timecard.tuesday);
      this.totalWed = this.totalWed + Number(timecard.wednesday);
      this.totalThu = this.totalThu + Number(timecard.thursday);
      this.totalFri = this.totalFri + Number(timecard.friday);
      this.totalSat = this.totalSat + Number(timecard.saturday);
      this.totalSun = this.totalSun + Number(timecard.sunday);
      i++;
    }

    // Main Total of row column
    this.allWeeklyHours = this.allWeeklyHours +
      this.totalMon +
      this.totalTue +
      this.totalWed +
      this.totalThu +
      this.totalFri +
      this.totalSat +
      this.totalSun;
    this.ranges = this.timecardForm.controls['weekRange'].value;
  }

  /**
   * decrement week
   */
  public decrementWeek(): void {
    this.removeCards();

    var startDatetemp: Date = new Date(this.ranges[0].toString());
    this.startDate = new Date(this.ranges[0].toString());
    var endDatetemp: Date = new Date(this.ranges[1].toString());
    this.endDate = new Date(this.ranges[1].toString());
    startDatetemp.setDate(startDatetemp.getDate() - 7);
    endDatetemp.setDate(endDatetemp.getDate() - 7);
    this.startDate = startDatetemp;
    this.endDate = endDatetemp;
    this.ranges[0] = this.startDate;
    this.ranges[1] = this.endDate;
    this.timecardForm.controls['weekRange'].setValue(this.ranges);
    this.getTimecardByWeek();
  }

  /**
   * increment week
   */
  public incrementWeek(): void {
    this.removeCards();

    var startDatetemp: Date = new Date(this.ranges[0].toString());
    this.startDate = new Date(this.ranges[0].toString());
    var endDatetemp: Date = new Date(this.ranges[1].toString());
    this.endDate = new Date(this.ranges[1].toString());
    startDatetemp.setDate(startDatetemp.getDate() + 7);
    endDatetemp.setDate(endDatetemp.getDate() + 7);
    this.startDate = startDatetemp;
    this.endDate = endDatetemp;
    this.ranges[0] = this.startDate;
    this.ranges[1] = this.endDate;
    this.timecardForm.controls['weekRange'].setValue(this.ranges);
    this.getTimecardByWeek();
  }

  /**
   * Change flag when click on date picker
   */
  public getFlag(): void {
    this.flag = true;
  }

  /**
   * when select date
   */
  public weekDates(): void {
    let tempDate: TimeCard = this.timecardForm.controls['weekRange'].value;
    this.ranges[0] = tempDate[0];
    this.ranges[1] = tempDate[1];

    // Click on time range after change data
    if (this.flag) {
      this.checkDay();
      if (this.mondayCheck && this.sundayCheck) {
        this.removeCards();
        this.getTimecardByWeek();
      } else {
        this.toastr.warning('Week Should be 7 Days [Monday-To-Sunday].', 'Warning', { timeOut: 4000 });
        this.timecardForm.patchValue({ weekRange: [new Date(this.oldDate[0]), new Date(this.oldDate[1])] });
      }
    }
  }

  /**
   * addNewTimecard
   * @description to add new timecard for week
   */
  public addNewTimecard(): void {
    this.cardCounter++;
    const control: FormArray = this.timecardForm.controls.timeCard as FormArray;
    control.push(this.timecardPresenter.initTimecard());
  }

  /**
   * removeTimecard
   * @param i index of timecard to remove
   * @description to remove timecard from table
   */
  public removeTimecard(i: number): void {
    const control: FormArray = this.timecardForm.controls.timeCard as FormArray;
    control.removeAt(i);

    // Again intlization value
    this.weekTotal();
  }

  /**
   * submit time-card
   */
  public submitTimeCard(): void {
    let timeCard: Week;
    let weeks: Week = this.timecardForm.get('weekRange').value;
    weeks[0] = this.datePipe.transform(weeks[0], 'yyyy-MM-dd');
    weeks[1] = this.datePipe.transform(weeks[1], 'yyyy-MM-dd');
    weeks[0] = new Date(weeks[0]).toJSON();
    weeks[1] = new Date(weeks[1]).toJSON();
    this.timecardForm.patchValue({ weekRange: weeks });

    for (const timecard of this.timecardForm.get('timeCard').value) {
      delete timecard.totalHours;
      if (timecard.timeCardId === null) {
        delete timecard.timeCardId;
      }
      if (timecard.approvalStatusId === 3 || timecard.approvalStatusId === 5) {
        timecard.approvalStatusId = 1;
      }
      if (timecard.monday === null) {
        timecard.monday = 0;
      }
      if (timecard.tuesday === null) {
        timecard.tuesday = 0;
      }
      if (timecard.wednesday === null) {
        timecard.wednesday = 0;
      }
      if (timecard.thursday === null) {
        timecard.thursday = 0;
      }
      if (timecard.friday === null) {
        timecard.friday = 0;
      }
      if (timecard.saturday === null) {
        timecard.saturday = 0;
      }
      if (timecard.sunday === null) {
        timecard.sunday = 0;
      }
      timecard.subProjectId = parseInt(timecard.subProjectId);
      timecard.hoursTypeId = parseInt(timecard.hoursTypeId);
    }

    timeCard = this.timecardForm.get('timeCard.0').value;
    if (timeCard.timeCardId) {
      this.updateTimeCard.emit(this.timecardForm.value);
    } else {
      this.addTimeCard.emit(this.timecardForm.value);
    }

    this.removeCards();
  }

  /**
   * deleteTimeCard
   * @param i Index
   */
  public deleteTimeCard(i: number, timeCardId: number): void {
    if (timeCardId !== null) {
      this.confirmationDialogService.open();
      this.confirmationDialogService.modalData.subscribe((value: boolean) => {
        if (value) {
          this.deleteTimeCardEvent.emit(timeCardId);
          // remove time card
          this.removeCards();
        }
      });
    } else {
      // remove time card
      this.removeTimecard(i);
    }
  }

  /**
   * getTimecardByWeek
   * @description to get submitted hours by week
   */
  public getTimecardByWeek(): void {
    this.flag = false;
    let tempVar: number = 0;
    let currentWeekRange: Date[] | string[];
    let statusValue: Week[];

    for (const time of this.timeCardDetail) {
      statusValue = time.timeCard;
      // if (time.employeeId === employeeID) {
      let card: TimeCard = time;
      currentWeekRange = this.timecardForm.get('weekRange').value;
      currentWeekRange = [new Date(currentWeekRange[0]).toLocaleDateString(), new Date(currentWeekRange[1]).toLocaleDateString()]
      this.oldDate = currentWeekRange;
      let weekRange: Date[] | string[] = [new Date(card.weekRange[0]).toLocaleDateString(), new Date(card.weekRange[1]).toLocaleDateString()];
      if (currentWeekRange[0] === weekRange[0] && currentWeekRange[1] === weekRange[1]) {
        tempVar++;
        let timeCardLength: Week[] = time.timeCard;
        let i: number = 0;
        for (const timecard of timeCardLength) {
          this.addNewTimecard();
          if (timecard.approvalStatusId === 2 || timecard.approvalStatusId === 4) {
            this.timecardForm.get(`timeCard.${i}`).disable();
          } else {
            this.timecardForm.get(`timeCard.${i}`).enable();
          }
          i++;
        }
        this.removeTimecard(this.cardCounter);
        this.timecardForm.patchValue(card);
        this.timecardForm.patchValue({ weekRange: [new Date(card.weekRange[0]), new Date(card.weekRange[1])] });
        this.submitButton = 'Update';
      }
      // }
    }
    this.setDefalt(tempVar);
    this.weekTotal();
  }

  /**
   * setDefalt value zero
   * @param tempVar flag value
   */
  private setDefalt(tempVar: number): void {
    if (tempVar === 0) {
      this.timecardForm.get('timeCard').enable();
      let setDefaultNull: TimeCard = {
        // id: null,
        weekRange: this.timecardForm.get('weekRange').value,
        employeeId: employeeID,
        timeCard: [{
          timeCardId: null,
          subProjectId: null,
          monday: null,
          tuesday: null,
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
          hoursTypeId: null,
          remark: '',
          approvalStatusId: 1,
          totalHours: 0
        }]
      }
      this.timecardForm.patchValue(setDefaultNull);
      this.submitButton = 'Submit';
    }
  }

  /**
   * Remove All Cards 
   */
  private removeCards(): void {
    while (this.cardCounter > 0) {
      this.removeTimecard(this.cardCounter);
      this.cardCounter--;
    }
  }
}
