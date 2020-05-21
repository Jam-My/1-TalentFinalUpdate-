import { TestBed } from '@angular/core/testing';

import { ResignationFormPresenter } from './resignation-form-presenter.service';

describe('ResignationFormPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResignationFormPresenter = TestBed.get(ResignationFormPresenter);
    expect(service).toBeTruthy();
  });
});
