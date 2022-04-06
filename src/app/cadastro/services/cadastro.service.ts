import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private httpClient: HttpClient) { }

  private readonly APIU = '/api/usuarios';

  cadastrarUsuario(data: any){
    return this.httpClient.post(this.APIU, data);
  }
}
