import { AtualizarFilmesComponent } from './../../shared/components/crud/crud-filmes/atualizar-filmes/atualizar-filmes.component';
import { AdicionarFilmesComponent } from './../../shared/components/crud/crud-filmes/adicionar-filmes/adicionar-filmes.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, delay, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Filmes } from './../models/filmes';
import { FilmesService } from './../services/filmes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  filmes$: Observable<Filmes[]>;
  displayedColumns = ['id', 'nome', 'sinopse', 'duracao', 'diretor', 'data_lancamento', 'estudio', 'categoria', 'acoes'];
  filmeSelecionado!: Filmes["id"];

  constructor(
    private filmesService: FilmesService,
    public dialog: MatDialog
    ) {
      this.filmes$ = this.filmesService.getLista()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar filmes.');
         return of([])
        })
      );
    }

    onRefresh(){
      this.filmes$ = this.filmesService.getLista().pipe(
        catchError(error =>{
          console.error(error);
          this.onError('Erro ao carregar filmes.')
          return of([])
        })
      )
    }

    onOpenAdicionarFilmes(){
      this.dialog.open(AdicionarFilmesComponent).afterClosed().subscribe(
        success => this.onRefresh(),
        error => this.onError(error)
      )
    }


    onOpenAtualizarFilmes(id:number){
      this.dialog.open(AtualizarFilmesComponent, {
        data: id
      }).afterClosed().subscribe(
        success => this.onRefresh(),
        error => this.onError(error)
      );

    }

  onDeleteFilmes(id: any){
    console.log("filme", id)
    this.filmeSelecionado = id;
    console.log("filmeselecionado", this.filmeSelecionado)

    Swal.fire({
      title: 'Tem certeza disso?',
      text: "Essa mudan??a n??o pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.filmesService.deleteFilme(this.filmeSelecionado)
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

  ngOnInit(): void{

  }

}
