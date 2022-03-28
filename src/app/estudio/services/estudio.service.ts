import { Estudio } from './../models/estudio';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = '/api/estudios';

  getLista() {
    return this.httpClient.get<Estudio[]>(this.API)
    .pipe(
      first(),
      delay(500)
    );
  }
  /*getfiltro(valor?: string){
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    if(valor == null){
      return this.list();
    }
    return this.httpClient.get<Estudio[]>(this.API + '/filter?nome=' + valor, { params });
  }*/
}
