import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

import { AutenticacaoService } from './../../autenticacao/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  usuario = '';
  senha = '';

  constructor(private authService: AutenticacaoService,
    private router: Router) { }

  login(){
    this.authService.autenticar(this.usuario, this.senha)
    .subscribe(() => {
      Swal.fire({
        title: 'Salvo',
        timer: 1500,
        showConfirmButton: false,
        icon: 'success'
      });
      delay(2000);
      this.router.navigate(['login'])
    },
    (error) => {
      Swal.fire('Erro!', 'Usuário ou senha inválidos.', 'error')
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}
