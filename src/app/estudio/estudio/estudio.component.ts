import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Estudio } from './../models/estudio';
import { EstudioService } from './../services/estudio.service';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.scss']
})
export class EstudioComponent implements OnInit {

  estudio$: Observable<Estudio[]>;
  displayedColumns = ['id', 'nome'];

  constructor(
    private estduioService: EstudioService,
    public dialog: MatDialog
  ) {
    this.estudio$ = this.estduioService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar categorias.');
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
