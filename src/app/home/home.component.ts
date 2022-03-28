import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, filter, merge, Observable, of, switchMap } from 'rxjs';

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
  selectCategoria!: string;

  filmes$: Observable<Filmes[]>;
  categoria$: Observable<Categoria[]>;
  displayedColumns = ['id', 'nome', 'data_lancamento', 'diretor', 'duracao', 'sinopse', 'estudio', 'categoria'];

  constructor(
    private filmesService: HomeService,
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

  todosfilmes$ = this.filmesService.getLista();

  filtroPesquisa$ = this.campoSearch.valueChanges.pipe(
    debounceTime(500),
    filter(
      (valorDigitado) => valorDigitado.length >= 1 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.filmesService.getfiltroPorNome(valorDigitado))
  );

  filtroCategoria$ = this.campoSelectCategoria.valueChanges.pipe(
    switchMap((categoriaSelect) => this.filmesService.getfiltroPorCategoria(categoriaSelect))
  );

  // filtro$ = this.campoSearch.valueChanges.pipe(
  //   debounceTime(50),
  //   filter(
  //     (valorDigitado) => valorDigitado.length >= 1 || !valorDigitado.length
  //   ),
  //   distinctUntilChanged(),
  //   switchMap(() => this.filmesService.getfiltroPorNomeECategoria(this.campoSearch.value, this.selectCategoria))
  // );

  filme$ = merge(this.todosfilmes$, this.filtroCategoria$, this.filtroPesquisa$);


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

  onCategoria(categoria: string){
    this.selectCategoria = categoria;

    // const filtroCategoria$ = this.campoSelectCategoria.valueChanges.pipe(
    //   switchMap((categoriaSelect) => this.filmesService.getfiltroPorCategoria(categoriaSelect))
    // );

    // this.filme$ = merge(this.todosfilmes$, filtroCategoria$);

    // console.log(this.filtroCategoria$);
    // console.log(this.filtroPesquisa$);
    // console.log(this.filme$);
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
