import { TestBed } from '@angular/core/testing';

import { ResignationPresenter } from './resignation-presenter.service';

describe('ResignationPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResignationPresenter = TestBed.get(ResignationPresenter);
    expect(service).toBeTruthy();
  });
});
