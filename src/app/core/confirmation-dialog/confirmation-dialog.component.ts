import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {

  // Close overlay with responce
  @Output() public closeOverlay: EventEmitter<boolean>;

  constructor() {
    this.closeOverlay = new EventEmitter<boolean>();
   }

  ngOnInit() {
  }

  /**
   * submit
   * @param flag store true/false
   */
  public submit(flag: boolean): void{
    this.closeOverlay.emit(flag);
  }
}
