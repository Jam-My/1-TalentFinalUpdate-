import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffingSheetContainer } from './staffing-sheet.container';

describe('StaffingSheetContainer', () => {
  let component: StaffingSheetContainer;
  let fixture: ComponentFixture<StaffingSheetContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffingSheetContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffingSheetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
