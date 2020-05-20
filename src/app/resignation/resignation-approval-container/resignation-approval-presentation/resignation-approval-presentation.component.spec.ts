import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationApprovalPresentationComponent } from './resignation-approval-presentation.component';

describe('ResignationApprovalPresentationComponent', () => {
  let component: ResignationApprovalPresentationComponent;
  let fixture: ComponentFixture<ResignationApprovalPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationApprovalPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationApprovalPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
