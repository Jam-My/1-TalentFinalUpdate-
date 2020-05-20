/**
 * @author Nurali K
 * @description Presentation Component for Approval List
 */
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { Subject } from 'rxjs';

import { FilterFormData } from 'src/app/resignation/models/filter-options-model/filter-options.model';
import { ApprovalListFilterPresenterService } from '../approval-list-filter-presenter/approval-list-filter-presenter.service';
import { FilterDropwdownOptions } from 'src/app/resignation/models/filter-form-options-model/filter-form-options.model';


@Component({
  selector: 'app-approval-list-filter-presentation',
  templateUrl: './approval-list-filter-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ApprovalListFilterPresenterService]
})
export class ApprovalListFilterPresentation implements OnInit {

  public datePickerConfig: Partial<BsDatepickerConfig>;

  public set filterDropwdownOptions(value: FilterDropwdownOptions) {
    if (value) {
      this._filterDropwdownOptions = value;
      this.initializeDropdowns();
    }
  }

  public get filterDropwdownOptions(): FilterDropwdownOptions {
    return this._filterDropwdownOptions;
  }

  public filterForm: FormGroup;
  public domains: string[];
  public technologies: string[];
  public designations: string[];
  public statuses: string[];
  public appliedFilterOptions: Subject<FilterFormData>;
  public closeFilter: Subject<boolean>;
  public resetFilter: Subject<boolean>;

  private _filterDropwdownOptions: FilterDropwdownOptions;

  constructor(private filterPresentationService: ApprovalListFilterPresenterService, private cdr: ChangeDetectorRef) {
    this.appliedFilterOptions = new Subject<FilterFormData>();
    this.closeFilter = new Subject<boolean>();
    this.resetFilter = new Subject<boolean>();

    this.datePickerConfig = {
      showWeekNumbers: false,
      maxDate: new Date()
    };
  }

  public ngOnInit(): void {
    this.filterForm = this.filterPresentationService.buildForm();

    /**
     * @description data recieved from presenter after checking for validations to be recieved by the calling presenter using component instance
     */
    this.filterPresentationService.appliedFilterOptions$.subscribe((appliedFilterOptions: FilterFormData) => {
      this.appliedFilterOptions.next(appliedFilterOptions);
      this.filterForm.reset();
      this.appliedFilterOptions.complete();
      this.dismiss();
    });

  }

  /**
   * applyFilterOptions
   * @description Method is invoked when search button is clicked
   */
  public applyFilterOptions(): void {
    // pass the form to the presenter to check for validations
    this.filterPresentationService.applyFilterOptions(this.filterForm);
  }

  /**
   * resetForm
   * @description reset filter form
   */
  public resetForm(): void {
    this.resetFilter.next(true);
    this.filterForm.reset();
    this.filterForm = this.filterPresentationService.buildForm();
  }

  /**
   * dismiss
   *  @description to be called by using the component instance return by overlay reference to dismiss upon successfull submission of form data
   */
  public dismiss(): void {
    this.closeFilter.next(true);
    this.closeFilter.complete();
  }


  /**
   * initializeDropdowns
   * @description to be called when data is recieved from api call
   * change detection cycle is initiated manually will update the bindings
   */
  private initializeDropdowns(): void {
    const value: FilterDropwdownOptions = this.filterDropwdownOptions;
    this.domains = value.domains;
    this.technologies = value.technologies;
    this.designations = value.designations;
    this.statuses = value.statuses;
    this.cdr.detectChanges();
  }

}
