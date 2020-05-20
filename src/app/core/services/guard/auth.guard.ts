import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { HttpErrorResponse } from '@angular/common/http';
import { OidcFacade } from 'ng-oidc-client';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
// -------------------------------------- //
import { AuthPolicyService, PolicyData } from 'auth-policy';
import { AuthService } from '../auth/auth.service';

/**
 * AuthGuard
 */
@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private oidcFacade: OidcFacade,
    private authPolicy: AuthPolicyService
  ) { }

  /** canActivate */
  public canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const isLoggedIn: Observable<boolean> = this.authService.isLoggedInObs();

    return isLoggedIn.pipe(
      switchMap(
        (loggedIn: boolean) => {
          if (!loggedIn) {
            this.oidcFacade.signinRedirect();
            return of(false); // user not logged in, canActivate = false
          } else {
            this.oidcFacade.getUserManager().events.addAccessTokenExpired(() => {
              this.oidcFacade.signinRedirect();
              return of(false);
            });
            return this.checkPolicyData();
          }
        }
      ));
  }

  /** checkPolicyData */
  private checkPolicyData(): Observable<boolean> {
    return this.authPolicy.getPolicyData().pipe(
      map((policyData: PolicyData) => {
        if (policyData.roles.length > 0) {
          return true;
        } else {
          return false;
        }
      },
          (err: HttpErrorResponse) => {
          return false;
        }));

  }

}
