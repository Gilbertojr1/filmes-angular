import { DetalhesDialogComponent } from './../../shared/components/detalhes-dialog/detalhes-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Filmes } from './../models/filmes';
import { FilmesService } from './../services/filmes.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  public labels: any = {
    previousLabel: 'Voltar',
    nextLabel: 'Próximo'
  };

  openDialog() {
    this.dialog.open(DetalhesDialogComponent);
  }

  p : number = 1;
  pageChanged(event: any){console.log("pageChanged")}

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

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }
}

