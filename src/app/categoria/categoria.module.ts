import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CategoriaRoutingModule } from './categoria-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    AppMaterialModule,
    SharedModule,
  ]
})
export class CategoriaModule { }
