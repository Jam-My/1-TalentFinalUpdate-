import { ComponentPortal } from '@angular/cdk/portal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { Employee } from '../../models/employee.model';
import { Location } from '../../models/location.model';
import { Observable, Subject } from 'rxjs';
import { PayCycle } from '../../models/pay-cycle.model';
import { Role } from '../../models/role.model';
import { RoleFormPresentation } from '../role-list-presentation/role-form-presentation/role-form.presentation';
import { Staffing } from 'src/app/project-staffing/models/staffing.model';
import { Technology } from '../../models/technology.model';

/**
 * Injectable
 */
@Injectable()
export class RoleListPresenter {

  // get Employee data
  public technologyId$: Subject<number>;
  // get new Employee data
  public newEmployee: Subject<Employee[]>;

  public roleData: Subject<Staffing>;
  public config: OverlayConfig;
  public overlayRef: OverlayRef;
  public ref: any;
  // store data for filter
  private obj: object;

  constructor(
    public formBuilder: FormBuilder,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {
    this.obj = {};

    this.technologyId$ = new Subject<number>();
    this.newEmployee = new Subject<Employee[]>();
  }

  /**
   * buildRoleForm
   */
  public buildRoleForm(): FormGroup { 
    return this.formBuilder.group(
      {
        // id:[''],
        staffingId: [],
        subProjectId: [],
        roleId: [,[Validators.required]],
        technologyId: [, [Validators.required]],
        locationId: [, [Validators.required]],
        employeeId: [, [Validators.required]],
        weeklyBillableHours: [, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
        billRate: [, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
        payRate: [, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]],
        payCycleId: [, [Validators.required]]
      });
 }
 
  /**
   * to open overlay and pass role data
   * @param roleDetails roletDetails
   */
  public createRoleForm(roleDetails: Role[], technologyDetail: Technology[], locationDetail: Location[], payCycle: PayCycle[], staffingId: number):  Observable<Staffing> {
    // this.viewContainerRef.clear();
    this.roleData = new Subject<Staffing>();
    this.config = new OverlayConfig();

    // To set position of overlay
    this.config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Used to close overlay on Backdrop
    this.config.hasBackdrop = true;

    // Used in creating overlay
    this.overlayRef = this.overlay.create(this.config);

    // Used to close overlay on Backdrop
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });


    // Create overlay
    this.ref = this.overlayRef.attach(new ComponentPortal(
    RoleFormPresentation, this.viewContainerRef));
      
    this.ref.instance.totalRole = roleDetails;
    this.ref.instance.technology = technologyDetail;
    this.ref.instance.location = locationDetail;
    this.ref.instance.payCycle = payCycle;
    this.ref.instance.projectId = staffingId;
    if(this.ref.instance.techId) {
    }

    this.ref.instance.technologyEmit.subscribe((data: number) => {
      this.technologyId$.next(data);
    });
    this.newEmployee.subscribe((employee: Employee[]) => {
      this.ref.instance.newEmployee = employee;
    })

    this.ref.instance.closeOverlay.subscribe(()=>
    {
      this.overlayRef.dispose();
    }
    )

    this.ref.instance.addRole.subscribe((roleData: Staffing) => {
      this.roleData.next(roleData);
      this.overlayRef.dispose();
    })
    return this.roleData.asObservable();
  }
  /**
   * selectFilterField
   * @param field filter field
   * @param Staffing list of suggestion
   * @description select filed and set suggetion array 
   */
  public selectFilterField(field: string, Staffing: Staffing[]): string[] {
    if (field === 'role') {
      return Staffing.map((data: Staffing) => data.role);
    } else if (field === 'technology') {
      return Staffing.map((data: Staffing) => data.technology);
    } else if (field === 'location') {
      return Staffing.map((data: Staffing) => data.location);
    }
  }

  /**
   * filter
   * @param Staffing list of suggestion
   * @param field filter field
   * @param filterQuery filter string
   * @description get field name, list and search string the apply filter
   */
  public filter(Staffing: Staffing[], field: string, filterQuery: string): Staffing[] {
    if (filterQuery === '') {
      this.obj = {};
    } else {
      if (field === 'role') {
        this.obj = { role: filterQuery };
      } else if (field === 'technology') {
        this.obj = { technology: filterQuery }
      } else if (field === 'location') {
        this.obj = { location: filterQuery }
      }
    }
    const keys: string[] = Object.keys(this.obj);
    const filterList = list => {
      let result = keys.map(key => {
        if (list[key]) {
          return String(list[key]).toLowerCase().startsWith(String(this.obj[key]).toLowerCase());
        } else {
          return false;
        }

      });
      result = result.filter(it => it !== undefined);

      return result.reduce((acc: number, cur: any) => {
        return acc & cur;
      }, 1);
    };
    return Staffing.filter(filterList);
  }
}
