import { AutenticacaoService } from './../../autenticacao/services/autenticacao.service';
import { ResponseLogin } from './../../autenticacao/models/responseLogin';
import { SolicitacaoLogin } from './../../autenticacao/models/solicitacaoLogin';

import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'api/auth';

  constructor(
    private httpClient: HttpClient,
    private authService: AutenticacaoService) { }

  public doLogin(solicitacaoLogin: SolicitacaoLogin): Observable<ResponseLogin>{
    return this.httpClient.post<ResponseLogin>(
      this.API,
      solicitacaoLogin)
      .pipe(
        tap((loginResponse) => (
          sessionStorage.setItem('token', loginResponse.token),
          sessionStorage.setItem('tipo', loginResponse.tipo)
          )
        )
      )
  }
}
