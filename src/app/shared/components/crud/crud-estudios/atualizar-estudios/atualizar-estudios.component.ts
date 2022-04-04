import { EstudioService } from 'src/app/estudio/services/estudio.service';
import { Estudio } from 'src/app/estudio/models/estudio';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atualizar-estudios',
  templateUrl: './atualizar-estudios.component.html',
  styleUrls: ['./atualizar-estudios.component.scss']
})
export class AtualizarEstudiosComponent implements OnInit {
  estudios$: Observable<Estudio[]>;
  estudiosAtual$: any;
  estudiosUpdate$: any;

  constructor(
    private estudioService: EstudioService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public estudio_id: number)
    {
      this.estudios$ = this.estudioService.getLista().
      pipe(
      tap(estudios$ => console.log(estudios$))
    );

    }

  public closeAllDialogs(){
    console.log(this.dialog);
    this.dialog.closeAll();
  }

  onSubmitEstudioAtualizarForm(data:any){
    console.log("categoria", this.estudio_id)
    this.estudiosAtual$ = this.estudioService.getEstudioPorID(this.estudio_id).subscribe((result)=>
      console.warn(result)
    )

    Swal.fire({
      title: 'Você quer salvar as alterações?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salvar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: '$mat-teal',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.estudiosUpdate$ = this.estudioService.atualizarEstudio(this.estudio_id, data)

        console.warn(this.estudio_id)
        console.warn(data)

        Swal.fire('Alterações Salvas!', '', 'success');
        this.closeAllDialogs()


      } else if (result.isDenied) {
        Swal.fire('As alterações foram salvas', '', 'info')
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
