import { TestBed } from '@angular/core/testing';

import { ProjectFormPresenter } from './project-form.presenter';

describe('ProjectFormPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectFormPresenter = TestBed.get(ProjectFormPresenter);
    expect(service).toBeTruthy();
  });
});
