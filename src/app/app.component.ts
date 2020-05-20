import { Component, AfterViewInit } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';
import { LoaderService } from './core/services/loader/loader.service';
import { AuthService } from './core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  public title = '1TalentDashboard';
  public showLoader = false;
  public currentSite: Observable<any>;
  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private oidcFacade: OidcFacade,
  ) {
    this.oidcFacade.getUserManager().getUser().then(user => {
      this.authService.setUserData(user);
    });

    this.oidcFacade.getUserManager().events.addUserLoaded(() => {
      this.oidcFacade.getUserManager().getUser().then(user => {
        this.authService.setUserData(user);
      });

    });
  }

  public ngAfterViewInit() {
     ;
    this.loaderService.status.subscribe((val: boolean) => {
      setTimeout(() => {
        this.showLoader = val;
      }, 100);
    });
  }
}
