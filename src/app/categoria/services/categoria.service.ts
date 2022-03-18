import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly API = '/api/categorias';

  constructor(private httpClient: HttpClient) { }

  getLista() {
    return this.httpClient.get<Categoria[]>(this.API)
    .pipe(
      first(),
      delay(500)
    );
  }
}
