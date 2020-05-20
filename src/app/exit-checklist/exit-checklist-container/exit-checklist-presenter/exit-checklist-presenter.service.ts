import { Injectable, Component, ElementRef } from '@angular/core';
import { OverlayConfig, OverlayRef, PositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ExitChecklistFilterPresentation } from '../exit-checklist-presentation/exit-checklist-filter-presentation/exit-checklist-filter-presentation.component';
import { EmployeeListFilterViewModel } from '../../models/employeeListFilterViewModel';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { TableProperty } from '../../models/table-property.model';
import { EmployeeListViewModel } from '../../models/employeeListViewModel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ComponentRef } from '@angular/core/src/render3';

@Injectable()
export class ExitChecklistPresenter {
  public filterFormData: EmployeeListFilterViewModel;
  public filterComponentInstance: ExitChecklistFilterPresentation;
  public appliedFilterOptions$: Observable<EmployeeListFilterViewModel>;
  public setTableProperty$: Observable<TableProperty<EmployeeListFilterViewModel>>;
  public tableProperty: TableProperty<EmployeeListFilterViewModel>;
  public resignedEmployees: EmployeeListViewModel[];


  private appliedFiltersStore: EmployeeListFilterViewModel;
  private appliedFilterOptions: Subject<EmployeeListFilterViewModel>;
  private setTableProperty: BehaviorSubject<TableProperty<EmployeeListFilterViewModel>> = new BehaviorSubject(new TableProperty());

  constructor(private overlay: Overlay) {
    this.tableProperty = new TableProperty();
    this.filterFormData = new EmployeeListFilterViewModel();

    this.appliedFilterOptions = new Subject<EmployeeListFilterViewModel>();
    this.appliedFilterOptions$ = this.appliedFilterOptions.asObservable();

    /*  this.setTableProperty = new Subject<TableProperty<EmployeeListFilterViewModel>>(); */
    this.setTableProperty$ = this.setTableProperty.asObservable();
  }

  /**
   * setTableProp
   * @param tableProperty
   * @param filterApply
   */
  public setTableProp(tableProperty: TableProperty<EmployeeListFilterViewModel>, filterApply?: boolean): void {
    // if (filterApply) { this.filterData = new FilterRecord() };
    this.tableProperty = tableProperty;
    this.setTableProperty.next(this.tableProperty);
  }

  /** This method is invoke when data successfully get */
  public getTableProperty(tableProperty: TableProperty<EmployeeListFilterViewModel>, length: number): TableProperty<EmployeeListFilterViewModel> {
    this.tableProperty = tableProperty;
    this.tableProperty.start = (this.tableProperty.pageLimit * (this.tableProperty.pageNumber)) + 1;
    this.tableProperty.end = this.tableProperty.start + length - 1;
    return this.tableProperty;
  }

  /**
   * onPageChange
   * @param pageNumber
   */
  public onPageChange(pageNumber: number): void {
    this.tableProperty.pageNumber = pageNumber;
    this.setTableProp(this.tableProperty);
  }


  /**
   * openFilter
   * @param statuses
   */
  public openFilter(statuses: Array<string>): void {
    const config: OverlayConfig = this.getOverlayConfig();
    const overlayRef: OverlayRef = this.overlay.create(config);
    const filterPresentationComponentPortal: ComponentPortal<ExitChecklistFilterPresentation> = new ComponentPortal(ExitChecklistFilterPresentation);
    const filterComponentRef = overlayRef.attach(filterPresentationComponentPortal);
    this.filterComponentInstance = filterComponentRef.instance;

    this.filterComponentInstance.appliedFilterOptions.subscribe(filterData => {
      // this.filterFormData = filterData;
      this.appliedFiltersStore = filterData;
      this.tableProperty = new TableProperty();
      this.tableProperty.filter = filterData;
      this.setTableProp(this.tableProperty);
      // this.appliedFilterOptions.next(this.filterFormData);
    });
    this.filterComponentInstance.statuses = statuses;

    this.filterComponentInstance.closeFilter.subscribe((close: boolean) => {
      if (close) {
        overlayRef.detach();
      }
    });

    /*     this.filterComponentInstance.resetFilter.subscribe((reset: boolean) => {
          if (reset) {
            this.appliedFiltersStore = null;
          }
        }); */

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
    });
  }

  /**
   * setFilterData
   * @param appliedFilterOptions
   */
  public setFilterData(appliedFilterOptions): void {
    this.filterComponentInstance.appliedFilterOptions = appliedFilterOptions;
    if (this.appliedFiltersStore) {
      /* this.filterComponentInstance.filterForm.patchValue(this.processForm(this.appliedFiltersStore)); */
    };

    this.setTableProp(this.tableProperty);
  }

  /**
   * getOverlayConfig
   * @param config
   * @param hostButton
   */
  private getOverlayConfig(config?: OverlayConfig, hostButton?: ElementRef): OverlayConfig {
    //positon for right aligned
    const positionStrategyRight: PositionStrategy = this.overlay.position().global().top('160px').right('35px');

    const overlayConfig: OverlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy: positionStrategyRight
    });
    return overlayConfig;
  }

  /*  private processForm(form: EmployeeListFilterViewModel): EmployeeListFilterViewModel {
     for (let keys in form) {
       if (form[keys] === null) {
         form[keys] = '';
       }
     }
     return form;
   } */
}
