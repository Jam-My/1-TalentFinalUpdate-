import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ClientMasterPresentation } from './project-list-container/project-list-presentation/project-form-presentation/client-master-presentation/client-master.presentation';
import { ProjectFormPresentation } from './project-list-container/project-list-presentation/project-form-presentation/project-form.presentation';
import { ProjectListContainer } from './project-list-container/project-list.container';
import { ProjectListPresentation } from './project-list-container/project-list-presentation/project-list.presentation';
import { ProjectListService } from './services/project-list.service';
import { ProjectMasterPresentation } from './project-list-container/project-list-presentation/project-form-presentation/project-master-presentation/project-master.presentation';
import { ProjectStaffingRoutingModule } from './project-staffing-routing.module';
import { RoleFormPresentation } from './role-list-container/role-list-presentation/role-form-presentation/role-form.presentation';
import { RoleListContainer } from './role-list-container/role-list.container';
import { RoleListPresentation } from './role-list-container/role-list-presentation/role-list.presentation';
import { RoleListService } from './services/role-list.service';
import { SharedModule } from '../shared/shared.module';
import { StaffingSheetContainer } from './staffing-sheet-container/staffing-sheet.container';
import { StaffingSheetPresentation } from './staffing-sheet-container/staffing-sheet-presentation/staffing-sheet.presentation';

/**
 * NgModule
 */
@NgModule({
  declarations: [
    ProjectListContainer,
    ProjectListPresentation,
    ProjectFormPresentation,
    RoleListContainer,
    RoleListPresentation,
    RoleFormPresentation,
    ProjectMasterPresentation,
    ClientMasterPresentation,
    StaffingSheetContainer,
    StaffingSheetPresentation
  ],
  imports: [
    CommonModule,
    ProjectStaffingRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    BsDatepickerModule,
    NgSelectModule
    
  ],
  providers: [
    ProjectListService,
    RoleListService,
    DatePipe
  ],
  entryComponents:[
    ProjectFormPresentation,
    ProjectMasterPresentation,
    ClientMasterPresentation,
    RoleFormPresentation
  ]
})
export class ProjectStaffingModule { }
