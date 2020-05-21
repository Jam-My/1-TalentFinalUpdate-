import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, Event } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable, from, Subject } from 'rxjs';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';
import { pluck } from 'rxjs/operators';
import { ROLES } from './role.constants';
import { Title } from '@angular/platform-browser';

/**
 * Component
 */
@Component({
  selector: 'master-ui',
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {

  @ViewChild('dropdownmenu') public menu: ElementRef;
  public logedInUserData$: Observable<User>;
  public roles$: Observable<string>;
  public ROLES: typeof ROLES = ROLES;
  public dropdownFlag: boolean;
  public title: string;
  // RM Id
  public rmId: any;
  public linkFlag: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private oidc: OidcFacade,
    private renderer: Renderer2
  ) {
    this.roles$ = from(this.oidc.getUserManager().getUser()).pipe(
      pluck('profile', 'role'),
    );
    this.dropdownFlag = false;
    if (this.router.url.includes('project-staffing/list')) {
      this.linkFlag = false;
    } else {
      this.linkFlag = true;
    }
    this.rmId = 4;
    localStorage.setItem('RM', this.rmId);
  }

  public ngOnInit(): void {
    this.ROLES = ROLES;
    this.logedInUserData$ = this.authService.getUserData();
    this.ROLES = ROLES;
    if (this.router.url.includes('dashboard')) {
      this.title = 'Dashboard';
    } else if (this.router.url.includes('resignation')) {
      this.title = 'Resignation';
    } else if (this.router.url.includes('exit-checklist')) {
      this.title = 'Exit Checklist';
    } else if (this.router.url.includes('staffing-sheet')) {
      this.title = 'Staffing Sheet';
    } else if (this.router.url.includes('project-staffing')) {
      this.title = 'Project Staffing';
    } else if (this.router.url.includes('timecard')) {
      this.title = 'Time Card';
    } else if (this.router.url.includes('approval')) {
      this.title = 'Approval';
    } else if (this.router.url.includes('member-list')) {
      this.title = 'Company Report';
    } else {
      this.title = '';
    }
  }

  /**
   * logout
   */
  public logout(): void {
    this.oidc.signoutRedirect();
  }

  /**
   * openLogoutDropdown
   */
  public openLogoutDropdown(): void {
    this.renderer.removeClass(this.menu.nativeElement, 'd-none');
    this.renderer.addClass(this.menu.nativeElement, 'd-block');
  }

  /**
   * closeLogoutDropdown
   */
  public closeLogoutDropdown(): void {
    this.renderer.removeClass(this.menu.nativeElement, 'd-block');
    this.renderer.addClass(this.menu.nativeElement, 'd-none');
  }

  /**
   * timecardDropdown
   */
  public timecardDropdown(): void {
    this.dropdownFlag = !this.dropdownFlag;
  }

  /**
   * changeTitle
   */
  public changeTitle(title: string): void {
    this.title = title;
  }

  /**
   * Change RM Type
   */
  public changeRM(): void {
    localStorage.setItem('RM', this.rmId);
    this.router.navigate(['dashboard']);
  }

  /**
   * changeLink
   */
  public changeReportLink(): void {
    this.linkFlag = true;
  }

  /**
   * changeLink
   */
  public changeProjectLink(): void {
    this.linkFlag = false;
  }

}
