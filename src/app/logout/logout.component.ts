import { delay } from 'rxjs';
import { AlertService } from './../autenticacao/services/alert.service';
import { AutenticacaoService } from './../autenticacao/services/autenticacao.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @Output() itemReady = new EventEmitter()

  constructor(private autenticacaoService: AutenticacaoService,
    private router: Router) { }

  ngOnInit(): void {
    this.autenticacaoService.clear();
    this.router.navigate(['home']);

    Swal.fire({
      icon: 'success',
      title: 'Você foi deslogado',
      showConfirmButton: false,
      timer: 2000
    })
  }

}
