/**
 * @author Shiv Desai
 */
import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { Approval } from '../../models/approval.model';
import { ApprovalPresenter } from '../approval-presenter/approval.presenter';
import { ProjectList } from '../../models/project-list.model';
import { FormGroup } from '@angular/forms';
import { BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { ApproverProject } from '../../models/approver-project.model';
import { ApprovalPut } from '../../models/approval-put.model';
import { ToastrService } from 'ngx-toastr';

defineLocale('en-gb', enGbLocale);


/**
 * Component
 */
@Component({
  selector: 'approval-presentation-ui',
  templateUrl: './approval.presentation.html',
  viewProviders: [ApprovalPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalPresentation implements OnInit {

  // gets project list 
  @Input() public set project(projectDetail: ApproverProject[]) {
    if (projectDetail) {
      this.projectDetail = projectDetail;
      // this.projectManager(this.projectDetail);
    }
  }
  public get project(): ApproverProject[] {
    return this.projectDetail;
  }

  // gets all time card
  @Input() public set approval(timeCard: Approval[]) {
    if (timeCard) {
      this.timeCardList = timeCard;
      this.getApprovalByWeek();
    }
  }
  public get approval(): Approval[] {
    return this.timeCardList;
  }

  // Emit approve or reject by reporting manager
  @Output() public saveApproval: EventEmitter<ApprovalPut[]>;
  // Emit approve or reject by reporting manager
  @Output() public changeProjectName: EventEmitter<number>;

  // project object  
  public projectDetail: ApproverProject[];
  // timecard list
  public timeCardList: Approval[];
  //filter timecard model
  public filteredList: Approval[];
  //For storing current page number
  public currentPage: number;
  //For storing size of page
  public pageSize: number;
  //For storing total records
  public totalRecords: number;
  // Status of approved or rejected
  public submitedStatus: string;
  // check Box Selected change
  public checkBoxSelect: boolean;
  // date ranges [first,last]
  public ranges: Date[];
  // start date
  public startDate: Date;
  // end date
  public endDate: Date;
  // daterangepicker cnfigration
  public dateRangePickerConfig: Partial<BsDaterangepickerConfig>;
  // date picker form
  public dateForm: FormGroup;
  // Project Id
  public projectId: number;
  // set data of timecard page wise for purpose of select all page wise
  public timeCardPage: Approval[];
  // filter project data
  public filterProject: ProjectList[];
  // enable/disable submit button
  public enableButton: boolean;
  // action label
  public actionLabel: string;
  // flag for get timecard data after click in date picker
  public flag: boolean;
  // day number
  public daysDifference: number;
  // monday check
  public mondayCheck: boolean;
  // sunday check
  public sundayCheck: boolean;
  // week check
  public weekCheck: boolean;
  // saturday date
  public satDate: Date;
  // disabled button submit time...
  public timeChecked: boolean;

  // Old date store 
  private oldDate: Date[] | string[];
  // store approver id 
  private approverRoleId: number;
  // Send Status...
  private status: boolean = false;
  private checkBoxLength: number = 0;

  constructor(
    private approvalPresenter: ApprovalPresenter,
    private localeService: BsLocaleService,
    private toastr: ToastrService
  ) {
    this.enableButton = false;
    this.timeChecked = false;
    this.actionLabel = 'Approve';
    this.submitedStatus = null;
    this.saveApproval = new EventEmitter<ApprovalPut[]>();
    this.changeProjectName = new EventEmitter<number>();
    this.currentPage = 1;
    this.pageSize = 10;
    this.checkBoxSelect = false;
    this.ranges = [];
    this.approverRoleId = null;
    this.dateRangePickerConfig = {
      rangeInputFormat: 'MMM DD, YYYY',
      showWeekNumbers: true,
      displayMonths: 1,
      selectWeekDateRange: true,
      selectFromOtherMonth: true
    };
    this.projectDetail = [];
    this.timeCardList = [];
    this.filterProject = [];
    this.filteredList = [];
    this.flag = false;
    this.daysDifference = 6;
    this.mondayCheck = false;
    this.sundayCheck = false;
    this.weekCheck = true;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.localeService.use('en-gb');
    this.dateForm = this.approvalPresenter.createDateForm();
    this.ranges = this.dateForm.get('weekRange').value;
    this.projectId = null;

    this.oldDate = [new Date(this.ranges[0]).toLocaleDateString(), new Date(this.ranges[1]).toLocaleDateString()];
  }

  /**
   * This method will select or unselect checkbox
   * @param event Checkbox event
   */
  public selectAllTimeCard(event: MouseEvent): void {
    const event1: HTMLInputElement = event.target as HTMLInputElement
    this.enableButton = false;
    // Pagination set select all page wise
    this.timeCardPage = this.filteredList.slice((this.currentPage * this.pageSize) - this.pageSize, this.currentPage * this.pageSize);
    if (event1.checked) {
      this.timeChecked = true;
      this.timeCardPage.map((timeCard: Approval) => {
        timeCard.checked = true;
        this.checkBoxSelect = true;
        return timeCard;
      });
    } else {
      this.timeChecked = false;
      this.timeCardPage.map((timeCard: Approval) => {
        timeCard.checked = false;
        this.checkBoxSelect = false;
        return timeCard;
      });
    }
  }

  /**
   * This method will select or unselect checkbox
   * @param event Checkbox event
   */
  public checkAllTimeCard(event: MouseEvent): void {
    const event1: HTMLInputElement = event.target as HTMLInputElement
    if (event1.checked) {
      this.timeChecked = true;
      this.filteredList.map((timeCard: Approval) => {
        timeCard.checked = true;
        this.checkBoxSelect = true;
        return timeCard;
      });
    } else {
      this.unChecked();
    }
    this.checkBoxLength = 0;
  }

  public unChecked(): void {
    this.timeChecked = false;
    this.filteredList.map((timeCard: Approval) => {
      timeCard.checked = false;
      this.checkBoxSelect = false;
      return timeCard;
    });
    this.checkBoxSelect = false;
    this.checkBoxLength = 0;
    this.timeChecked = false;
    this.enableButton = false;
  }

  /**
   * select perticular/multiple CheckBox
   * @param event Event of check box
   */
  public selectCheckBox(event: MouseEvent): void {
    // Pagination set select all page wise
    this.timeCardPage = this.filteredList.slice((this.currentPage * this.pageSize) - this.pageSize, this.currentPage * this.pageSize);
    const checkLength: number = this.timeCardPage.length;
    for (const checked of this.filteredList) {
      if (checked.checked) {
        this.checkBoxSelect = false;
        this.enableButton = true;
        this.timeChecked = true;
        this.checkBoxLength++;
        break;
      } else {
        this.timeChecked = false;
        this.enableButton = false;
        this.checkBoxLength = 0;
      }
    }
    if (this.checkBoxLength === checkLength) {
      this.checkBoxSelect = true;
    } else {
      this.checkBoxSelect = false;
    }
  }

  /**
   * Number of pages
   */
  public numberOfPages(): number {
    if (Math.ceil(this.totalRecords / this.pageSize) >= 1) {
      return Math.ceil(this.totalRecords / this.pageSize);
    } else {
      return 1;
    }
  }

  /**
   * Employees hour approve or reject
   */
  public approveReject(): void {
    let timecard: Approval[] = this.filteredList.filter((data: Approval) => data.checked);
    let newApprovalList: ApprovalPut[] = [];
    let newList: ApprovalPut;
    for (const time of timecard) {
      if (this.approverRoleId === 1 && time.approvalStatusId === 1) {
        if (this.submitedStatus === 'approved' && time) {
          time.approvalStatusId = 2;
          this.status = true;
        } else if (this.submitedStatus === 'rejected') {
          time.approvalStatusId = 3;
          this.status = false;
        }
      } else if (this.approverRoleId === 2 && time.approvalStatusId === 2) {
        if (this.submitedStatus === 'approved' && time) {
          time.approvalStatusId = 4;
          this.status = true;
        } else if (this.submitedStatus === 'rejected') {
          time.approvalStatusId = 5;
          this.status = false;
        }
      }
      newList = {
        timeCardId: time.timeCardId,
        employeeId: time.employeeId,
        approvalStatusId: time.approvalStatusId,
        subProjectId: time.subProjectId,
        status: this.status
      }
      newApprovalList.push(newList);
    }
    this.saveApproval.emit(newApprovalList);

    // Reset check box
    if (this.timeCardPage) {
      this.timeCardPage.map((timeCard: Approval) => {
        timeCard.checked = false;
        this.checkBoxSelect = false;
      });
    } else {
      // Reset check box
      this.filteredList.map((timeCard: Approval) => {
        timeCard.checked = false;
        this.checkBoxSelect = false;
      });
    }
    this.submitedStatus = null;
    this.enableButton = false;
  }

  /**
   * Change Project name
   */
  public changeProject(): void {
    for (const project of this.projectDetail) {
      if (project.subProjectId == this.projectId) {
        this.approverRoleId = project.role;
      }
    }
    this.changeProjectName.emit(this.projectId);
  }

  /**
   * Sets the current page on page changes
   * @param pageNumber Current page number
   */
  public onPageChanges(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  /**
   * Change flag when click on date picker
   */
  public getFlag(): void {
    this.flag = true;
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
   * when select date
   */
  public weekDates(): void {
    let tempDate: Approval = this.dateForm.controls['weekRange'].value;
    this.ranges[0] = tempDate[0];
    this.ranges[1] = tempDate[1];
    // Click on time range after change data
    if (this.flag) {
      this.checkDay();
      if (this.mondayCheck && this.sundayCheck) {
        this.getApprovalByWeek();
      } else {
        this.toastr.warning('Week Should be 7 Days [Monday-To-Sunday].', 'Warning', { timeOut: 4000 });
        this.dateForm.patchValue({ weekRange: [new Date(this.oldDate[0]), new Date(this.oldDate[1])] });
      }
    }
  }

  /**
   * getApprovalByWeek
   * @description get report list by week
   */
  public getApprovalByWeek(): void {
    this.flag = false;
    let tempDate: Approval = this.dateForm.controls['weekRange'].value;
    this.ranges[0] = tempDate[0];
    this.ranges[1] = tempDate[1];
    let currentWeekRange: Date[] | string[];
    currentWeekRange = this.dateForm.get('weekRange').value;
    currentWeekRange = [new Date(currentWeekRange[0]).toLocaleDateString(), new Date(currentWeekRange[1]).toLocaleDateString()];
    this.oldDate = currentWeekRange;
    this.filteredList = this.timeCardList.filter((data: Approval) => {
      if (new Date(data.weekRange[0]).toLocaleDateString() === currentWeekRange[0] && new Date(data.weekRange[1]).toLocaleDateString() === currentWeekRange[1]) {
        if (this.approverRoleId === 1) {
          if (data.approvalStatusId === 1 || data.approvalStatusId === 2 || data.approvalStatusId === 4) {
            return data;
          }
        } else if (this.approverRoleId === 2) {
          if (data.approvalStatusId === 2 || data.approvalStatusId === 4) {
            return data;
          }
        }
      } else {
        return null;
      }
    });
    this.totalRecords = this.filteredList.length;
  }

  /**
   * decrement week
   * @description to decrement one week
   */
  public decrementWeek(): void {
    this.unChecked();

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
    this.dateForm.controls['weekRange'].setValue(this.ranges);
    this.getApprovalByWeek();
  }

  /**
   * increment week
   * @description to increment one week
   */
  public incrementWeek(): void {
    this.unChecked();

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
    this.dateForm.controls['weekRange'].setValue(this.ranges);
    this.getApprovalByWeek();
  }

  /**
   * approve/reject action selection
   * @param event event for dropdown
   */
  public actionSelection(event: MouseEvent): void {
    const event1: HTMLInputElement = event.target as HTMLInputElement
    let actionValue: string = event1.value;
    if (actionValue === 'approved') {
      this.enableButton = true;
      this.actionLabel = 'Approve';
    }
    else {
      this.enableButton = true;
      this.actionLabel = 'Reject';
    }
  }
}
