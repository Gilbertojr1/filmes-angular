import { Injectable } from '@angular/core';

import { ResponseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  public loginResponse: ResponseLogin;

  public clear(): void{
    this.loginResponse.token = "";
    this.loginResponse.tipo = "";
  }

  public isAuthenticated():boolean{
    return Boolean(this.loginResponse?.token && this.loginResponse?.tipo);
  }

}
