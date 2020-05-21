import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../shared/shared.module';
import { ChecklistActivityContainer } from './checklist-activity-container/checklist-activity-container.component';
import { ChecklistActivityPresentation } from './checklist-activity-container/checklist-activity-presentation/checklist-activity-presentation.component';
import { ChecklistActivityFormContainer } from './checklist-activity-form-container/checklist-activity-form-container.component';
import { ChecklistActivityFormPresentation } from './checklist-activity-form-container/checklist-activity-form-presentation/checklist-activity-form-presentation.component';
import { EmployeeFeedbackContainer } from './employee-feedback-container/employee-feedback-container.component';
import { EmployeeFeedbackFormPresentation } from './employee-feedback-container/employee-feedback-presentation/employee-feedback-form-presentation/employee-feedback-form-presentation.component';
import { EmployeeFeedbackPresentation } from './employee-feedback-container/employee-feedback-presentation/employee-feedback-presentation.component';
import { ActivityDetailsAdapter, EmployeeFeedBackAdapter, MyActivityAdpater } from './exit-checklist-adapter/exit-checklist.adapter';
import { ExitChecklistContainer } from './exit-checklist-container/exit-checklist-container.component';
import { ExitChecklistFilterPresentation } from './exit-checklist-container/exit-checklist-presentation/exit-checklist-filter-presentation/exit-checklist-filter-presentation.component';
import { ExitChecklistPresentation } from './exit-checklist-container/exit-checklist-presentation/exit-checklist-presentation.component';
import { ExitChecklistRoutingModule } from './exit-checklist-routing.module';
import { ExitChecklist } from './exit-checklist.service';
import { InitiateChecklistContainer } from './initiate-checklist-container/initiate-checklist-container.component';
import { CompleteChecklistPresentation } from './initiate-checklist-container/initiate-checklist-presentation/complete-checklist-presentation/complete-checklist-presentation.component';
import { InitiateChecklistFilterPresentation } from './initiate-checklist-container/initiate-checklist-presentation/initiate-checklist-filter-presentation/initiate-checklist-filter-presentation.component';
import { InitiateChecklistPresentation } from './initiate-checklist-container/initiate-checklist-presentation/initiate-checklist-presentation.component';

@NgModule({
  declarations: [
    ExitChecklistContainer,
    ExitChecklistPresentation,
    ExitChecklistFilterPresentation,
    InitiateChecklistContainer,
    InitiateChecklistPresentation,
    InitiateChecklistFilterPresentation,
    CompleteChecklistPresentation,
    ChecklistActivityContainer,
    ChecklistActivityPresentation,
    ChecklistActivityFormContainer,
    ChecklistActivityFormPresentation,
    EmployeeFeedbackContainer,
    EmployeeFeedbackPresentation,
    EmployeeFeedbackFormPresentation
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExitChecklistRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
    BsDatepickerModule
  ],
  providers: [
    ExitChecklist,
    MyActivityAdpater,
    ActivityDetailsAdapter,
    EmployeeFeedBackAdapter
  ],
  entryComponents: [
    ExitChecklistFilterPresentation,
    InitiateChecklistFilterPresentation,
    CompleteChecklistPresentation,
    EmployeeFeedbackFormPresentation
  ],
})
export class ExitChecklistModule { }
