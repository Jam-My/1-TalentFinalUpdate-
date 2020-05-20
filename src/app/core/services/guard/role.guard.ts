import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ROLES } from 'src/app/resignation/role.constants';


@Injectable()
export class RoleGuard implements CanActivate {

  private currentRoles;
  private allowedFor: string[];
  constructor(private router: Router) {
    this.initRoles();
  }

  /**
   * canActivate
   * @param route 
   * @param state 
   */
  public canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.allowedFor = route.data.allowedRoles;
    const allow = (this.currentRoles.filter(role => this.allowedFor.includes(role))).length > 0;
    if (!allow) {
      if (this.currentRoles.includes(ROLES.EMP)) {
        this.router.navigate(['/exit-checklist/employee-feedback']);
      } else if (this.currentRoles.includes(ROLES.RM)) {
        this.router.navigate(['/']);
      }

      console.log('Unauthorized Access');
      //TODO: no setup for role of rm
    }
    return true;
  }

  /**
   * initRoles
   */
  private initRoles(): void {
    this.currentRoles = JSON.parse(localStorage.getItem('user_policy:1Talent')).roles;
  }
}
