import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EmployeeListFilterViewModel } from 'src/app/exit-checklist/models/employeeListFilterViewModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidators } from 'src/app/shared/validators/dateCompareValidator';

@Injectable()
export class ExitChecklistFilterPresenter {
  public appliedFilterOptions$: Observable<EmployeeListFilterViewModel>;
  private appliedFilterOptions: Subject<EmployeeListFilterViewModel>;

  constructor(private formBuilder: FormBuilder) {
    this.appliedFilterOptions = new Subject<EmployeeListFilterViewModel>();
    this.appliedFilterOptions$ = this.appliedFilterOptions.asObservable();
  }


  /**
   * applyFilterOptions 
   * @param appliedFilterOptions 
   */
  public applyFilterOptions(appliedFilterOptions: FormGroup): void {
    if (appliedFilterOptions.valid) {
      let appliedFilters: EmployeeListFilterViewModel = new EmployeeListFilterViewModel();
      appliedFilters = appliedFilterOptions.getRawValue();
      this.appliedFilterOptions.next(appliedFilters);
    }
  }

  /**
   * buildForm
   */
  public buildForm(): FormGroup {
    return this.formBuilder.group({
      employeeName: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]+$')]],
      employeeCode: [null, [Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]+$')]],
      approvedRelievingFromDate: [null],
      approvedRelievingToDate: [null],
      initiatedOnFromDate: [null],
      initiatedOnToDate: [null],
      status: [null],
    },
      {
        validator: DateValidators.validate('approvedRelievingFromDate', 'approvedRelievingToDate', { 'toIsGreater': true }),
      });
  }
  /* private processForm(form: EmployeeListFilterViewModel): EmployeeListFilterViewModel {
    for (let keys in form) {
      if (form[keys] === '') {
        form[keys] = null;
      }
    }
    return form;
  } */
}
