import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListContainer } from './project-list.container';

describe('ProjectListContainer', () => {
  let component: ProjectListContainer;
  let fixture: ComponentFixture<ProjectListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
