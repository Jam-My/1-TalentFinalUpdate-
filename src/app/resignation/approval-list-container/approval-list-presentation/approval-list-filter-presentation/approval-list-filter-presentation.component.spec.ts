import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalListFilterPresentation } from './approval-list-filter-presentation.component';

describe('ApprovalListFilterPresentation', () => {
  let component: ApprovalListFilterPresentation;
  let fixture: ComponentFixture<ApprovalListFilterPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalListFilterPresentation]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalListFilterPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
