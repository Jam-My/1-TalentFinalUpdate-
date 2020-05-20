import { Injectable, ComponentRef, ElementRef } from '@angular/core';
import { Overlay, OverlayConfig, PositionStrategy, ScrollStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { EmployeeFeedbackFormPresentation } from '../employee-feedback-presentation/employee-feedback-form-presentation/employee-feedback-form-presentation.component';
import { ApprovalListFilterPresentation } from 'src/app/resignation/approval-list-container/approval-list-presentation/approval-list-filter-presentation/approval-list-filter-presentation.component';
import { Observable, Subject } from 'rxjs';
import { FeedBackResponse } from '../../models/feedback-response.model';

@Injectable()
export class EmployeeFeedbackPresenter {

  public submitFeedBack$: Observable<FeedBackResponse>;
  public feedBackComponentInstance: EmployeeFeedbackFormPresentation;
  private submitFeedBack: Subject<FeedBackResponse>;


  constructor(private overlay: Overlay) {
    this.submitFeedBack = new Subject<FeedBackResponse>();
    this.submitFeedBack$ = this.submitFeedBack.asObservable();
  }

  /**
   * openFeedBackForm
   */
  public openFeedBackForm(): void {
    const config: OverlayConfig = this.getOverlayConfig();
    const overlayRef: OverlayRef = this.overlay.create(config);
    const feedbackPresentationComponentPortal: ComponentPortal<EmployeeFeedbackFormPresentation> = new ComponentPortal(EmployeeFeedbackFormPresentation);
    const feedbackComponentRef: ComponentRef<EmployeeFeedbackFormPresentation> = overlayRef.attach(feedbackPresentationComponentPortal);
    this.feedBackComponentInstance = feedbackComponentRef.instance;

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.detach();
    });


    this.feedBackComponentInstance.submitFeedBack$.subscribe((feedBackResponse: FeedBackResponse) => {
      this.submitFeedBack.next(feedBackResponse);
    });

    this.feedBackComponentInstance.closeFilter.subscribe((close: boolean) => {
      if (close) {
        overlayRef.detach();
      }
    });
  }

  /**
   * getOverlayConfig
   * @param config propvide optional default config for angular cdk
   * @param hostButton optional field to open overlay with reference to that button
   * @description returns config rquired to create dynamic components
   */
  private getOverlayConfig(config?: OverlayConfig, hostButton?: ElementRef): OverlayConfig {
    const positionStrategy: PositionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    const overlayConfig: OverlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy,
    });
    return overlayConfig;
  }


}

