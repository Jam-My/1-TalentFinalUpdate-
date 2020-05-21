/**
 * @author Kalrav Shah
 */
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ViewContainerRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ExitChecklistPresenter } from '../exit-checklist-presenter/exit-checklist-presenter.service';
import { EmployeeListViewModel } from '../../models/employeeListViewModel';
import { STATUSSHOW } from '../../status.constant';
import { EmployeeListFilterViewModel } from '../../models/employeeListFilterViewModel';
import { TableProperty } from '../../models/table-property.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Component({
  selector: 'exit-checklist-presentation-ui',
  templateUrl: './exit-checklist-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ExitChecklistPresenter]
})
export class ExitChecklistPresentation implements OnInit {

  @ViewChild('filterButton') public filterButton: ViewContainerRef;

  public status = STATUSSHOW;

  @Input() public set resignedEmployees(value: EmployeeListViewModel[]) {
    if (value) {
      this._resignedEmployees = value;
    }
  }
  public get resignedEmployees(): EmployeeListViewModel[] {
    return this._resignedEmployees;
  }

  @Input() public set statuses(value) {
    if (value) {
      this._statuses = value;
    }
  }
  public get statuses() {
    return this._statuses;
  }
  @Output() public resignedEmp: EventEmitter<TableProperty<EmployeeListFilterViewModel>>;
  @Output() public filterResignedEmp: EventEmitter<TableProperty<EmployeeListFilterViewModel>>;

  public filterFormData: EmployeeListFilterViewModel;
  public resignedEmployee: BehaviorSubject<EmployeeListViewModel[]> = new BehaviorSubject([]);
  public tableProperty: TableProperty<EmployeeListFilterViewModel>;
  public isFilterApply: boolean;
  public resignedEmployee$: Observable<EmployeeListViewModel[]>;

  private _resignedEmployees: EmployeeListViewModel[];
  private _statuses;

  constructor(
    private exitChecklist: ExitChecklistPresenter,
    public changeDetection: ChangeDetectorRef,
  ) {
    this.resignedEmp = new EventEmitter<TableProperty<EmployeeListFilterViewModel>>();
    this.filterResignedEmp = new EventEmitter<TableProperty<EmployeeListFilterViewModel>>();
    this.tableProperty = new TableProperty();
  }

  ngOnInit() {
    this.filterFormData = new EmployeeListFilterViewModel();

    this.exitChecklist.setTableProperty$.subscribe((filterFormData: TableProperty<EmployeeListFilterViewModel>) => {
      this.tableProperty = filterFormData
      if (filterFormData.filter) {
        this.filterResignedEmp.emit(filterFormData);
      } else {
        this.resignedEmp.emit(filterFormData);
      }
    });
  }

  /**
   * openFilter
   */
  public openFilter(): void {
    this.exitChecklist.openFilter(this.statuses);
  }
  /**
   * onPageChange
   * @param pageNumber 
   */
  public onPageChange(pageNumber: number): void {
    this.exitChecklist.onPageChange(pageNumber);
  }

}
