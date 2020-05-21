import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalContainer } from './approval.container';

describe('ApprovalContainer', () => {
  let component: ApprovalContainer;
  let fixture: ComponentFixture<ApprovalContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
