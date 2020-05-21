import { TestBed } from '@angular/core/testing';

import { ChecklistActivityFormPresenter } from './checklist-activity-form-presenter.service';
import { ChecklistActivityFormPresentation } from '../checklist-activity-form-presentation/checklist-activity-form-presentation.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatusResponse } from '../../models/update-status-resonse.model';

describe('ChecklistActivityFormPresenter', () => {
  let service: ChecklistActivityFormPresenter;
  let saveStatusSpy;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      SharedModule
    ],
    declarations: [
      ChecklistActivityFormPresentation
    ],
    providers: [ChecklistActivityFormPresenter]
  }).compileComponents());

  beforeEach(() => {
    service = TestBed.get(ChecklistActivityFormPresenter);
    saveStatusSpy = spyOn(service, 'saveStatus');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call buildForm to return a FormGroup', () => {
    const form: FormGroup = service.buildForm();
    expect(service.buildForm).toHaveBeenCalled;
  });

  it('should set minlength error when length is below 25', () => {
    const form: FormGroup = service.buildForm();
    const remarks: FormControl = form.get('remarks') as FormControl;
    remarks.setValue('less than 25 char');
    expect(remarks.errors).not.toBeNull();
  });

  it('should not set minlength error when length is above 25', () => {
    const form: FormGroup = service.buildForm();
    const remarks: FormControl = form.get('remarks') as FormControl;
    remarks.setValue('this is a perfectly valid remork without errors');
    expect(remarks.errors).toBeNull();
  });

  it('should call saveStatus method ', () => {
    const form: FormGroup = service.buildForm();
    service.saveStatus(form);
    expect(saveStatusSpy).toHaveBeenCalled();
  });


  it('should emit status response when form is valid', () => {
    const form: FormGroup = service.buildForm();
    service.updateStatus$.subscribe((resp: StatusResponse) => {
      expect(resp).toEqual(jasmine.any(StatusResponse));
    });
    service.saveStatus(form);
  })
});
