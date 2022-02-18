import { Usuarios } from './../models/usuarios';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API = '/api/usuarios';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Usuarios[]>(this.API)
    .pipe(
      first(),
      delay(500),
      tap(usuarios => console.log(usuarios))
    );
  }
}
