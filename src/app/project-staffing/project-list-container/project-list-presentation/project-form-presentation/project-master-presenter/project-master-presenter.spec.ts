import { TestBed } from '@angular/core/testing';

import { ProjectMasterPresenter } from './project-master-presenter';

describe('ProjectMasterPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectMasterPresenter = TestBed.get(ProjectMasterPresenter);
    expect(service).toBeTruthy();
  });
});
