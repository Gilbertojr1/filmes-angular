import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';
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

  getfiltroPorCategoriaEstudio(categoria: string, estudio: string){
    const params = new HttpParams()
    .set('categoria', categoria)
    .set('estudio', estudio);

    if (categoria == "null" || categoria == null){
      categoria = '';
    }
    if(estudio == "null" || estudio == null){
      estudio = '';
    }

    return this.httpClient.get<Filmes[]>(this.APIF + '/filterCategoriaEstudio?categoria=' + categoria + '&estudio=' + estudio);
  }

  getfiltroPorNomeCategoriaEstudio(nome: string, categoria: string, estudio: string){
    const params = new HttpParams()
    .set('nome', nome)
    .set('categoria', categoria)
    .set('estudio', estudio);

    if(nome == null && categoria == null && estudio == null){
      return this.getLista();
    }
    if (categoria == "null" || categoria == null){
      categoria = '';
    }
    if(estudio == "null" || estudio == null){
      estudio = '';
    }

    return this.httpClient.get<Filmes[]>(this.APIF + '/filterNomeCategoriaEstudio?nome=' + nome + '&categoria=' + categoria + '&estudio=' + estudio);
  }

}
