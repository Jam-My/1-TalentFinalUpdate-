import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationContainer } from './resignation-container.component';

describe('ResignationContainer', () => {
  let component: ResignationContainer;
  let fixture: ComponentFixture<ResignationContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResignationContainer]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
