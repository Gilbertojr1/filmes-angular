import { EstudioComponent } from './estudio/estudio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudioRoutingModule } from './estudio-routing.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EstudioComponent
  ],
  imports: [
    CommonModule,
    EstudioRoutingModule,
    AppMaterialModule,
    SharedModule,
  ]
})
export class EstudioModule { }
