import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InitiateChecklistFilterPresenter } from '../initiate-checklist-filter-presenter/initiate-checklist-filter-presenter.service';
import { FilterViewModel } from 'src/app/exit-checklist/models/filterViewModel';
import { FormGroup } from '@angular/forms';
import { ExitActivities } from 'src/app/exit-checklist/models/ActivityFilterDropdown.model';
import { Domain } from '../../../models/DomainFilterDropdown.model';
import { Assignee } from 'src/app/exit-checklist/models/AssignedToFilterDropdown.model';
import { Subject } from 'rxjs';
import { STATUSSHOW } from 'src/app/exit-checklist/status.constant';

@Component({
  selector: 'initiate-checklist-filter-presentation',
  templateUrl: './initiate-checklist-filter-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [InitiateChecklistFilterPresenter],
})
export class InitiateChecklistFilterPresentation implements OnInit {
  public statuses = STATUSSHOW;
  public set filterDropwdownOptions(value: FilterViewModel) {
    if (value) {
      this._filterDropwdownOptions = value;
      this.initializeDropdowns();
    }
  }
  public get filterDropwdownOptions(): FilterViewModel {
    return this._filterDropwdownOptions;
  }

  public filterForm: FormGroup;
  public activity: ExitActivities;
  public filterDropwdownOption: FilterViewModel
  public domain: Domain;
  public assigned: Assignee;
  public status: string[];
  public appliedFilterOptions: Subject<FilterViewModel>;
  public closeFilter: Subject<boolean>;
  public resetFilter: Subject<boolean>;

  private _filterDropwdownOptions: FilterViewModel;

  constructor(private filterPresentationService: InitiateChecklistFilterPresenter, private cdr: ChangeDetectorRef) {
    this.appliedFilterOptions = new Subject<FilterViewModel>();
    this.closeFilter = new Subject<boolean>();
    this.resetFilter = new Subject<boolean>();
  }
  ngOnInit() {
    this.filterForm = this.filterPresentationService.buildForm();

    this.filterPresentationService.appliedFilterOptions$.subscribe((appliedFilterOptions: FilterViewModel) => {
      this.appliedFilterOptions.next(appliedFilterOptions);
      this.filterForm.reset();
      this.appliedFilterOptions.complete();
      this.dismiss();
    });

  }

  /**
   * applyFilterOptions
   */
  public applyFilterOptions(): void {
    // pass the form to the presenter to check for validations
    this.filterPresentationService.applyFilterOptions(this.filterForm);
  }

  /**
   * resetForm
   */
  public resetForm(): void {
    this.resetFilter.next(true);
    this.filterForm.reset();
    this.filterForm = this.filterPresentationService.buildForm();
  }

  /**
   * dismiss
   */
  public dismiss(): void {
    this.closeFilter.next(true);
    this.closeFilter.complete();
  }
  /**
   * initializeDropdowns
   */
  private initializeDropdowns(): void {
    const value: FilterViewModel = this.filterDropwdownOptions;
    this.activity = value.activity;
    this.domain = value.domain;
    this.assigned = value.assigned;
    this.status = value.status;
    this.cdr.detectChanges();
  }
}
