import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Employee } from '../models/employee.model';
import { Location } from '../models/location.model';
import { Observable } from 'rxjs';
import { PayCycle } from '../models/pay-cycle.model';
import { ProjectList } from '../models/project-list.model';
import { ProjectListService } from '../services/project-list.service';
import { Role } from '../models/role.model';
import { RoleListService } from '../services/role-list.service';
import { Staffing } from '../models/staffing.model';
import { Technology } from '../models/technology.model';
import { ToastrService } from 'ngx-toastr';

/**
 * Component
 */
@Component({
  selector: 'role-list-container',
  templateUrl: './role-list.container.html'
})
export class RoleListContainer implements OnInit {

  // observable to store role detail
  public staffing$: Observable<Staffing[]>;
  // observable to store roles
  public roles$: Observable<Role[]>;
  // observable to store location
  public location$: Observable<Location[]>;
  // observable to store technology
  public technology$: Observable<Technology[]>;
  // observable to store pay cycle
  public payCycle$: Observable<PayCycle[]>;
  // observable for storing project
  public project$: Observable<ProjectList>;

  // observable for storing employeeList
  public employeeList$: Observable<Employee[]>;

  // gets the sub project id
  private subProjectId: number;

  constructor(
    private projectListService: ProjectListService,
    private roleListService: RoleListService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    this.subProjectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.subProjectId) {
      this.getProject(this.subProjectId);
    }
    this.getTechnologies();
    this.getLocations();
    this.getRoles();
    this.payCycle();
  }

  /**
   * Gets the project
   */
  public getProject(subProjectId: number): void {
    this.project$ = this.projectListService.getProject(subProjectId);
    this.getRoleList(subProjectId);
  }

  /**
   * Gets the roles
   */
  public getRoles(): void {
    this.roles$ = this.roleListService.getRoles();
  }

  /**
   * Gets the locations
   */
  public getLocations(): void {
    this.location$ = this.roleListService.getLocation();
  }

  /**
   * Gets the technologies
   */
  public getTechnologies(): void {
    this.technology$ = this.roleListService.getTechnology();

  }
  /**
   * Gets the pay cycle
   */
  public payCycle(): void {
    this.payCycle$ = this.roleListService.getPayCycle();
  }

  /**
   * Add new role to the list
   * @param roleDetails new roleDetails to add
   */
  public addRoleDetail(roleDetails: Staffing): void {
    this.roleListService.addRole(roleDetails).subscribe(() => {
      alert('Role Added');
      this.getRoleList(this.subProjectId);
    }
    )
  }

  /**
   * Update existing staff in the list
   * @param roleDetails updated roleDetails 
   */
  public updateStaff(roleDetails: Staffing): void {
    this.roleListService.updateStaff(roleDetails.staffingId, roleDetails).subscribe(() => {
      this.toastr.success('Staff has been updated', 'Success', { timeOut: 2000 });
      this.getRoleList(this.subProjectId);
    }
    )
  }

  /**
   * technologyId
   * @param id technology id to get employee
   */
  public technologyId(id: number): void {
    if (id == null) {
      this.employeeList$ = this.roleListService.getEmployees();
    } else {
      this.employeeList$ = this.roleListService.getEmployee(id);
    }
  }

  /**
   * addRole
   * @param roleData data to add new staff
   */
  public addRole(roleData: Staffing): void {
    this.roleListService.addRole(roleData).subscribe(() => {
      this.toastr.success('Role has been added', 'Success', { timeOut: 2000 });
      this.getRoleList(this.subProjectId);
    }
    )
  }

  /**
   * deleteStaff
   * @param id staff id to delete
   */
  public deleteStaff(id: number): void {
    this.roleListService.deleteStaff(id).subscribe(() => {
      this.toastr.success('Staff has been Deleted', 'Success', { timeOut: 2000 });
      this.getRoleList(this.subProjectId);
    })
  }

  /**
   * Gets the details of project list
   */
  private getRoleList(subProjectId: number): void {
    this.staffing$ = this.roleListService.getRoleList(subProjectId);
  }
}
