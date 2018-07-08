import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }    from './not-found.component';

import { AuthGuard }                from './auth/auth-guard.service';
import {BrandComponent} from "./brand/brand.component";
import {ProductComponent} from "./product/product.component";

const appRoutes: Routes = [
  {
    path: 'brand',
    component: BrandComponent,
    canActivate: [AuthGuard]
  },{
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  { path: '',   redirectTo: '/product', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
