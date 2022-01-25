import { FilmesService } from './../services/filmes.service';
import { Filmes } from './../models/filmes';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  filmes$: Observable<Filmes[]>;
  displayedColumns = ['nome', 'data_lancamento', 'diretor', 'duracao', 'sinopse', 'estudio', 'categoria'];

  //filmesService: FilmesService;

  constructor(private filmesService: FilmesService) {
    //this.filmesService = new FilmesService();
    this.filmes$ = this.filmesService.list();
  }

  ngOnInit(): void {

  }

}
