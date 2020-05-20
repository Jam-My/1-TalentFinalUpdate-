import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalListContainer } from './approval-list-container/approval-list-container.component';
import { ResignationApprovalContainer } from './resignation-approval-container/resignation-approval-container.component';
import { ResignationContainer } from './resignation-container/resignation-container.component';
const routes: Routes = [
  { path: '', component: ResignationContainer },
  { path: 'approval-list', component: ApprovalListContainer },
  { path: 'approval/:resignationId', component: ResignationApprovalContainer },
  // TODO ROUTING ERROR HERE
  /* {
    path: 'exit-checklist/exitActivities/GetAll/:resignationId',

  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResignationRoutingModule { }
