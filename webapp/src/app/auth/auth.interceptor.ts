import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {SessionStorageService} from "ngx-webstorage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorage: SessionStorageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.sessionStorage.retrieve('authenticationToken');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request);
  }
}
