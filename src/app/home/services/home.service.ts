import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';
import { Filmes } from 'src/app/filmes/models/filmes';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  private readonly APIF = '/api/filmes';
  private readonly APIC = '/api/categorias';

  getLista(){
    return this.httpClient.get<Filmes[]>(this.APIF)
    .pipe(
      first(),
      delay(500)
    );
  }

  getfiltro(valor?: string){
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    if(valor == null){
      return this.getLista();
    }
    return this.httpClient.get<Filmes[]>(this.APIF + '/filter?nome=' + valor, { params });
  }

  getfiltroPorCategoria(valor?: string){
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    if(valor == null){
      return this.getLista();
    }
    return this.httpClient.get<Filmes[]>(this.APIC + '/filterCategoria?categoria=' + valor, { params });
  }
}
