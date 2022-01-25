import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Filmes } from './../models/filmes';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private readonly API = '/assets/filmes.json';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Filmes[]>(this.API)
    .pipe(
      first(),
      delay(5000),
      tap(filmes => console.log(filmes))
    );
  }
}
