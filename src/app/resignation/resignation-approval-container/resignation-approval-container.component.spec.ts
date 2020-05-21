import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationApprovalContainer } from './resignation-approval-container.component';

describe('ResignationApprovalContainer', () => {
  let component: ResignationApprovalContainer;
  let fixture: ComponentFixture<ResignationApprovalContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationApprovalContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationApprovalContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
