import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './core/master/master.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/services/guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    { provide: AuthGuard, useClass: AuthGuard },
    ToastrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
