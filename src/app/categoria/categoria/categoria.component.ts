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


  onOpenAtualizarCategorias(id:number){
    this.dialog.open(AtualizarCategoriasComponent, {
      data: id
    }).afterClosed().subscribe(
      success => this.onRefresh(),
      error => this.onError(error)
    );

  }

  onDeleteCategorias(id: any){
    console.log("Categoria", id)
    this.categoriaSelecionada = id;
    console.log("categoriaselecionada", this.categoriaSelecionada)

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
          error => (this.onError('Erro ao deletar!'),
          Swal.fire(
            'Erro!',
            'O categoria não foi deletada. <br>Provavelmente há algum filme com essa categoria',
            'error'
          ))
        );

        Swal.fire(
          'Deletado!',
          'O categoria foi deletado',
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
