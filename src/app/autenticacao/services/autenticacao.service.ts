import { Injectable } from '@angular/core';

import { ResponseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  public loginResponse: ResponseLogin;

  public clear(): void{
    sessionStorage.removeItem('token'),
    sessionStorage.removeItem('tipo')
  }

  public isAuthenticated():boolean{
    let token = (
      sessionStorage.getItem('token'),
      sessionStorage.getItem('tipo')
    )

    return !(token === null);
  }

}
