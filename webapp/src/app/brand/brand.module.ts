import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { BrandComponent }           from './brand.component';
import {BrandService} from "./brand.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    BrandComponent
  ],
  providers: [
    BrandService
  ]
})
export class BrandModule {}
