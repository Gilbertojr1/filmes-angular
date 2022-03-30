import { AtualizarCategoriasComponent } from './../../shared/components/crud/crud-categorias/atualizar-categorias/atualizar-categorias.component';
import { AdicionarCategoriasComponent } from './../../shared/components/crud/crud-categorias/adicionar-categorias/adicionar-categorias.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Categoria } from './../models/categoria';
import { CategoriaService } from './../services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  categoria$: Observable<Categoria[]>;
  displayedColumns = ['id', 'nome', 'acoes'];
  categoriaSelecionada!: Categoria["id"];

  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog
  ) {

    this.categoria$ = this.categoriaService.getLista()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar categorias.');
        return of([])
      })
    );
  }

  onRefresh(){
    this.categoria$ = this.categoriaService.getLista().pipe(
      catchError(error =>{
        console.error(error);
        this.onError('Erro ao carregar categorias.')
        return of([])
      })
    )
  }

  onOpenAdicionarCategorias(){
    this.dialog.open(AdicionarCategoriasComponent).afterClosed().subscribe(
      success => this.onRefresh(),
      error => this.onError(error)
    )
  }


  onOpenUpdateCategorias(id:number){
    this.dialog.open(AtualizarCategoriasComponent, {
      data: id
    }).afterClosed().subscribe(
      success => this.onRefresh(),
      error => this.onError(error)
    );

  }

  onDeleteCategorias(id: any){
    console.log("filme", id)
    this.categoriaSelecionada = id;
    console.log("filmeselecionado", this.categoriaSelecionada)

    Swal.fire({
      title: 'Tem certeza disso?',
      text: "Essa mudança não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(this.categoriaSelecionada)
        .subscribe(
          success => this.onRefresh(),
          error => this.onError(error)
        );

        Swal.fire(
          'Deletado!',
          'O filme foi deletado',
          'success'
        )
      }
    })
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

}
