import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmployeeListViewModel } from '../models/employeeListViewModel';
import { ExitChecklist } from '../exit-checklist.service';
import { EmployeeListFilterViewModel } from '../models/employeeListFilterViewModel';
import { TableProperty } from '../models/table-property.model';

@Component({
  selector: 'exit-checklist-container',
  templateUrl: './exit-checklist-container.component.html',
})
export class ExitChecklistContainer implements OnInit {

  public resignedEmployees$: Observable<EmployeeListViewModel[]>;
  public status$: Observable<any>;

  constructor(
    private exitchecklist: ExitChecklist
  ) { }

  ngOnInit() {
    this.resignedEmployees$ = this.exitchecklist.getResignedEmployees(new TableProperty);
    // this.getStatus()
  }

  /**
   * getResignedEmployees
   * @param tableProperty 
   */
  public getResignedEmployees(tableProperty: TableProperty<EmployeeListFilterViewModel>) {
    this.resignedEmployees$ = this.exitchecklist.getResignedEmployees(tableProperty);
  }

  /**
   * filteredResignedEmployees
   * @param tableProperty 
   */
  public filteredResignedEmployees(tableProperty: TableProperty<EmployeeListFilterViewModel>): void {
    this.resignedEmployees$ = this.exitchecklist.filterResignedEmployees(tableProperty);
  }
  /* public getStatus() {
    this.status$ = this.exitchecklist.getFilterOptionstatus();
  }*/
} 
