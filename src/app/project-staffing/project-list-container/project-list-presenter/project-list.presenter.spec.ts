import { TestBed } from '@angular/core/testing';

import { ProjectListPresenter } from './project-list.presenter';

describe('ProjectListPresenter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectListPresenter = TestBed.get(ProjectListPresenter);
    expect(service).toBeTruthy();
  });
});
