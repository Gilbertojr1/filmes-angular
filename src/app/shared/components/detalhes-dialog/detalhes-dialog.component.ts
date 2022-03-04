import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EstudioComponent } from 'src/app/estudio/estudio/estudio.component';
import { Filmes } from 'src/app/filmes/models/filmes';

@Component({
  selector: 'app-detalhes-dialog',
  templateUrl: './detalhes-dialog.component.html',
  styleUrls: ['./detalhes-dialog.component.scss']
})
export class DetalhesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
  public filme: any,
  public dialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log(this.filme);
  }

}
