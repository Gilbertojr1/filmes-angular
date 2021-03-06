import { CategoriaService } from 'src/app/categoria/services/categoria.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Categoria } from 'src/app/categoria/models/categoria';
import Swal from 'sweetalert2';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-atualizar-categorias',
  templateUrl: './atualizar-categorias.component.html',
  styleUrls: ['./atualizar-categorias.component.scss']
})
export class AtualizarCategoriasComponent implements OnInit {
  categorias$: Observable<Categoria[]>;
  categoriasAtual$: any;
  categoriasUpdate$: any;

  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public categoria_id: number)
    {
      this.categorias$ = this.categoriaService.getLista().
      pipe(
      tap(categorias$ => console.log(categorias$))
    );

    }

  public closeAllDialogs(){
    console.log(this.dialog);
    this.dialog.closeAll();
  }

  onSubmitCategoriaAtualizarForm(data:any){
    console.log("categoria", this.categoria_id)
    this.categoriasAtual$ = this.categoriaService.getCategoriaPorID(this.categoria_id).subscribe((result)=>
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

        this.categoriasUpdate$ = this.categoriaService.atualizarCategoria(this.categoria_id, data)

        console.warn(this.categoria_id)
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
