import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, filter, merge, Observable, of, switchMap } from 'rxjs';

import { Categoria } from '../categoria/models/categoria';
import { CategoriaService } from '../categoria/services/categoria.service';
import { Filmes } from '../filmes/models/filmes';
import { FilmesService } from '../filmes/services/filmes.service';
import { DetalhesDialogComponent } from '../shared/components/detalhes-dialog/detalhes-dialog.component';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campoSearch = new FormControl();

  filmes$: Observable<Filmes[]>;
  categoria$: Observable<Categoria[]>;
  displayedColumns = ['id', 'nome', 'data_lancamento', 'diretor', 'duracao', 'sinopse', 'estudio', 'categoria'];

  constructor(
    private filmesService: FilmesService,
    private categoriasService: CategoriaService,
    public dialog: MatDialog
    ) {
      this.categoria$ = this.categoriasService.getLista();

      this.filmes$ = this.filmesService.getLista()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar filmes.');
         return of([])
        })
      );
    }

  todosfilmes$ = this.filmesService.getfiltro();

  filtroPeloInput$ = this.campoSearch.valueChanges.pipe(
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
