import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, filter, merge, Observable, of, switchMap, tap } from 'rxjs';

import { DetalhesDialogComponent } from './../../shared/components/detalhes-dialog/detalhes-dialog.component';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Filmes } from './../models/filmes';
import { FilmesService } from './../services/filmes.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  campoPesquisa = new FormControl();

  filmes$: Observable<Filmes[]>;
  displayedColumns = ['id', 'nome', 'data_lancamento', 'diretor', 'duracao', 'sinopse', 'estudio', 'categoria'];

  constructor(
    private filmesService: FilmesService,
    public dialog: MatDialog
    ) {

    this.filmes$ = this.filmesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar filmes.');
        return of([])
      })
    );
  }

  todosfilmes$ = this.filmesService.getFilmes().pipe(
    tap(() => {
      console.log('Fluxo Inicial');
    })
  );

  filtroPeloInput$ = this.campoPesquisa.valueChanges.pipe(
    debounceTime(300),
    tap(() => {
      console.log('Fluxo do Filtro');
    }),
    tap(console.log),
    filter(
      (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.filmesService.getFilmes(valorDigitado)),
    tap(console.log)
  );

  filme$ = merge(this.todosfilmes$, this.filtroPeloInput$);

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  public labels: any = {
    previousLabel: 'Voltar',
    nextLabel: 'Próximo'
  };

  openDialog(filme: Filmes) {
    this.dialog.open(DetalhesDialogComponent, {
      data: {
        filme: filme
      }
    });
  }

  p : number = 1;
  pageChanged(event: any){console.log("pageChanged")}

  ngOnInit(): void{

  }

}

