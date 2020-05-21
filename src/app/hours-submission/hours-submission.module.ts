import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApprovalContainer } from './approval-container/approval.container';
import { ApprovalPresentation } from './approval-container/approval-presentation/approval.presentation';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MemberListContainer } from './member-list-container/member-list.container';
import { MemberListPresentation } from './member-list-container/member-list-presentation/member-list.presentation';
import { HoursSubmissionRoutingModule } from './hours-submission-routing.module';
import { TimecardContainer } from './timecard-container/timecard.container';
import { TimecardPresentation } from './timecard-container/timecard-presentation/timecard.presentation';
import { TimeCardService } from './services/time-card.service';
import { DigitOnlyDirective } from './directives/digit-only.directive';

@NgModule({
  declarations: [
    TimecardContainer,
    MemberListContainer,
    MemberListPresentation,
    ApprovalContainer,
    ApprovalPresentation,
    TimecardPresentation,
    DigitOnlyDirective
  ],
  imports: [
    CommonModule,
    HoursSubmissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  providers: [
    TimeCardService,
    DatePipe
  ]
})
export class HoursSubmissionModule { }
