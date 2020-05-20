import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DisableKeyPressDirective } from './directives/disableKeyPress/disable-key-press.directive';
import { RoleBasedDisplayDirective } from './directives/role-based-display/role-based-display.directive';
import { StatusBasedButtonDirective } from './directives/status-based-button/status-based-button.directive';
import { StatusBasedDisplayDirective } from './directives/status-based-display/status-based-display.directive';
import { StatusColorDirective } from './directives/status-color/status-color.directive';
import { RemoveTrailingWsPipe } from './pipes/remove-trailing-ws/remove-trailing-ws.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { OrderPipe } from './pipes/orderByFieldName/order.pipe';


@NgModule({
  declarations: [
    DisableKeyPressDirective,
    RoleBasedDisplayDirective,
    StatusBasedDisplayDirective,
    StatusBasedButtonDirective,
    StatusColorDirective,
    ReversePipe,
    RemoveTrailingWsPipe,
    OrderPipe
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    OverlayModule,
    PortalModule,
    BsDatepickerModule,
  ],
  exports: [
    DisableKeyPressDirective,
    RoleBasedDisplayDirective,
    StatusBasedDisplayDirective,
    StatusBasedButtonDirective,
    StatusColorDirective,
    ReversePipe,
    RemoveTrailingWsPipe,
    OrderPipe
  ]
})
export class SharedModule { }
