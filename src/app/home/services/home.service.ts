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

  getfiltroPorEstudio(id?: string){
    const params = id ? new HttpParams().append('id', id) : undefined;
    if(id == null || id == 'null' || id == ''){
      return this.getLista();
    }
    return this.httpClient.get<Filmes[]>(this.APIF + '/filterEstudio?estudio=' + id, { params });
  }

  getfiltroPorNomeCategoriaEstudio(nome?: string, categoria?: string, estudio?: string){
    const paramsNome = nome ? new HttpParams().append('nome', nome) : undefined;
    const paramsCategoria = categoria ? new HttpParams().append('categoria', categoria) : undefined;
    const paramsEstudio = estudio ? new HttpParams().append('estudio', estudio) : undefined;

    if(nome == null && categoria == null && estudio == null){
      return this.getLista();
    }

    return this.httpClient.get<Filmes[]>(this.APIF + '/filterNomeCategoriaEstudio?nome=' + nome + '&categoria=' + categoria + '&estudio=' + estudio);
    // return this.httpClient.get<Filmes[]>(this.APIF + '/filterNomeCategoriaEstudio?nome=&categoria=5&estudio=3');
  }

}
