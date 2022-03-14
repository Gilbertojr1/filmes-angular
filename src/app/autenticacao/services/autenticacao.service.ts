import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly API = '/auth';

  constructor(private httpClient: HttpClient) { }

  autenticar(usuario: string, senha: string):Observable<any>{
    return this.httpClient.post(this.API, {
      email: usuario,
      senha: senha
    });
  }

}
