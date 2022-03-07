import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, filter, merge, Observable, of, switchMap } from 'rxjs';

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

  todosfilmes$ = this.filmesService.getfiltro();

  filtroPeloInput$ = this.campoPesquisa.valueChanges.pipe(
    debounceTime(50),
    filter(
      (valorDigitado) => valorDigitado.length >= 2 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.filmesService.getfiltro(valorDigitado))
  );

  filme$ = merge(this.todosfilmes$, this.filtroPeloInput$);

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  openDialog(filme: Filmes) {
    this.dialog.open(DetalhesDialogComponent, {
      data: {
        filme: filme
      }
    });
  }

  public labels: any = {
    previousLabel: 'Voltar',
    nextLabel: 'Próximo'
  };

  p : number = 1;
  pageChanged(event: any){console.log("pageChanged")}

  ngOnInit(): void{

  }

}

