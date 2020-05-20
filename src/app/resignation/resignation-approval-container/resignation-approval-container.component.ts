/**
 * @author Nurali K
 * @description Container Component for Resignation Approval
 */
import { Component, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, switchMap, pluck } from 'rxjs/operators';

import { ResignationService } from '../resignation.service';
import { OidcFacade } from 'ng-oidc-client';
import { HttpResponse } from '@angular/common/http';
import { EmployeeResignation } from '../models/employee-resignation-model/employee-resignation.model';
import { ResignationResponse } from '../models/resignation-response-model/resignation-response.model';
import { ROLES } from '../role.constants';

@Component({
  selector: 'resignation-approval-container',
  templateUrl: './resignation-approval-container.component.html'
})
export class ResignationApprovalContainer implements OnInit {

  public employeeResignationDetails$: Observable<EmployeeResignation>;
  public roles$: Observable<string[]>;

  constructor(private resignationService: ResignationService,
    private queryRoute: ActivatedRoute,
    private oidc: OidcFacade) { }

  public ngOnInit(): void {
    this.employeeResignationDetails$ = this.getResignationDetails();

    this.roles$ = from(this.oidc.getUserManager().getUser()).pipe(
      pluck('profile', 'role'),
    );
  }

  /**
   * saveApplicationResponse
   * @param applicationResponse 
   * @description save response based on actions such as approve/reject
   */
  public saveApplicationResponse(applicationResponse: ResignationResponse): void {
    this.resignationService.saveApplicationResponse(applicationResponse).subscribe((response: HttpResponse<any>) => {
      this.employeeResignationDetails$ = this.getResignationDetails();
    });
  }
  public editApplicationResponse(applicationResponse: ResignationResponse): void {
    this.resignationService.editApplicationResponse(applicationResponse).subscribe((response: HttpResponse<any>) => {
      this.employeeResignationDetails$ = this.getResignationDetails();
    });
  }
  /**
   * getResignationDetails
   * @description fetch resignation based on id in query param
   */
  private getResignationDetails(): Observable<EmployeeResignation> {
    return this.queryRoute.paramMap.pipe(
      filter((queryParams: ParamMap) => queryParams.has('resignationId')),
      switchMap((queryParams: ParamMap) => {
        const resignationId: string = queryParams.get('resignationId');
        return this.resignationService.getEmployeeResignationDetails(resignationId);
      }));
  }


}
