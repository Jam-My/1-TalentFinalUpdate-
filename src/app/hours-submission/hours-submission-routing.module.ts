import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimecardContainer } from './timecard-container/timecard.container';
import { MemberListContainer } from './member-list-container/member-list.container';
import { ApprovalContainer } from './approval-container/approval.container';

const routes: Routes = [
  {
    path: 'timecard',
    component: TimecardContainer
  },
  {
    path: 'member-list',
    component: MemberListContainer
  },
  {
    path: 'approval',
    component: ApprovalContainer
  },
  {
    path: '',
    redirectTo: 'timecard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoursSubmissionRoutingModule { }
