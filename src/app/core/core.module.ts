import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { NgOidcClientModule } from 'ng-oidc-client';
import { WebStorageStateStore } from 'oidc-client';
import { AuthService } from './services/auth/auth.service';
import { AuthPolicyModule, StorageType } from 'auth-policy';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LoaderService } from './services/loader/loader.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard } from './services/guard/auth.guard';
import { RouterModule } from '@angular/router';
import { interceptorProviders } from './services/interceptor/interceptors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RoleGuard } from './services/guard/role.guard';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';




export function authorityUserStorage() {
  return new WebStorageStateStore({ store: window.localStorage })
    ;
}
@NgModule({
  declarations: [
    AuthCallbackComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOidcClientModule.forRoot({
      oidc_config: {
        client_id: environment.client_id,
        response_type: environment.response_type,
        scope: environment.scope,
        authority: environment.authority,
        redirect_uri: `${environment.redirect_uri}auth-callback`,
        post_logout_redirect_uri: `${environment.redirect_uri}`,
        silent_redirect_uri: `${environment.redirect_uri}silent-renew.html`,
        automaticSilentRenew: true,
        acr_values: environment.acr_values,
        accessTokenExpiringNotificationTime: 10,
        ui_locales: environment.ui_locales,
        userStore: authorityUserStorage 
      }
    }),
    AuthPolicyModule.forRoot({
      url: environment.policy_url,
      clientId: environment.client_id,
      policyName: environment.policy_name,
      storageType: StorageType.localStorage
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxUiLoaderModule.forRoot({
      bgsColor: 'grey',
      fgsColor: 'grey',
      pbColor: 'grey'
    })
  ],
  exports: [
    AuthCallbackComponent,
    NgxUiLoaderModule
  ],
  providers: [
    AuthService, LoaderService, ConfirmationDialogService,
    { provide: AuthGuard, useClass: AuthGuard },
    interceptorProviders,
    {
      provide: 'environment',
      useValue: environment
    },
    RoleGuard
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class CoreModule { }
