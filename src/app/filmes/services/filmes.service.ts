import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, take, tap } from 'rxjs';

import { Filmes } from './../models/filmes';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {
  constructor(private httpClient: HttpClient) { }

  private readonly APIF = '/api/filmes';

  header = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('tipo')} ${sessionStorage.getItem('token')}`);

  getLista(){
    return this.httpClient.get<Filmes[]>(this.APIF)
    .pipe(
      first(),
      delay(500)
    );
  }

  getFilmePorID(id: number){
    return this.httpClient.get<Filmes>(`${this.APIF}/${id}`).pipe(take(1));
  }

  criandoFilme(data:any) {
    return this.httpClient.post<Filmes[]>(this.APIF, data, {headers : this.header}).subscribe((result)=>{
      console.warn("result", result)
    })
  }

  atualizarFilme(_id: number, data:any){
    return this.httpClient.put<Filmes[]>(`${this.APIF}/${_id}`, data, {headers : this.header}).subscribe((result)=>{
      console.warn("result", result)});
  }

  deleteFilme(id: any){
    return this.httpClient.delete<Filmes>(`${this.APIF}/${id}`, {headers : this.header}).pipe(take(1));
  }

}
