import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ResignationRevokePresenter } from '../resignation-revoke-presenter/resignation-revoke-presenter.service';
import { FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResignationRevoke } from 'src/app/resignation/models/resignation-model/resignation-revoke.model';
import { ResignationDetails } from 'src/app/resignation/models/resignation-model/resignationDetail.model';

@Component({
  selector: 'resignation-revoke-presentation',
  templateUrl: './resignation-revoke-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ResignationRevokePresenter]
})
export class ResignationRevokePresentation implements OnInit {
  @Output() public add: EventEmitter<ResignationRevoke>;

  // The Raised On date that has to be displayed on the Form
  public date: Date;
  public revokeForm: FormGroup;
  public revokeData: ResignationRevoke;
  public revokeFormData: Subject<ResignationRevoke>;
  public closeForm: Subject<ResignationRevoke>;

  constructor(private revokeFormPresenter: ResignationRevokePresenter,
    private loader: NgxUiLoaderService) {
    this.revokeFormData = new Subject<ResignationRevoke>();
    this.add = new EventEmitter();
    this.revokeForm = revokeFormPresenter.buildForm();
    this.closeForm = new Subject();
  }

  ngOnInit(): void {
    this.revokeFormPresenter.add$.subscribe((reason: ResignationRevoke) => {
      if (reason) {
        this.revokeFormData.next(reason);
      }
    });
    this.loader.stop();
  }

  /**
   * submit
   * @description Will submit Form Data to presenter.
   */
  public submit(): void {
    this.revokeFormPresenter.revokeResignation(this.revokeForm);
  }

  /**
   * cancel
   * @description Will cancel the request & detach the form
   */
  public cancel(): void {
    this.closeForm.next();
  }

  /**
   * setRaisedOnDate
   * @param resignation 
   * @description It will Set the Raised On date of the resignation on to the Revoke Form
   */
  public setRaisedOnDate(resignation: ResignationDetails[]): void {
    const lastResignation: ResignationDetails = resignation[resignation.length - 1];
    this.date = lastResignation.requestDate;
  }
}
