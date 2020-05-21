/**
 * @author Tapas Vashi
 */
import { InjectionToken } from '@angular/core';

// creating an injector token for passing data to overlay
export const PROJECT_DETAILS = new InjectionToken<{}>('PROJECT_DETAILS');
export const EMPLOYEE_DETAILS = new InjectionToken<{}>('EMPLOYEE_DETAILS');
export const PROJECT_NAME = new InjectionToken<{}>('PROJECT_NAME');
export const CLIENT_NAME = new InjectionToken<{}>('CLIENT_NAME');
