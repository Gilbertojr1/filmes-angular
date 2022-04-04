import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import Swal from 'sweetalert2';

import {
  AdicionarEstudiosComponent,
} from './../../shared/components/crud/crud-estudios/adicionar-estudios/adicionar-estudios.component';
import {
  AtualizarEstudiosComponent,
} from './../../shared/components/crud/crud-estudios/atualizar-estudios/atualizar-estudios.component';
import { Estudio } from './../models/estudio';
import { EstudioService } from './../services/estudio.service';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.scss']
})
export class EstudioComponent implements OnInit {
  estudios$: Observable<Estudio[]>;
  displayedColumns = ['id', 'nome', 'acoes'];
  estudioSelecionado!: Estudio["id"];

  constructor(
    private estudioService: EstudioService,
    public dialog: MatDialog,

  ) {
    this.estudios$ = this.estudioService.getLista()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar estúdios.');
        return of([])
      })
    );
  }

  onRefresh(){
    this.estudios$ = this.estudioService.getLista().pipe(
      catchError(error =>{
        console.error(error);
        this.onError('Erro ao carregar estúdios.')
        return of([])
      })
    )
  }

  onOpenAdicionarEstudios(){
    this.dialog.open(AdicionarEstudiosComponent).afterClosed().subscribe(
      success => this.onRefresh(),
      error => this.onError(error)
    )
  }

  onOpenAtualizarEstudios(id:number){
    this.dialog.open(AtualizarEstudiosComponent, {
      data: id
    }).afterClosed().subscribe(
      success => this.onRefresh(),
      error => this.onError(error)
    );
  }

  onDeleteEstudios(id: any){
    console.log("Estudio", id)
    this.estudioSelecionado = id;
    console.log("estudioselecionada", this.estudioSelecionado)

    Swal.fire({
      title: 'Tem certeza disso?',
      text: "Essa mudança não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudioService.deleteCategoria(this.estudioSelecionado)
        .subscribe(
          success => this.onRefresh(),
          error => (this.onError('Erro ao deletar!'),
          Swal.fire(
            'Erro!',
            'O estúdio não foi deletado. <br>Provavelmente há algum filme com essa estúdio',
            'error'
          ))
        );

        Swal.fire(
          'Deletado!',
          'O estúdio foi deletado',
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

  ngOnInit(): void {
  }

}
