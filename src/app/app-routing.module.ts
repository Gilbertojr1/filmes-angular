import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardaRotasService } from './autenticacao/services/guarda-rotas.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'filmes', loadChildren: () => import('./filmes/filmes.module').then(m => m.FilmesModule)},
  { path: 'categorias', canActivate: [GuardaRotasService], loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)},
  { path: 'estudios', canActivate: [GuardaRotasService], loadChildren: () => import('./estudio/estudio.module').then(m => m.EstudioModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'usuarios', canActivate: [GuardaRotasService], loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  { path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule)},
  { path: 'detalhes', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
  { path: 'logout', loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
