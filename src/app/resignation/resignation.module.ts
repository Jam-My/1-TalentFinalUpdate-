import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../shared/shared.module';
import { ApprovalListContainer } from './approval-list-container/approval-list-container.component';
import { ApprovalListFilterPresentation } from './approval-list-container/approval-list-presentation/approval-list-filter-presentation/approval-list-filter-presentation.component';
import { ApprovalListPresentation } from './approval-list-container/approval-list-presentation/approval-list-presentation.component';
import { ApprovalListAdapter, ResingationApprovalAdapter } from './resignation-adapter/resignation-adapter';
import { ResignationApprovalContainer } from './resignation-approval-container/resignation-approval-container.component';
import { ResignationApprovalPresentationComponent } from './resignation-approval-container/resignation-approval-presentation/resignation-approval-presentation.component';
import { ResignationAdapter } from './resignation-container/resignation-Adapter/resignation.adapter';
// User Components & Services Imports
import { ResignationContainer } from './resignation-container/resignation-container.component';
import { ResignationFormPresentation } from './resignation-container/resignation-presentation/resignation-form-presentation/resignation-form-presentation.component';
import { ResignationPresentation } from './resignation-container/resignation-presentation/resignation-presentation.component';
import { ResignationRevokePresentation } from './resignation-container/resignation-presentation/resignation-revoke-presentation/resignation-revoke-presentation.component';
import { ResignationRoutingModule } from './resignation-routing.module';
import { ResignationService } from './resignation.service';
import { InitiateChecklistContainer } from '../exit-checklist/initiate-checklist-container/initiate-checklist-container.component';
import { ExitChecklist } from '../exit-checklist/exit-checklist.service';


@NgModule({
  declarations: [
    ResignationContainer,
    ResignationPresentation,
    ResignationFormPresentation,
    ApprovalListContainer,
    ApprovalListPresentation,
    ApprovalListFilterPresentation,
    ResignationRevokePresentation,
    ResignationApprovalContainer,
    ResignationApprovalPresentationComponent,
  ],
  imports: [
    CommonModule,
    ResignationRoutingModule,
    SharedModule,
    NgSelectModule,
    BsDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ResignationService,
    ApprovalListAdapter,
    ResingationApprovalAdapter,
    ResignationAdapter
  ],
  entryComponents: [
    ResignationFormPresentation,
    ResignationRevokePresentation,
    ApprovalListFilterPresentation,
  ],
})
export class ResignationModule { }
