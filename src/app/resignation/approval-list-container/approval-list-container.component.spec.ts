import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalListContainer } from './approval-list-container.component';

describe('ApprovalListContainer', () => {
  let component: ApprovalListContainer;
  let fixture: ComponentFixture<ApprovalListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalListContainer]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
