import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, enableProdMode } from '@angular/core';
import { delay, first, tap } from 'rxjs';
import { Filmes } from 'src/app/filmes/models/filmes';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  private readonly APIF = '/api/filmes';

  getLista(){
    return this.httpClient.get<Filmes[]>(this.APIF)
    .pipe(
      first(),
      delay(500)
    );
  }

  getfiltroPorNome(valor?: string){
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    if(valor == null){
      return this.getLista();
    }
    return this.httpClient.get<Filmes[]>(this.APIF + '/filterNome?nome=' + valor, { params });
  }

  getfiltroPorCategoria(id?: string){
    const params = id ? new HttpParams().append('id', id) : undefined;
    if(id == null || id == 'null' || id == ''){
      return this.getLista();
    }
    return this.httpClient.get<Filmes[]>(this.APIF + '/filterCategoria?categoria=' + id, { params });
  }

  getfiltroPorNomeECategoria(nome?: string, categoria?: string){
    const paramsNome = nome ? new HttpParams().append('nome', nome) : undefined;
    const paramsCategoria = categoria ? new HttpParams().append('categoria', categoria) : undefined;

    if(nome == null && categoria == null || categoria == 'null' || categoria == ''){
      return this.getLista();
    }
    if(categoria == null){
      return this.getfiltroPorNome(nome);
    }
    if(nome == null){
     return this.getfiltroPorCategoria(categoria);
    }

    return this.httpClient.get<Filmes[]>(this.APIF + '/filterNomeECategoria?nome=' + nome + '&categoria=' + categoria);
  }

}
