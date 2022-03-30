import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Categoria } from 'src/app/categoria/models/categoria';
import { CategoriaService } from 'src/app/categoria/services/categoria.service';
import Swal from 'sweetalert2';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-adicionar-categorias',
  templateUrl: './adicionar-categorias.component.html',
  styleUrls: ['./adicionar-categorias.component.scss']
})
export class AdicionarCategoriasComponent implements OnInit {
  categorias$: Observable<Categoria[]>;
  categoriasPost$: any;

  constructor(
    private categoriasService: CategoriaService,
    public dialog: MatDialog
  ) {
    this.categorias$ = this.categoriasService.getLista().
      pipe(
      tap(categorias$ => console.log(categorias$))
    );
   }

   onSubmitCategoriaAddForm(data:any){
    this.categorias$ =  this.categoriasService.getLista();
    Swal.fire({
      title: 'Você quer salvar a categoria?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salvar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: '$mat-teal',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.categoriasPost$ = this.categoriasService.criandoCategoria(data);

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
