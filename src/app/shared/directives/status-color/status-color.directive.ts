import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { STATUS } from 'src/app/exit-checklist/status.constants';

@Directive({
  selector: '[statusColor]'
})
export class StatusColorDirective {

  @Input() public set status(value: number) {
    if (value) {
      this._status = value;
      this.updateColor();
    }
  }


  public get status(): number {
    return this._status;
  }

  private _status: number;

  constructor(private elRef: ElementRef,
              private renderer: Renderer2) {
  }

  /**
   * updateColor
   * @description Updates color of the element based on the status recieved via input
   */
  private updateColor(): void {
    switch (this.status) {
      case STATUS.Initiated:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-info');
        break;
      case STATUS.AcceptedByRM:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-success');
        break;
      case STATUS.RejectedByRM:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-danger');
        break;
      case STATUS.Revoked:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-danger');
        break;
      case STATUS.AcceptedByHR:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-success');
        break;
      case STATUS.RejectedByHR:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-danger');
        break;
      case STATUS.Closed:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-success');
        break;
      case STATUS.NotStarted:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-light');
        break;
      case STATUS.InProgress:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-warning');
        break;
      case STATUS.Completed:
        this.renderer.addClass(this.elRef.nativeElement, 'badge-success');
        break;
    }
  }
}