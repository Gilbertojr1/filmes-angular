import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Filmes } from './../models/filmes';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = '/api/filmes';

  getLista(){
    return this.httpClient.get<Filmes[]>(this.API)
    .pipe(
      first(),
      delay(500),
      tap(filmes => console.log(filmes))
    );
  }

  getfiltro(valor?: string){
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    if(valor == null){
      return this.getLista();
    }
    return this.httpClient.get<Filmes[]>(this.API + '/filter?nome=' + valor, { params });
  }

}
