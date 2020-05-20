import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResignationRevoke } from 'src/app/resignation/models/resignation-model/resignation-revoke.model';

@Injectable()
export class ResignationRevokePresenter {
  public add$: Observable<ResignationRevoke>;
  private add: Subject<ResignationRevoke> = new Subject();

  constructor(
    private formBuilder: FormBuilder) {
    this.add$ = this.add.asObservable();
  }

  /**
   * buildForm
   * @description it will build the revoke Form
   */
  public buildForm(): FormGroup {
    return this.formBuilder.group({
      revokeReason: ['', [Validators.required, Validators.minLength(25), Validators.maxLength(250)]]
    });
  }

  /**
   * revokeResignation
   * @param revokeForm 
   * @description It will send the revoke Data 
   */
  public revokeResignation(revokeForm: FormGroup): void {
    if (revokeForm.valid) {
      let revoke: ResignationRevoke = new ResignationRevoke();
      revoke = revokeForm.getRawValue();
      this.add.next(revoke)
    }
  }
}
