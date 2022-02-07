import { Estudio } from './../models/estudio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {
  private readonly API = '/api/estudios';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Estudio[]>(this.API)
    .pipe(
      first(),
      delay(500),
      tap(estudios => console.log(estudios))
    );
  }
}
