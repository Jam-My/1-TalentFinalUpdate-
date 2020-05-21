import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { FilterFormData } from 'src/app/resignation/models/filter-options-model/filter-options.model';
import { DateValidators } from 'src/app/shared/validators/dateCompareValidator';


@Injectable()
export class ApprovalListFilterPresenterService {

  public appliedFilterOptions$: Observable<FilterFormData>;
  private appliedFilterOptions: Subject<FilterFormData>;

  constructor(private formBuilder: FormBuilder) {
    this.appliedFilterOptions = new Subject<FilterFormData>();
    this.appliedFilterOptions$ = this.appliedFilterOptions.asObservable();
  }

  /**
   * Check for form validations , get the raw value if validations pass and emit back to presentation
   * @param filterOptionsForm 
   */
  public applyFilterOptions(appliedFilterOptions: FormGroup): void {
    if (appliedFilterOptions.valid) {
      let appliedFilters: FilterFormData = new FilterFormData();
      appliedFilters = this.processForm(appliedFilterOptions.getRawValue());
      this.appliedFilterOptions.next(appliedFilters);
    }
  }

  /**
   * returns a form group that will be used to model the data coming in from the template
   * it also has the required date validations
   */
  public buildForm(): FormGroup {
    return this.formBuilder.group({
      fromDate: [null],
      toDate: [null],
      domainName: [''],
      technologyName: [''],
      designation: [''],
      resignationStatusId: [null],
      employeeName: [''],
      employeeCode: [null]
    },
      {
        validator: DateValidators.validate('fromDate', 'toDate', { 'toIsGreater': true })
      });
  }

  /**
   * processForm
   * @param form 
   * replace empty strings to null
   */
  private processForm(form: FilterFormData): FilterFormData {
    for (let keys in form) {
      if (form[keys] === '') {
        form[keys] = null;
      }
    }
    return form;
  }
}