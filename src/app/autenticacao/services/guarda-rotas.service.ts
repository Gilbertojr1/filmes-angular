import { AutenticacaoService } from './autenticacao.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardaRotasService implements CanActivate{
  constructor(private autenticacaoService: AutenticacaoService) { }

  canActivate(): boolean {
    return this.autenticacaoService.isAuthenticated();
  }
}
