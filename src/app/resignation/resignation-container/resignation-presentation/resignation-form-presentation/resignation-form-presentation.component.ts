import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ResignationFormPresenter } from '../resignation-form-presenter/resignation-form-presenter.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResignationDetails } from 'src/app/resignation/models/resignation-model/resignationDetail.model';
import { ConcernPerson } from 'src/app/resignation/models/resignation-model/concern-person.model';
import { ResignationRevoke } from 'src/app/resignation/models/resignation-model/resignation-revoke.model';
@Component({
  selector: 'resignation-form-ui',
  templateUrl: './resignation-form-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ResignationFormPresenter]
})
export class ResignationFormPresentation implements OnInit {

  public datePickerConfig: Partial<BsDatepickerConfig>;
  public today: Date = new Date();
  @Output() public add: EventEmitter<ResignationDetails>;
  public concernPersons: ConcernPerson[];
  public resignationForm: FormGroup;
  public isFormSubmitted: boolean = false;
  public resignationData: ResignationDetails;
  public resignationFormData: Subject<ResignationDetails>;
  public closeForm: Subject<ResignationRevoke>;


  constructor(
    private resignationformpresenter: ResignationFormPresenter,
    private loader: NgxUiLoaderService
  ) {
    this.closeForm = new Subject();
    this.add = new EventEmitter();
    /** Date Picker Configuration */
    this.datePickerConfig = {
      dateInputFormat: 'DD/MM/YYYY',
      showWeekNumbers: false,
      minDate: new Date((this.today).setDate(this.today.getDate() + 1))
    };
    this.resignationForm = resignationformpresenter.buildForm();

    this.resignationFormData = new Subject<ResignationDetails>();

  }

  ngOnInit() {
    this.resignationformpresenter.add$.subscribe((resignation: ResignationDetails) => {
      if (resignation) {
        this.resignationFormData.next(resignation);
      }
    });
    this.loader.stop();
  }
  /**
   * submit
   * @description It will submit the Resignation form
   */
  public submit(): void {
    this.isFormSubmitted = true;
    this.resignationformpresenter.addResignation(this.resignationForm);
  }

  /**
   * closeResignationForm
   * @description Will close the resignation form
   */
  public closeResignationForm(): void {
    this.closeForm.next();
  }
  /**
   * reset
   * @description It will reset the Resignation Form
   */
  public reset(): void {
    this.resignationForm.reset();
  }
}
