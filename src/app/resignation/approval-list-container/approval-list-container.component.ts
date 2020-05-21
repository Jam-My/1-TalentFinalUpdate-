/**
 * @author Nurali K
 * @description Container Component for Resignation Approval List
 */
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';

import { FilterFormData } from 'src/app/resignation/models/filter-options-model/filter-options.model';
import { FilterDropwdownOptions } from '../models/filter-form-options-model/filter-form-options.model';
import { ResignationService } from '../resignation.service';
import { ResignationDetails } from '../models/resignation-request-model/resignation-request.model';

@Component({
  selector: 'app-approval-list-container',
  templateUrl: './approval-list-container.component.html',
})

export class ApprovalListContainer implements OnInit {

  public resignationDetailsList$: Observable<ResignationDetails[]>;
  public filterDropwdownOptions$: Observable<FilterDropwdownOptions>;

  constructor(private resignationService: ResignationService) { }

  public ngOnInit(): void {
    this.resignationDetailsList$ = this.resignationService.getResignationList(new FilterFormData());
  }

  /**
   * getfilterDropwdownOptions
   * @description Get Data from api to populate dropdowns for filtering list
   */
  public getfilterDropwdownOptions(): void {
    forkJoin(
      this.resignationService.getFilterOptionDomain(),
      this.resignationService.getFilterOptionTechnology(),
      this.resignationService.getFilterOptionDesignation(),
      this.resignationService.getFilterOptionStatus()
    ).subscribe(([Domains, Technologies, Designations, Statuses]) => {
      let filterDropwdownOptions: FilterDropwdownOptions = new FilterDropwdownOptions();
      filterDropwdownOptions.domains = Domains;
      filterDropwdownOptions.technologies = Technologies;
      filterDropwdownOptions.designations = Designations;
      filterDropwdownOptions.statuses = Statuses;
      this.filterDropwdownOptions$ = of(filterDropwdownOptions);
    });
  }

  /**
   * getResignationDetails
   * @param filterFormData contains data for pagination and filtering
   * @description gets list of resignations from api
   */
  public getResignationDetails(filterFormData: FilterFormData): void {
    this.resignationDetailsList$ = this.resignationService.getResignationList(filterFormData);
  }

  /**
   * applyfilterData
   * @param filterFormData contains data for pagination and filtering
   * @description  gets filtered list of resignations from api
   */
  public applyfilterData(filterFormData: FilterFormData): void {
    this.resignationDetailsList$ = this.resignationService.getResignationList(filterFormData);
  }
}
