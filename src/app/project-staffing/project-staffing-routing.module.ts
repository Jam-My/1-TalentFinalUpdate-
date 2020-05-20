import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListContainer } from './project-list-container/project-list.container';
import { ROLES } from './role.constants';
import { RoleGuard } from '../core/services/guard/role.guard';
import { RoleListContainer } from './role-list-container/role-list.container';
import { StaffingSheetContainer } from './staffing-sheet-container/staffing-sheet.container';

const routes: Routes = [
  {
    path: 'list',
    component: ProjectListContainer
  },
  {
    path: 'role/:id',
    component: RoleListContainer
  },
  {
    path: 'role',
    component: RoleListContainer
  },
  {
    path: 'staffing-sheet',
    component: StaffingSheetContainer
  },
  {
    path: 'staffing-sheet/:id',
    component: StaffingSheetContainer
  },
  {
    path: '',
    // canActivate: [RoleGuard], data: { allowedRoles: [ROLES.HR] } ,
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

/**
 * NgModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectStaffingRoutingModule { }
