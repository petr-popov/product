import { Component } from '@angular/core';
import { AuthService }      from './auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light" *ngIf="authService.isLoggedIn">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/brand" routerLinkActive="active">Brands</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/product" routerLinkActive="active">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
        </li>
      </ul>
    </nav>
    
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `
})
export class AppComponent {

  constructor(public authService: AuthService, public router: Router) {
  }

}
