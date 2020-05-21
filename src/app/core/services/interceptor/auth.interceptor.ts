/**
 * @author Hem Chudgar
 */
import { switchMap, tap, finalize, take, retry, catchError } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
    HttpResponse, HttpUserEvent, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { User } from 'oidc-client';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OidcFacade } from 'ng-oidc-client';
import { NgxUiLoaderService } from 'ngx-ui-loader';


enum StatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500,
    FORBIDDEN = 403,
    NOCONTENT = 204,
    NOT_FOUND = 404,
    METHOD_NOT_FOUND = 405
}

/**
 * AuthInterceptor
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /** count */
    public count: number;

    constructor(
        private loaderService: NgxUiLoaderService,
        private authService: AuthService,
        @Inject('environment') private environment: any,
        private router: Router,
        private oidc: OidcFacade,
        private toaster: ToastrService
    ) {
        this.count = 0;
    }

    /**
     * intercept
     * @param request 
     * @param next 
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse |
        HttpProgressEvent | HttpResponse<object> | HttpUserEvent<object>> {

        if ((request.url.indexOf('/dashboard')) === -1) {
            // this.loaderService.showLoader(true);
            this.loaderService.start();
            this.count++;
            this.loaderService.stop();
        }

        if (request.url.indexOf(this.environment.cmsUrl) !== -1) {
            request = request.clone({ headers: request.headers.delete('No-auth', 'true') });
            return this.handleRequest(request, next);
        }

        if (request.headers.get('No-auth') === 'true') {
            return this.handleRequest(request, next);
        }
        return this.authService.getUserData().pipe(
            take(1),
            switchMap((user: User) => {
                if (user && user.access_token) {

                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${user.access_token}`
                        }
                    });

                }
                return this.handleRequest(request, next);
                // return next.handle(request);
            })
        );
    }

    /**
     * handleRequest
     * @param request 
     * @param next 
     */


    public handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                // retry(1),
                tap((response: HttpResponse<any>) => {
                    if (response.status === StatusCode.NOCONTENT) {
                        this.toaster.warning('No Content');
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === StatusCode.BAD_REQUEST) {
                        if (this.router.url.indexOf('resignation') > -1) {
                            this.toaster.error('400 Error');
                            setTimeout(() => {
                                this.router.navigate(['/dashboard']);
                            }, 2000);
                        } else {
                            this.toaster.error(error.message);
                        }
                    } else if (error.status === StatusCode.UNAUTHORIZED) {
                        this.toaster.error('Token expired, Please login again', '');
                        setTimeout(() => {
                            this.oidc.signoutRedirect();
                            location.reload(true);
                        }, 2000);
                    } else if (error.status === StatusCode.INTERNAL_SERVER_ERROR) {
                        this.toaster.error('Internal Server Error, Please try again', 'Error');
                    } else if (error.status === StatusCode.NOT_FOUND) {
                        this.toaster.error('Page Not Found', 'Error');
                    } else if (error.status === StatusCode.METHOD_NOT_FOUND) {
                        this.toaster.error('TRY AGAIN LATER', 'Error');
                    } else {
                        this.toaster.error(error.message, 'Error');
                    }
                    return throwError(error.message);
                }),
            );
    }


}
