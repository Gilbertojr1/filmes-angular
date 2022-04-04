import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { DetalhesDialogComponent } from './components/detalhes-dialog/detalhes-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoriasPipe } from './pipes/categorias.pipe';
import { SharedRoutingModule } from './shared-routing.module';
import { AdicionarFilmesComponent } from './components/crud/crud-filmes/adicionar-filmes/adicionar-filmes.component';
import { AtualizarFilmesComponent } from './components/crud/crud-filmes/atualizar-filmes/atualizar-filmes.component';
import { AdicionarCategoriasComponent } from './components/crud/crud-categorias/adicionar-categorias/adicionar-categorias.component';
import { AtualizarCategoriasComponent } from './components/crud/crud-categorias/atualizar-categorias/atualizar-categorias.component';
import { AdicionarEstudiosComponent } from './components/crud/crud-estudios/adicionar-estudios/adicionar-estudios.component';
import { AtualizarEstudiosComponent } from './components/crud/crud-estudios/atualizar-estudios/atualizar-estudios.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoriasPipe,
    DetalhesDialogComponent,
    AdicionarFilmesComponent,
    AtualizarFilmesComponent,
    AdicionarCategoriasComponent,
    AtualizarCategoriasComponent,
    AdicionarEstudiosComponent,
    AtualizarEstudiosComponent
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
