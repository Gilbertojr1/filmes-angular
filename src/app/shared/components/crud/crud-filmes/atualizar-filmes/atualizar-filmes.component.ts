import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Categoria } from 'src/app/categoria/models/categoria';
import { CategoriaService } from 'src/app/categoria/services/categoria.service';
import { Estudio } from 'src/app/estudio/models/estudio';
import { EstudioService } from 'src/app/estudio/services/estudio.service';
import { Filmes } from 'src/app/filmes/models/filmes';
import { FilmesService } from 'src/app/filmes/services/filmes.service';
import Swal from 'sweetalert2';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-atualizar-filmes',
  templateUrl: './atualizar-filmes.component.html',
  styleUrls: ['./atualizar-filmes.component.scss']
})
export class AtualizarFilmesComponent implements OnInit {

  filmeForm = new FormGroup({
    nome: new FormControl(''),
  });


  filmes$: Observable<Filmes[]>;
  filmesAtual$: any;
  filmeCategorias$: Observable<Categoria[]>;
  filmeEstudios$: Observable<Estudio[]>;
  filmesUpdate$: any;
  //formulario!: FormGroup;

  constructor(
    private filmesService: FilmesService,
    private categoriasService: CategoriaService,
    private estudioService: EstudioService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public filme_id: number)
    {
      this.filmes$ = this.filmesService.getLista().
      pipe(
      tap(filmes$ => console.log(filmes$))
    );

      this.filmeCategorias$ = this.categoriasService.getLista().
      pipe(
      tap(filmeCategorias$ => console.log(filmeCategorias$))
    );

      this.filmeEstudios$ = this.estudioService.getLista().
      pipe(
      tap(filmeEstudios$ => console.log(filmeEstudios$))
    );

    }

  public closeAllDialogs(){
    console.log(this.dialog);
    this.dialog.closeAll();
  }

  onSubmitFilmeAtualizarForm(data:any){
    console.log("filme", this.filme_id)
    this.filmeCategorias$ = this.categoriasService.getLista()
    this.filmeEstudios$ = this.estudioService.getLista()
    this.filmesAtual$ = this.filmesService.getFilmePorID(this.filme_id).subscribe((result)=>
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

        this.filmesUpdate$ = this.filmesService.atualizarFilme(this.filme_id, data)

        console.warn(this.filme_id)
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
    // this.formulario = new FormGroup({
    //   nome: new FormControl('Teste'),

    // })

    // this.filmeForm.setValue({
    //   nome: 'TESTE'
    // })
  }

}
