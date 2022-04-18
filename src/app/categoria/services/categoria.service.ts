import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, take } from 'rxjs';

import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly APIC = '/api/categorias';

  header = new HttpHeaders().set('Authorization', `${sessionStorage.getItem('tipo')} ${sessionStorage.getItem('token')}`);


  constructor(private httpClient: HttpClient) { }

  getLista() {
    return this.httpClient.get<Categoria[]>(this.APIC)
    .pipe(
      first(),
      delay(500)
    );
  }

  getCategoriaPorID(id: number){
    return this.httpClient.get<Categoria>(`${this.APIC}/${id}`).pipe(take(1));
  }

  criandoCategoria(data:any) {
    return this.httpClient.post<Categoria[]>(this.APIC, data, {headers : this.header}).subscribe((result)=>{
      console.warn("result", result)
    })
  }

  atualizarCategoria(_id: number, data:any){
    return this.httpClient.put<Categoria[]>(`${this.APIC}/${_id}`, data, {headers : this.header}).subscribe((result)=>{
      console.warn("result", result)});
  }

  deleteCategoria(id: any){
    return this.httpClient.delete<Categoria>(`${this.APIC}/${id}`, {headers : this.header}).pipe(take(1));
  }
}
