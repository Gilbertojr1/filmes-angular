import { EstudioService } from './../../../../../estudio/services/estudio.service';
import { CategoriaService } from './../../../../../categoria/services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Categoria } from 'src/app/categoria/models/categoria';
import { Estudio } from 'src/app/estudio/models/estudio';
import { Filmes } from 'src/app/filmes/models/filmes';
import { FilmesService } from 'src/app/filmes/services/filmes.service';
import Swal from 'sweetalert2';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-adicionar-filmes',
  templateUrl: './adicionar-filmes.component.html',
  styleUrls: ['./adicionar-filmes.component.scss']
})
export class AdicionarFilmesComponent implements OnInit {

  filmes$: Observable<Filmes[]>;
  filmeCategorias$: Observable<Categoria[]>;
  filmeEstudios$: Observable<Estudio[]>;
  filmesPost$: any;

  constructor(
    private filmesService: FilmesService,
    private categoriasService: CategoriaService,
    private EstudioService: EstudioService,
    public dialog: MatDialog
    ) {

      this.filmes$ = this.filmesService.getLista().
      pipe(
      tap(filmes$ => console.log(filmes$))
    );

      this.filmeCategorias$ = this.categoriasService.getLista().
      pipe(
      tap(filmeCategorias$ => console.log(filmeCategorias$))
    );

      this.filmeEstudios$ = this.EstudioService.getLista().
      pipe(
      tap(filmeEstudios$ => console.log(filmeEstudios$))
    );

  }

  public closeAllDialogs(){
    console.log(this.dialog);
    this.dialog.closeAll();
  }

  onSubmitFilmeAddForm(data:any){
    this.filmeCategorias$ =  this.categoriasService.getLista(),
    this.filmeEstudios$ = this.EstudioService.getLista()
    Swal.fire({
      title: 'Você quer salvar o filme?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: `Não salvar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: '$mat-teal',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.filmesPost$ = this.filmesService.criandoFilme(data)

        console.warn(data)

        Swal.fire('Salvo!', '', 'success');
        this.closeAllDialogs()

      } else if (result.isDenied) {
        Swal.fire('O filme não foi salvo', '', 'info')
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
