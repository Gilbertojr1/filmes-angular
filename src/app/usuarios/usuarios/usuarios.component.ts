import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Usuarios } from './../models/usuarios';
import { UsuariosService } from './../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios$: Observable<Usuarios[]>;
  displayedColumns = ['id', 'nome', 'email'];

  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog
    ) {

      this.usuarios$ = this.usuariosService.list()
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
