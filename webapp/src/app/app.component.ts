import { Component } from '@angular/core';
import { AuthService }      from './auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <nav  *ngIf="authService.isLoggedIn">
      <a routerLink="/brand" routerLinkActive="active">Brands</a>
      <a routerLink="/product" routerLinkActive="active">Products</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
    </nav>
    
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `
})
export class AppComponent {

  constructor(public authService: AuthService, public router: Router) {
  }

}
