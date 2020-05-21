import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListContainer } from './role-list.container';

describe('RoleListContainer', () => {
  let component: RoleListContainer;
  let fixture: ComponentFixture<RoleListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
