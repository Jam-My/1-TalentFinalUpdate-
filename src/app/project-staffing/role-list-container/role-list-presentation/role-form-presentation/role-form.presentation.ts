import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Employee } from 'src/app/project-staffing/models/employee.model';
import { RoleFormPresenter } from '../role-form-presenter/role-form.presenter';
import { Staffing } from '../../../models/staffing.model';
import { Technology } from 'src/app/project-staffing/models/technology.model';
import { PayCycle } from 'src/app/project-staffing/models/pay-cycle.model';
import { Role } from 'src/app/project-staffing/models/role.model';

/**
 * Component
 */
@Component({
  selector: 'role-form-presentation-ui',
  templateUrl: './role-form.presentation.html',
  viewProviders: [RoleFormPresenter],
})
export class RoleFormPresentation implements OnInit {

  // emit technology
  @Output() public technologyEmit: EventEmitter<number>;

  // Emit for add Role
  @Output() public addRole: EventEmitter<Staffing>;

  // Emit for close overlay
  @Output() public closeOverlay: EventEmitter<string>;

  //instance of role form
  public roleForm: FormGroup;
  public submitted: boolean;
  public totalRole: Role[];
  public technology: Technology[];
  public location: Location[];
  public payCycle: PayCycle[];
  public subProjectId: number;

  // store Technology Id
  public technologyId: number;
  // New Epmloyee List.....
  public newEmployee: Employee[];
  // Get Project Id
  public set projectId(subProjectId: number) {
    if (subProjectId) {
      this.subProjectId = subProjectId
      this.roleForm.patchValue({ subProjectId: this.subProjectId })
    }
  }
  public get projectId(): number {
    return this.subProjectId;
  }

  constructor(private RoleFormPresenter: RoleFormPresenter) {
    this.submitted = false;
    this.roleForm = this.RoleFormPresenter.buildRoleForm();
    this.addRole = new EventEmitter<Staffing>();
    this.closeOverlay = new EventEmitter<string>();

    this.technologyEmit = new EventEmitter<number>();
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
  }

  /**
   * getter for role form controls
   */
  public get roleFormControls(): any {
    return this.roleForm.controls;
  }
  
  /**
   * submitRole
   */
  public submitRole(): void {
    this.submitted = true;
    if (this.roleForm.valid) {
      this.addRole.emit(this.roleForm.value);
    }
    else {
      return;
    }
  }

  /**
   * closeOverlay
   */
  public close(): void {
    this.closeOverlay.emit();
  }

  /**
   * getEmployee
   * Get employee single data
   */
  public getEmployee(): void {
    this.technologyEmit.emit(this.roleForm.controls['technologyId'].value);
    this.technologyId = this.roleForm.controls['technologyId'].value
  }

}
