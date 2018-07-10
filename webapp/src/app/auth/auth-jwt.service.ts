import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {SessionStorageService} from "ngx-webstorage";
import {default as decode} from 'jwt-decode';

@Injectable()
export class AuthServerProvider {
    constructor(
        private http: Http,
        private $sessionStorage: SessionStorageService
    ) {}

    getToken() {
        return this.$sessionStorage.retrieve('authenticationToken');
    }

    login(credentials): Observable<any> {

        const data = {
            username: credentials.username,
            password: credentials.password,
        };
        return this.http.post('api/v1/authenticate', data).pipe(map(authenticateSuccess.bind(this)));

        function authenticateSuccess(resp) {
            const bearerToken = resp.headers.get('Authorization');
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                this.storeAuthenticationToken(jwt, credentials.rememberMe);
                return jwt;
            }
        }
    }

    hasAuthority(authority): boolean {
      let decoded = decode(this.getToken());
      return decoded.auth.split(',').includes(authority);
    }

    storeAuthenticationToken(jwt) {
          this.$sessionStorage.store('authenticationToken', jwt);
    }

    logout(): Observable<any> {
        return new Observable((observer) => {
            this.$sessionStorage.clear('authenticationToken');
            observer.complete();
        });
    }
}
