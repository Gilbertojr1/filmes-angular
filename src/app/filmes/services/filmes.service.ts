import { SharedModule } from './../../shared/shared.module';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Filmes } from './../models/filmes';
import { delay, first, map, pluck, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = '/api/filmes';

  list(){
    return this.httpClient.get<Filmes[]>(this.API)
    .pipe(
      first(),
      delay(500),
      tap(filmes => console.log(filmes))
    );
  }

  getFilmes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<Filmes[]>(this.API, { params })
  }

}
