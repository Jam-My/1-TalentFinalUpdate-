import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './core/components/auth-callback/auth-callback.component';
import { AuthGuard } from './core/services/guard/auth.guard';
import { MasterComponent } from './core/master/master.component';

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '',
    component: MasterComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: {
          title: 'Dashboard',
          breadcrumb: 'dashboard',
        },
      },
      {
        path: 'resignation', loadChildren: './resignation/resignation.module#ResignationModule'
      },
      {
        path: 'exit-checklist', loadChildren: './exit-checklist/exit-checklist.module#ExitChecklistModule'
      },
      {
        path: 'project-staffing', loadChildren: './project-staffing/project-staffing.module#ProjectStaffingModule'
      },
      {
        path: 'hours-submission', loadChildren: './hours-submission/hours-submission.module#HoursSubmissionModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'corrected'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
