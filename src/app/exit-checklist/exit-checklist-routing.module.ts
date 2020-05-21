import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../core/services/guard/role.guard';
import { ROLES } from '../resignation/role.constants';
import { ChecklistActivityContainer } from './checklist-activity-container/checklist-activity-container.component';
import { ChecklistActivityFormContainer } from './checklist-activity-form-container/checklist-activity-form-container.component';
import { EmployeeFeedbackContainer } from './employee-feedback-container/employee-feedback-container.component';
import { ExitChecklistContainer } from './exit-checklist-container/exit-checklist-container.component';
import { InitiateChecklistContainer } from './initiate-checklist-container/initiate-checklist-container.component';

const routes: Routes = [
  { path: '', component: ExitChecklistContainer},
  { path: 'exitActivities/GetAll/:resignationId', component: InitiateChecklistContainer },
  { path: 'checklist-activity/:resignationId', component: ChecklistActivityContainer },
  { path: 'checklist-activity-form/:activityId', component: ChecklistActivityFormContainer },
  { path: 'employee-feedback', component: EmployeeFeedbackContainer }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitChecklistRoutingModule { }
