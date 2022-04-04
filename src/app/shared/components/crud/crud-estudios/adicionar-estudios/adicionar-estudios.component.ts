import { EstudioService } from 'src/app/estudio/services/estudio.service';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Estudio } from 'src/app/estudio/models/estudio';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-adicionar-estudios',
  templateUrl: './adicionar-estudios.component.html',
  styleUrls: ['./adicionar-estudios.component.scss']
})
export class AdicionarEstudiosComponent implements OnInit {
  estudios$: Observable<Estudio[]>;
  categoriasPost$: any;

  constructor(
    private estudioService: EstudioService,
    public dialog: MatDialog
  ) {
    this.estudios$ = this.estudioService.getLista().
      pipe(
      tap(estudios$ => console.log(estudios$))
    );
   }

   onSubmitEstudioAddForm(data:any){
    this.estudios$ =  this.estudioService.getLista();
    Swal.fire({
      title: 'Você quer salvar a estúdio?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salvar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: '$mat-teal',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.categoriasPost$ = this.estudioService.criandoEstudio(data);

        console.warn(data);

        Swal.fire('Salvo!', '', 'success');
        this.closeAllDialogs();

      } else if (result.isDenied) {
        Swal.fire('A categoria não foi salva', '', 'info');
        this.closeAllDialogs();
      }
    })
  }

  public closeAllDialogs(){
    console.log(this.dialog);
    this.dialog.closeAll();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

}
