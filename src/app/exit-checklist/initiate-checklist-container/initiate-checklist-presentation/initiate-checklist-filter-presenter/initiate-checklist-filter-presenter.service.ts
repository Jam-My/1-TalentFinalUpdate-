import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FilterViewModel } from 'src/app/exit-checklist/models/filterViewModel';

@Injectable()

export class InitiateChecklistFilterPresenter {
  public appliedFilterOptions$: Observable<FilterViewModel>;
  private appliedFilterOptions: Subject<FilterViewModel>;

  constructor(private formBuilder: FormBuilder) {
    this.appliedFilterOptions = new Subject<FilterViewModel>();
    this.appliedFilterOptions$ = this.appliedFilterOptions.asObservable();
  }
  /**
   * applyFilterOptions
   * @param appliedFilterOptions 
   */
  public applyFilterOptions(appliedFilterOptions: FormGroup): void {
    if (appliedFilterOptions.valid) {
      let appliedFilters: FilterViewModel = new FilterViewModel();
      appliedFilters = appliedFilterOptions.getRawValue();
      this.appliedFilterOptions.next(appliedFilters);
    }
  }

  /**
   * buildForm
   */

  public buildForm(): FormGroup {
    return this.formBuilder.group({
      ActivityName: [null],
      DomainName: [null],
      AssignedTo: [null],
      Status: [null]
    })
  }
}
