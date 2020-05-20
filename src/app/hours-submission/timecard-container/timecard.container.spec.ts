import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecardContainer } from './timecard.container';

describe('TimecardContainer', () => {
  let component: TimecardContainer;
  let fixture: ComponentFixture<TimecardContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimecardContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimecardContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
