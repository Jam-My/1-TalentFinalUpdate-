/**
 * @author Nurali K
 * @description Directive to show/hide template blocks based on user role
 */
import { Directive, Input, TemplateRef, ViewContainerRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[showForRoles]'
})
export class RoleBasedDisplayDirective implements AfterContentInit {

  @Input('showForRoles')
  public set roles(value: string[]) {
    this._roles = value;
  }

  public get roles(): string[] {
    return this._roles;
  }

  @Input('showForRolesCurrent')
  public set currentRoles(value: string[]) {
    if (value) {
      this._currentRoles = value;
      this.updateDOM();
    }
  }

  public get currentRoles(): string[] {
    return this._currentRoles;
  }

  private isShowing: boolean = false;
  private _roles: string[];
  private _currentRoles: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  /**
   * updateDOM
   * @description create view when user is authorized to view the respective template 
   */
  public updateDOM(): void {
    const roles = this.roles;
    const currentRoles = this.currentRoles;
    const displayBlock = (currentRoles.filter(role => roles.includes(role))).length > 0;
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
