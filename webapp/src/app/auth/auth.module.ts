import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';
import { LoginComponent }       from './login.component';
import { AuthServerProvider }   from "./auth-jwt.service";
import {Ng2Webstorage} from "ngx-webstorage";
import {BrowserModule} from "@angular/platform-browser";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from "./auth.interceptor";

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes),
    BrowserModule,
    Ng2Webstorage
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthServerProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
