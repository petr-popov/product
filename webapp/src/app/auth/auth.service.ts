import { Injectable } from '@angular/core';

import {AuthServerProvider} from "./auth-jwt.service";

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private authServerProvider: AuthServerProvider
  ) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe((data) => {
        resolve(data);
        this.isLoggedIn = true;
        return cb();
      }, (err) => {
        this.logout();
        reject(err);
        return cb(err);
      });
    });
  }

  hasAuthority(authority) {
    return this.authServerProvider.hasAuthority(authority);
  }

  logout() {
    this.authServerProvider.logout().subscribe();
    this.isLoggedIn = false;
  }
}
