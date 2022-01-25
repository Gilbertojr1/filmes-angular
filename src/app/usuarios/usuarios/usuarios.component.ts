import { Usuarios } from './../models/usuarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuarios[] = [
    { _id: '1', nome: 'Gilberto', email: 'gilberto@gmail.com', senha: '123456'}
  ];
  displayedColumns = ['nome', 'email'];

  constructor() { }

  ngOnInit(): void {
  }

}
