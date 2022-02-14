import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes-dialog',
  templateUrl: './detalhes-dialog.component.html',
  styleUrls: ['./detalhes-dialog.component.scss']
})
export class DetalhesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public filme: any) {

  }

  ngOnInit(): void {
    console.log(this.filme);
  }

}
