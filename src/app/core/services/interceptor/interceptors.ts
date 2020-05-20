/**
 * @author Hem Chudgar
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CacheInterceptor } from './cache.interceptor';


export const interceptorProviders: any[] =
    [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
    ];

