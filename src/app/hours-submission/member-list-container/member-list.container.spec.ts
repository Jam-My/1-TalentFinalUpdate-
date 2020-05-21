import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListContainer } from './member-list.container';

describe('MemberListContainer', () => {
  let component: MemberListContainer;
  let fixture: ComponentFixture<MemberListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
