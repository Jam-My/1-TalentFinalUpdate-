import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Employee } from '../../models/employee.model';
import { ProjectList } from '../../models/project-list.model';
import { StaffingSheet } from '../../models/staffing-sheet.model';
import { StaffingSheetPresenter } from '../staffing-sheet-presenter/staffing-sheet.presenter';

import 'jspdf-autotable';
import jsPDF from 'jspdf';

/**
 * Component
 */
@Component({
  selector: 'staffing-sheet-presentation-ui',
  templateUrl: './staffing-sheet.presentation.html',
  viewProviders: [StaffingSheetPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffingSheetPresentation implements OnInit {

  // gets project  
  @Input() public set project(projectDetail: ProjectList) {
    this.weekCountOfMonths = [];
    let today: Date | string = new Date();
    let enddate: Date | string;
    let endDatetemp: Date | string;
    if (projectDetail) {
      this.projectDetail = projectDetail;
      this.totalSubmittedHours = projectDetail.submittedHours;
      this.getFromdate = new Date(this.projectDetail.projectStartDate);
      this.getFromdate.setDate(this.getFromdate.getDate() - (this.getFromdate.getDay() + 6) % 7);

      this.getTodate = new Date(this.projectDetail.projectEndDate);
      this.weeks = Math.ceil((((this.getTodate - this.getFromdate) / (1000 * 3600 * 24)) / 7));
      this.subProjectId = projectDetail.subProjectId;

      this.getFromdate = new Date(this.projectDetail.projectStartDate);

      today = this.datePipe.transform(today, 'yyyy-MM-dd');
      enddate = this.datePipe.transform(this.getTodate, 'yyyy-MM-dd');
      if (today >= enddate) {
        today = enddate;
      }
      today = new Date(today);
      this.projectMonths = today.getMonth() - this.getFromdate.getMonth() + (12 * (today.getFullYear() - this.getFromdate.getFullYear()))
      endDatetemp = this.datePipe.transform(this.getFromdate, 'yyyy-MM-dd');
      endDatetemp = new Date(endDatetemp);

      for (let i: number = 0; i < this.projectMonths + 1; i++) {
        endDatetemp.setMonth(endDatetemp.getMonth() + 0);
        endDatetemp = new Date(endDatetemp);
        this.weekCountOfMonths.push(this.getTotalWeeks(endDatetemp));
      }

    }
  }
  public get project(): ProjectList {
    return this.projectDetail;
  }

  // gets project  
  @Input() public set subProject(subProjectDetail: ProjectList) {
    if (subProjectDetail) {
      this.subProjectDetail = subProjectDetail;
      this.subProjectId = subProjectDetail.subProjectId;
    }
  }
  public get subProject(): ProjectList {
    return this.subProjectDetail;
  }

  // get all role list
  @Input() public set staffingSheets(staffingSheetListDetail: StaffingSheet[]) {
    if (staffingSheetListDetail) {
      this.colArray = [];
      let i: number = 0;
      let j: number = 0;
      this.weekCount = 0;
      for (let month of this.weekCountOfMonths) {
        j = 0;
        for (let week of this.weekCountOfMonths[i]) {
          if (week <= this.currentDate) {
            j++;
            this.weekCount++;
          }
        }
        this.colArray.push(j);
        i++;
      }
      setTimeout(() => { }, 500);
      this.staffingSheetListDetail = staffingSheetListDetail;
      this.totalResources = 0;
      this.totalHours = 0;
      this.grandTotalAmount = 0;
      this.grandTotalBillRate = 0;
      this.grandTotalPayRate = 0;
      this.totalResources = staffingSheetListDetail.length;
      for (let list of this.staffingSheetListDetail) {
        this.totalHours = this.totalHours + this.getTotalBillableHours(list.weeklyBillableHours);
        this.grandTotalAmount = this.grandTotalAmount + this.getTotalBillableAmount(list.billRate, list.weeklyBillableHours);
        this.grandTotalBillRate = this.grandTotalBillRate + list.billRate;
        this.grandTotalPayRate = this.grandTotalPayRate + list.payRate;
      }
      this.totalSubmittedHours = this.projectDetail.submittedHours;
      this.progress = Math.round((this.totalSubmittedHours * 100 / this.totalHours)) + '%';
    }
  }
  public get staffingSheets(): StaffingSheet[] {
    return this.staffingSheetListDetail;
  }

  // employee list for role....
  @Input() public set employeeList(employees: Employee[]) {
    this.approverList = employees;
    this.employee = employees;
  }
  public get employeeList(): Employee[] {
    return this.employee;
  }

  // emit subProjectId
  @Output() public sendSubProjectId: EventEmitter<number>;

  // colspan array
  public colArray: number[];
  // subProjectId 
  public subProjectId: number;
  // approver list
  public approverList: Employee[];
  // stores the role list details
  public staffingSheetListDetail: StaffingSheet[];
  // total resources
  public totalResources: number;
  // total hours
  public totalHours: number;
  // totalSubmittedHours
  public totalSubmittedHours: number;
  // total estimated hours
  public totalEstimatedHours: number;
  // progress
  public progress: number | string;
  // project months
  public projectMonths: number;
  // count week of months;
  public weekCountOfMonths: any[] = [];
  // grand total of billRate
  public grandTotalBillRate: number;
  // grand total of payRate
  public grandTotalPayRate: number;
  // grand total of total-amount
  public grandTotalAmount: number;
  // today date
  public currentDate: Date | string;
  // stores the projects Details
  public subProjectDetail: ProjectList;
  // project id
  public newSubProjectId: number;
  // week count
  public weekCount: number;
  // store employee list
  private employee: Employee[];
  // stores the project Details
  private projectDetail: ProjectList;
  // get from date          
  private getFromdate: any;
  // get to date
  private getTodate: any;
  // count weeks      
  private weeks: number;


  constructor(
    private staffingSheetPresenter: StaffingSheetPresenter,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) {
    this.sendSubProjectId = new EventEmitter<number>();
    this.totalSubmittedHours = 0;
    this.totalEstimatedHours = 0;
    this.totalResources = 0;
    this.totalHours = 0;
    this.progress = 0 + '%';
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.currentDate = new Date(this.currentDate);
    this.colArray = [];
    this.weekCount = 0;
    this.newSubProjectId = null;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.newSubProjectId = this.activatedRoute.snapshot.params['id'];
    if (this.newSubProjectId) {
      this.sendSubProjectId.emit(this.newSubProjectId);
    } else {
      this.newSubProjectId = null;
    }
  }

  /**
   * getTotalWeeks
   * @param date date
   */
  public getTotalWeeks(date: Date): Date[] {
    // let d = new Date();
    let month: number = date.getMonth();
    let mondays: Date[] = [];
    date.setDate(1);
    // Get the first Monday in the month
    while (date.getDay() !== 1) {
      date.setDate(date.getDate() + 1);
    }
    // Get all the other Mondays in the month
    while (date.getMonth() === month) {
      mondays.push(new Date(date.getTime()));
      date.setDate(date.getDate() + 7);
    }
    return mondays;
  }

  /**
   * get total billable-hours
   * @param weeklyBillableHours weekly billable hours
   */
  public getTotalBillableHours(weeklyBillableHours: number): number {
    this.totalEstimatedHours = weeklyBillableHours * this.weeks;
    return this.totalEstimatedHours;
  }

  /**
   * get total billable amount
   * @param billRate bill rate
   * @param weeklyBillableHours  weekly billable hours
   */
  public getTotalBillableAmount(billRate: number, weeklyBillableHours: number): number {
    this.totalEstimatedHours = weeklyBillableHours * this.weeks;
    return this.totalEstimatedHours * billRate;
  }

  /**
   * change project
   */
  public changeStaffSheet(event: any): void {
    this.sendSubProjectId.emit(event.target.value);
  }

  /**
   * downloadPDF
   * @description to download week report as PDF
   */
  public downloadPDF(): void {
    // tslint:disable-next-line: typedef
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFont('times');
    doc.text(`${this.project.subProjectName} [${this.datePipe.transform(this.project.projectStartDate, 'dd-MMM yyyy')} To ${this.datePipe.transform(this.project.projectEndDate, 'dd-MMM yyyy')}]`, 150, 10, null, null, 'center');
    doc.autoTable({ html: '#my-table' });
    doc.save(`Staffing Sheet_${new Date().toJSON()}` + '.pdf');
  }
}
