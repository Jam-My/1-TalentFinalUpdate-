/**
 * @author Kalrav Shah
 */
import { Injectable, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';

import { ResignationFormPresentation } from '../resignation-presentation/resignation-form-presentation/resignation-form-presentation.component';
import { ResignationDetails } from 'src/app/resignation/models/resignation-model/resignationDetail.model';
import { ConcernPerson } from 'src/app/resignation/models/resignation-model/concern-person.model';
import { ResignationRevoke } from 'src/app/resignation/models/resignation-model/resignation-revoke.model';
import { ResignationRevokePresentation } from '../resignation-presentation/resignation-revoke-presentation/resignation-revoke-presentation.component';

@Injectable()
export class ResignationPresenter {

  public resignationFormData$: Observable<ResignationDetails>;
  public revokeFormData$: Observable<ResignationRevoke>;
  public setUserRole$: Observable<string[]>;

  private resignationFormData: Subject<ResignationDetails>;
  private revokeFormData: Subject<ResignationRevoke>;
  private setUserRole: Subject<string[]>;
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {
    this.resignationFormData = new Subject();
    this.resignationFormData$ = this.resignationFormData.asObservable();
    this.revokeFormData = new Subject();
    this.revokeFormData$ = this.revokeFormData.asObservable();
    this.setUserRole = new Subject<string[]>();
    this.setUserRole$ = this.setUserRole.asObservable();

  }

  /**
   * openResignationForm
   * @param concernPersons 
   * @description Open Resignation Form & append Concern Persons Into the Form
   */
  public openResignationForm(concernPersons: ConcernPerson[]): void {
    const resinationformOverlayConfig: OverlayConfig = new OverlayConfig();
    resinationformOverlayConfig.hasBackdrop = true;
    resinationformOverlayConfig.positionStrategy = this.overlay.position().global().right('0').top('0');

    // Will Create Overlay & attach Form Component To Overlay
    this.overlayRef = this.overlay.create(resinationformOverlayConfig);
    const employeeResignationForm: ComponentPortal<ResignationFormPresentation> = new ComponentPortal(ResignationFormPresentation);
    const resinationformComponentRef: ComponentRef<ResignationFormPresentation> = this.overlayRef.attach(employeeResignationForm);

    // Appends Concern Persons Into the Resignation Form 
    resinationformComponentRef.instance.concernPersons = concernPersons;


    // Applied For Resignation & Close the form
    resinationformComponentRef.instance.resignationFormData.subscribe(response => {
      this.resignationFormData.next(response);
      this.closeResignationForm();
    });

    // From x Button From the form
    resinationformComponentRef.instance.closeForm.subscribe(() => {
      this.closeResignationForm();
    });

    // On Backdrop click Closure Of form
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeResignationForm();
    });
  }

  /**
   * closeResignationForm
   */
  public closeResignationForm(): void {
    this.overlayRef.detach();
  }

  /**
   * openRevokeForm
   * @param resignationDetails 
   * @description Open Revoke Form & append Last Resigned Date Into the Form
   */
  public openRevokeForm(resignationDetails: ResignationDetails[]): void {
    const revokeformOverlayConfig: OverlayConfig = new OverlayConfig();
    revokeformOverlayConfig.hasBackdrop = true;
    revokeformOverlayConfig.positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    // Will Create Overlay & attach Form Component To Overlay
    this.overlayRef = this.overlay.create(revokeformOverlayConfig);
    const employeeRevokeForm: ComponentPortal<ResignationRevokePresentation> = new ComponentPortal(ResignationRevokePresentation);
    const revokeformComponentRef: ComponentRef<ResignationRevokePresentation> = this.overlayRef.attach(employeeRevokeForm);

    // Set raised on date On the form Component
    revokeformComponentRef.instance.setRaisedOnDate(resignationDetails);

    // Applied For Revoke & Close the form
    revokeformComponentRef.instance.revokeFormData.subscribe(response => {
      this.revokeFormData.next(response);
      this.closeRevokeForm();
    });

    // From x Button From the form
    revokeformComponentRef.instance.closeForm.subscribe(() => {
      this.closeRevokeForm();
    });

    // Backdrop click Closure Of form
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeRevokeForm();
    });
  }

  /**
   * closeRevokeForm
   */
  public closeRevokeForm(): void {
    this.overlayRef.detach();
  }


  /**
   * initializeRoles
   * @param roles 
   * @description This will Initialize & set the roles
   */
  public initializeRoles(roles: string[]): void {
    this.setUserRole.next(roles);
  }
}
