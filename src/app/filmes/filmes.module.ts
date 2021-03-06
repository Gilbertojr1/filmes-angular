import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { FilmesRoutingModule } from './filmes-routing.module';
import { FilmesComponent } from './filmes/filmes.component';

@NgModule({
  declarations: [
    FilmesComponent
  ],
  imports: [
    CommonModule,
    FilmesRoutingModule,
    AppMaterialModule,
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class FilmesModule { }
