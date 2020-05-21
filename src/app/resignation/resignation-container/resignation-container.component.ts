/**
 * @author Kalrav Shah
 * @description used To do all the Api calls From Here 
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { from } from 'rxjs';

import { ConcernPerson } from 'src/app/resignation/models/resignation-model/concern-person.model';
import { map, pluck } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OidcFacade } from 'ng-oidc-client';
import { ResignationDetails } from '../models/resignation-model/resignationDetail.model';
import { ResignationRevoke } from 'src/app/resignation/models/resignation-model/resignation-revoke.model';
import { ResignationService } from '../resignation.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'resignation-container',
  templateUrl: './resignation-container.component.html',
})
export class ResignationContainer implements OnInit {

  // All the Resignations
  public resignationDetails$: Observable<ResignationDetails[]>;
  // All Concern Persons from the api call 
  public ccPersons$: Observable<ConcernPerson[]>;
  // Roles from the Policy Server
  public roles$: Observable<string>;

  constructor(
    private resignationService: ResignationService,
    private toasterService: ToastrService,
    private oidcFacade: OidcFacade,
    private loader: NgxUiLoaderService) { }


  public ngOnInit(): void {
    this.getResignationDetails();

    this.ccPersons$ = this.resignationService.getCcPerson();

    this.roles$ = from(this.oidcFacade.getUserManager().getUser()).pipe(
      pluck('profile', 'role'),
      // map(profiles => profiles[1])
    );
  }

  /**
   * resignationData
   * @param resignationData
   * @description:Post method To apply the resignation
   */
  public resignationData(resignationData: ResignationDetails): void {
    this.resignationService.addResignation(resignationData).subscribe(() => {
      this.toasterService.success('Resignation Applied Successfully');
      this.getResignationDetails();
    });

  }

  /**
   * revokeData
   * @param revokeData
   * @description Post method To apply the Revoke 
   */
  public revokeData(revokeData: ResignationRevoke): void {
    this.resignationService.revokeResignation(revokeData).subscribe(() => {
      this.toasterService.success('Your Resignation Has Been Revoked');
      this.getResignationDetails();
    });
  }

  /**
   * getResignationDetails
   * @description Get call to fetch resignation details
   */
  public getResignationDetails(): void {
    this.resignationDetails$ = this.resignationService.getResignationDetails();
  }
}
