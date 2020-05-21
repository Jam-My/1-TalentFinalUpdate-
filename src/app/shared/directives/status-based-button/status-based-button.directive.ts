import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[statusBasedButton]'
})
export class StatusBasedButtonDirective {


  @Input()
  public set statusBasedButton(value: string[]) {
    this._showFor = value;
  }

  public get showFor() {
    return this._showFor;
  }

  @Input('statusBasedButtonCurrent')
  public set current(value: string) {
    if (value) {

      this._current = value;
      this.updateDOM();
    }
  }

  public get current() {
    return this._current;
  }

  private _showFor: string[];
  private _current: string;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  public updateDOM() {
    const roles = this.showFor;
    const currentRole = this.current;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === currentRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        break;
      } else {
        this.viewContainer.clear();
      }
    }
  }
  /* ngAfterContentInit(): void {
    if (this.current) {
      this.updateDOM();
    }
  } */
}
