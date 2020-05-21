import { Injectable, ElementRef, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, PositionStrategy, ScrollStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FilterFormData } from 'src/app/resignation/models/filter-options-model/filter-options.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { TableProperty } from 'src/app/resignation/models/table-property-model/table-property.model';
import { ApprovalListFilterPresentation } from '../approval-list-presentation/approval-list-filter-presentation/approval-list-filter-presentation.component';
import { FilterDropwdownOptions } from 'src/app/resignation/models/filter-form-options-model/filter-form-options.model';

@Injectable()
export class ApprovalListPresenterService {

  public filterFormData: FilterFormData;
  public filterComponentInstance: ApprovalListFilterPresentation;
  public appliedFilterOptions$: Observable<FilterFormData>;
  public setTableProperty$: Observable<FilterFormData>;

  private appliedFiltersStore: FilterFormData;
  private appliedFilterOptions: Subject<FilterFormData>;
  private setTableProperty: Subject<FilterFormData>;

  constructor(private overlay: Overlay) {
    this.filterFormData = new FilterFormData();

    this.appliedFilterOptions = new Subject<FilterFormData>();
    this.appliedFilterOptions$ = this.appliedFilterOptions.asObservable();

    this.setTableProperty = new Subject<FilterFormData>();
    this.setTableProperty$ = this.setTableProperty.asObservable();
  }

  /**
   * onPageChange
   * @param pageNumber 
   * @description assign new page number to table property
   */
  public onPageChange(pageNumber: number): void {
    this.filterFormData.pageNumber = pageNumber;
    this.setTableProperty.next(this.filterFormData);
  }

  /**
   * openFilterOptions
   * @description opens a dynamic filter component using cdk overlay
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
    const overlayRef: OverlayRef = this.overlay.create(config);
    const filterPresentationComponentPortal: ComponentPortal<ApprovalListFilterPresentation> = new ComponentPortal(ApprovalListFilterPresentation);
    const filterComponentRef: ComponentRef<ApprovalListFilterPresentation> = overlayRef.attach(filterPresentationComponentPortal);
    this.filterComponentInstance = filterComponentRef.instance;

    this.filterComponentInstance.appliedFilterOptions.subscribe((filterData: FilterFormData) => {
      this.filterFormData = filterData;
      this.appliedFiltersStore = filterData;
      this.filterFormData.pageNumber = 1;
      this.filterFormData.limit = 10;
      this.appliedFilterOptions.next(this.filterFormData);
    });

    this.filterComponentInstance.closeFilter.subscribe((close: boolean) => {
      if (close) {
        overlayRef.detach();
      }
    });

    this.filterComponentInstance.resetFilter.subscribe((reset: boolean) => {
      if (reset) {
        this.appliedFiltersStore = null;
      }
    });

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
    });
  }

  /**
   * setFilterData
   * @param filterDropwdownOptions 
   */
  public setFilterData(filterDropwdownOptions: FilterDropwdownOptions): void {
    this.filterComponentInstance.filterDropwdownOptions = filterDropwdownOptions;
    if (this.appliedFiltersStore) {
      this.filterComponentInstance.filterForm.patchValue(this.processForm(this.appliedFiltersStore));
    };
  }

  /**
   * getOverlayConfig
   * @param config propvide optional default config for angular cdk
   * @param hostButton optional field to open overlay with reference to that button
   * @description returns config rquired to create dynamic components
   */
  private getOverlayConfig(config?: OverlayConfig, hostButton?: ElementRef): OverlayConfig {
    //positon for right aligned
    const positionStrategyRight: PositionStrategy = this.overlay.position().global().top('160px').right('20px');

    const overlayConfig: OverlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: positionStrategyRight
    });
    return overlayConfig;
  }

  /**
   * processForm
   * @param form 
   * @description converts null to empty string to serve as dropdown default value
   */
  private processForm(form: FilterFormData): FilterFormData {
    for (let keys in form) {
      if (form[keys] === null) {
        form[keys] = '';
      }
    }
    return form;
  }
}



