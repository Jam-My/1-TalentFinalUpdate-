import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs-compat/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResignationDetails } from 'src/app/resignation/models/resignation-model/resignationDetail.model';

@Injectable()
export class ResignationFormPresenter {
  public add$: Observable<ResignationDetails>;
  private add: Subject<ResignationDetails> = new Subject();

  constructor(
    private formBuilder: FormBuilder) {
    this.add$ = this.add.asObservable();
  }

  public buildForm(): FormGroup {
    return this.formBuilder.group({
      relieveDate: [null, [Validators.required]],
      reason: ['', [Validators.required, Validators.minLength(25), Validators.maxLength(250)]],
      ccPersons: [[]],
    });
  }
  public addResignation(resignationForm: FormGroup) {
    if (resignationForm.valid) {
      let resignation: ResignationDetails = new ResignationDetails();
      resignation = resignationForm.getRawValue();
      this.add.next(resignation)
    }
  }
}

