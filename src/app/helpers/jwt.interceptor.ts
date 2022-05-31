/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentLogin = localStorage.getItem('accessToken');
      if (currentLogin) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentLogin}`
          }
        });
      }     
    return next.handle(request);
  }
}
