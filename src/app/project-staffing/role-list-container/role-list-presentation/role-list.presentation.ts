import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConfirmationDialogService } from 'src/app/core/confirmation-dialog/confirmation-dialog.service';
import { Employee } from '../../models/employee.model';
import { Location } from '../../models/location.model';
import { PayCycle } from '../../models/pay-cycle.model';
import { ProjectList } from '../../models/project-list.model';
import { Role } from '../../models/role.model';
import { RoleListPresenter } from '../role-list-presenter/role-list.presenter';
import { Staffing } from '../../models/staffing.model';
import { Technology } from '../../models/technology.model';

/**
 * Component
 */
@Component({
  selector: 'role-list-presentation-ui',
  templateUrl: './role-list.presentation.html',
  viewProviders: [RoleListPresenter]
})
export class RoleListPresentation implements OnInit {

  // gets project  
  @Input() public set project(projectDetail: ProjectList) {
    if (projectDetail) {
      this.projectDetail = projectDetail;
      this.totalSubmittedHours = this.projectDetail.submittedHours;
      this.today = new Date();
      this.getFromdate = new Date(this.projectDetail.projectStartDate);
      this.getFromdate.setDate(this.getFromdate.getDate() - (this.getFromdate.getDay() + 6) % 7);
      this.getTodate = new Date(this.projectDetail.projectEndDate);
      this.weeks = Math.ceil((((this.getTodate - this.getFromdate) / (1000 * 3600 * 24)) / 7));
      this.subProjectId = projectDetail.subProjectId;
    }
  }
  public get project(): ProjectList {
    return this.projectDetail;
  }

  // gets all roles
  @Input() public set roles(roleDetail: Role[]) {
    if (roleDetail) {
      this.roleDetail = roleDetail;
    }
  }
  public get roles(): Role[] {
    return this.roleDetail;
  }

  // gets all technologies
  @Input() public set technologies(technologyDetail: Technology[]) {
    if (technologyDetail) {
      this.technologyDetail = technologyDetail;
    }
  }
  public get technologies(): Technology[] {
    return this.technologyDetail;
  }

  // gets all payCycle
  @Input() public set payCycle(payCycleDetail: PayCycle[]) {
    if (payCycleDetail) {
      this.payCycleDetail = payCycleDetail;
    }
  }
  public get payCycle(): PayCycle[] {
    return this.payCycleDetail;
  }

  // gets all locations
  @Input() public set locations(locationDetail: Location[]) {
    if (locationDetail) {
      this.locationDetail = locationDetail;
    }
  }
  public get locations(): Location[] {
    return this.locationDetail;
  }

  // get all role listRoleList
  @Input() public set staffing(roleListDetail: Staffing[]) {
    if (roleListDetail) {
      this.roleListDetail = roleListDetail;
      this.totalResources = 0;
      this.filterList = roleListDetail.map((data: Staffing) => data.role);
      this.filterList = this.filterList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
      this.filteredRoleList = roleListDetail;
      this.filteredRoleList = this.filteredRoleList.length > 0 ? this.filteredRoleList : roleListDetail;
      this.filteredRoleList.sort((a: Staffing, b: Staffing) => a > b ? 1 : -1);
      this.totalHours=0;
      for (let list of this.roleListDetail) {
        this.totalResources = this.totalResources + list.employeeId.length;
        this.totalHours = this.totalHours + this.getTotalBillableHours(list.weeklyBillableHours);
      }
      this.totalSubmittedHours = this.projectDetail.submittedHours;
      this.progress = Math.round((this.totalSubmittedHours * 100 / this.totalHours)) + '%';
      this.totalRecords = this.filteredRoleList.length;
    }
  }
  public get Staffing(): Staffing[] {
    return this.roleListDetail;
  }

  // employee list for role....
  @Input() public set employeeList(employees: Employee[]) {
    if (this.approverList === null) {
      this.approverList = employees;
    }
    this.employee = employees;
    this.roleListPresenter.newEmployee.next(employees);
  }
  public get employeeList(): Employee[] {
    return this.employee;
  }

  // event for add role
  @Output() public addRole: EventEmitter<Staffing>;
  // event for update staff
  @Output() public updateStaff: EventEmitter<Staffing>;

  // emit technology
  @Output() public technologyId: EventEmitter<number>;
  // emit technology
  @Output() public deleteStaff: EventEmitter<number>;


  public addRoles: Staffing;
  public subProjectId: number;
  
  // stores the role list details
  public roleListDetail: Staffing[];
  // stores the locations
  public locationDetail: Location[];
  // stores the technologies
  public technologyDetail: Technology[];
  // stores the pay cycle
  public payCycleDetail: PayCycle[];
  // stores the roles
  public roleDetail: Role[];
  // total hours
  public totalHours: number;
  // totalSubmittedHours
  public totalSubmittedHours: number;
  // total resources
  public totalResources: number;
  // total estimated hours
  public totalEstimatedHours: number;
  // progress
  public progress: number | string;
  // role filter List
  public filteredRoleList: Staffing[];
  // suggetion list
  public filterList: string[];
  // filter filed
  public field: string;
  // search string
  public filterQuery: string;
  // for check filter value 
  public filterFlag: boolean;
  // stores the name of field as per the model
  public fieldName: string;
  // for reversing the project list
  public reverse: boolean;
  // for storing current page number
  public currentPage: number;
  // for storing size of page
  public pageSize: number;
  // for storing total records
  public totalRecords: number;
  // for accordion view list show hide
  public showHideAaccordion: number;
  // index
  public i: number;
  // approver list
  public approverList: Employee[];
  // for edit row data
  public editable: number;
  // role form-group
  public roleForm: FormGroup;
  // stores the project Details
  private projectDetail: ProjectList;
  // store employee list
  private employee: Employee[];
  // get today date
  private today: any;
  // get from date          
  private getFromdate: any;
  // get to date
  private getTodate: any;
  // count weeks      
  private weeks: number;

