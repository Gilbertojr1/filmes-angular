import { AlertService } from './../../autenticacao/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SolicitacaoLogin } from './../../autenticacao/models/solicitacaoLogin';
import { LoginService } from './../services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  usuario = '';
  senha = '';

  public solicitacaoLogin: SolicitacaoLogin;

  constructor(private loginService: LoginService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.solicitacaoLogin = new SolicitacaoLogin();
  }

  login(): void{
    this.loginService.doLogin(this.solicitacaoLogin).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        this.alertService.error(error.error, "Login não efetuado")
        console.error(error);
      }
    );




    // this.authService.autenticar(this.usuario, this.senha)
    // .subscribe(() => {
    //   Swal.fire({
    //     title: 'Salvo',
    //     timer: 1500,
    //     showConfirmButton: false,
    //     icon: 'success'
    //   });
    //   delay(2000);
    //   this.router.navigate(['login'])
    // },
    // (error) => {
    //   Swal.fire('Erro!', 'Usuário ou senha inválidos.', 'error')
    //   console.log(error);
    // })
  }

}
