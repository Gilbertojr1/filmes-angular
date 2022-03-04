import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoriasPipe } from './pipes/categorias.pipe';
import { DetalhesDialogComponent } from './components/detalhes-dialog/detalhes-dialog.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoriasPipe,
    DetalhesDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AppMaterialModule
  ],
  exports:[
    ErrorDialogComponent,
    CategoriasPipe,
  ]
})
export class SharedModule { }
