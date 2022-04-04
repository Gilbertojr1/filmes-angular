import { Estudio } from './../models/estudio';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {
  constructor(private httpClient: HttpClient) { }

  private readonly APIE = '/api/estudios';

  getLista() {
    return this.httpClient.get<Estudio[]>(this.APIE)
    .pipe(
      first(),
      delay(500)
    );
  }

  getEstudioPorID(id: number){
    return this.httpClient.get<Estudio>(`${this.APIE}/${id}`).pipe(take(1));
  }

  criandoEstudio(data:any) {
    return this.httpClient.post<Estudio[]>(this.APIE, data).subscribe((result)=>{
      console.warn("result", result)
    })
  }

  atualizarEstudio(_id: number, data:any){
    return this.httpClient.put<Estudio[]>(`${this.APIE}/${_id}`, data).subscribe((result)=>{
      console.warn("result", result)});
  }

  deleteCategoria(id: any){
    return this.httpClient.delete<Estudio>(`${this.APIE}/${id}`).pipe(take(1));
  }

}
