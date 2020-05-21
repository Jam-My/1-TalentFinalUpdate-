import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ExitChecklistFilterPresenter } from '../exit-checklist-filter-presenter/exit-checklist-filter-presenter.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { EmployeeListFilterViewModel } from 'src/app/exit-checklist/models/employeeListFilterViewModel';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { STATUSSHOW } from 'src/app/exit-checklist/status.constant';

@Component({
  selector: 'exit-checklist-filter-presentation',
  templateUrl: './exit-checklist-filter-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ExitChecklistFilterPresenter]
})
export class ExitChecklistFilterPresentation implements OnInit {
  public status = STATUSSHOW;
  public datePickerConfig: Partial<BsDatepickerConfig>;

  public filterForm: FormGroup;
  public statuses: string[];
  public appliedFilterOptions: Subject<EmployeeListFilterViewModel>;
  public closeFilter: Subject<boolean>;
  public resetFilter: Subject<boolean>;

  constructor(
    private exitChecklistFilterPresenter: ExitChecklistFilterPresenter,
    private cdr: ChangeDetectorRef) {
    this.appliedFilterOptions = new Subject<EmployeeListFilterViewModel>();
    this.closeFilter = new Subject<boolean>();
    this.resetFilter = new Subject<boolean>();

    this.datePickerConfig = {
      showWeekNumbers: false,
      dateInputFormat: 'DD/MM/YYYY',
    };
  }

  ngOnInit() {
    this.filterForm = this.exitChecklistFilterPresenter.buildForm();
    this.exitChecklistFilterPresenter.appliedFilterOptions$.subscribe((appliedFilterOptions: EmployeeListFilterViewModel) => {
      this.appliedFilterOptions.next(appliedFilterOptions);
      this.filterForm.reset();
      this.appliedFilterOptions.complete();
      this.dismiss();
    });
  }

  /**
   * dismiss
   */
  public dismiss(): void {
    this.closeFilter.next(true);
    this.closeFilter.complete();
  }

  /**
   * applyFilterOptions
   */
  public applyFilterOptions(): void {
    // pass the form to the presenter to check for validations
    this.exitChecklistFilterPresenter.applyFilterOptions(this.filterForm);
  }

  /**
   * resetForm
   */
  public resetForm(): void {
    this.resetFilter.next(true);
    this.filterForm.reset();
    this.filterForm = this.exitChecklistFilterPresenter.buildForm();
  }
}
