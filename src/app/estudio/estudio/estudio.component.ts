import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, filter, merge, Observable, of, switchMap } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Estudio } from './../models/estudio';
import { EstudioService } from './../services/estudio.service';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.scss']
})
export class EstudioComponent implements OnInit {
  campoPesquisa = new FormControl();

  estudios$: Observable<Estudio[]>;
  displayedColumns = ['id', 'nome'];

  constructor(
    private estudioService: EstudioService,
    public dialog: MatDialog,

  ) {
    this.estudios$ = this.estudioService.getLista()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar categorias.');
        return of([])
      })
    );
  }

  /*todosEstudios$ = this.estudioService.getfiltro();

  filtroPeloInput$ = this.campoPesquisa.valueChanges.pipe(
    debounceTime(50),
    filter(
      (valorDigitado) => valorDigitado.length >= 1 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.estudioService.getfiltro(valorDigitado))
  );

  estudio$ = merge(this.todosEstudios$, this.filtroPeloInput$);*/

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  public labels: any = {
    previousLabel: 'Voltar',
    nextLabel: 'Próximo'
  };

  p : number = 1;
  pageChanged(event: any){console.log("pageChanged")}

  ngOnInit(): void {
  }

}