  constructor(
    private roleListPresenter: RoleListPresenter,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.technologyId = new EventEmitter<number>();
    this.i = 1;
    this.addRole = new EventEmitter<Staffing>();
    this.updateStaff = new EventEmitter<Staffing>();
    this.deleteStaff = new EventEmitter<number>();
    this.totalResources = 0;
    this.totalHours = 0;
    this.totalSubmittedHours = 0;
    this.totalEstimatedHours = 0;
    this.progress = 0 + '%';
    this.field = 'role';
    this.filterQuery = 'Search...';
    this.filterFlag = false;
    this.fieldName = 'roleId';
    this.reverse = true;
    this.currentPage = 1;
    this.pageSize = 10;
    this.editable = -1;
    this.roleForm = this.roleListPresenter.buildRoleForm();
    this.approverList = null;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    // for all employee get first time
    this.technologyId.emit(null);
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
   * get total billable-hours
   * @param weeklyBillableHours weekly billable hours
   */
  public getTotalBillableHours(weeklyBillableHours: number): number {
    this.totalEstimatedHours = weeklyBillableHours * this.weeks;
    return this.totalEstimatedHours;
  }

  /**
   * overlay for add role
   * @param roleForm projectForm of type model Role Model
   */
  public loadRoleForm(): void {
    this.roleListPresenter.createRoleForm(this.roleDetail, this.technologyDetail, this.locationDetail, this.payCycleDetail, this.subProjectId).subscribe((roleData: Staffing) => {
      this.addRoles = roleData;
      this.addRole.emit(this.addRoles);
    })
    this.roleListPresenter.technologyId$.subscribe((data: number) => {
      this.technologyId.emit(data);
    })
  }

  /**
   * start edit
   */
  public startEdit(i: number, Staffing: Staffing): void {
    this.editable = i;

    this.roleForm.patchValue(Staffing);
    this.getEmployee();
  }

  /**
   * cancel edit
   */
  public cancelEdit(): void {
    this.editable = -1;
  }

  /**
   * save edit
   */
  public saveEdit(): void {
    this.updateStaff.emit(this.roleForm.value);
    this.cancelEdit();
  }

  /**
   * selectFilterField
   * @description select filed and set suggestion array
   */
  public selectFilterField(): void {
    this.filterList = this.roleListPresenter.selectFilterField(this.field, this.Staffing);
    this.filterList = this.filterList.map((item: string) => {
      if (item === null) {
        return '';
      } else {
        return item;
      }
    });
    this.filterList = this.filterList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
    this.checkValidFilter();
  }

  /**
   * filter
   */
  public filter(): void {
    this.currentPage = 1;
    this.filteredRoleList = this.roleListPresenter.filter(this.Staffing, this.field, this.filterQuery);
    this.totalRecords = this.filteredRoleList.length;
  }

  /**
   * filterResultSelected
   * @param result search string
   */
  public filterResultSelected(result: string): void {
    this.filterQuery = result;
  }
  /**
   * checkValidFilter
   * @description allow only if filter value is right for filter
   */
  public checkValidFilter(): void {
    if (this.filterQuery && this.filterQuery !== 'Search...') {
      this.filterFlag = true;
    } else {
      this.filterFlag = false;
      this.filterQuery = '';
      this.filter();
      this.filterQuery = 'Search...';
    }
  }

  /**
   * clear filter
   */
  public clearFilter(): void {
    this.reverse = true;
    this.filterFlag = false;
    this.fieldName = 'roleId';
    this.filterQuery = '';
    this.filter();
  }

  /**
   * function for sorting project list
   * @param fieldName Contains the name of field to sort with
   */
  public sorting(fieldName: string): void {
    //Gets the name of the field to which sorting should be applied
    this.fieldName = fieldName;
    //Sets reverse  to sort in ascending or descending order
    this.reverse = !this.reverse;
  }

  /**
   * number of pages
   */
  public numberOfPages(): number {
    if (Math.ceil(this.totalRecords / this.pageSize) >= 1) {
      return Math.ceil(this.totalRecords / this.pageSize);
    } else {
      return 1;
    }
  }

  /**
   * sets the current page on page changes
   * @param pageNumber Current page number
   */
  public onPageChanges(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  /**
   * show/hide Data(accordion)
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

  /**
   * open confirmation dialog
   */
  public openConfirmationDialog(id: number): void {
    this.confirmationDialogService.open();
    this.confirmationDialogService.modalData.subscribe((value: boolean) => {
      if (value) {
        this.deleteStaff.emit(id);
      }
    });

  }

  /**
   * get employee
   */
  public getEmployee(): void {
    this.technologyId.emit(this.roleForm.controls['technologyId'].value);
  }
}
