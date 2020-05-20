import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { InitiateChecklistPresenter } from '../initiate-checklist-presenter/initiate-checklist-presenter.service';
import { FilterViewModel } from '../../models/filterViewModel';
import { EmployeeActivityDetailModel, EmployeeActivityDetailViewModel } from '../../models/employeeActivityDetailViewModel';
import { STATUSSHOW } from '../../status.constant';
import { InitiateResponse } from '../../models/initiate-response.model';
import { ExitProcessStatus } from '../../models/exitProcessStatus';

@Component({
  selector: 'initiate-checklist-presentation-ui',
  templateUrl: './initiate-checklist-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [InitiateChecklistPresenter]
})
export class InitiateChecklistPresentation implements OnInit {

  public status = STATUSSHOW;

  @Input() public set activities(value: EmployeeActivityDetailViewModel) {
    if (value) {
      this._activities = value;
    }
  }

  public get activities(): EmployeeActivityDetailViewModel {
    return this._activities;
  }

  public get initiatedOn(): string {
    if (this.activities && this.activities.activityLists) {
      return this.activities.activityLists[0].initiatedOn;
    }
  }

  public get activity() {
    if (this.activities) {
      return this.activities.activityLists[0];
    }
  }

  @Input() public set filterDropwdownOptions(value: FilterViewModel) {
    if (value) {
      this._filterDropwdownOptions = value;
      this.initiateChecklistPresenter.setFilterData(this.filterDropwdownOptions);
    }
  }

  public get filterDropwdownOptions(): FilterViewModel {
    return this._filterDropwdownOptions;
  }

  @Output() public applyfilterData: EventEmitter<FilterViewModel>;
  @Output() public submitActivity: EventEmitter<InitiateResponse[]>;
  @Output() public getfilterDropwdownOptions: EventEmitter<boolean>;
  @Output() public completeActivity: EventEmitter<ExitProcessStatus[]>;

  public filterFormData: FilterViewModel;
  public isCheckAll: boolean;
  public submit;

  private _filterDropwdownOptions: FilterViewModel;
  private _activities: EmployeeActivityDetailViewModel;

  constructor(private initiateChecklistPresenter: InitiateChecklistPresenter) {
    this.applyfilterData = new EventEmitter<FilterViewModel>();
    this.getfilterDropwdownOptions = new EventEmitter<boolean>();
    this.submitActivity = new EventEmitter<InitiateResponse[]>();
    this.completeActivity = new EventEmitter<ExitProcessStatus[]>();

  }

  public ngOnInit(): void {
    this.filterFormData = new FilterViewModel();
    this.initiateChecklistPresenter.isCheckAll$.subscribe((isCheckAll: boolean) => { this.isCheckAll = isCheckAll })
    /**
     * @param applyfilterData contains data for pagination and filtering
     * @description stores state
     */
    this.initiateChecklistPresenter.appliedFilterOptions$.subscribe((filterFormData: FilterViewModel) => {
      const resignationId = this.activities.resignationId;
      filterFormData.resignationId = resignationId;
      this.applyfilterData.emit(filterFormData);

    });

    /**
     * @param filterFormData contains data for pagination and filtering
     * @description stores state for current page and limit
     */
    this.initiateChecklistPresenter.setTableProperty$.subscribe((filterFormData: FilterViewModel) => {
      this.applyfilterData.emit(filterFormData);
    });

    this.initiateChecklistPresenter.completeData$.subscribe((completeData: ExitProcessStatus[]) => {
      const resignationId = this.activities.resignationId;
      completeData.forEach((completeData) => {
        completeData.resignationId = resignationId;
      });
      this.completeActivity.emit(completeData)
    });

    this.initiateChecklistPresenter.initiateActivities$.subscribe((initiateResponses: InitiateResponse[]) => {
      const resignationId = this.activities.resignationId;
      initiateResponses.forEach((initiateResponse: InitiateResponse) => {
        initiateResponse.resignationId = resignationId;
      });
      this.submitActivity.next(initiateResponses);
    });

  }

  /**
   * openFilterOptions
   * @description open dynamic component to get filter options
   */
  public openFilterOptions(): void {
    this.getfilterDropwdownOptions.emit(true);
    // this.applyfilterData.emit(this.filterFormData);
    this.initiateChecklistPresenter.openFilterOptions();
  }
  /**
   * completeProcessDialog 
   */
  public completeProcessDialog(): void {
    this.initiateChecklistPresenter.completeProcessDialog()

  }
  /**
   * onCheck
   * @param activities 
   */
  public onCheck(activities: EmployeeActivityDetailModel): void {
    activities = this.initiateChecklistPresenter.onCheck(activities);
  }

  /**
   * onCheckAll
   */
  public onCheckAll(): void {
    this.activities = this.initiateChecklistPresenter.onCheckAll(this.activities, this.isCheckAll)

  }

  /**
   * trackBy
   * @param index 
   * @param activities 
   */
  public trackBy(index: number, activities: any): number {
    return activities.id;
  }

  /**
   * submitActivities
   */
  public submitActivities() {
    this.initiateChecklistPresenter.submitActivities()
    // this.submitActivity.emit(this.initiateChecklistPresenter.sendArr);
  }
}

