/**
 * @author Nurali K
 * @description Presentation Component for Approval List
 */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { ApprovalListPresenterService } from '../approval-list-presenter/approval-list-presenter.service';
import { FilterFormData } from 'src/app/resignation/models/filter-options-model/filter-options.model';
import { FilterDropwdownOptions } from 'src/app/resignation/models/filter-form-options-model/filter-form-options.model';
import { ResignationDetails } from '../../models/resignation-request-model/resignation-request.model';


@Component({
  selector: 'app-approval-list-presentation-ui',
  templateUrl: './approval-list-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ApprovalListPresenterService]
})
export class ApprovalListPresentation implements OnInit {

  @ViewChild('filterButton') public filterButton: ViewContainerRef;

  @Input() public set resignationDetailsList(value: ResignationDetails[]) {
    if (value) {
      this._resignationDetailsList = value;
    }
  }

  public get resignationDetailsList(): ResignationDetails[] {
    return this._resignationDetailsList;
  }

  @Input() public set filterDropwdownOptions(value: FilterDropwdownOptions) {
    if (value) {
      this._filterDropwdownOptions = value;
      this.approvalListPresenter.setFilterData(this.filterDropwdownOptions);
    }
  }

  public get filterDropwdownOptions(): FilterDropwdownOptions {
    return this._filterDropwdownOptions;
  }

  @Output() public applyfilterData: EventEmitter<FilterFormData>;
  @Output() public getfilterDropwdownOptions: EventEmitter<boolean>;
  @Output() public getResignationDetails: EventEmitter<FilterFormData>;

  public filterFormData: FilterFormData;

  private _resignationDetailsList: ResignationDetails[];
  private _filterDropwdownOptions: FilterDropwdownOptions;

  constructor(private approvalListPresenter: ApprovalListPresenterService) {
    this.applyfilterData = new EventEmitter<FilterFormData>();
    this.getfilterDropwdownOptions = new EventEmitter<boolean>();
    this.getResignationDetails = new EventEmitter<FilterFormData>();
  }

  public ngOnInit(): void {
    this.filterFormData = new FilterFormData();

    /**
     * @param applyfilterData contains data for pagination and filtering
     * @description stores state for current page and limit
     */
    this.approvalListPresenter.appliedFilterOptions$.subscribe((applyfilterData: FilterFormData) => {
      this.filterFormData.pageNumber = applyfilterData.pageNumber;
      this.filterFormData.limit = applyfilterData.limit;
      this.applyfilterData.emit(applyfilterData);
    });

    /**
     * @param filterFormData contains data for pagination and filtering
     * @description stores state for current page and limit
     */
    this.approvalListPresenter.setTableProperty$.subscribe((filterFormData: FilterFormData) => {
      this.filterFormData.pageNumber = filterFormData.pageNumber;
      this.filterFormData.limit = filterFormData.limit;
      this.getResignationDetails.emit(filterFormData);
    });

  }

  /**
   * openFilterOptions
   * @description open dynamic component to get filter options
   */
  public openFilterOptions(): void {
    this.getfilterDropwdownOptions.emit(true);
    this.approvalListPresenter.openFilterOptions();
  }

  /**
   * onPageChange
   * @param pageNumber 
   * @description change table page to display next/prev records
   */
  public onPageChange(pageNumber: number): void {
    this.approvalListPresenter.onPageChange(pageNumber);
  }

}
