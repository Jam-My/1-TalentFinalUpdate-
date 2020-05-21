import { Injectable, ComponentRef, ElementRef } from '@angular/core';
import { FilterViewModel } from '../../models/filterViewModel';
import { Observable, Subject } from 'rxjs';
import { InitiateChecklistFilterPresentation } from '../initiate-checklist-presentation/initiate-checklist-filter-presentation/initiate-checklist-filter-presentation.component';
import { Overlay, OverlayConfig, PositionStrategy, ScrollStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { EmployeeActivityDetailModel, EmployeeActivityDetailViewModel } from '../../models/EmployeeActivityDetailViewModel';
import { TableProperty } from '../../models/table-property.model';
import { CompleteChecklistPresentation } from '../initiate-checklist-presentation/complete-checklist-presentation/complete-checklist-presentation.component';
import { InitiateResponse } from '../../models/initiate-response.model';
import { ExitProcessStatus } from '../../models/exitProcessStatus';
@Injectable()
export class InitiateChecklistPresenter {
  public filterFormData: FilterViewModel;
  public filterComponentInstance: InitiateChecklistFilterPresentation;

  public appliedFilterOptions$: Observable<FilterViewModel>;
  public setTableProperty$: Observable<FilterViewModel>;

  public tableProperty: TableProperty<FilterViewModel>;
  public isCheckAll$: Observable<boolean>;
  public isCheckAll: Subject<boolean> = new Subject();
  public selectedActivityId: Set<EmployeeActivityDetailModel>;
  public sendArr;
  public initiateActivities$: Observable<InitiateResponse[]>;
  public completeData$: Observable<any>;
  private completeData: Subject<any>;

  private appliedFiltersStore: FilterViewModel;
  private appliedFilterOptions: Subject<FilterViewModel>;
  private setTableProperty: Subject<FilterViewModel>;
  private overlayRef: OverlayRef;


  private initiateActivities: Subject<InitiateResponse[]>;

  constructor(private overlay: Overlay) {
    this.completeData = new Subject();
    this.completeData$ = this.completeData.asObservable();
    this.selectedActivityId = new Set();
    this.tableProperty = new TableProperty<FilterViewModel>();
    this.filterFormData = new FilterViewModel();
    this.isCheckAll$ = this.isCheckAll.asObservable();

    this.appliedFilterOptions = new Subject<FilterViewModel>();
    this.appliedFilterOptions$ = this.appliedFilterOptions.asObservable();

    this.setTableProperty = new Subject<FilterViewModel>();
    this.setTableProperty$ = this.setTableProperty.asObservable();

    this.initiateActivities = new Subject<InitiateResponse[]>();
    this.initiateActivities$ = this.initiateActivities.asObservable();
  }

  /**
   * onCheck
   * @param activity 
   */
  public onCheck(activity: EmployeeActivityDetailModel): EmployeeActivityDetailModel {
    activity.isChecked = !activity.isChecked;
    // used ternary operator for selected item add or delete in selectedCustomersId.
    (activity.isChecked) ? this.selectedActivityId.add(activity) : this.selectedActivityId.delete(activity)
    // used ternary operator for is all check or not and base on condition emit true or false.
    return activity;
  }

  /**
   * onCheckAll
   * @param activity 
   * @param isCheckAll 
   */
  public onCheckAll(activity: EmployeeActivityDetailViewModel, isCheckAll: boolean): EmployeeActivityDetailViewModel {
    isCheckAll = !isCheckAll;
    this.isCheckAll.next(isCheckAll);

    (isCheckAll) ?
      // activity.forEach(activity => {
      activity.activityLists.forEach((activity) => { activity.isChecked = isCheckAll; this.selectedActivityId.add(activity) }) :
      // })
      // : activity.forEach(activity => {
      activity.activityLists.forEach((activity) => {
        activity.isChecked = isCheckAll; this.selectedActivityId.delete(activity);
        // })
      });
    return activity;
  }

  /**
   * openFilterOptions
   */
  public openFilterOptions(): void {
    //1.create a config for the overlay for positon,class,direction,width,height
    //2.remote control for the overlay
    //3.create method asks for an optional config parameter which will deal with the postioning
    //4.creates a portal to contain the dynamic component
    //5.attach the component to the overlay ref
    //6.listening for filter queries from the filter presentation form
    //7.recieve filters from filter form component

    const config: OverlayConfig = this.getOverlayConfig();
    this.overlayRef = this.overlay.create(config);
    const filterPresentationComponentPortal: ComponentPortal<InitiateChecklistFilterPresentation> = new ComponentPortal(InitiateChecklistFilterPresentation);
    const filterComponentRef: ComponentRef<InitiateChecklistFilterPresentation> = this.overlayRef.attach(filterPresentationComponentPortal);
    this.filterComponentInstance = filterComponentRef.instance;

    this.filterComponentInstance.appliedFilterOptions.subscribe((filterData: FilterViewModel) => {
      this.filterFormData = filterData;
      this.appliedFiltersStore = filterData;
      this.appliedFilterOptions.next(this.filterFormData);
    });

    this.filterComponentInstance.closeFilter.subscribe((close: boolean) => {
      if (close) {
        this.close()
      }
    });

    this.filterComponentInstance.resetFilter.subscribe((reset: boolean) => {
      if (reset) {
        this.appliedFiltersStore = null;
      }
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.close()
    });
  }

  /**
   * setFilterData
   * @param filterDropwdownOptions 
   */
  public setFilterData(filterDropwdownOptions: FilterViewModel): void {
    this.filterComponentInstance.filterDropwdownOptions = filterDropwdownOptions;
    if (this.appliedFiltersStore) {
      this.filterComponentInstance.filterForm.patchValue(this.appliedFiltersStore);
    };
    // this.setTableProp(this.tableProperty);
  }



  /**
   * submitActivities
   */
  public submitActivities() {
    this.sendArr = [];
    this.selectedActivityId.forEach((emp: EmployeeActivityDetailModel) => {
      this.sendArr.push(
        {
          activityId: emp.activityId,
          assignedId: emp.assignedToId,
          // resignationId: emp.resignationId
        });
    });
    return this.initiateActivities.next(this.sendArr);
  }

  /**
   * completeProcessDialog
   */
  public completeProcessDialog(): void {
    const completeProcessDialogOverlayConfig: OverlayConfig = new OverlayConfig();
    completeProcessDialogOverlayConfig.hasBackdrop = true;
    completeProcessDialogOverlayConfig.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    this.overlayRef = this.overlay.create(completeProcessDialogOverlayConfig);
    const completeComponentPortal: ComponentPortal<CompleteChecklistPresentation> = new ComponentPortal(CompleteChecklistPresentation);
    const completeComponentRef: ComponentRef<CompleteChecklistPresentation> = this.overlayRef.attach(completeComponentPortal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });


    completeComponentRef.instance.closeActivity$.subscribe((response: ExitProcessStatus) => {
      this.completeData.next(response);
      this.close();
    })
    completeComponentRef.instance.closeForm.subscribe(() => {
      this.close();
    });
  }

  /**
   * close
   */
  public close(): void {
    this.overlayRef.detach();
  }


  /**
   * getOverlayConfig
   * @param config propvide optional default config for angular cdk
   * @param hostButton optional field to open overlay with reference to that button
   * @description returns config rquired to create dynamic components
   */
  private getOverlayConfig(config?: OverlayConfig): OverlayConfig {
    //positon for right aligned
    const positionStrategyRight: PositionStrategy = this.overlay.position().global().top('260px').right('20px');

    const overlayConfig: OverlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: positionStrategyRight
    });
    return overlayConfig;
  }
}
