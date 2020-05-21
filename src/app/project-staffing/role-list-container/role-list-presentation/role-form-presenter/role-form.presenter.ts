import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Injectable
 */
@Injectable()
export class RoleFormPresenter {

  public roleForm: FormGroup;  // form group instance

  constructor(
    public formBuilder: FormBuilder,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {
  }

  /**
   * buildRoleForm
   */
  public buildRoleForm(): FormGroup {
    return this.roleForm = this.formBuilder.group(
      {
        // id:[''],
        subProjectId: [],
        roleId: [, [Validators.required]],
        technologyId: [, [Validators.required]],
        locationId: [, [Validators.required]],
        employeeId: [, [Validators.required]],
        weeklyBillableHours: [, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
        billRate: [, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]],
        payRate: [, [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]],
        payCycleId: [, [Validators.required]]
      },
      { validator: this.passwordMatchValidator('billRate', 'payRate') }
    );
  }

  /**
   * To validate [billRate > patRate]
   * @param checkPayRate payRate value
   * @param checkBillRate billRate value
   */
  private passwordMatchValidator(checkPayRate: string, checkBillRate: string) {
    // tslint:disable-next-line: typedef
    return (formGroup: FormGroup) => {
      const control: AbstractControl = formGroup.controls[checkPayRate];
      const matchingControl: AbstractControl = formGroup.controls[checkBillRate];
      if (matchingControl.errors && !matchingControl.errors.checkRate) {
        return;
      }
      if (control.value <= matchingControl.value) {
        matchingControl.setErrors({ checkRate: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
