import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectList } from 'src/app/hours-submission/models/project-list.model';
import { ProjectListService } from '../services/project-list.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';
import { RoleListService } from '../services/role-list.service';
import { StaffingSheet } from '../models/staffing-sheet.model';

@Component({
  selector: 'staffing-sheet-container',
  templateUrl: './staffing-sheet.container.html'
})
export class StaffingSheetContainer implements OnInit {

  // observable to store staffing-sheet detail
  public staffingSheet$: Observable<StaffingSheet[]>;
  // observable for storing project
  public project$: Observable<ProjectList>;
  // observable for storing project list
  public subProject$: Observable<ProjectList[]>;
  // observable for storing employeeList
  public employeeList$: Observable<Employee[]>;

  // gets the sub project id
  private subProjectId: number;

  constructor(
    private projectListService: ProjectListService,
    private roleListService: RoleListService,
    private route: ActivatedRoute
  ) { }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    // this.subProjectId = Number(this.route.snapshot.paramMap.get('id'));
    // if (this.subProjectId) {
    // this.getProject(this.subProjectId);
    this.getEmployees();
    // }
    this.getSubProjects();
  }

  /**
   * Gets the project
   */
  public getProject(subProjectId: number): void {
    this.project$ = this.projectListService.getProject(subProjectId);
    this.getStaffingSheets(subProjectId);
  }

  /**
   * Gets the sub projects
   */
  public getSubProjects(): void {
    this.subProject$ = this.roleListService.getProjectList();
  }

  /**
   * Gets the employees
   */
  public getEmployees(): void {
    this.employeeList$ = this.roleListService.getEmployees();
  }

  /**
   * Gets the details of staffing list
   */
  public getStaffingSheets(subProjectId: number): void {
    this.project$ = this.projectListService.getProject(subProjectId);
    setTimeout(() => {
      this.staffingSheet$ = this.roleListService.getStaffingSheetList(subProjectId);
    }, 500);
  }
}
