import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpEvent
  } from '@angular/common/http';
  
  import {
    throwError as observableThrowError,
    Observable,
    BehaviorSubject
  } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  
  import { ToasterService } from 'angular2-toaster';
  import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.services';
  // import { AuthService } from 'src/app/core/services/auth.service';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    isRefreshingToken: Boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
    constructor(
      private authenticationService: AuthService,
      private toaster: ToasterService,
      private cookie: CookieService
    ) {}
  
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
      return req.clone({ setHeaders: { Authorization: 'JWT ' + token } });
    }
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(this.addToken(request, this.cookie.get('accessToken'))).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 400:
                return this.handle400Error(error);
                case 401:
                return this.handle401Error(error);
              default:
                return this.validationFailed(error);
            }
          }
          return observableThrowError(error);
        })
      );
    }
  

    handle401Error(error){
        if (error.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            // location.reload(true);
        }
        return observableThrowError(error);
    }

    validationFailed(error) {
      this.toaster.pop('error', 'Opps!', error.error.message);
      return observableThrowError(error);
    }
  
    handle400Error(error) {
      if (
        error &&
        error.status === 400 &&
        error.error &&
        error.error.error === 'invalid_grant'
      ) {
        // If we get a 400 and the error message is 'invalid_grant', the token is no
        return this.logout();
      }
      return observableThrowError(error);
    }
  
  
    // If we don't get a new token, we are in trouble so logout.
    logout() {
      this.cookie.delete('accessToken');
      // localStorage.removeItem('currentUser');
      // location.reload();
      return observableThrowError('');
    }
  }
  