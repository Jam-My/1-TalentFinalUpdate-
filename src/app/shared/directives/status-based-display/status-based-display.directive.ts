/**
 * @author Nurali K
 * @description Directive to show/hide template blocks based on resignation status
 */
import { Directive, Input, TemplateRef, ViewContainerRef, AfterContentInit } from '@angular/core';
import { STATUSES_FOR } from 'src/app/resignation/status-map.constants';

@Directive({
  selector: '[showForStatus]'
})
export class StatusBasedDisplayDirective implements AfterContentInit {

  @Input('showForStatus')
  public set currentStatus(value: string) {
    this._currentStatus = value;
    if (this.currentRoles) {
      this.updateDOM();
    }
  }

  public get currentStatus() {
    return this._currentStatus;
  }

  @Input('showForStatusCurrentRoles')
  public set currentRoles(value: string[]) {
    if (value) {
      this._currentRoles = value;
      this.updateDOM();
    }
  }

  public get currentRoles() {
    return this._currentRoles;
  }

  private isShowing: boolean = false;
  private _currentStatus: string;
  private _currentRoles: string[];

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }


  /**
   * updateDOM
   * @description collect all valid status for current user role and show respective template
   */
  public updateDOM() {
    let validStatuses = [];
    const currentStatus = this.currentStatus;
    const currentRoles = this.currentRoles;

    currentRoles.forEach(role => {
      if (STATUSES_FOR[role]) {
        let validForRole = STATUSES_FOR[role];
        validStatuses.push(...validForRole);
      }
    });

    const displayBlock = validStatuses.includes(currentStatus);
    if (displayBlock) {

      if (!this.isShowing) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isShowing = true;
      }
    } else {
      if (this.isShowing) {
        this.viewContainer.clear();
        this.isShowing = false;
      }
    }
  }

  /**
  * @description To update DOM when directives are nested and new view is created
  */
  ngAfterContentInit(): void {
    if (this.currentRoles) {
      this.updateDOM();
    }
  }
}
