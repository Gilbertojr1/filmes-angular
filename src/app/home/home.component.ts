import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, filter, merge, Observable, of, switchMap } from 'rxjs';
import { Estudio } from 'src/app/estudio/models/estudio';
import { EstudioService } from 'src/app/estudio/services/estudio.service';

import { CategoriaService } from '../categoria/services/categoria.service';
import { Filmes } from '../filmes/models/filmes';
import { DetalhesDialogComponent } from '../shared/components/detalhes-dialog/detalhes-dialog.component';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { Categoria } from './../categoria/models/categoria';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  campoSearch = new FormControl();
  campoSelectCategoria = new FormControl();
  campoSelectEstudio = new FormControl();
  selectCategoria!: string;
  selectEstudio!: string;

  filmes$: Observable<Filmes[]>;
  categoria$: Observable<Categoria[]>;
  estudio$: Observable<Estudio[]>;
  displayedColumns = ['id', 'nome', 'data_lancamento', 'diretor', 'duracao', 'sinopse', 'estudio', 'categoria'];

  constructor(
    private filmesService: HomeService,
    private categoriasService: CategoriaService,
    private estudioService: EstudioService,
    public dialog: MatDialog
    ) {
      this.categoria$ = this.categoriasService.getLista();

      this.estudio$ = this.estudioService.getLista();

      this.filmes$ = this.filmesService.getLista()
      .pipe(
        catchError(_error => {
          this.onError('Erro ao carregar filmes.');
         return of([])
        })
      );

    }

  todosfilmes$ = this.filmesService.getLista();

  filtro$ = this.campoSearch.valueChanges.pipe(
    debounceTime(500),
    filter(
      (valorDigitado) => valorDigitado.length >= 1 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.filmesService.getfiltroPorNomeCategoriaEstudio(valorDigitado, this.campoSelectCategoria.value, this.campoSelectEstudio.value))
  );

  filtroCategoria$ = this.campoSelectCategoria.valueChanges.pipe(
    switchMap(() => this.filmesService.getfiltroPorCategoriaEstudio(this.campoSelectCategoria.value, this.campoSelectEstudio.value))
  );

   filtroEstudio$ = this.campoSelectEstudio.valueChanges.pipe(
    switchMap(() => this.filmesService.getfiltroPorCategoriaEstudio(this.campoSelectCategoria.value, this.campoSelectEstudio.value))
  );

  filme$ = merge(this.todosfilmes$, this.filtro$,  this.filtroCategoria$, this.filtroEstudio$);

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
  pageChanged(_event: any){console.log("pageChanged")}

  ngOnInit(): void{

  }

}
