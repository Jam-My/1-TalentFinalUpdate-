/** 
 * @author Hem Chudgar 
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';
import { Router } from '@angular/router';
import { AuthPolicyService, PolicyData } from 'auth-policy';
import { User } from 'oidc-client';
// ------------------------------------------- //
import { LoaderService } from '../../services/loader/loader.service';
import { AuthService } from '../../services/auth/auth.service';

/**
 * AuthCallbackComponent
 */
@Component({
  selector: 'lib-auth-callback',
  template: '',
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthCallbackComponent implements OnInit {

  /**
   * Policy retrieved of auth callback component
   */
  private policyRetrieved: boolean;

  constructor(
    private router: Router,
    private oidcFacade: OidcFacade,
    private authPolicy: AuthPolicyService,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {
    this.policyRetrieved = false;
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.loaderService.showLoader(true);
    this.oidcFacade.getUserManager().signinRedirectCallback().then((user: User) => {
      if (user) {
        this.authService.setUserData(user);
        this.authPolicy.loadPolicyData().subscribe((policyData: PolicyData) => {
          if (policyData.roles.length > 0 && !this.policyRetrieved) {
            this.policyRetrieved = true;
            this.oidcFacade.getUserManager().clearStaleState();
            this.router.navigate(['/']);
          }
        });
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

}
