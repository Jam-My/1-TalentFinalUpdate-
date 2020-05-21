import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalListPresentation } from './approval-list-presentation.component';

describe('ApprovalListPresentation', () => {
  let component: ApprovalListPresentation;
  let fixture: ComponentFixture<ApprovalListPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalListPresentation]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalListPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
