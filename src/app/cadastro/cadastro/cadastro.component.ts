import { delay, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CadastroService } from './../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  hide = true;

  constructor(
    private cadastroService: CadastroService,
    private router: Router) { }

  cadastrar(data: any){
    this.cadastroService.cadastrarUsuario(data)
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
      Swal.fire('Erro!', 'E-mail já sendo usado, tente novamente com outro.', 'error')
    })
  }

  ngOnInit(): void {
  }

}
