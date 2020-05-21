import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { MemberListPresenter } from '../member-list-presenter/member-list.presenter';
import { ProjectList } from '../../models/project-list.model';
import { Report } from '../../models/report-model';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';

import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { range } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

defineLocale('en-gb', enGbLocale);


/**
 * Component
 */
@Component({
  selector: 'member-list-presentation-ui',
  templateUrl: './member-list.presentation.html',
  viewProviders: [MemberListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListPresentation implements OnInit {

  // gets project list 
  @Input() public set project(projectDetail: ProjectList) {
    if (projectDetail) {
      this.projectDetail = projectDetail;
    }
  }
  public get project(): ProjectList {
    return this.projectDetail;
  }

  // gets all time card
  @Input() public set timeCard(timeCard: Report[]) {
    if (timeCard) {
      this.timeCardList = timeCard;
      this.getReportByWeek();
    }
  }
  public get timeCard(): Report[] {
    return this.timeCardList;
  }

  // Emit subProjectId for report list
  @Output() public changeProjectName: EventEmitter<number>;

  // project object  
  public projectDetail: ProjectList;
  //timecard model
  public timeCardList: Report[];
  //filter timecard model
  public filteredList: Report[];
  // daterangepicker cnfigration
  public dateRangePickerConfig: Partial<BsDaterangepickerConfig>;
  // date ranges [first,last]
  public ranges: Date[];
  // start date
  public startDate: Date;
  // end date
  public endDate: Date;
  // date picker form
  public dateForm: FormGroup;
  //For storing current page number
  public currentPage: number;
  //For storing size of page
  public pageSize: number;
  //For storing total records
  public totalRecords: number;
  // Selected project id
  public selectedProject: number;
  //For accordion view list show hide
  public showHideAaccordion: number;
  // flag for get report list data after click in date picker
  public flag: boolean;
  // monday check
  public mondayCheck: boolean;
  // sunday check
  public sundayCheck: boolean;
  // week check
  public weekCheck: boolean;
  // day number
  public daysDifference: number;
  // Old date store 
  private oldDate: Date[] | string[];

  constructor(
    private memberListPresenter: MemberListPresenter,
    private localeService: BsLocaleService,
    private datepipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.changeProjectName = new EventEmitter<number>();
    this.dateForm = this.memberListPresenter.createDateForm();
    this.dateRangePickerConfig = {
      rangeInputFormat: 'MMM DD, YYYY',
      showWeekNumbers: true,
      displayMonths: 1,
      selectWeekDateRange: true,
      selectFromOtherMonth: true
    };
    this.timeCardList = [];
    this.filteredList = [];
    this.ranges = [];
    this.selectedProject = null;
    this.currentPage = 1;
    this.pageSize = 10;
    this.flag = false;
    this.mondayCheck = false;
    this.sundayCheck = false;
    this.weekCheck = true;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.localeService.use('en-gb');
    this.ranges = this.dateForm.get('weekRange').value;
    this.oldDate = [new Date(this.ranges[0]).toLocaleDateString(), new Date(this.ranges[1]).toLocaleDateString()];
  }

  /**
   * decrement week
   * @description to decrement one week
   */
  public decrementWeek(): void {
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
    this.getReportByWeek()
  }

  /**
   * increment week
   * @description to increment one week
   */
  public incrementWeek(): void {
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
    this.getReportByWeek();
  }

  /**
   * getReportByWeek
   * @description get report list by week
   */
  public getReportByWeek(): void {
    this.flag = false;
    let tempDate: Report = this.dateForm.controls['weekRange'].value;
    this.ranges[0] = tempDate[0];
    this.ranges[1] = tempDate[1];
    let currentWeekRange: Date[] | string[];
    currentWeekRange = this.dateForm.get('weekRange').value;
    currentWeekRange = [new Date(currentWeekRange[0]).toLocaleDateString(), new Date(currentWeekRange[1]).toLocaleDateString()];
    this.oldDate = currentWeekRange;
    this.filteredList = this.timeCardList.filter((data: Report) => {
      if (new Date(data.weekRange[0]).toLocaleDateString() === currentWeekRange[0] && new Date(data.weekRange[1]).toLocaleDateString() === currentWeekRange[1]) {
        return data;
      } else {
        return null;
      }
    });
    this.totalRecords = this.filteredList.length;
  }

  /**
   * changeWeek
   * @description change week validation
   */
  public changeWeek(): void {
    let tempDate: Report = this.dateForm.controls['weekRange'].value;
    this.ranges[0] = tempDate[0];
    this.ranges[1] = tempDate[1];

    if (this.flag) {
      this.checkDay();
      if (this.mondayCheck && this.sundayCheck) {
        this.getReportByWeek();
      } else {
        this.toastr.warning('Week Should be 7 Days [Monday-To-Sunday].', 'Warning', { timeOut: 4000 });
        this.dateForm.patchValue({ weekRange: [new Date(this.oldDate[0]), new Date(this.oldDate[1])] })
      }
    }
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
   * Change flag when click on date picker
   */
  public getFlag(): void {
    this.flag = true;
  }

  /**
   * downloadPDF
   * @description to download week report as PDF
   */
  public downloadPDF(): void {
    // tslint:disable-next-line: typedef
    const doc = new jsPDF();

    let tableData: any[] = [];
    let i: number = 1;
    for (let data of this.filteredList) {
      let rm1: string;
      let rm2: string;
      if (data.approvalStatusId === 2 || data.approvalStatusId === 4) {
        rm1 = '100%';
      } else {
        rm1 = '0%';
      }
      if (data.approvalStatusId === 4) {
        rm2 = '100%';
      } else {
        rm2 = '0%';
      }

      tableData.push([
        i.toString(),
        data.subProjectName,
        data.employeeName,
        data.totalHours.toString(),
        rm1,
        rm2,
        data.remark
      ]);
      i++;
    }

    doc.setFont('times');
    doc.text(`Timecard Report (${this.datepipe.transform(this.ranges[0], 'dd-MMM yyyy')} to ${this.datepipe.transform(this.ranges[1], 'dd-MMM yyyy')})`, 105, 10, null, null, 'center');
    doc.autoTable({
      head: [['Number', 'Project', 'User', 'Hours', 'Approved By RM1', 'Approved By RM2', 'Comments']],
      body: tableData
    })
    doc.save(`Timecard Report (${this.datepipe.transform(this.ranges[0], 'dd-MMM yyyy')} to ${this.datepipe.transform(this.ranges[1], 'dd-MMM yyyy')})` + '.pdf')
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
   * Sets the current page on page changes
   * @param pageNumber Current page number
   */
  public onPageChanges(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  /**
   * changeProject
   * @description get report list when project name change
   */
  public changeProject(): void {
    this.changeProjectName.emit(this.selectedProject);
  }

  /**
   * showData
   * @param index record index
   * @description show/hide accordion view fields
   */
  public showHideData(index: number): void {
    if (this.showHideAaccordion === index) {
      this.showHideAaccordion = -1;
    } else {
      this.showHideAaccordion = index;
    }
  }
}
