import { Injectable, Injector } from '@angular/core';
import { OverlayRef, OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  public modalData: Subject<boolean>;
  constructor(
    private overlay: Overlay
  ) { }

  /**
   * createProjectForm
   */
  public open(): void {
    this.modalData = new Subject<boolean>();
    let config = new OverlayConfig();
    // To set position of overlay
    config.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Used to close overlay on Backdrop
    config.hasBackdrop = true;

    // Used in creating overlay
    let overlayRef: OverlayRef = this.overlay.create(config);

    // Used to close overlay on Backdrop
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });

    // Create overlay
    let ref = overlayRef.attach(new ComponentPortal(ConfirmationDialogComponent));
    ref.instance.closeOverlay.subscribe((value: boolean) => {
      overlayRef.dispose();
      this.modalData.next(value);
    });
    
  }
}